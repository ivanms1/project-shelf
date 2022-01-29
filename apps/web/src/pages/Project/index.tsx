import React from 'react';
import Image from 'next/image';
import { useGetProjectQuery } from 'apollo-hooks';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Project() {
  const { query } = useRouter();

  const { data = {} } = useGetProjectQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const { project } = data;

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <title>{project?.title}</title>
        <meta name='description' content={project?.description}></meta>
        <meta property='og:image' content={project?.preview} key='ogimage' />
      </Head>
      <div>
        <h1>{project?.title}</h1>
        <p>{project?.description}</p>
        <Image
          alt={project?.title}
          src={project?.preview}
          width={200}
          height={150}
        />
      </div>
    </>
  );
}

export default Project;
