import { GetServerSideProps } from 'next';
import { addApolloState, initializeApollo } from 'apollo';
import { GetApprovedProjectsQuery } from 'apollo-hooks';
import { getSession } from 'next-auth/react';

import Home from '@/pages/Home';

import QUERY_GET_APPROVED_PROJECTS from './project/queryGetAllApprovedProjects.graphql';

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const client = initializeApollo();

    const session = await getSession(ctx);

    await client.query<GetApprovedProjectsQuery>({
      query: QUERY_GET_APPROVED_PROJECTS,
      context: {
        headers: {
          Authorization: session?.token,
        },
      },
    });

    return addApolloState(client, {
      props: {},
    });
  } catch (error) {
    return {
      props: {},
    };
  }
};
