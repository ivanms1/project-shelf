import React from 'react';
import { Waypoint } from 'react-waypoint';

import { flexRender, type Table } from '@tanstack/react-table';
import type { Role } from 'apollo-hooks';

interface TableProps {
  instance: Table<{
    __typename?: 'User';
    avatar?: string;
    banned: boolean;
    createdAt: any;
    email?: string;
    followersCount: number;
    followingCount: number;
    github?: string;
    id: string;
    location?: string;
    name: string;
    role: Role;
    projectsCount: number;
  }>;

  loading?: boolean;
  onFetchMore?: () => void;
  onClickRow?: (data: any) => void;
}

function Table({ instance, loading, onFetchMore }: TableProps) {
  return (
    <div className='w-full'>
      {instance.getRowModel().rows.length !== 0 && (
        <div role='table' className='relative min-w-fit'>
          <div
            role='thead'
            className='sticky top-0 bg-white z-10 border-b border-gray-200 py-5'
          >
            {instance.getHeaderGroups().map((headerGroup) => (
              <div role='trow' className='flex' key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <div
                    role='td'
                    className='flex  items-center text-[14px] tracking-wide text-[#aab4d3]'
                    key={header.id}
                    style={{
                      width: header.getSize() || undefined,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div role='body' className='overflow-y-auto h-[550px]'>
            {instance.getRowModel().rows.map((row) => (
              <div role='trow' key={row.id} className='flex items-center py-5'>
                {row.getVisibleCells().map((cell) => (
                  <div
                    role='td'
                    key={cell.id}
                    style={{
                      width: cell.column.getSize() || undefined,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}

            {loading ? (
              <div className='flex items-center justify-center h-[100px]'>
                <p>loading...</p>
              </div>
            ) : (
              <Waypoint onEnter={onFetchMore} bottomOffset='-10%' />
            )}
          </div>
        </div>
      )}

      {instance.getRowModel().rows.length == 0 && (
        <div className='h-[100%] max-h-[400px] flex items-center justify-center text-gray-700 font-bold text-[25px]'>
          No Data
        </div>
      )}
    </div>
  );
}

export default Table;
