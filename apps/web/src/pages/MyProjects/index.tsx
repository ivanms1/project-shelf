import React from 'react';

import { useGetMyProjectsQuery } from 'apollo-hooks';

function MyProjects() {
  const { data } = useGetMyProjectsQuery();
  return (
    <div>
      <h1>My projects</h1>
      <div>
        {data?.projects.results?.map((project) => (
          <div key={project.id}>
            <p>{project.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProjects;
