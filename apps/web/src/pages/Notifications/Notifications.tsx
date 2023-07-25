import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import NotificationsCard from './NotificationsCard';

const Notifications = () => {
  const { t } = useTranslation('notifications');
  return (
    <div className='flex h-full w-full flex-1 flex-col   bg-black py-[100px]'>
      <div className='mx-auto flex h-full w-[900px] flex-col gap-6 '>
        <div className='mb-10  text-5xl text-white'>Notifications</div>
        <NotificationsCard />
        <NotificationsCard />
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

export default Notifications;
