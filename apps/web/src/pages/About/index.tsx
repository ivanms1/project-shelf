import Members from '@/components/Members';
import React from 'react';
import { StyledAbout } from './styles';

// tslint:disable-next-line:no-empty-interface
interface AboutProps {}

const About = ({}: AboutProps) => {
  return (
    <>
      <StyledAbout>
        <h2>About Project Shelf</h2>
        <Members />
      </StyledAbout>
    </>
  );
};

export default About;
