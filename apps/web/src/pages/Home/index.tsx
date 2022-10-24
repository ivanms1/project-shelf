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
  const { data, loading, fetchMore } = useGetApprovedProjectsQuery();

  const { isLoggedIn } = useIsLoggedIn();

  const onRefetch = () => {
    if (!data?.projects?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        input: {
          cursor: data?.projects?.nextCursor,
        },
      },
    });
  };

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
        <ProjectsGrid
          loading={loading}
          projects={data?.projects?.results ?? []}
          nextCursor={data?.projects?.nextCursor}
          onRefetch={onRefetch}
        />
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
