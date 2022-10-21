import { NextSeo } from 'next-seo';

import Members from '@/components/Members';

import { StyledAbout } from './styles';

const About = () => (
  <StyledAbout>
    <Members />
    <NextSeo title='About Project Shelf' />
  </StyledAbout>
);

export default About;
