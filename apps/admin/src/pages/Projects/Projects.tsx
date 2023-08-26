import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/future/image';
import { NextSeo } from 'next-seo';
import { Button, Modal, Loader } from 'ui';
import classNames from 'classnames';
import {
  GetProjectsAdminQuery,
  type Project,
  SearchOrder,
  useDeleteProjectsMutation,
  useGetProjectsAdminLazyQuery,
} from 'apollo-hooks';
import {
  createColumnHelper,
  getCoreRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import useDebounce from '@/hooks/useDebounce';

import Table from 'src/components/Table';

import GithubIcon from '@/public/assets/github.svg';
import ExternalLink from '@/public/assets/external-link.svg';

dayjs.extend(relativeTime);

const Projects = () => {
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      desc: false,
      id: 'title',
    },
  ]);

  const debouncedSearchTerm = useDebounce(search, 1000);

  const [getProjects, { data, loading, fetchMore }] =
    useGetProjectsAdminLazyQuery({});

  useEffect(() => {
    getProjects({
      variables: {
        input: {
          search: debouncedSearchTerm,
          order: sorting?.[0]?.desc ? SearchOrder.Desc : SearchOrder.Asc,
          orderBy: sorting?.[0]?.id,
          cursor: undefined,
        },
      },
    });
  }, [debouncedSearchTerm, sorting]);

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
    setDeleteProjectId(false);
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
      size: 500,
      cell: (info) => {
        return (
          <div className='flex flex-row items-center gap-2.5'>
            <div className='flex flex-row gap-[20px]'>
              <Image
                src={info?.row?.original?.preview}
                alt={info?.row?.original?.preview}
                className='h-12 w-12 rounded-full'
                width={48}
                height={48}
              />
            </div>
            <div className='flex flex-col gap-[5px]'>
              <span className='w-full text-[16px] font-medium'>
                {info?.getValue()}
              </span>

              <div className='flex flex-wrap gap-[5px]'>
                {info?.row?.original?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className='flex w-fit items-center rounded-lg bg-[#e5e7eb] px-2.5 py-[2px] text-xs font-medium capitalize text-black'
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
      minSize: 100,
      header: 'Author',
      enableSorting: false,

      cell: (info) => info?.getValue().name,
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      enableSorting: false,
      cell: (info) => dayjs().to(dayjs(info.getValue())),
    }),
    columnHelper.accessor('repoLink', {
      header: 'Repo Link',
      enableSorting: false,

      cell: (info) => {
        return (
          <a href={info?.getValue()} target='_blank' rel='noopener noreferrer'>
            <GithubIcon className='w-5 fill-gray-400' />
          </a>
        );
      },
    }),
    columnHelper.accessor('siteLink', {
      header: 'Site Link',
      enableSorting: false,

      cell: (info) => {
        return (
          <a href={info?.getValue()} target='_blank' rel='noopener noreferrer'>
            <ExternalLink className='w-5' />
          </a>
        );
      },
    }),

    columnHelper.display({
      id: 'actions',
      minSize: 100,
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
                setDeleteProjectId(info?.row?.original?.id);
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
    <div className='flex h-full w-full flex-col gap-5 p-7'>
      <p className='text-3xl font-bold'>Projects</p>
      <div className='relative'>
        <input
          type='text'
          placeholder='Search'
          value={search}
          className='h-12 w-full rounded-md border border-gray-300 bg-[#0b0a0a] p-2.5 focus:border-white focus:outline-none'
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
        open={!!deleteProjectId}
        onClose={() => setDeleteProjectId(false)}
        modalClassName='flex flex-col  justify-center p-[20px] h-[full] w-[500px] '
      >
        <p className=' mb-[20px] w-full text-center text-[30px] font-semibold'>
          Are you sure ?
        </p>
        <div className='flex w-full justify-between '>
          <Button
            variant='secondary'
            onClick={() => deleteProjectClick(deleteProjectId)}
          >
            Yes
          </Button>
          <Button onClick={() => setDeleteProjectId(null)}>No</Button>
        </div>
      </Modal>
      <NextSeo
        title='Admin | Projects'
        description='Admin projects page'
        openGraph={{
          type: 'website',
          title: 'Admin | Projects',
          description:
            'Control the users status, project and ban them if necessary',
          site_name: 'Admin projects page',
          images: [
            {
              url: 'https://project-shelf-dev.netlify.app/assets/images/shelf.png',
              width: 200,
              height: 200,
              alt: 'Project Shelf',
            },
          ],
        }}
      />
    </div>
  );
};

export default Projects;
