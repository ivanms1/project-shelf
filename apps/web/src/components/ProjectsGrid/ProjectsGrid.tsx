import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Loader } from 'ui';

import ProjectCard from '../ProjectCard';

import type { ProjectCardProps } from '../ProjectCard/ProjectCard';

import {
  loaderContainerStyle,
  loaderStyles,
  projectsGridStyle,
} from './ProjectsGrid.css';

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
      <div className={projectsGridStyle}>
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
      </div>
      {loading && nextCursor && (
        <div className={loaderContainerStyle}>
          <Loader size='lg' className={loaderStyles} />
        </div>
      )}
    </>
  );
};

export default ProjectsGrid;
