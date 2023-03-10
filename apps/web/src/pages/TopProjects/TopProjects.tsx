import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Tabs } from 'ui';
import { NextSeo } from 'next-seo';

import useIsMobile from '@/hooks/useIsMobile';

import ProjectsTable from './ProjectsTable';

import { YESTERDAY, A_WEEK_AGO, A_MONTH_AGO } from 'const';

const TOP_CREATOR_INTERVALS = {
  0: 'today',
  1: 'this-week',
  2: 'this-month',
  3: 'all-time',
};

const TopProjects = () => {
  const { t } = useTranslation('top');
  const { push, query } = useRouter();

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
    <div className='bg-black flex flex-col px-28 py-20 max-lg:px-[30px] min-h-[100vh] max-lg:min-h-[70vh]'>
      <div className='flex flex-col gap-5 mb-20'>
        <h1 className='font-semibold text-5xl'>{t('top-projects')}</h1>
        <p className='text-[22px]'>{t('top-projects-subtitle')}</p>
      </div>
      <Tabs
        tabs={TABS}
        onChange={handleTabChange}
        defaultIndex={currentTab}
        tabPanelClassName='pt-10'
      />
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
};

export default TopProjects;
