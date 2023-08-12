import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Loader, Tabs } from 'ui';
import { NextSeo } from 'next-seo';

import useIsMobile from '@/hooks/useIsMobile';

import ProjectsTable from './ProjectsTable';
import Layout from '@/components/Layout';

import { YESTERDAY, A_WEEK_AGO, A_MONTH_AGO } from 'const';

import type { NextPageWithLayout } from 'pages/_app';

const TOP_CREATOR_INTERVALS: Record<number, string> = {
  0: 'today',
  1: 'this-week',
  2: 'this-month',
  3: 'all-time',
};

const TopProjects: NextPageWithLayout = () => {
  const { t } = useTranslation('top');
  const { push, query, isReady } = useRouter();

  const isMobile = useIsMobile();

  const TABS = [
    {
      name: isMobile ? t('1-d') : t('today'),
      content: (
        <ProjectsTable interval={new Date(YESTERDAY * 1000).toISOString()} />
      ),
    },
    {
      name: isMobile ? t('7-d') : t('this-week'),
      content: (
        <ProjectsTable interval={new Date(A_WEEK_AGO * 1000).toISOString()} />
      ),
    },
    {
      name: isMobile ? t('30-d') : t('this-month'),
      content: (
        <ProjectsTable interval={new Date(A_MONTH_AGO * 1000).toISOString()} />
      ),
    },
    {
      name: t('all-time'),
      content: <ProjectsTable />,
    },
  ];

  const handleTabChange = (index: number) => {
    push(`/top-projects?interval=${TOP_CREATOR_INTERVALS[index]}`, {
      query: {
        interval: TOP_CREATOR_INTERVALS[index],
      },
    });
  };

  const currentTab = Object.values(TOP_CREATOR_INTERVALS).findIndex(
    (interval) => interval === query.interval
  );

  return (
    <div className='flex min-h-[100vh] flex-col bg-black px-28 py-20 max-lg:min-h-[70vh] max-lg:px-[30px]'>
      <div className='mb-20 flex flex-col gap-5'>
        <h1 className='text-5xl font-semibold'>{t('top-projects')}</h1>
        <p className='text-[22px]'>{t('top-projects-subtitle')}</p>
      </div>
      {isReady ? (
        <Tabs
          tabs={TABS}
          onChange={handleTabChange}
          defaultIndex={currentTab}
          tabPanelClassName='pt-10'
        />
      ) : (
        <Loader />
      )}
      <NextSeo
        title={t('projects-seo-title')}
        description={t('projects-seo-description')}
        openGraph={{
          type: 'website',
          title: t('projects-seo-title'),
          description: t('projects-seo-title'),
          site_name: t('projects-seo-title'),
          images: [
            {
              url: 'https://www.projectshelf.dev/assets/images/shelf.png',
              width: 200,
              height: 200,
              alt: 'Project Shelf',
            },
          ],
        }}
      />
    </div>
  );
};

TopProjects.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TopProjects;
