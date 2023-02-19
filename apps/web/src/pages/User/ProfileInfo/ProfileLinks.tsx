import React from 'react';

import DiscordIcon from '@/assets/icons/discord-icon.svg';
import YoutubeIcon from '@/assets/icons/youtube-icon.svg';
import TwitterIcon from '@/assets/icons/twitter-icon.svg';
import InstagramIcon from '@/assets/icons/instagram-icon.svg';
import WorldIcon from '@/assets/icons/world-icon.svg';

function ProfileLinks() {
  const SOCIALS = [
    {
      id: 'website',
      icon: WorldIcon,
      link: 'https://twitter.com/ProjectShelf',
    },
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
    {
      id: 'instagram',
      icon: InstagramIcon,
      link: 'https://www.youtube.com/channel/UCZ2J9QZ7YXZ3Z5Z8ZQZ8Z8Q',
    },
  ];

  return (
    <div className='flex flex-col gap-1'>
      <h5 className='font-bold font-mono text-silver text-[22px]'>Links</h5>

      <div className='flex flex-row gap-3'>
        {SOCIALS.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.id}
              href={social.link}
              target='_blank'
              rel='noreferrer'
            >
              <Icon className='w-8 h-8' />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileLinks;
