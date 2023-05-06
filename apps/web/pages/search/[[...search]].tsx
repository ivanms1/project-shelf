import Search from '@/pages/Search';

import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { EN_LOCALE } from 'const';

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || EN_LOCALE, [
        'search',
        'common',
      ])),
    },
  };
};
