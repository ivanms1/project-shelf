import User from '@/pages/User';
import { addApolloState, initializeApollo } from 'apollo';
import { GetUserForPageQuery } from 'apollo-hooks';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import QUERY_GET_USER_FOR_PAGE from './queryGetUserForPage.graphql';

export default User;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const client = initializeApollo();

    const session = await getSession(ctx);

    await client.query<GetUserForPageQuery>({
      query: QUERY_GET_USER_FOR_PAGE,
      variables: {
        id: ctx.params?.id,
      },
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
