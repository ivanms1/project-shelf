import React from 'react';

import { NextSeo } from 'next-seo';

// import { useGetAllProjectsQuery } from 'apollo-hooks';

function Home() {
  // const { data } = useGetAllProjectsQuery();

  return (
    <div className='bg-gray-200'>
      {/* 
      <div>
      {data?.projects.results?.map((project) => (
        <div key={project.id}>
        <p>{project.title}</p>
        </div>
        ))}
      </div> */}

      <NextSeo title='Admin | Home' />
    </div>
  );
}

export default Home;
