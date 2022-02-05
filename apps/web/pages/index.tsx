import { GetStaticProps } from 'next';
import { addApolloState, initializeApollo } from 'apollo';
import { GetApprovedProjectsQuery } from 'apollo-hooks';

import Home from '@/pages/Home';

import QUERY_GET_APPROVED_PROJECTS from './project/queryGetAllApprovedProjects.graphql';

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const client = initializeApollo();

    await client.query<GetApprovedProjectsQuery>({
      query: QUERY_GET_APPROVED_PROJECTS,
    });

    return addApolloState(client, {
      props: {},
      revalidate: 60,
    });
  } catch (error) {
    return {
      props: {},
    };
  }
};
