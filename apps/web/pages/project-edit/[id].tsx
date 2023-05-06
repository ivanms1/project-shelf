import ProjectEdit from '@/pages/ProjectEdit';

import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { EN_LOCALE } from 'const';

export default ProjectEdit;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || EN_LOCALE, [
        'project-form',
        'common',
      ])),
    },
  };
};
