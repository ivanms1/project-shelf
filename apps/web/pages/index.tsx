import { GetServerSideProps } from 'next';

import { addApolloState, initializeApollo } from 'apollo';
import { GetApprovedProjectsQuery } from 'apollo-hooks';

import Home from '@/pages/Home';

import QUERY_GET_APPROVED_PROJECTS from './project/queryGetAllApprovedProjects.graphql';
import QUERY_GET_CURRENT_USER from '@/hooks/queryGetCurrentUser.graphql';
import { getSession } from 'next-auth/react';

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = initializeApollo();

  try {
    const session = await getSession(context);
    await client.query({
      query: QUERY_GET_CURRENT_USER,
      context: {
        headers: {
          Authorization: session.token,
        },
      },
    });
  } catch (error) {}

  await client.query<GetApprovedProjectsQuery>({
    query: QUERY_GET_APPROVED_PROJECTS,
  });

  return addApolloState(client, {
    props: {},
  });
};
