import React from 'react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useGetProjectQuery } from 'apollo-hooks';
import { useRouter } from 'next/router';

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
      <NextSeo
        title={project?.title}
        description={project?.description}
        openGraph={{
          url: `https://project-shelf-dev.netlify.app/project/${project?.id}`,
          title: project?.title,
          description: project?.description,
          images: [
            {
              url: project?.preview,
              width: 800,
              height: 600,
              alt: project?.title,
              type: 'image/jpeg',
            },
          ],
        }}
      />
    </>
  );
}

export default Project;
