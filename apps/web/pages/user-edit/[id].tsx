import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import UserEdit from '@/pages/UserEdit';

export default UserEdit;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['user-edit', 'common'])),
    },
  };
};
