import Project from '@/pages/Project';
import { initializeApollo } from 'apollo';
import { GetApprovedProjectsQuery, GetProjectQuery } from 'apollo-hooks';

import type { GetStaticProps } from 'next/types';

import QUERY_GET_PROJECT from './queryGetProject.graphql';
import QUERY_GET_APPROVED_PROJECTS from './queryGetAllApprovedProjects.graphql';

export default Project;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const client = initializeApollo();

    await client.query<GetProjectQuery>({
      query: QUERY_GET_PROJECT,
      variables: {
        id: params?.id,
      },
    });

    return {
      props: {
        initialApolloCache: client.cache.extract(),
      },
    };
  } catch (error) {
    console.log('error', error.message);
    return {
      props: {},
    };
  }
};

export async function getStaticPaths() {
  const client = initializeApollo();
  const data = await client.query<GetApprovedProjectsQuery>({
    query: QUERY_GET_APPROVED_PROJECTS,
  });

  const paths = data?.data?.getApprovedProjects?.results?.map((p) => ({
    params: { id: p.id },
  }));

  return { paths, fallback: 'blocking' };
}
