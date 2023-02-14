import User from '@/pages/User';
import { addApolloState, initializeApollo } from 'apollo';
import { GetAllUsersDocument, GetUserForPageQuery } from 'apollo-hooks';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import QUERY_GET_USER_FOR_PAGE from './queryGetUserForPage.graphql';

export default User;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
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
        ...(await serverSideTranslations(locale, ['user', 'common'])),
      },
    });
  } catch (error) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['user', 'common'])),
      },
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
