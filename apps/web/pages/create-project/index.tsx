import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreateProject from '@/pages/CreateProject';

export default CreateProject;

// for language translation
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['create-project', 'nav'])),
      // Will be passed to the page component as props
    },
  };
}
