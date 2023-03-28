import React, { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Table from '../../components/Table';
import classNames from 'classnames';

import GithubIcon from '@/public/assets/github.svg';
import ExternalLink from '@/public/assets/external-link.svg';
import { Button, Modal } from 'ui';

import {
  useDeleteProjectsMutation,
  useGetProjectsAdminQuery,
} from 'apollo-hooks';

function Index() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data } = useGetProjectsAdminQuery();

  const [deleteProject] = useDeleteProjectsMutation();

  const deleteProjectClick = async (projectId) => {
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
                  results: existingProjects.results.filter((project) => {
                    return readField('id', project) !== projectId;
                  }),
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

  const columns = useMemo(
    () => [
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
                  width={100}
                  height={100}
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
        maxWidth: '100px',
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
              <Link href={info?.row?.original?.repoLink} passHref>
                <a target='_blank' rel='noopener noreferrer'>
                  <i className='w-[20px] h-[20px] flex justify-center items-center '>
                    <GithubIcon className='fill-[#a3aed0]' />
                  </i>
                </a>
              </Link>

              <Link href={info?.row?.original?.siteLink} passHref>
                <a target='_blank' rel='noopener noreferrer'>
                  <i className='w-[20px] h-[20px] flex justify-center items-center'>
                    <ExternalLink />
                  </i>
                </a>
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className='w-full h-full bg-white p-[30px] flex flex-col'>
      <p className='text-gray-900 text-3xl font-bold'>Projects</p>

      <div className='flex w-full h-[600px]'>
        <Table tableData={data?.getProjectsAdmin?.results} columns={columns} />
      </div>

      <NextSeo title='Projects' />
    </div>
  );
}

export default Index;
