import About from '@/pages/About';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'redaxios';

import { EN_LOCALE, IMGBOT_ID, PROJECT_SHELF_CONTRIBUTORS_API } from 'const';
import type { GetStaticProps } from 'next';

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
      ...(await serverSideTranslations(locale || EN_LOCALE, [
        'about',
        'common',
      ])),
    },
  };
};
