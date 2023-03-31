import TopProjects from '@/pages/TopProjects';
import { addApolloState, initializeApollo } from 'apollo';
import {
  GetTopProjectsDocument,
  GetTopProjectsQuery,
  GetTopProjectsQueryVariables,
} from 'apollo-hooks';

import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { IntervalLabels, INTERVALS } from 'const';

export default TopProjects;

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

  await client.query<GetTopProjectsQuery, GetTopProjectsQueryVariables>({
    query: GetTopProjectsDocument,

    variables: {
      interval: INTERVALS[query.interval as IntervalLabels] ?? '',
    },
  });

  return addApolloState(client, {
    props: {
      ...(await serverSideTranslations(locale, ['top', 'common'])),
    },
  });
};
