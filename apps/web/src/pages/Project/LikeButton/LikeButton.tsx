import { useState } from 'react';
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetProjectLikedStatusQuery,
} from 'apollo-hooks';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { Button } from 'ui';

import LoginModal from '@/components/Modals/LoginModal';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

interface LikeButtonProps {
  project: { id: string; author: { id: string } };
}

function LikeButton({ project }: LikeButtonProps) {
  const [likeProject] = useCreateLikeMutation();
  const [removeLikeProject] = useDeleteLikeMutation();
  const { isLoggedIn } = useIsLoggedIn();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { t } = useTranslation('project');

  const { data } = useGetProjectLikedStatusQuery({
    variables: {
      id: project.id,
    },
    skip: !project.id,
    fetchPolicy: 'cache-and-network',
  });

  const isLiked = data?.project?.isLiked;

  const handleLike = async () => {
    if (isLoggedIn) {
      try {
        if (isLiked) {
          removeLikeProject({
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
                  likesCount: data?.project?.likesCount,
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

          return;
        }
        await likeProject({
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
                likesCount: data?.project?.likesCount + 1,
                isLiked: true,
              },
            },
          },
        });

        return;
      } catch (error) {
        // TODO: Handle error
      }
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <div className='bg-grey-dark rounded-[20px] w-fit p-[30px] h-fit max-xl:mb-8'>
        <p className='text-4xl font-mono text-center'>
          {data?.project?.likesCount}
        </p>
        <p className='text-xs font-mono mb-4 text-center'>{t('likes')}</p>
        <Button
          className={classNames('min-w-[200px]')}
          variant={isLiked ? 'primary' : 'secondary'}
          onClick={handleLike}
        >
          {isLiked ? t('liked') : t('like')}
        </Button>
      </div>
    </>
  );
}

export default LikeButton;
