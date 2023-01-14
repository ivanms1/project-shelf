import React, { useState } from 'react';
import { Button } from 'ui';
import Link from 'next/link';
import Image from 'next/image';

import useIsLoggedIn from './../../hooks/useIsLoggedIn';

import { ProjectActions, useReactToProjectMutation } from 'apollo-hooks';

import HeartIcon from '@/assets/icons/heart.svg';

import {
  authorBoxStyle,
  authorNameStyle,
  avatarStyle,
  heartStyleVariants,
  imageContainerStyle,
  infoBoxStyle,
  likeCountStyle,
  likesContainerStyle,
  previewStyle,
  projectCardStyle,
  titleStyle,
} from './ProjectCard.css';

import LikeButtonModal from '../Modals/LikeButtonModal/LikeButtonModal';

export interface ProjectCardProps {
  project: {
    id: string;
    isLiked?: boolean;
    likesCount: number;
    title: string;
    preview: string;
    author: {
      id: string;
      name: string;
      avatar?: string;
    };
  };
  previous?: string;
}

const ProjectCard = ({ project, previous }: ProjectCardProps) => {
  const [reactToProject] = useReactToProjectMutation();
  const { isLoggedIn } = useIsLoggedIn();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLike = async () => {
    if (isLoggedIn) {
      try {
        await reactToProject({
          variables: {
            input: {
              projectId: project.id,
              action: project?.isLiked
                ? ProjectActions.Dislike
                : ProjectActions.Like,
            },
          },
          optimisticResponse: {
            reactToProject: {
              ...project,
              id: project?.id,
              likesCount: project?.isLiked
                ? project.likesCount - 1
                : project.likesCount + 1,
              isLiked: !project?.isLiked,
            },
          },
        });
      } catch (error) {
        // TODO: Handle error
      }
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className={projectCardStyle}>
      <LikeButtonModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <Link
        href={{
          pathname: `/project/${project.id}`,
          query: { previous: previous },
        }}
        passHref
      >
        <a className={imageContainerStyle}>
          <Image
            className={previewStyle}
            alt={project?.title}
            src={project?.preview}
            width={330}
            height={247}
          />
          <p className={titleStyle}>{project.title}</p>
        </a>
      </Link>
      <div className={infoBoxStyle}>
        <Link href={`/user/${project?.author?.id}`} passHref>
          <div className={authorBoxStyle}>
            {project?.author?.avatar && (
              <Image
                className={avatarStyle}
                alt={project?.author.name}
                src={project?.author?.avatar}
                width={25}
                height={25}
              />
            )}
            <span className={authorNameStyle}>{project?.author?.name}</span>
          </div>
        </Link>

        <div className={likesContainerStyle}>
          <Button variant='ghost' onClick={handleLike}>
            <HeartIcon
              className={
                heartStyleVariants[project?.isLiked ? 'liked' : 'unliked']
              }
            />
          </Button>
          <p className={likeCountStyle}>{project.likesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
