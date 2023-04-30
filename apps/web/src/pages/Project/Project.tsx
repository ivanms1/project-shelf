import React, { useState } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import {
  type Project,
  useDeleteProjectsMutation,
  useGetProjectQuery,
  useReportProjectMutation,
} from 'apollo-hooks';
import { useRouter } from 'next/router';
import { Button, Modal, LoaderOverlay } from 'ui';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

import LikeButton from './LikeButton/LikeButton';

import useIsProjectAuthor from '@/hooks/useIsProjectAuthor';

import WorldIcon from '@/assets/icons/world-icon.svg';
import GithubIcon from '@/assets/icons/github.svg';
import ReportIcon from '@/assets/icons/report.svg';
import ReportModal from '@/components/ReportModal';

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function Project() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const router = useRouter();

  const { t } = useTranslation('project');

  const { data, loading: getProjectQueryLoading } = useGetProjectQuery({
    variables: {
      id: String(router?.query?.id),
    },
    skip: !router?.query?.id,
  });

  const isProjectOwner = useIsProjectAuthor(data?.project?.author?.id);

  const [deleteProject, { loading: deleteProjectLoading }] =
    useDeleteProjectsMutation();

  const [reportProject] = useReportProjectMutation();

  const deleteProjectClick = async (projectId: string) => {
    setOpenDeleteModal(false);

    try {
      const deletedData = await deleteProject({
        variables: {
          projectIds: [projectId],
        },
        update: (cache) => {
          cache.modify({
            fields: {
              getUserProjects(existingProjects, { readField }) {
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
      if (deletedData?.data?.deleteProjects?.length > 0) {
        router.push(`/user/${data?.project?.author?.id}`);
      }
      toast.success(t('project:delete-success'));
    } catch (error) {
      toast.error(t('project:delete-fail'));
    }
  };

  const reportProjectClick = async (projectId: string) => {
    try {
      const reportedProject = await reportProject({
        variables: {
          projectId: projectId,
        },
      });
      if (reportedProject?.data?.reportProject?.id) {
        toast.success(t('project:report-success'));
        setOpenReportModal(false);
      }
    } catch (error) {
      toast.error(error.message);
      setOpenReportModal(false);
    }
  };

  if (getProjectQueryLoading || deleteProjectLoading) {
    return <LoaderOverlay size='lg' />;
  }

  return (
    <>
      <div className='h-[560px] max-lg:h-[320px] relative'>
        <Image
          alt={data?.project?.title}
          src={data?.project?.preview}
          className='object-cover'
          fill
          priority
        />
      </div>
      <div className='flex flex-col bg-black px-28 py-10 max-lg:px-[30px]'>
        <div className=' flex justify-between text-white max-lg:flex-col'>
          <div className='max-w-2xl max-lg: mb-7'>
            <div className='mb-8'>
              <h1 className='text-4xl font-semibold mb-3'>
                {data?.project?.title}
              </h1>
              <p className='text-grey-light'>
                {t('created-at', {
                  date: new Date(data?.project?.createdAt).toLocaleDateString(
                    undefined,
                    DATE_OPTIONS
                  ),
                })}
              </p>
            </div>
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col gap-[10px]'>
                <p className='text-grey-light font-mono'>{t('created-by')}</p>
                <Link href={`/user/${data?.project?.author?.id}`}>
                  <div className='flex gap-3'>
                    <Image
                      className='rounded-full'
                      alt={data?.project?.author?.name}
                      height={24}
                      width={24}
                      src={data?.project?.author?.avatar}
                    />
                    <p>{data?.project?.author?.name}</p>
                  </div>
                </Link>
              </div>
              <div className='flex flex-col gap-[10px]'>
                <p className='text-grey-light font-mono'>{t('description')}</p>
                <p>{data?.project?.description}</p>
              </div>
              <div className='flex flex-col gap-[10px]'>
                <p className='text-grey-light font-mono'>{t('details')}</p>
                <div className='flex flex-col gap-3'>
                  <a
                    href={data?.project?.siteLink}
                    className='flex gap-3'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <WorldIcon className='w-6 h-6' />
                    <p>{t('view-website')}</p>
                  </a>

                  <a
                    className='flex gap-3'
                    href={data?.project?.repoLink}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <GithubIcon className='w-[22px] fill-grey-light' />
                    <p>{t('view-github')}</p>
                  </a>
                </div>
              </div>

              <div className='flex flex-col gap-[20px]'>
                <p className='text-grey-light font-mono'>{t('tags')}</p>
                <div className='flex gap-5 max-lg:flex-col'>
                  {data?.project?.tags.map((tag) => (
                    <p
                      key={tag}
                      className='bg-grey-dark px-[30px] py-3 uppercase w-fit rounded-[20px] font-semibold'
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-start gap-[50px] '>
            <LikeButton project={data?.project} />
          </div>
        </div>

        <div className='flex items-center gap-5 mr-0 ml-auto'>
          {isProjectOwner ? (
            <div className='flex items-center gap-5'>
              <Link href={`/project-edit/${router?.query?.id}`}>
                {t('common:edit')}
              </Link>

              <Button
                variant='ghost'
                className='text-red-500'
                onClick={() => setOpenDeleteModal(true)}
              >
                {t('common:delete')}
              </Button>

              <Modal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                modalClassName='bg-grey-dark flex flex-col justify-center p-12 max-lg:h-[50vh]'
              >
                <p className='mb-10 text-2xl font-semibold'>
                  {t('project:are-you-sure')}
                </p>
                <div className='flex justify-between'>
                  <Button
                    variant='secondary'
                    onClick={() => deleteProjectClick(data?.project?.id)}
                  >
                    {t('common:yes')}
                  </Button>
                  <Button onClick={() => setOpenDeleteModal(false)}>
                    {t('common:no')}
                  </Button>
                </div>
              </Modal>
            </div>
          ) : (
            <button
              onClick={() => setOpenReportModal(true)}
              title='Report Project'
              className='w-[40px] h-[40px] flex items-center justify-center rounded-[10px] bg-grey-dark cursor-pointer'
            >
              <ReportIcon />
            </button>
          )}
        </div>
      </div>

      <NextSeo
        title={data?.project?.title}
        description={data?.project?.description}
        openGraph={{
          type: 'website',
          title: data?.project?.title,
          description: data?.project?.description,
          site_name: 'Project Shelf',
          images: [
            {
              url: data?.project?.preview,
              width: 800,
              height: 600,
              alt: data?.project?.title,
            },
          ],
        }}
      />

      <ReportModal
        isOpen={openReportModal}
        onClose={() => setOpenReportModal(false)}
        reportProjectClick={() => reportProjectClick(data?.project?.id)}
      />
    </>
  );
}

export default Project;
