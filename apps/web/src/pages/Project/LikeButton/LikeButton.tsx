import {
  ProjectActions,
  useGetProjectLikedStatusQuery,
  useReactToProjectMutation,
} from 'apollo-hooks';
import classNames from 'classnames';
import { Button } from 'ui';

import { baseLikeButtonStyle, notLikedButtonStyle } from './LikeButton.css';

function LikeButton({ projectId }: { projectId: string }) {
  const [reactToProject] = useReactToProjectMutation();

  const { data } = useGetProjectLikedStatusQuery({
    variables: {
      id: projectId,
    },
    skip: !projectId,
    fetchPolicy: 'cache-and-network',
  });

  const isLiked = data?.project?.isLiked;

  const handleLike = async () => {
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
  };
  return (
    <Button
      className={classNames(baseLikeButtonStyle, {
        [notLikedButtonStyle]: !isLiked,
      })}
      onClick={handleLike}
    >
      {isLiked ? 'Liked' : 'Like'}
    </Button>
  );
}

export default LikeButton;
