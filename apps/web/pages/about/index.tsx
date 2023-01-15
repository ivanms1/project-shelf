import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import About from '@/pages/About';

export default About;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['about', 'common'])),
    },
  };
}
