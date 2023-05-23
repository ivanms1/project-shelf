import React, { useEffect, useState } from 'react';
import Image from 'next/future/image';
import {
  createColumnHelper,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  type Report,
  GetReportsQuery,
  SearchOrder,
  useDeleteReportMutation,
  useGetReportsLazyQuery,
} from 'apollo-hooks';
import { NextSeo } from 'next-seo';

import Table from 'src/components/Table';

import { Button, Loader, Modal } from 'ui';
import useDebounce from '@/hooks/useDebounce';
import classNames from 'classnames';
import { toast } from 'react-hot-toast';

dayjs.extend(relativeTime);

const Reports = () => {
  const [deleteReportId, setDeleteReportId] = useState(null);

  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 1000);
  const [getReports, { data, loading, fetchMore }] = useGetReportsLazyQuery({});

  const [deleteReportMutation] = useDeleteReportMutation();

  const deleteReportClick = async (reportId: string) => {
    try {
      const data = await deleteReportMutation({
        variables: {
          reportIds: [reportId],
        },
        update: (cache) => {
          cache.modify({
            fields: {
              getReports(existingReports, { readField }) {
                console.log('what is existingReports', existingReports);
                return {
                  ...existingReports,
                  results: existingReports.results.filter((report: Report) => {
                    return readField('id', report) !== reportId;
                  }),
                };
              },
            },
          });
        },
      });
      if (data?.data?.deleteReport) {
        toast.success('Reported deleted succesfully');
        setDeleteReportId(null);
      }
    } catch (error) {
      toast.error('Failed to delete Report');
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([
    {
      desc: false,
      id: 'title',
    },
  ]);

  useEffect(() => {
    getReports({
      variables: {
        input: {
          search: debouncedSearchTerm,
        },
      },
    });
  }, [debouncedSearchTerm, sorting]);

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

  console.log('what is data', data);

  const columnHelper =
    createColumnHelper<GetReportsQuery['getReports']['results'][0]>();

  const columns = [
    columnHelper.accessor('project.title', {
      header: 'Project',
      minSize: 500,

      cell: (info) => {
        return (
          <div className='flex flex-row items-center gap-2.5'>
            <div className='flex flex-row gap-[20px]'>
              <Image
                src={info?.row?.original?.project?.preview}
                alt={info?.row?.original?.project?.preview}
                className='rounded-full'
                width={50}
                height={50}
              />
            </div>
            <div className='flex flex-col gap-[5px]'>
              <span className='w-full text-[16px] font-medium text-gray-700'>
                {info?.row?.original?.project?.title}
              </span>

              <div className='flex flex-wrap gap-[5px]'>
                {info?.row?.original?.project?.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className='flex w-fit items-center rounded-lg bg-[#e5e7eb] px-2.5 py-[2px] text-xs font-medium capitalize text-gray-700'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      },
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
    columnHelper.display({
      id: 'actions',
      enableSorting: false,

      header: 'Actions',
      cell: (info) => {
        return (
          <div className='flex flex-row items-center gap-[20px] '>
            <button
              className={classNames(
                'rounded-full bg-red-600 py-[5px] px-[20px] text-[14px] font-bold text-white'
              )}
              onClick={() => {
                setDeleteReportId(info?.row?.original?.id);
              }}
            >
              Delete Report
            </button>
          </div>
        );
      },
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

      <Modal
        open={!!deleteReportId}
        onClose={() => {
          setDeleteReportId(null);
        }}
        modalClassName='bg-white flex flex-col  justify-center p-[20px] h-[full] w-[500px] '
      >
        <p className=' mb-[20px] w-[full] text-center text-[30px] font-semibold'>
          Are you sure !
        </p>
        <div className='flex w-[full] justify-between '>
          <Button
            variant='secondary'
            onClick={() => {
              deleteReportClick(deleteReportId);
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setDeleteReportId(null)}>No</Button>
        </div>
      </Modal>
      <NextSeo title='Reports' />
    </div>
  );
};

export default Reports;
