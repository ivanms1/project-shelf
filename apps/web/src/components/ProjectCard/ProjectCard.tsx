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
            className='rounded-t-lg object-cover transition ease-in-out duration-300 hover:brightness-75 hover:opacity-100 w-[330px] h-[295px]'
            alt={project?.title}
            src={project?.preview}
            width={330}
            height={295}
          />
        </Link>
      </div>
      <div
        className={classNames(
          'rounded-b-lg text-white p-[20px] flex flex-col justify-between h-[160px]',
          { ['bg-black']: !light },
          { ['bg-grey-dark']: light },
          { ['h-auto']: noLike }
        )}
      >
        <div className='flex flex-col items-start gap-y-3 cursor-pointer'>
          <p className='text-lg font-medium'>{project.title}</p>
          <Link href={`/user/${project?.author?.id}`} passHref>
            <div className='group flex items-center gap-x-2 '>
              {project?.author?.avatar && (
                <Image
                  alt={project?.author.name}
                  src={project?.author?.avatar}
                  width={35}
                  height={35}
                  className='rounded-circle border-2 transition duration-400 ease-in border-transparent group-hover:border-primary'
                />
              )}
              <span className='font-light'>{project?.author?.name}</span>
            </div>
          </Link>
        </div>

        {!noLike && (
          <div className='flex flex-row items-center place-self-end gap-x-2'>
            <p className='w-[10px] mr-2 text-right'>{project.likesCount}</p>
            <Button variant='ghost' onClick={handleLike}>
              <HeartIcon
                className={classNames(
                  'w-[25px] fill-grey-lighter scale-105 transition ease-out duration-100 hover:fill-pink-light active:scale-75',
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
