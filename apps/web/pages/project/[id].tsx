import Project from '@/pages/Project';
import { addApolloState, initializeApollo } from 'apollo';
import { GetApprovedProjectsQuery, GetProjectQuery } from 'apollo-hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { GetStaticProps } from 'next/types';

import QUERY_GET_PROJECT from './queryGetProject.graphql';
import QUERY_GET_APPROVED_PROJECTS from './queryGetAllApprovedProjects.graphql';

export default Project;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const client = initializeApollo();

    await client.query<GetProjectQuery>({
      query: QUERY_GET_PROJECT,
      variables: {
        id: params?.id,
      },
    });

    return addApolloState(client, {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'project'])),
      },
      revalidate: 60,
    });
  } catch (error) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'project'])),
      },
    };
  }
};

export async function getStaticPaths() {
  const client = initializeApollo();
  const data = await client.query<GetApprovedProjectsQuery>({
    query: QUERY_GET_APPROVED_PROJECTS,
  });

  const paths = data?.data?.projects?.results?.map((p) => ({
    params: { id: p.id },
  }));

  return { paths, fallback: 'blocking' };
}
