import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import Members from '@/components/Members';

import { aboutStyles, headerStyle } from './About.css';

const About = () => {
  const { t } = useTranslation('about');

  return (
    <div className={aboutStyles}>
      <p className={headerStyle}>Project Shelf {t('Contributors')}</p>
      <Members />
      <NextSeo title='About Project Shelf' />
    </div>
  );
};

export default About;
