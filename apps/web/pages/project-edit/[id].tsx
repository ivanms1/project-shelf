import ProjectEdit from '@/pages/ProjectEdit';
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default ProjectEdit;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['project-form', 'common'])),
    },
  };
};
