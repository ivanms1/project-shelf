import React from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import Table from '../../components/Table';
import classNames from 'classnames';

type Person = {
  projectName: string;
  preview: string;
  description: string;
  submissionDate: number;
  author: string;
  authorEmail: string;
  authorAvatar: string;
};

const columns = [
  {
    accessorKey: 'title',
    header: () => <span>Title</span>,
    size: 300,
    cell: (info) => {
      return (
        <div className='flex flex-row gap-[10px] items-center'>
          <div className='flex max-h-[70px] max-w-[70px]'>
            <Image
              loader={() => info?.row?.original?.preview}
              src={info?.row?.original?.preview}
              alt={info?.row?.original?.preview}
              width={'100%'}
              height={'100%'}
              style={{
                borderRadius: '50%',
              }}
            />
          </div>

          <div className='flex flex-col gap-[5px]'>
            <span className='w-full text-gray-700 font-medium text-[16px]'>
              {info?.getValue()}
            </span>

            <div className='flex gap-[5px] flex-wrap'>
              {info?.row?.original?.tags?.map((tag, i) => (
                <span
                  key={i}
                  className='capitalize w-fit flex items-center bg-[#e5e7eb] px-[10px] py-[2px] rounded-lg text-gray-700 font-medium text-[14px]'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'author',
    width: 200,
    header: () => <span>Author</span>,
    cell: (info) => {
      return (
        <div className='flex flex-row gap-[10px] items-center'>
          <div className='flex max-h-[70px] max-w-[70px]'>
            <Image
              loader={() => info?.row?.original?.author?.avatar}
              src={info?.row?.original?.author?.avatar}
              alt={info?.row?.original?.author?.avatar}
              width={'100%'}
              height={'100%'}
              style={{
                borderRadius: '50%',
              }}
            />
          </div>
          <div className='flex flex-col w-full'>
            <span className='w-full text-gray-700 font-bold text-[17px]'>
              {info?.row?.original?.author?.name}
            </span>
            <span className='w-full text-gray-700 font-medium text-[15px]'>
              {info?.row?.original?.author?.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <span>Submission Date</span>,
    size: 10,
    maxSize: 10,
    cell: (info) => {
      return (
        <span className='text-gray-700 font-bold text-[14px]'>
          {new Date(info?.getValue()).toDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: 'action',
    header: () => <span>Action</span>,
    width: 'auto',
    cell: (info) => {
      return (
        <button
          className={classNames(
            'text-[14px] text-white font-bold py-[5px] px-[20px] rounded-full',
            {
              'bg-red-600': true,
            }
          )}
          onClick={() => alert('delete button clicked')}
        >
          Delete
        </button>
      );
    },
  },
];

function Index({ projects }) {
  return (
    <div className='w-full h-full bg-white p-[30px] flex flex-col'>
      <p className='text-gray-900 text-3xl font-bold'>Projects</p>

      <div className='flex h-full w-full '>
        <Table tableData={projects} columns={columns} />
      </div>
      <NextSeo title='Projects' />
    </div>
  );
}

export default Index;
