import React from 'react';
import { Waypoint } from 'react-waypoint';

import ProjectCard, { ProjectCardProps } from '../ProjectCard';

import { LoaderContainer, loaderStyles, StyledProjectsGrid } from './styles';
import { Loader } from 'ui';

interface ProjectsGridProps {
  projects: ProjectCardProps['project'][];
  onRefetch: () => void;
  loading: boolean;
  nextCursor: string | null;
  previous?: string;
}

const ProjectsGrid = ({
  projects,
  loading,
  onRefetch,
  nextCursor,
  previous = '/',
}: ProjectsGridProps) => {
  return (
    <>
      <StyledProjectsGrid>
        {projects.map((project) => (
          <ProjectCard
            key={project?.id}
            project={project}
            previous={previous}
          />
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
