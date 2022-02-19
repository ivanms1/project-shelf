import React from 'react';
import { Button } from 'ui';
import Link from 'next/link';
import { buildImageUrl } from 'cloudinary-build-url';

import {
  GetAllProjectsQuery,
  Project,
  ProjectAction,
  useReactToProjectMutation,
} from 'apollo-hooks';

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

interface ProjectCardProps {
  project: Partial<Project>;
}

const ProjectCard = ({ project }: Partial<ProjectCardProps>) => {
  const [reactToProject] = useReactToProjectMutation();

  const handleLike = async () => {
    try {
      await reactToProject({
        variables: {
          input: {
            projectId: project.id,
            action: project?.isLiked
              ? ProjectAction.Dislike
              : ProjectAction.Like,
          },
        },
      });
    } catch (error) {
      // TODO: Handle error
    }
  };

  return (
    <StyledProjectCard>
      <Link href={`/project/${project.id}`} passHref>
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
