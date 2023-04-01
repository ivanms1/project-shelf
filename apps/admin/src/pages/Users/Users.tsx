import React, { useMemo } from 'react';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import Image from 'next/future/image';
import Link from 'next/link';
import classNames from 'classnames';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import {
  useUpdateUserAsAdminMutation,
  useGetAllUsersAdminQuery,
  SearchOrder,
} from 'apollo-hooks';

import Table from 'src/components/Table';

import GithubIcon from '@/public/assets/github.svg';

const notifySuccess = (string) => toast.success(string);
const notifyError = () => toast.error('Something went wrong');

const styles = {
  indicatorSeparator: () => null,
  control: (provided) => {
    return {
      ...provided,
      width: '100%',
      minWidth: '50px',
      maxWidth: '120px',
    };
  },
  menu: (base, { isDisabled }) => ({
    ...base,
    width: '100%',
    minWidth: '50px',
    maxWidth: '120px',
    cursor: isDisabled ? 'not-allowed' : 'default',
    background: isDisabled ? '#fff' : 'pointer',
  }),
  option: (provided, { isDisabled }) => {
    return {
      ...provided,
      width: '100%',
      minWidth: '50px',
      maxWidth: '120px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      background: isDisabled ? '#fff' : 'pointer',
    };
  },
};

function Users() {
  const [updateUserAsAdmin] = useUpdateUserAsAdminMutation();
  const [search, setSearch] = React.useState('');

  const { data, loading, fetchMore } = useGetAllUsersAdminQuery({
    variables: {
      input: {
        search,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const updateUser = async (user, role, action) => {
    try {
      if (action == 'BAN') {
        const data = await updateUserAsAdmin({
          variables: {
            input: {
              banned: !user.banned,
              id: user.id,
              role: user.role,
            },
          },
        });

        if (data) {
          notifySuccess(
            `User ${
              data?.data?.updateUserAsAdmin?.banned ? 'banned' : 'unbanned'
            } successfully`
          );
        }
      }

      if (action == 'ROLE') {
        const data = await updateUserAsAdmin({
          variables: {
            input: {
              banned: user.banned,
              id: user.id,
              role: role,
            },
          },
        });

        if (data) {
          notifySuccess(
            `User status changed to ${data?.data?.updateUserAsAdmin?.role} successfully`
          );
        }
      }
    } catch (error) {
      notifyError();
    }
  };

  const onRefetch = () => {
    if (!data?.getAllUsersAdmin?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        input: {
          search,
          orderBy: 'createdAt',
          order: SearchOrder.Asc,
          cursor: data?.getAllUsersAdmin?.nextCursor,
        },
      },
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: () => <span>Name</span>,
        size: 375,
        cell: (info) => {
          return (
            <div className='flex flex-row gap-[20px]'>
              <Image
                src={info?.row?.original?.avatar}
                alt={info?.row?.original?.avatar}
                className='rounded-full'
                width={70}
                height={50}
              />
              <div className='flex flex-col w-full'>
                <span className='w-full text-gray-700 font-bold text-[17px]'>
                  {info?.getValue()}
                </span>
                <div className='gap-[2px] flex flex-col'>
                  <span className='w-full text-gray-700 font-medium text-[15px]'>
                    {info?.row?.original?.email}
                  </span>

                  <Link
                    href={`https://github.com/` + info?.row?.original?.github}
                    passHref
                  >
                    <a target='_blank' rel='noopener noreferrer'>
                      <span className='w-full flex flex-row items-center gap-[5px]'>
                        <i className='w-[20px] h-[20px]'>
                          <GithubIcon className='fill-[#a3aed0]' />
                        </i>
                        <span className='text-gray-700 font-bold text-[14px]'>
                          {info?.row?.original?.github}
                        </span>
                      </span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'projects',
        header: () => <span>Projects</span>,
        cell: (info) => {
          return (
            <span className='text-gray-700 font-bold text-[14px]'>
              {info?.row?.original?.projectsCount}
            </span>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: () => <span>Created Date</span>,
        minSize: 200,
        cell: (info) => {
          return (
            <span className='text-gray-700 font-bold text-[14px]'>
              {new Date(info?.getValue()).toDateString()}
            </span>
          );
        },
      },
      {
        accessorKey: 'role',
        header: () => <span>Role</span>,
        minSize: 200,
        cell: (info) => {
          const selectedValue = {
            value: info.getValue(),
            label: info.getValue(),
            isDisabled: true,
          };

          const options = [
            {
              value: 'USER',
              label: 'USER',
              isDisabled: info.getValue() == 'USER' ? true : false,
            },
            {
              value: 'ADMIN',
              label: 'ADMIN',
              isDisabled: info.getValue() == 'ADMIN' ? true : false,
            },
          ];
          return (
            <span className='text-gray-700 font-bold text-[14px]'>
              <Select
                isSearchable={false}
                options={options}
                value={selectedValue}
                styles={styles}
                onChange={({ value }) => {
                  updateUser(info?.row?.original, value, 'ROLE');
                }}
              />
            </span>
          );
        },
      },
      {
        accessorKey: 'action',
        header: () => <span>Action</span>,

        cell: (info) => {
          return (
            <button
              className={classNames(
                'text-[14px] text-white font-bold py-[5px] px-[20px] rounded-full',
                {
                  'bg-red-600': info?.row?.original?.banned == false,
                  'bg-green-600': info?.row?.original?.banned == true,
                }
              )}
              onClick={() => {
                updateUser(info?.row?.original, undefined, 'BAN');
              }}
            >
              {info?.row?.original?.banned ? 'Unban' : 'Ban'}
            </button>
          );
        },
      },
    ],
    []
  );

  const instance = useReactTable({
    data: data?.getAllUsersAdmin?.results ?? [],
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    enableColumnFilters: true,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
  });

  return (
    <div className='w-full h-full bg-white p-[30px] flex flex-col gap-[20px]'>
      <p className='text-gray-900 text-3xl font-bold'>Users</p>
      <input
        type='text'
        placeholder='Search'
        value={search}
        className='w-full h-[50px] rounded-[10px] border-[1px] border-gray-300 p-[10px] focus:outline-none focus:border-[#3f51b5]'
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className='flex h-[600px] w-full'>
        <Table instance={instance} loading={loading} onFetchMore={onRefetch} />
      </div>
      <NextSeo title='Users' />
    </div>
  );
}

export default Users;
