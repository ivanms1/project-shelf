import UserEdit from '@/pages/UserEdit';
import { EN_LOCALE } from 'const';

import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default UserEdit;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || EN_LOCALE, [
        'user-edit',
        'common',
      ])),
    },
  };
};
