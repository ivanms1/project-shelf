import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import { useGetProjectQuery } from 'apollo-hooks';

import CreateProject from '../CreateProject';

const ProjectEdit = () => {
  const { query } = useRouter();

  const { data } = useGetProjectQuery({
    variables: {
      id: String(query.id),
    },
    skip: !query.id,
  });

  return (
    <>
      <CreateProject projectDetails={data?.project} />
      <NextSeo
        title={`Edit Project | ${data?.project.title}`}
        description={data?.project?.description}
      />
    </>
  );
};

export default ProjectEdit;
