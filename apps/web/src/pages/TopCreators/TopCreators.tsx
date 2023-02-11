import useIsMobile from '@/hooks/useIsMobile';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { Tabs } from 'ui';

import CreatorsTable from '@/pages/TopCreators/CreatorsTable';

const YESTERDAY = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
const A_WEEK_AGO = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60;
const A_MONTH_AGO = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60;

const TOP_CREATOR_INTERVALS = {
  0: 'today',
  1: 'this-week',
  2: 'this-month',
  3: 'all-time',
};

const TopCreators = () => {
  const { t } = useTranslation('top');
  const { push, query } = useRouter();

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
      content: (
        <CreatorsTable interval={new Date(A_MONTH_AGO * 1000).toISOString()} />
      ),
    },
  ];

  const handleTabChange = (index: number) => {
    push('/top-creators', {
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
        <h1 className='font-semibold text-5xl'>{t('top-creators')}</h1>
        <p className='text-[22px]'>{t('top-creators-subtitle')}</p>
      </div>
      <Tabs
        tabs={TABS}
        onChange={handleTabChange}
        defaultIndex={currentTab}
        tabPanelClassName='pt-10'
      />
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
