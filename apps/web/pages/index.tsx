import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { addApolloState, initializeApollo } from 'apollo';

import Home from '@/pages/Home';

import QUERY_GET_TOP_PROJECTS_FOR_HOME_PAGE from './queryGetTopProjectsForHomePage.graphql';
import QUERY_GET_TOP_CREATORS_FOR_HOME_PAGE from './queryGetTopCreatorsForHomePage.graphql';

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale || ctx.defaultLocale;
  try {
    const client = initializeApollo();

    await Promise.all(
      [
        QUERY_GET_TOP_PROJECTS_FOR_HOME_PAGE,
        QUERY_GET_TOP_CREATORS_FOR_HOME_PAGE,
      ].map((query) => {
        return client.query({
          query,
        });
      })
    );

    return addApolloState(client, {
      props: {
        ...(await serverSideTranslations(locale, ['home', 'common'])),
      },
    });
  } catch {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['home', 'common'])),
      },
    };
  }
};
