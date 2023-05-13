import React, { useState } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { GetReportsQuery, SearchOrder, useGetReportsQuery } from 'apollo-hooks';
import { NextSeo } from 'next-seo';

import Table from 'src/components/Table';

import { Loader } from 'ui';

dayjs.extend(relativeTime);

interface ReportsProps {}

const Reports = ({}: ReportsProps) => {
  const { data, loading, fetchMore } = useGetReportsQuery({
    variables: {
      input: {},
    },
  });

  const [search, setSearch] = useState('');

  const [sorting, setSorting] = React.useState<SortingState>([
    {
      desc: false,
      id: 'title',
    },
  ]);

  const onRefetch = () => {
    if (!data?.getReports?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        input: {
          search,
          order: sorting?.[0]?.desc ? SearchOrder.Desc : SearchOrder.Asc,
          orderBy: sorting?.[0]?.id,
          cursor: data?.getReports?.nextCursor,
        },
      },
    });
  };

  const columnHelper =
    createColumnHelper<GetReportsQuery['getReports']['results'][0]>();

  const columns = [
    columnHelper.accessor('project.title', {
      header: 'Project',
    }),
    columnHelper.accessor('reason', {
      header: 'Reason',
    }),
    columnHelper.accessor('message', {
      header: 'Message',
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (info) => dayjs().to(dayjs(info.getValue())),
    }),
  ];

  const instance = useReactTable({
    data: data?.getReports?.results ?? [],
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
    <div className='flex h-full w-full flex-col gap-5 bg-white p-7'>
      <p className='text-3xl font-bold text-gray-900'>Reports</p>
      <div className='relative'>
        <input
          type='text'
          placeholder='Search'
          value={search}
          className='h-12 w-full rounded-md border border-gray-300 p-2.5 focus:border-blue focus:outline-none'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        {loading ? (
          <span className='absolute right-2.5 top-2.5 '>
            <Loader />
          </span>
        ) : null}
      </div>

      <div className='flex h-[600px] w-full'>
        <Table instance={instance} loading={loading} onFetchMore={onRefetch} />
      </div>

      <NextSeo title='Reports' />
    </div>
  );
};

export default Reports;
