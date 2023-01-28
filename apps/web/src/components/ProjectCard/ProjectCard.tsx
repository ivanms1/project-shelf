import React, { useState } from 'react';
import { Button } from 'ui';
import Link from 'next/link';
import Image from 'next/image';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import { ProjectActions, useReactToProjectMutation } from 'apollo-hooks';

import classNames from 'classnames';

import HeartIcon from '@/assets/icons/heart.svg';

import LoginModal from '../Modals/LoginModal';

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
}

const ProjectCard = ({ project }: ProjectCardProps) => {
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
    <div className='w-[330px]'>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <Link
        href={{
          pathname: `/project/${project.id}`,
        }}
        passHref
      >
        <a className='group/imageContainer w-[330px] h-[247px] relative'>
          <Image
            className='object-cover rounded-md transition ease-in-out duration-300 hover:brightness-75 hover:opacity-100 hover:p-1 '
            alt={project?.title}
            src={project?.preview}
            width={330}
            height={247}
          />
          <p className='invisible text-white p-4 absolute bottom-0 transition ease-in-out duration-90 group-hover/imageContainer:visible'>
            {project.title}
          </p>
        </a>
      </Link>
      <div className='flex flex-row justify-between items-center mt-1'>
        <Link href={`/user/${project?.author?.id}`} passHref>
          <div className='flex flex-row items-center gap-x-2'>
            {project?.author?.avatar && (
              <Image
                className='rounded-circle'
                alt={project?.author.name}
                src={project?.author?.avatar}
                width={25}
                height={25}
              />
            )}
            <span>{project?.author?.name}</span>
          </div>
        </Link>

        <div className='flex flex-row items-center justify-between '>
          <Button variant='ghost' onClick={handleLike}>
            <HeartIcon
              className={classNames(
                'w-[15px] fill-grey-lighter scale-105 transition ease-in-out duration-200 hover:fill-pink-light active:scale-75',
                {
                  'fill-pink-light': project?.isLiked,
                }
              )}
            />
          </Button>
          <p className='w-[10px] ml-2 text-right'>{project.likesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
