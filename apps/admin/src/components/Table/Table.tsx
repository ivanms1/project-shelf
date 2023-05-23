import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Loader } from 'ui';

import { flexRender, type Table } from '@tanstack/react-table';

interface TableProps<T> {
  instance: Table<T>;
  loading?: boolean;
  onFetchMore?: () => void;
  onClickRow?: (data: T) => void;
}

const Table = <T extends object>({
  instance,
  loading,
  onFetchMore,
}: TableProps<T>) => {
  const noRows = instance.getRowModel().rows.length == 0;
  return (
    <div className='w-full'>
      <div role='table' className='relative min-w-fit'>
        <div
          role='thead'
          className='sticky top-0 z-10 border-b border-gray-200 bg-white py-5'
        >
          {instance.getHeaderGroups().map((headerGroup) => (
            <div role='trow' className='flex ' key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <div
                  role='td'
                  key={header.id}
                  style={{
                    minWidth:
                      header.getSize() !== 0 ? header.getSize() : undefined,
                    flex: 1,
                  }}
                  {...{
                    className: 'flex w-full gap-1 text-sm text-[#aab4d3] p-2',
                    onClick: header?.column?.getCanSort?.()
                      ? header.column.getToggleSortingHandler()
                      : () => null,
                  }}
                >
                  <span>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </span>
                  {{
                    asc: <span>🔼</span>,
                    desc: <span>🔽</span>,
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div role='body' className='h-[550px] overflow-y-auto'>
          {instance?.getRowModel?.()?.rows?.map?.((row) => (
            <div role='trow' key={row.id} className='flex items-center py-5'>
              {row.getVisibleCells().map((cell) => (
                <div
                  role='td'
                  key={cell.id}
                  className='flex items-center p-2 text-sm font-bold text-gray-700'
                  style={{
                    minWidth:
                      cell.column.getSize() !== 0
                        ? cell.column.getSize()
                        : undefined,
                    flex: 1,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}

          {loading ? (
            <div className='flex h-[100px] items-center justify-center'>
              <Loader />
            </div>
          ) : (
            <Waypoint onEnter={onFetchMore} bottomOffset='-10%' />
          )}

          {noRows && !loading && (
            <div className='flex h-full max-h-[400px] items-center justify-center  text-2xl font-bold text-gray-700'>
              No Data
            </div>
          )}
        </div>
      </div>

      {noRows && loading && (
        <div className='flex h-[100px] items-center justify-center'>
          <p>loading...</p>
        </div>
      )}
    </div>
  );
};

export default Table;
