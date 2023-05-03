import useIsMobile from '@/hooks/useIsMobile';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { Loader, Tabs } from 'ui';

import CreatorsTable from '@/pages/TopCreators/CreatorsTable';

const YESTERDAY = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
const A_WEEK_AGO = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
const A_MONTH_AGO = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

const TOP_CREATOR_INTERVALS: Record<number, string> = {
  0: 'today',
  1: 'this-week',
  2: 'this-month',
  3: 'all-time',
};

const TopCreators = () => {
  const { t } = useTranslation('top');
  const { push, query, isReady } = useRouter();

  const isMobile = useIsMobile();

  const TABS = [
    {
      name: isMobile ? t('1-d') : t('today'),
      content: (
        <CreatorsTable interval={new Date(YESTERDAY * 1000).toISOString()} />
      ),
    },
    {
      name: isMobile ? t('7-d') : t('this-week'),
      content: (
        <CreatorsTable interval={new Date(A_WEEK_AGO * 1000).toISOString()} />
      ),
    },
    {
      name: isMobile ? t('30-d') : t('this-month'),
      content: (
        <CreatorsTable interval={new Date(A_MONTH_AGO * 1000).toISOString()} />
      ),
    },
    {
      name: t('all-time'),
      content: <CreatorsTable />,
    },
  ];

  const handleTabChange = (index: number) => {
    push(
      `/top-creators/?interval=${TOP_CREATOR_INTERVALS[index]}`,
      {
        query: {
          interval: TOP_CREATOR_INTERVALS[index],
        },
      },
      {
        shallow: true,
      }
    );
  };

  const currentTab = Object.values(TOP_CREATOR_INTERVALS).findIndex(
    (interval) => interval === query.interval
  );

  return (
    <div className='flex min-h-[100vh] flex-col bg-black px-28 py-20 max-lg:min-h-[70vh] max-lg:px-[30px]'>
      <div className='mb-20 flex flex-col gap-5'>
        <h1 className='text-5xl font-semibold'>{t('top-creators')}</h1>
        <p className='text-[22px]'>{t('top-creators-subtitle')}</p>
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
        title={t('creators-seo-title')}
        description={t('creators-seo-description')}
        openGraph={{
          type: 'website',
          title: t('creators-seo-title'),
          description: t('creators-seo-title'),
          site_name: t('creators-seo-title'),
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

export default TopCreators;
