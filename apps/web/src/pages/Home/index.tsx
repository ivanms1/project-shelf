import React from 'react';
import { useGetAllProjectsQuery } from 'apollo-hooks';
import Head from 'next/head';

function Home() {
  const { data } = useGetAllProjectsQuery();

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <title>Project Shelf</title>
      </Head>
      <div>
        <h2>Projects</h2>
        <div>
          {data?.projects.results?.map((project) => (
            <div key={project.id}>
              <p>{project.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
