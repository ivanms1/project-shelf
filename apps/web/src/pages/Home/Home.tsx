import { useGetApprovedProjectsQuery } from 'apollo-hooks';
import { Button } from 'ui';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { signIn } from 'next-auth/react';

import ProjectsGrid from '@/components/ProjectsGrid';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import {
  contentBoxStyle,
  descriptionStyle,
  gridStyle,
  signinBox,
  titleStyle,
} from './Home.css';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

function Home() {
  const { data, loading, fetchMore } = useGetApprovedProjectsQuery();
  const { t } = useTranslation('home');

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
      <div className={signinBox}>
        <div className={contentBoxStyle}>
          <h1 className={titleStyle}>{t('title')}</h1>
          <p className={descriptionStyle}>{t('description')}</p>
          {isLoggedIn ? (
            <Link href='/create-project' passHref>
              <Button>{t('common:add-project')}</Button>
            </Link>
          ) : (
            <Button onClick={() => signIn('github')}>
              {t('common:login')}
            </Button>
          )}
        </div>
        <Image
          src={'/assets/images/shelf.png'}
          alt='project shelf logo'
          height={400}
          width={400}
        />
      </div>
      <div className={gridStyle}>
        <ProjectsGrid
          loading={loading}
          projects={data?.projects?.results ?? []}
          nextCursor={data?.projects?.nextCursor}
          onRefetch={onRefetch}
        />
      </div>
      <NextSeo
        title={t('seo-title')}
        description={t('description')}
        openGraph={{
          type: 'website',
          title: t('title'),
          description: t('description'),
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
