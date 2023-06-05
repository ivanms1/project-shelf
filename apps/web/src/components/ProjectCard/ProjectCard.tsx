import React, { useState } from 'react';
import { Button } from 'ui';
import Link from 'next/link';
import Image from 'next/future/image';
import { useCreateLikeMutation, useDeleteLikeMutation } from 'apollo-hooks';
import classNames from 'classnames';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

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
      avatar?: string | null;
    };
  };
  light?: boolean;
  noLike?: boolean;
}

const ProjectCard = ({ project, light, noLike }: ProjectCardProps) => {
  const [likeProject] = useCreateLikeMutation();
  const [removeLikeProject] = useDeleteLikeMutation();
  const { isLoggedIn } = useIsLoggedIn();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLike = async () => {
    if (isLoggedIn) {
      try {
        if (project.isLiked) {
          return removeLikeProject({
            variables: {
              projectId: project.id,
            },
            optimisticResponse: {
              deleteLike: {
                __typename: 'Like',
                id: 'temp',
                project: {
                  __typename: 'Project',
                  id: project.id,
                  likesCount: project.likesCount,
                  isLiked: false,
                },
              },
            },
            update: (cache) => {
              cache.modify({
                id: cache.identify({
                  __typename: 'Project',
                  id: project.id,
                }),
                fields: {
                  likesCount: (value) => value - 1,
                  isLiked: () => false,
                },
              });
            },
          });
        }
        return likeProject({
          variables: {
            authorId: project.author.id,
            projectId: project.id,
          },
          optimisticResponse: {
            createLike: {
              __typename: 'Like',
              id: 'temp',
              project: {
                __typename: 'Project',
                id: project.id,
                likesCount: project.likesCount + 1,
                isLiked: true,
              },
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
      <div className='flex cursor-pointer'>
        <Link
          href={{
            pathname: `/project/${project.id}`,
          }}
          passHref
        >
          <Image
            className='h-[295px] w-[330px] rounded-t-lg object-cover transition duration-300 ease-in-out hover:opacity-100 hover:brightness-75'
            alt={project?.title}
            src={project?.preview}
            width={330}
            height={295}
          />
        </Link>
      </div>
      <div
        className={classNames(
          'flex h-[160px] flex-col justify-between rounded-b-lg p-[20px] text-white',
          { ['bg-black']: !light },
          { ['bg-grey-dark']: light },
          { ['h-auto']: noLike }
        )}
      >
        <div className='flex cursor-pointer flex-col items-start gap-y-3'>
          <p className='text-lg font-medium'>{project.title}</p>
          <Link href={`/user/${project?.author?.id}`} passHref>
            <div className='group flex items-center gap-x-2 '>
              {project?.author?.avatar && (
                <Image
                  alt={project?.author.name}
                  src={project?.author?.avatar}
                  width={35}
                  height={35}
                  className='duration-400 rounded-circle border-2 border-transparent transition ease-in group-hover:border-primary'
                />
              )}
              <span className='font-light'>{project?.author?.name}</span>
            </div>
          </Link>
        </div>

        {!noLike && (
          <div className='flex flex-row items-center gap-x-2 place-self-end'>
            <p className='mr-2 w-[10px] text-right'>{project.likesCount}</p>
            <Button variant='ghost' onClick={handleLike}>
              <HeartIcon
                className={classNames(
                  'w-[25px] scale-105 fill-grey-lighter transition duration-100 ease-out hover:fill-pink-light active:scale-75',
                  {
                    'fill-pink-light': project?.isLiked,
                  }
                )}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
