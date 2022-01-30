import React from 'react';
import { useGetAllProjectsQuery } from 'apollo-hooks';
import { Button } from 'ui';
import Image from 'next/image';

import ProjectsGrid from '@/components/ProjectsGrid';

import useIsLoggedIn from 'hooks/useIsLoggedIn';

import {
  GridContainer,
  StyledContentBox,
  StyledHome,
  StyledSignInBox,
} from './styles';

function Home() {
  const { data } = useGetAllProjectsQuery();

  const isLoggedIn = useIsLoggedIn();

  return (
    <StyledHome>
      {!isLoggedIn && (
        <StyledSignInBox>
          <StyledContentBox>
            <h1>Discover the coolest projects</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
              esse corporis architecto sequi cupiditate aperiam doloremque
              mollitia natus eveniet. Hic.
            </p>
            <Button>Sign up</Button>
          </StyledContentBox>
          <Image
            src={'/assets/images/shelf.png'}
            alt='project shelf logo'
            height={400}
            width={400}
          />
        </StyledSignInBox>
      )}
      <GridContainer>
        <ProjectsGrid projects={data?.projects?.results ?? []} />
      </GridContainer>
    </StyledHome>
  );
}

export default Home;
