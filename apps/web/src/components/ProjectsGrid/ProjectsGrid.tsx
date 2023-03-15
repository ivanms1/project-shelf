import React from 'react';
import { Waypoint } from 'react-waypoint';
import { Loader } from 'ui';

import ProjectCard from '../ProjectCard';
import CardSkeleton from '@/components/CardSkeleton';

import type { ProjectCardProps } from '../ProjectCard/ProjectCard';

const SKELETON_ARRAY = Array.from({ length: 9 });

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
      <div className='grid gap-[30px] grid-cols-[repeat(auto-fit,_minmax(330px,_1fr))] max-lg:justify-items-center'>
        {loading &&
          projects?.length === 0 &&
          SKELETON_ARRAY.map((_, index) => <CardSkeleton key={index} />)}
        {projects?.map((project) => (
          <ProjectCard key={project?.id} project={project} />
        ))}
        {!loading && nextCursor && (
          <Waypoint onEnter={onRefetch} bottomOffset='-50%' />
        )}
      </div>
      {loading && nextCursor && (
        <div className='flex justify-center items-center'>
          <Loader size='lg' />
        </div>
      )}
    </>
  );
};

export default ProjectsGrid;
