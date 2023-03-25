import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'redaxios';

import About from '@/pages/About';

import { IMGBOT_ID, PROJECT_SHELF_CONTRIBUTORS_API } from 'const';
import { GetStaticProps } from 'next';

export default About;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const res = await axios.get(PROJECT_SHELF_CONTRIBUTORS_API);

  const members = res.data.filter(
    (member: { type: string; id: number }) =>
      member.type === 'User' && member.id !== IMGBOT_ID
  );

  return {
    props: {
      members,
      ...(await serverSideTranslations(locale, ['about', 'common'])),
    },
  };
};
