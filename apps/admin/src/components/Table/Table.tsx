import React, { useEffect, useState } from 'react';

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

import Pagination from './Pagination';

function Table({ tableData, columns }) {
  const [data, setData] = useState(() => [...tableData]);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    console.log(
      'what is itemRank',
      itemRank,
      { row },
      { columnId },
      { value },
      { addMeta }
    );

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
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

  useEffect(() => {
    // table.setState(5);
  }, []);
  // overflow-x-scroll xl:overflow-x-hidden
  return (
    <div className='w-full flex flex-col overflow-hidden'>
      <div className='flex flex-row justify-end mb-[10px]'>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder='Search all columns'
        />
      </div>
      <div className='h-full w-full'>
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
                      width: header.getSize() ? header.getSize() : undefined,
                    }}
                  >
                    <div
                      className='flex w-full justify-between pr-10 text-[14px] tracking-wide text-[#aab4d3] pt-[14px]'
                      {...{ onClick: header.column.getToggleSortingHandler() }}
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
                  <td
                    key={cell.id}
                    className='pt-[20px] border-red-200 border-2'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Pagination table={table} /> */}
    </div>
  );
}

export default Table;
