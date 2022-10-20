import { NextSeo } from 'next-seo';

import Members from '@/components/Members';

import { StyledAbout } from './styles';

const About = () => (
  <StyledAbout>
    <NextSeo title='About Project Shelf' />
    <Members />
  </StyledAbout>
);

export default About;
