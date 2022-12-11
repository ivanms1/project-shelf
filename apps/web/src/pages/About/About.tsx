import { NextSeo } from 'next-seo';

import Members from '@/components/Members';

import { aboutStyles } from './About.css';

const About = () => (
  <div className={aboutStyles}>
    <Members />
    <NextSeo title='About Project Shelf' />
  </div>
);

export default About;
