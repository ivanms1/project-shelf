import TopCreators from '@/pages/TopCreators';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { GetServerSideProps } from 'next';
import { addApolloState, initializeApollo } from 'apollo';
import {
  GetTopUsersDocument,
  GetTopUsersQuery,
  GetTopUsersQueryVariables,
} from 'apollo-hooks';
import { INTERVALS } from 'const';

export default TopCreators;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  const client = initializeApollo();

  await client.query<GetTopUsersQuery, GetTopUsersQueryVariables>({
    query: GetTopUsersDocument,

    variables: {
      interval: INTERVALS[query.interval as string] ?? '',
    },
  });

  return addApolloState(client, {
    props: {
      ...(await serverSideTranslations(locale, ['top', 'common'])),
    },
  });
};
