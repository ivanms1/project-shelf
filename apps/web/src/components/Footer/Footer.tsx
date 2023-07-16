import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

import DiscordIcon from '@/assets/icons/discord-icon.svg';
import InstagramIcon from '@/assets/icons/instagram-icon.svg';
import TwitterIcon from '@/assets/icons/twitter-icon.svg';
import { Button, Input } from 'ui';

const SOCIALS = [
  {
    id: 'twitter',
    icon: TwitterIcon,
    link: 'https://twitter.com/project_shelf',
  },
  {
    id: 'discord',
    icon: DiscordIcon,
    link: 'https://discord.gg/2Z8Y4Z8',
  },
  {
    id: 'instagram',
    icon: InstagramIcon,
    link: 'https://www.instagram.com/project.shelf',
  },
];

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <div className='bg-grey-dark px-28 py-10 text-white max-lg:px-[30px]'>
      <div className='flex flex-row justify-between border-b-[1px] border-b-grey-light pb-12 max-lg:flex-col max-lg:gap-[30px]'>
        <div>
          <p className='mb-6 font-mono text-2xl font-bold'>
            {t('project-shelf')}
          </p>
          <div className='flex flex-col gap-5 text-silver'>
            <p>{t('discover-projects')}</p>
            <p>{t('join-community')}</p>
            <div className='flex flex-row gap-[10px]'>
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.link}
                    target='_blank'
                    rel='noreferrer'
                    className='hover:text-red-500'
                  >
                    <Icon className='h-6 w-6  ' />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <p className='mb-6 font-mono text-2xl font-bold'>{t('explore')}</p>
          <div className='flex flex-col gap-5 text-silver'>
            <Link href='/about' className='hover:text-primary'>
              {t('about')}
            </Link>
            <Link href='/search' className='hover:text-primary'>
              {t('search')}
            </Link>

            <Link href='/privacy' className='hover:text-primary'>
              {t('privacy-policy')}
            </Link>
            <Link href='/terms-and-conditions' className='hover:text-primary'>
              {t('terms-and-conditions')}
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='font-mono text-2xl font-bold'>{t('join-digest')}</p>
          <p className='text-silver'>{t('get-promotions')}</p>
          <div className='relative flex flex-row'>
            <Input containerClassName='w-full' />
            <Button className='absolute right-0' size='small' noAnimation>
              {t('subscribe')}
            </Button>
          </div>
        </div>
      </div>
      <p className='mt-5 text-sm text-silver'>
        {t('all-rights-reserved', { year: new Date().getFullYear() })}
      </p>
    </div>
  );
};

export default Footer;
