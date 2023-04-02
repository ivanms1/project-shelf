import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { Button, Modal } from 'ui';
import classNames from 'classnames';
import {
  GetProjectsAdminQuery,
  type Project,
  SearchOrder,
  useDeleteProjectsMutation,
  useGetProjectsAdminQuery,
} from 'apollo-hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';

import Table from 'src/components/Table';

import GithubIcon from '@/public/assets/github.svg';
import ExternalLink from '@/public/assets/external-link.svg';

const Projects = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      desc: false,
      id: 'title',
    },
  ]);

  const { data, loading, fetchMore } = useGetProjectsAdminQuery({
    variables: {
      input: {
        search,
        order: sorting?.[0]?.desc ? SearchOrder.Desc : SearchOrder.Asc,
        orderBy: sorting?.[0]?.id,
        cursor: undefined,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteProject] = useDeleteProjectsMutation();

  const onRefetch = () => {
    if (!data?.getProjectsAdmin?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        input: {
          search,
          order: sorting?.[0]?.desc ? SearchOrder.Desc : SearchOrder.Asc,
          orderBy: sorting?.[0]?.id,
          cursor: data?.getProjectsAdmin?.nextCursor,
        },
      },
    });
  };

  const deleteProjectClick = async (projectId: string) => {
    setOpenDeleteModal(false);
    try {
      const deleteData = await deleteProject({
        variables: {
          projectIds: [projectId],
        },
        update: (cache) => {
          cache.modify({
            fields: {
              getProjectsAdmin(existingProjects, { readField }) {
                return {
                  ...existingProjects,
                  results: existingProjects.results.filter(
                    (project: Project) => {
                      return readField('id', project) !== projectId;
                    }
                  ),
                };
              },
            },
          });
        },
      });

      if (deleteData?.data?.deleteProjects?.length > 0) {
        toast.success('Project deleted successfully');
      }
    } catch (error) {
      toast.error('Project deleted failed');
    }
  };

  const columnHelper =
    createColumnHelper<
      GetProjectsAdminQuery['getProjectsAdmin']['results'][0]
    >();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      size: 300,
      cell: (info) => {
        return (
          <div className='flex flex-row gap-[10px] items-center'>
            <div className='flex flex-row gap-[20px]'>
              <Image
                src={info?.row?.original?.preview}
                alt={info?.row?.original?.preview}
                className='rounded-full'
                width={50}
                height={50}
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
                    className='capitalize w-fit flex items-center bg-[#e5e7eb] px-[10px] py-[2px] rounded-lg text-gray-700 font-medium text-xs'
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
    columnHelper.accessor('author', {
      size: 200,
      header: 'Author',
      cell: (info) => info?.getValue().name,
    }),
    columnHelper.accessor('createdAt', {
      size: 200,
      header: 'Created At',
      cell: (info) => new Date(info?.getValue()).toDateString(),
    }),
    columnHelper.accessor('repoLink', {
      size: 100,
      header: 'Repo Link',
      cell: (info) => {
        return (
          <a href={info?.getValue()} target='_blank' rel='noopener noreferrer'>
            <GithubIcon className='w-5' />
          </a>
        );
      },
    }),
    columnHelper.accessor('siteLink', {
      size: 100,
      header: 'Site Link',
      cell: (info) => {
        return (
          <a href={info?.getValue()} target='_blank' rel='noopener noreferrer'>
            <ExternalLink className='w-5' />
          </a>
        );
      },
    }),

    columnHelper.display({
      id: 'acrions',
      header: 'Actions',
      size: 100,
      cell: (info) => {
        return (
          <div className='flex flex-row items-center gap-[20px] '>
            <Modal
              open={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              modalClassName='bg-white flex flex-col items-center justify-center p-[20px] h-[full] w-[500px] '
            >
              <p className=' text-center text-[30px] mb-[20px] font-semibold w-[full]'>
                Are you sure !
              </p>
              <div className='flex justify-between w-[full]'>
                <Button
                  variant='secondary'
                  onClick={() => deleteProjectClick(info?.row?.original?.id)}
                >
                  Yes
                </Button>
                <Button onClick={() => setOpenDeleteModal(false)}>No</Button>
              </div>
            </Modal>

            <button
              className={classNames(
                'text-[14px] text-white font-bold py-[5px] px-[20px] rounded-full bg-red-600'
              )}
              onClick={() => {
                deleteProjectClick(info?.row?.original?.id);
                // setOpenDeleteModal(true);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    }),
  ];

  const instance = useReactTable({
    data: data?.getProjectsAdmin?.results ?? [],
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
    <div className='w-full h-full bg-white p-[30px] flex flex-col'>
      <p className='text-gray-900 text-3xl font-bold'>Projects</p>
      <input
        type='text'
        placeholder='Search'
        value={search}
        className='w-full h-[50px] rounded-[10px] border-[1px] border-gray-300 p-[10px] focus:outline-none focus:border-[#3f51b5]'
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className='flex h-[600px] w-full'>
        <Table instance={instance} loading={loading} onFetchMore={onRefetch} />
      </div>

      <NextSeo title='Projects' />
    </div>
  );
};

export default Projects;
