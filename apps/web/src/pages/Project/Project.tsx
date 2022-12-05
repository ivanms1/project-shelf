import React from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useGetProjectQuery } from 'apollo-hooks';
import { useRouter } from 'next/router';
import { Button, Modal, Badge } from 'ui';

import LikeButton from './LikeButton/LikeButton';

import {
  avatarStyle,
  closeButtonStyle,
  closeIconStyle,
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
  tagsContainerStyle,
  titleStyle,
} from './Project.css';

import CloseIcon from '@/assets/icons/close.svg';
import ExtLinkIcon from '@/assets/icons/ext-link.svg';
import GithubIcon from '@/assets/icons/github.svg';

function Project() {
  const router = useRouter();
  const { query } = useRouter();

  const { data } = useGetProjectQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const handleClose = () => {
    router.back();
  };

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
