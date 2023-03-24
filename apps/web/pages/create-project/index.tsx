import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

import CreateProject from '@/pages/CreateProject';

export default CreateProject;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'create-project',
        'project-form',
        'common',
      ])),
    },
  };
};
