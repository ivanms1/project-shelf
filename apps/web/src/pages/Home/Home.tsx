import { useGetApprovedProjectsQuery } from 'apollo-hooks';
import { Button } from 'ui';
import Image from 'next/image';
import { NextSeo } from 'next-seo';

import ProjectsGrid from '@/components/ProjectsGrid';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import {
  contentBoxStyle,
  descriptionStyle,
  gridStyle,
  signinBox,
  titleStyle,
} from './Home.css';

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
    <div>
      {!isLoggedIn && (
        <div className={signinBox}>
          <div className={contentBoxStyle}>
            <h1 className={titleStyle}>Discover the coolest projects</h1>
            <p className={descriptionStyle}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
              esse corporis architecto sequi cupiditate aperiam doloremque
              mollitia natus eveniet. Hic.
            </p>
            <Button>Sign up</Button>
          </div>
          <Image
            src={'/assets/images/shelf.png'}
            alt='project shelf logo'
            height={400}
            width={400}
          />
        </div>
      )}
      <div className={gridStyle}>
        <ProjectsGrid
          loading={loading}
          projects={data?.projects?.results ?? []}
          nextCursor={data?.projects?.nextCursor}
          onRefetch={onRefetch}
        />
      </div>
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
    </div>
  );
}

export default Home;
