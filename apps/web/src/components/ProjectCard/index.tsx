import React from 'react';
import { Button } from 'ui';
import Link from 'next/link';

import type { GetAllProjectsQuery } from 'apollo-hooks';

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
  project: GetAllProjectsQuery['projects']['results'][0];
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <StyledProjectCard>
      <Link href={`/project/${project.id}`} passHref>
        <ImageContainer>
          <StyledPreview
            alt={project?.title}
            src={project?.preview}
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
          <Button variant='ghost'>
            <StyledHeart isliked={project?.isLiked} />
          </Button>
          <p>{project.likesCount}</p>
        </LikesContainer>
      </InfoBox>
    </StyledProjectCard>
  );
};

export default ProjectCard;
