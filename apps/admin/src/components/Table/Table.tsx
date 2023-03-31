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
  onFetchMore?();
  onClickRow?(data: any);
}

function Table({ instance, loading, onFetchMore }: TableProps) {
  return (
    <div className='w-full flex flex-col overflow-hidden'>
      <div className='flex flex-row justify-end mb-[10px]'></div>
      <div className='h-full w-full max-w-full overflow-auto'>
        {instance.getRowModel().rows.length !== 0 && (
          <table className='w-full relative'>
            <thead className=''>
              {instance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className='border-b border-gray-200 pr-14 pb-[10px] text-start sticky'
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width: header.getSize() || undefined,
                      }}
                    >
                      <div
                        className='flex w-full justify-between pr-10 text-[14px] tracking-wide text-[#aab4d3] pt-[14px]'
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {{ asc: '🔼', desc: '🔽' }[
                          header.column.getIsSorted() as string
                        ] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className=''>
              {instance.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='pt-[20px]'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {loading ? (
                <div className='flex items-center justify-center h-[100px]'>
                  <p>loading...</p>
                </div>
              ) : (
                <Waypoint onEnter={onFetchMore} bottomOffset='-10%' />
              )}
            </tbody>
          </table>
        )}

        {instance.getRowModel().rows.length == 0 && (
          <div className='h-[100%] max-h-[400px] flex items-center justify-center text-gray-700 font-bold text-[25px]'>
            No Data
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
