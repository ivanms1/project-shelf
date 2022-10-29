import React from 'react';
import { Button } from 'ui';
import Link from 'next/link';
import { buildImageUrl } from 'cloudinary-build-url';

import { ProjectActions, useReactToProjectMutation } from 'apollo-hooks';

import {
  AuthorBox,
  ImageContainer,
  InfoBox,
  LikesContainer,
  StyledAvatar,
  StyledHeart,
  StyledPreview,
  StyledProjectCard,
} from './styles';

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

  const handleLike = async () => {
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
  };

  return (
    <StyledProjectCard>
      <Link
        href={{
          pathname: `/project/${project.id}`,
          query: { previous: previous },
        }}
        passHref
      >
        <ImageContainer>
          <StyledPreview
            alt={project?.title}
            src={buildImageUrl(project?.preview, {
              transformations: {
                resize: {
                  type: 'scale',
                  height: 247,
                  width: 330,
                },
              },
            })}
            width={330}
            height={247}
          />
          <p>{project.title}</p>
        </ImageContainer>
      </Link>
      <InfoBox>
        <Link href={`/user/${project?.author?.id}`} passHref>
          <AuthorBox>
            {project?.author?.avatar && (
              <StyledAvatar
                alt={project?.author.name}
                src={project?.author?.avatar}
                width={25}
                height={25}
              />
            )}
            <span>{project?.author?.name}</span>
          </AuthorBox>
        </Link>

        <LikesContainer>
          <Button variant='ghost' onClick={handleLike}>
            <StyledHeart isliked={project?.isLiked} />
          </Button>
          <p>{project.likesCount}</p>
        </LikesContainer>
      </InfoBox>
    </StyledProjectCard>
  );
};

export default ProjectCard;
