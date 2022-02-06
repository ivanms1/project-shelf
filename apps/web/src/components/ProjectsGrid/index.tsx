import React from "react";
import type { GetAllProjectsQuery } from "apollo-hooks";

import ProjectCard from "../ProjectCard";

import { StyledProjectsGrid } from "./styles";

interface ProjectsGridProps {
  projects: GetAllProjectsQuery["projects"]["results"];
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  return (
    <StyledProjectsGrid>
      {projects.map((project) => (
        <ProjectCard key={project?.id} project={project} />
      ))}
    </StyledProjectsGrid>
  );
};

export default ProjectsGrid;
