import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';
import Table from 'src/components/Table';

import classNames from 'classnames';

import GithubIcon from '../../../public/assets/github.svg';

const columns = [
  {
    accessorKey: 'name',
    header: () => <span>Name</span>,
    size: 150,
    minSize: 20,
    cell: (info) => {
      return (
        <div className='flex flex-row gap-[20px] items-center'>
          <div className='flex max-h-[70px] max-w-[70px]'>
            <Image
              loader={() => info?.row?.original?.avatar}
              src={info?.row?.original?.avatar}
              alt={info?.row?.original?.avatar}
              width={'100%'}
              height={'100%'}
              style={{
                borderRadius: '50%',
              }}
            />
          </div>

          <div className='flex flex-col w-full'>
            <span className='w-full text-gray-700 font-bold text-[17px]'>
              {info?.getValue()}
            </span>
            <div className='gap-[2px] flex flex-col'>
              <span className='w-full text-gray-700 font-medium text-[15px]'>
                {info?.row?.original?.email}
              </span>
              <span className='w-full flex flex-row items-center gap-[5px]'>
                <i className='w-[20px] h-[20px]'>
                  <GithubIcon className='fill-[#a3aed0]' />
                </i>
                <span className='text-gray-700 font-bold text-[14px]'>
                  {info?.row?.original?.github}
                </span>
              </span>
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
        <div className=''>
          <span className='text-gray-700 font-bold text-[14px]'>
            {info?.row?.original?.projects?.length}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <span>Created Date</span>,
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
    cell: (info) => {
      return (
        <span className='text-gray-700 font-bold text-[14px]'>
          {info?.getValue()}
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
              'bg-red-600': true,
            }
          )}
          onClick={() => alert('The user has been banned')}
        >
          Ban
        </button>
      );
    },
  },
];

function Index({ users }) {
  console.log('what is props', users);
  return (
    <div className='w-full h-full bg-white p-[30px] flex flex-col gap-[20px]'>
      <p className='text-gray-900 text-3xl font-bold'>Users</p>

      <div className='flex h-[600px] w-full'>
        <Table tableData={users} columns={columns} />
      </div>
      <NextSeo title='Users' />
    </div>
  );
}

export default Index;
