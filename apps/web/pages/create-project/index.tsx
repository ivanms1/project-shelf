import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CreateProject from '@/pages/CreateProject';

export default CreateProject;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'create-project',
        'project-form',
        'common',
      ])),
    },
  };
}
