import React from 'react';
import { useGetApprovedProjectsQuery } from 'apollo-hooks';
import { Button } from 'ui';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import ProjectsGrid from '@/components/ProjectsGrid';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import {
  GridContainer,
  StyledContentBox,
  StyledHome,
  StyledSignInBox,
} from './styles';

function Home() {
  const { data } = useGetApprovedProjectsQuery();

  const { isLoggedIn } = useIsLoggedIn();

  return (
    <StyledHome>
      {!isLoggedIn && (
        <StyledSignInBox>
          <StyledContentBox>
            <h1>Discover the coolest projects</h1>
            <p>
              Ever wanted to showcase your project and get feedback from professional developers around the world? You have come to the right place. It does not matter
              if you have just started programming or done it for years, we want to see what you have created. Sign up now.
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
      <NextSeo
        title='Welcome to Project Shelf'
        description='Discover the coolest projects'
        openGraph={{
          type: 'website',
          title: 'Welcome to Project Shelf',
          description: 'Discover the coolest projects',
          site_name: 'Project Shelf',
          images: [
            {
              url: 'https://project-shelf-dev.netlify.app/assets/images/shelf.png',
              width: 200,
              height: 200,
              alt: 'Project Shelf',
            },
          ],
        }}
      />
    </StyledHome>
  );
}

export default Home;
