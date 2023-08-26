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
          <a
            target='_blank'
            rel='noreferrer'
            className='flex flex-row gap-[20px]'
            href={`https://www.projectshelf.dev/user/${info?.row?.original?.id}`}
          >
            <Image
              src={info?.row?.original?.avatar}
              alt={info?.row?.original?.avatar}
              className='h-auto w-auto rounded-full'
              width={50}
              height={50}
            />
            <div className='flex w-full flex-col'>
              <span className='w-full text-[17px] font-bold'>
                {info?.getValue()}
              </span>
              <div className='flex flex-col gap-2'>
                <span className='w-full text-[15px] font-medium'>
                  {info?.row?.original?.email}
                </span>

                <div className='flex flex-row items-center gap-[10px]'>
                  <span className='flex w-full flex-row items-center gap-[5px]'>
                    <i className='h-[20px] w-[20px]'>
                      <GithubIcon className='fill-[#a3aed0]' />
                    </i>
                    <span className='text-[14px] font-bold'>
                      {info?.row?.original?.github}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </a>
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
          <span className='text-sm font-bold'>
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
              'rounded-full py-1 px-5 text-[14px] font-bold text-white',
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
    <div className='flex h-full w-full flex-col gap-5 p-7'>
      <p className='text-3xl font-bold'>Users</p>
      <input
        type='text'
        placeholder='Search'
        value={search}
        className='h-[50px] w-full rounded-md border border-gray-300 bg-[#0b0a0a] p-2.5 focus:border-white focus:outline-none'
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <div className='flex h-[600px] w-full'>
        <Table instance={instance} loading={loading} onFetchMore={onRefetch} />
      </div>
      <NextSeo
        title='Admin | Users'
        description='Admin users page'
        openGraph={{
          type: 'website',
          title: 'Admin | Users',
          description:
            'Control the users status, project and ban them if necessary',
          site_name: 'Admin users page',
          images: [
            {
              url: 'https://project-shelf-dev.netlify.app/assets/images/shelf.png',
              width: 200,
              height: 200,
              alt: 'Project Shelf',
            },
          ],
        }}
      />
    </div>
  );
};

export default Users;
