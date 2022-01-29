import Project from '@/pages/Project';
import { initializeApollo } from 'apollo';
import { GetProjectQuery } from 'apollo-hooks';
import { getSession } from 'next-auth/react';

import type { GetServerSideProps } from 'next/types';

import QUERY_GET_PROJECT from './queryGetProject.graphql';

export default Project;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const client = initializeApollo();
    const { token } = await getSession({ req: context.req });

    await client.query<GetProjectQuery>({
      query: QUERY_GET_PROJECT,
      context: { headers: { Authorization: token } },
      variables: {
        id: context?.params?.id,
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
