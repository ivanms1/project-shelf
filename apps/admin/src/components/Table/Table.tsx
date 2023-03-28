import React, { useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

import { rankItem } from '@tanstack/match-sorter-utils';

import DebouncedInput from './DebouncedInput';

function Table({ tableData, columns }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table = useReactTable({
    data: tableData || [],
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    enableColumnFilters: true,
    columnResizeMode: 'onChange',
  });

  return (
    <div className='w-full flex flex-col overflow-hidden'>
      <div className='flex flex-row justify-end mb-[10px]'>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder='Search all columns'
        />
      </div>
      <div className='h-full w-full max-w-full overflow-auto'>
        {table.getRowModel().rows.length !== 0 && (
          <table className='w-full relative'>
            <thead className=''>
              {table.getHeaderGroups().map((headerGroup) => (
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
              {table.getRowModel().rows.map((row) => (
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
            </tbody>
          </table>
        )}

        {table.getRowModel().rows.length == 0 && (
          <div className='h-[100%] max-h-[400px] flex items-center justify-center text-gray-700 font-bold text-[25px]'>
            No Data
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;
