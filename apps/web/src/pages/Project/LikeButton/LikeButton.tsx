import { useState } from 'react';
import {
  ProjectActions,
  useGetProjectLikedStatusQuery,
  useReactToProjectMutation,
} from 'apollo-hooks';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { Button } from 'ui';

import LoginModal from '@/components/Modals/LoginModal';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

function LikeButton({ projectId }: { projectId: string }) {
  const [reactToProject] = useReactToProjectMutation();
  const { isLoggedIn } = useIsLoggedIn();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { t } = useTranslation('project');

  const { data } = useGetProjectLikedStatusQuery({
    variables: {
      id: projectId,
    },
    skip: !projectId,
    fetchPolicy: 'cache-and-network',
  });

  const isLiked = data?.project?.isLiked;

  const handleLike = async () => {
    if (isLoggedIn) {
      try {
        await reactToProject({
          variables: {
            input: {
              projectId: projectId,
              action: isLiked ? ProjectActions.Dislike : ProjectActions.Like,
            },
          },
          optimisticResponse: {
            reactToProject: {
              ...data?.project,
              id: data?.project?.id,
              likesCount: isLiked
                ? data?.project.likesCount - 1
                : data?.project.likesCount + 1,
              isLiked: !isLiked,
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
