import React, { useState } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useDeleteProjectsMutation, useGetProjectQuery } from 'apollo-hooks';
import { useRouter } from 'next/router';
import { Button, Modal, Badge, LoaderOverlay } from 'ui';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';

import LikeButton from './LikeButton/LikeButton';

import useIsProjectAuthor from '@/hooks/useIsProjectAuthor';

import CloseIcon from '@/assets/icons/close.svg';
import ExtLinkIcon from '@/assets/icons/ext-link.svg';
import GithubIcon from '@/assets/icons/github.svg';

import {
  avatarStyle,
  buttonContainerStyle,
  closeButtonStyle,
  closeIconStyle,
  deleteButtonStyle,
  deleteModalStyle,
  deleteModalTitleStyle,
  descriptionContainerStyle,
  descriptionStyle,
  extLinkIconStyle,
  githubIconStyle,
  headerStyle,
  hStackStyle,
  imageContainerStyle,
  imageStyle,
  infoBoxStyle,
  infoTextStyle,
  linkStyle,
  modalStyle,
  nameLinkStyle,
  projectOptionsStyle,
  tagsContainerStyle,
  titleStyle,
} from './Project.css';

function Project() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();

  const { t } = useTranslation();

  const { data, loading: getProjectQueryLoading } = useGetProjectQuery({
    variables: {
      id: String(router?.query?.id),
    },
    skip: !router?.query?.id,
  });

  const isProjectOwner = useIsProjectAuthor(data?.project?.author?.id);

  const [deleteProject, { loading: deleteProjectLoading }] =
    useDeleteProjectsMutation();

  const deleteProjectClick = async (projectId) => {
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
                  results: existingProjects.results.filter((project) => {
                    return readField('id', project) !== projectId;
                  }),
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

  const handleClose = () => {
    router.back();
  };

  if (getProjectQueryLoading || deleteProjectLoading) {
    return <LoaderOverlay size='lg' />;
  }

  return (
    <>
      <Button
        className={closeButtonStyle}
        onClick={handleClose}
        variant='ghost'
      >
        <CloseIcon className={closeIconStyle} />
      </Button>
      <Modal isOpen onClose={handleClose} className={modalStyle}>
        <div className={headerStyle}>
          <div className={infoBoxStyle}>
            <Button
              variant='ghost'
              onClick={() => {
                router.push({
                  pathname: `/user/${data?.project?.author?.id}`,
                });
              }}
            >
              <Image
                className={avatarStyle}
                alt={data?.project?.author?.name}
                height={40}
                width={40}
                src={data?.project?.author?.avatar}
              />
            </Button>

            <div className={infoTextStyle}>
              <h1 className={titleStyle}>{data?.project?.title}</h1>
              <Link
                className={nameLinkStyle}
                href={`/user/${data?.project?.author?.id}`}
              >
                {data?.project?.author?.name}
              </Link>
            </div>
          </div>
          <LikeButton projectId={data?.project?.id} />
        </div>
        <div className={imageContainerStyle}>
          <Image
            alt={data?.project?.title}
            src={data?.project?.preview}
            fill
            priority
            className={imageStyle}
          />
        </div>
        <div className={descriptionContainerStyle}>
          <p className={descriptionStyle}>{data?.project?.description}</p>
          <div className={tagsContainerStyle}>
            {data?.project?.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className={hStackStyle}>
            <Link href={data?.project?.siteLink} passHref>
              <a
                className={linkStyle}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='ghost'>
                  <ExtLinkIcon className={extLinkIconStyle} />
                </Button>
              </a>
            </Link>
            <Link href={data?.project?.repoLink} passHref>
              <a
                className={linkStyle}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='ghost'>
                  <GithubIcon className={githubIconStyle} />
                </Button>
              </a>
            </Link>
          </div>
        </div>
        {isProjectOwner && (
          <div className={projectOptionsStyle}>
            <Link href={`/project-edit/${router?.query?.id}`}>
              <a>
                <Button variant='ghost'>{t('edit')}</Button>
              </a>
            </Link>

            <Button
              variant='ghost'
              className={deleteButtonStyle}
              onClick={() => setOpenDeleteModal(true)}
            >
              {t('common:delete')}
            </Button>

            <Modal
              isOpen={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              className={deleteModalStyle}
            >
              <span className={deleteModalTitleStyle}>
                {t('project:are-you-sure')}
              </span>
              <div className={buttonContainerStyle}>
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
        )}
      </Modal>
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
    </>
  );
}

export default Project;
