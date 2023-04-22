import React, { useEffect } from 'react';
import Select, { type GroupBase, type StylesConfig } from 'react-select';
import { toast } from 'react-hot-toast';
import { NextSeo } from 'next-seo';
import Image from 'next/future/image';
import classNames from 'classnames';
import {
  createColumnHelper,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  useGetAllUsersAdminLazyQuery,
  SearchOrder,
  Role,
  type GetAllUsersAdminQuery,
  User,
  useUpdateUserRoleMutation,
  useUpdateUserBanStatusMutation,
} from 'apollo-hooks';

import Table from 'src/components/Table';

import useDebounce from '@/hooks/useDebounce';

import GithubIcon from '@/public/assets/github.svg';

type Value = { value: string | number; label?: string };

const OPTIONS = [
  {
    value: Role.User,
    label: Role.User,
  },
  {
    value: Role.Admin,
    label: Role.Admin,
  },
];

const notifySuccess = (string: string) => toast.success(string);
const notifyError = () => toast.error('Something went wrong');

const styles: StylesConfig<Value, boolean, GroupBase<Value>> = {
  indicatorSeparator: () => null,
  control: (provided) => {
    return {
      ...provided,
      width: '100%',
      minWidth: '50px',
      maxWidth: '120px',
    };
  },
  menu: (base, { isDisabled }: any) => ({
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

const Users = () => {
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserBanStatus] = useUpdateUserBanStatusMutation();
  const [search, setSearch] = React.useState('');
  const debouncedSearchTerm = useDebounce(search, 1000);
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      desc: false,
      id: 'name',
    },
  ]);

  const [getUsers, { data, loading, fetchMore }] = useGetAllUsersAdminLazyQuery(
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    getUsers({
      variables: {
        input: {
          search,
          order: sorting?.[0]?.desc ? SearchOrder.Desc : SearchOrder.Asc,
          orderBy: sorting?.[0]?.id,
          cursor: data?.getAllUsersAdmin?.nextCursor,
        },
      },
    });
  }, [debouncedSearchTerm, sorting]);

  const changeUserRole = async (user: Partial<User>, role: Role) => {
    try {
      const data = await updateUserRole({
        variables: {
          userId: user.id,
          role: role,
        },
      });

      if (data) {
        notifySuccess(
          `User status changed to ${data?.data?.updateUserRole?.role} successfully`
        );
      }
    } catch (error) {
      notifyError();
    }
  };

  const banUser = async (user: Partial<User>) => {
    try {
      const data = await updateUserBanStatus({
        variables: {
          userId: user.id,
          isBanned: !user.banned,
        },
      });

      if (data) {
        notifySuccess(
          `User ${
            data?.data?.updateUserBanStatus?.banned ? 'banned' : 'unbanned'
          } successfully`
        );
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
          order: sorting?.[0]?.desc ? SearchOrder.Desc : SearchOrder.Asc,
          orderBy: sorting?.[0]?.id,
          cursor: data?.getAllUsersAdmin?.nextCursor,
        },
      },
    });
  };

  const columnHelper =
    createColumnHelper<
      GetAllUsersAdminQuery['getAllUsersAdmin']['results'][0]
    >();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      size: 475,
      cell: (info) => {
        return (
          <div className='flex flex-row gap-[20px]'>
            <Image
              src={info?.row?.original?.avatar}
              alt={info?.row?.original?.avatar}
              className='rounded-full w-auto h-auto'
              width={50}
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

                <a
                  href={`https://github.com/` + info?.row?.original?.github}
                  target='_blank'
                  rel='noreferrer'
                  className='flex flex-row gap-[10px] items-center'
                >
                  <span className='w-full flex flex-row items-center gap-[5px]'>
                    <i className='w-[20px] h-[20px]'>
                      <GithubIcon className='fill-[#a3aed0]' />
                    </i>
                    <span className='text-gray-700 font-bold text-[14px]'>
                      {info?.row?.original?.github}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor('projectsCount', {
      header: () => 'Projects',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('createdAt', {
      header: () => 'Created At',
      cell: (info) => new Date(info?.getValue()).toDateString(),
      size: 200,
    }),
    columnHelper.accessor('role', {
      header: () => 'Role',
      size: 200,
      cell: (info) => {
        const selectedValue = {
          value: info.getValue(),
          label: info.getValue(),
        };

        return (
          <span className='text-gray-700 font-bold text-sm'>
            <Select
              isSearchable={false}
              options={OPTIONS}
              value={selectedValue}
              styles={styles}
              hideSelectedOptions
              onChange={(val) => {
                if (val && 'value' in val) {
                  changeUserRole(info?.row?.original, val?.value as Role);
                }
              }}
            />
          </span>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => {
        return (
          <button
            className={classNames(
              'text-[14px] text-white font-bold py-1 px-5 rounded-full',
              {
                'bg-red-600': !info?.row?.original?.banned,
                'bg-green-600': info?.row?.original?.banned,
              }
            )}
            onClick={() => {
              banUser(info?.row?.original);
            }}
          >
            {info?.row?.original?.banned ? 'Unban' : 'Ban'}
          </button>
        );
      },
    }),
  ];

  const instance = useReactTable({
    data: data?.getAllUsersAdmin?.results ?? [],
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className='w-full h-full bg-white p-7 flex flex-col gap-5'>
      <p className='text-gray-900 text-3xl font-bold'>Users</p>
      <input
        type='text'
        placeholder='Search'
        value={search}
        className='w-full h-[50px] rounded-md border border-gray-300 p-2.5 focus:outline-none focus:border-blue'
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <div className='flex h-[600px] w-full'>
        <Table instance={instance} loading={loading} onFetchMore={onRefetch} />
      </div>
      <NextSeo title='Users' />
    </div>
  );
};

export default Users;