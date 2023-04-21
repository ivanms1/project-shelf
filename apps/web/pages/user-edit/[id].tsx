import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ProjectEdit from '@/pages/ProjectEdit';

export default ProjectEdit;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['project-form', 'common'])),
    },
  };
};
