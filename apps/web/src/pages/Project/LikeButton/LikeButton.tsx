import { useState } from 'react';
import {
  ProjectActions,
  useGetProjectLikedStatusQuery,
  useReactToProjectMutation,
} from 'apollo-hooks';
import classNames from 'classnames';
import { Button } from 'ui';

import useIsLoggedIn from './../../../hooks/useIsLoggedIn';

import { baseLikeButtonStyle, notLikedButtonStyle } from './LikeButton.css';
import LoginModal from '@/components/Modals/LoginModal';

function LikeButton({ projectId }: { projectId: string }) {
  const [reactToProject] = useReactToProjectMutation();
  const { isLoggedIn } = useIsLoggedIn();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
      <Button
        className={classNames(baseLikeButtonStyle, {
          [notLikedButtonStyle]: !isLiked,
        })}
        onClick={handleLike}
      >
        {isLiked ? 'Liked' : 'Like'}
      </Button>
    </>
  );
}

export default LikeButton;
