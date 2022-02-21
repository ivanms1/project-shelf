import User from '@/pages/User';
import { addApolloState, initializeApollo } from 'apollo';
import { GetUserForPageQuery } from 'apollo-hooks';

import type { GetServerSideProps } from 'next';

import QUERY_GET_USER_FOR_PAGE from './queryGetUserForPage.graphql';
export default User;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const client = initializeApollo();

    await client.query<GetUserForPageQuery>({
      query: QUERY_GET_USER_FOR_PAGE,
      variables: {
        id: params?.id,
      },
    });

    return addApolloState(client, {
      props: {
        id: params?.id,
      },
    });
  } catch (error) {
    return {
      props: {},
    };
  }
};
