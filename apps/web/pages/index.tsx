import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Home from '@/pages/Home';

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale || ctx.defaultLocale;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
};
