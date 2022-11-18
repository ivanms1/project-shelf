import UserEdit from '@/pages/UserEdit';
import { addApolloState, initializeApollo } from 'apollo';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

import QUERY_GET_USER_FOR_PAGE from '../user/queryGetUserForPage.graphql';

export default UserEdit;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const client = initializeApollo();
    const session = await getSession(ctx);

    await client.query({
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
