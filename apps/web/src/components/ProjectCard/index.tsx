import React from 'react';

import type { GetAllProjectsQuery } from 'apollo-hooks';

import {
  ImageContainer,
  InfoBox,
  LikesContainer,
  StyledAvatar,
  StyledHeart,
  StyledPreview,
  StyledProjectCard,
} from './styles';
import { Button } from 'ui';
import Link from 'next/link';

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
            src={project.preview}
            width={330}
            height={247}
          />
          <p>{project.title}</p>
        </ImageContainer>
      </Link>
      <InfoBox>
        {project?.author?.avatar && (
          <StyledAvatar
            alt={project?.author.name}
            src={project?.author?.avatar}
            width={10}
            height={10}
          />
        )}
        <p>{project?.author?.name}</p>
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
