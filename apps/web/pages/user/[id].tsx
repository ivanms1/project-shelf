import User from '@/pages/User';
import { addApolloState, initializeApollo } from 'apollo';
import { GetAllUsersDocument, GetUserForPageQuery } from 'apollo-hooks';
import type { GetStaticProps } from 'next';

import QUERY_GET_USER_FOR_PAGE from './queryGetUserForPage.graphql';

export default User;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const client = initializeApollo();

    await client.query<GetUserForPageQuery>({
      query: QUERY_GET_USER_FOR_PAGE,
      variables: {
        id: params?.id,
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

export async function getStaticPaths() {
  const client = initializeApollo();
  const data = await client.query({
    query: GetAllUsersDocument,
  });

  const paths = data?.data?.getUsers?.map((p) => ({
    params: { id: p.id },
  }));

  return { paths, fallback: 'blocking' };
}
