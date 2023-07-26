import CreateProject from '@/pages/CreateProject';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { EN_LOCALE } from 'const';

import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { getSession } from 'next-auth/react';

export default CreateProject;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  const session = await getSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/', // Redirect to the home page or an unauthorized access page
        permanent: false,
      },
    };
  }

  // Include translations using serverSideTranslations
  const translations = await serverSideTranslations(
    context.locale || EN_LOCALE,
    ['create-project', 'project-form', 'common']
  );

  return {
    props: {
      ...translations,
    },
  };
};
