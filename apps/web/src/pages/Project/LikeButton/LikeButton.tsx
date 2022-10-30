import {
  ProjectActions,
  useGetProjectLikedStatusQuery,
  useReactToProjectMutation,
} from 'apollo-hooks';
import { Button } from 'ui';

import { StyledLike } from '../styles';

function LikeButton({ projectId }: { projectId: string }) {
  const [reactToProject] = useReactToProjectMutation();

  const { data } = useGetProjectLikedStatusQuery({
    variables: {
      id: projectId,
    },
    skip: !projectId,
    fetchPolicy: 'cache-and-network',
  });

  const handleLike = async () => {
    try {
      await reactToProject({
        variables: {
          input: {
            projectId: projectId,
            action: data?.project?.isLiked
              ? ProjectActions.Dislike
              : ProjectActions.Like,
          },
        },
        optimisticResponse: {
          reactToProject: {
            ...data?.project,
            id: data?.project?.id,
            likesCount: data?.project?.isLiked
              ? data?.project.likesCount - 1
              : data?.project.likesCount + 1,
            isLiked: !data?.project?.isLiked,
          },
        },
      });
    } catch (error) {
      // TODO: Handle error
    }
  };
  return (
    <Button variant='ghost' onClick={handleLike}>
      <StyledLike isliked={data?.project?.isLiked}>
        {data?.project?.isLiked ? 'Liked' : 'Like'}
      </StyledLike>
    </Button>
  );
}

export default LikeButton;
