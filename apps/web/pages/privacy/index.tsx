import PrivacyPolicy from '@/pages/PrivacyPolicy';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { EN_LOCALE } from 'const';

import type { GetStaticProps } from 'next';

export default PrivacyPolicy;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || EN_LOCALE, [
        'common',
        'privacy-policy',
      ])),
    },
  };
};
