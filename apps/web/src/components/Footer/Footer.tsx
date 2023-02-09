import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

import DiscordIcon from '@/assets/icons/discord-icon.svg';
import YoutubeIcon from '@/assets/icons/youtube-icon.svg';
import TwitterIcon from '@/assets/icons/twitter-icon.svg';
import { Button, Input } from 'ui';

const SOCIALS = [
  {
    id: 'twitter',
    icon: TwitterIcon,
    link: 'https://twitter.com/ProjectShelf',
  },
  {
    id: 'discord',
    icon: DiscordIcon,
    link: 'https://discord.gg/2Z8Y4Z8',
  },
  {
    id: 'youtube',
    icon: YoutubeIcon,
    link: 'https://www.youtube.com/channel/UCZ2J9QZ7YXZ3Z5Z8ZQZ8Z8Q',
  },
];

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  const { t } = useTranslation('common');
  return (
    <div className='bg-grey-dark px-28 py-10 text-white max-lg:px-[30px]'>
      <div className='flex flex-row border-b-[1px] border-b-grey-light pb-12 justify-between max-lg:flex-col max-lg:gap-[30px]'>
        <div>
          <p className='text-2xl mb-6 font-bold font-mono'>
            {t('project-shelf')}
          </p>
          <div className='text-silver flex gap-5 flex-col'>
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
                  >
                    <Icon className='w-6 h-6' />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <p className='text-2xl mb-6 font-bold font-mono'>{t('explore')}</p>
          <div className='text-silver flex gap-5 flex-col'>
            <Link href='/search'>{t('search')}</Link>
            <Link href='/rankings'>{t('rankings')}</Link>
          </div>
        </div>
        <div className='flex gap-5 flex-col'>
          <p className='text-2xl font-bold font-mono'>{t('join-digest')}</p>
          <p className='text-silver'>{t('get-promotions')}</p>
          <div className='flex flex-row relative'>
            <Input containerClassName='w-full' />
            <Button className='absolute right-0' size='small'>
              {t('subscribe')}
            </Button>
          </div>
        </div>
      </div>
      <p className='text-silver text-sm mt-5'>
        © {new Date().getFullYear()} Project Shelf. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
