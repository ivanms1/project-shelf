import React from 'react';
import type { Project } from 'apollo-hooks';
import { Waypoint } from 'react-waypoint';

import ProjectCard from '../ProjectCard';

import { LoaderContainer, loaderStyles, StyledProjectsGrid } from './styles';
import { Loader } from 'ui';

interface ProjectsGridProps {
  projects: Partial<Project>[];
  onRefetch: () => void;
  loading: boolean;
  nextCursor: string | null;
}

const ProjectsGrid = ({
  projects,
  loading,
  onRefetch,
  nextCursor,
}: ProjectsGridProps) => {
  return (
    <>
      <StyledProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project?.id} project={project} />
        ))}
        {!loading && nextCursor && (
          <Waypoint onEnter={onRefetch} bottomOffset='-50%' />
        )}
      </StyledProjectsGrid>
      {loading && nextCursor && (
        <LoaderContainer>
          <Loader size='lg' css={loaderStyles} />
        </LoaderContainer>
      )}
    </>
  );
};

export default ProjectsGrid;
