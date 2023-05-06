import TopCreators from '@/pages/TopCreators';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

import { EN_LOCALE } from 'const';

export default TopCreators;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || EN_LOCALE, ['top', 'common'])),
    },
  };
};
