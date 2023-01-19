import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Loader } from 'ui';

import ProjectCard from '../ProjectCard';
import CardSkeleton from '@/components/CardSkeleton';

import type { ProjectCardProps } from '../ProjectCard/ProjectCard';

import {
  loaderContainerStyle,
  loaderStyles,
  projectsGridStyle,
} from './ProjectsGrid.css';

const SKELTON_ARRAY = Array.from({ length: 9 });

interface ProjectsGridProps {
  projects: ProjectCardProps['project'][];
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
      <div className={projectsGridStyle}>
        {loading &&
          projects?.length === 0 &&
          SKELTON_ARRAY.map((_, index) => <CardSkeleton key={index} />)}
        {projects.map((project) => (
          <ProjectCard key={project?.id} project={project} />
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
