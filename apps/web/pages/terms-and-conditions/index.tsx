import TermsAndConditions from '@/pages/TermsAndConditions';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { EN_LOCALE } from 'const';

import type { GetStaticProps } from 'next';

export default TermsAndConditions;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || EN_LOCALE, [
        'common',
        'terms-and-conditions',
      ])),
    },
  };
};
