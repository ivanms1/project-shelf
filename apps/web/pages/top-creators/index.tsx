import TopCreators from '@/pages/TopCreators';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { GetServerSideProps } from 'next';

export default TopCreators;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['top', 'common'])),
    },
  };
};
