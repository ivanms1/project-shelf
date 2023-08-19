import React, { useState } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { type NextPageWithLayout } from 'pages/_app';
import {
  type Project,
  useDeleteProjectsMutation,
  useGetProjectQuery,
  useCreateReportMutation,
} from 'apollo-hooks';
import { useRouter } from 'next/router';
import { Button, Modal, LoaderOverlay } from 'ui';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

import LikeButton from './LikeButton/LikeButton';
import ReportModal from '@/components/ReportModal';
import LoginModal from '@/components/Modals/LoginModal';
import ShareModal from '@/components/ShareModal';
import Layout from '@/components/Layout';

import useIsProjectAuthor from '@/hooks/useIsProjectAuthor';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import WorldIcon from '@/assets/icons/world-icon.svg';
import GithubIcon from '@/assets/icons/github.svg';
import ReportIcon from '@/assets/icons/report.svg';
import ShareIcon from '@/assets/icons/share.svg';

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const Project: NextPageWithLayout = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { isLoggedIn } = useIsLoggedIn();
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

  const [reportProject] = useCreateReportMutation();

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
      if (deletedData?.data?.deleteProjects?.length ?? 0 > 0) {
        router.push(`/user/${data?.project?.author?.id}`);
      }
      toast.success(t('project:delete-success'));
    } catch (error) {
      toast.error(t('project:delete-fail'));
    }
  };

  const reportProjectClick = async (message: string, reason: string) => {
    try {
      const reportedProject = await reportProject({
        variables: {
          projectId: String(router.query.id),
          message: message,
          reason: reason,
        },
      });
      if (reportedProject?.data?.createReport.id) {
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

  if (!data?.project) {
    return null;
  }

  return (
    <>
      <div className='relative h-[560px] max-lg:h-[320px]'>
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
          <div className='max-lg: mb-7 max-w-2xl'>
            <div className='mb-8'>
              <h1 className='mb-3 text-4xl font-semibold'>
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
                <p className='font-mono text-grey-light'>{t('created-by')}</p>
                {data?.project?.author?.avatar && (
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
                )}
              </div>
              <div className='flex flex-col gap-[10px]'>
                <p className='font-mono text-grey-light'>{t('description')}</p>
                <p>{data?.project?.description}</p>
              </div>
              <div className='flex flex-col gap-[10px]'>
                <p className='font-mono text-grey-light'>{t('details')}</p>
                <div className='flex flex-col gap-3'>
                  <a
                    href={data?.project?.siteLink}
                    className='flex gap-3'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <WorldIcon className='h-6 w-6' />
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
                <p className='font-mono text-grey-light'>{t('tags')}</p>
                <div className='flex gap-5 max-lg:flex-col'>
                  {data?.project?.tags.map((tag) => (
                    <p
                      key={tag}
                      className='w-fit rounded-[20px] bg-grey-dark px-[30px] py-3 font-semibold uppercase'
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

        <div className='mr-0 ml-auto flex items-center gap-5'>
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
              onClick={() =>
                isLoggedIn
                  ? setOpenReportModal(true)
                  : setIsLoginModalOpen(true)
              }
              title='Report Project'
              className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] bg-grey-dark'
            >
              <ReportIcon />
            </button>
          )}
          <button
            onClick={() => setIsShareModalOpen(true)}
            title='Share Project'
            className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] bg-grey-dark'
          >
            <ShareIcon />
          </button>
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
          defaultImageHeight: 600,
          defaultImageWidth: 800,
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
        reportProjectClick={reportProjectClick}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <ShareModal
        project={data?.project}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
};

Project.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Project;
