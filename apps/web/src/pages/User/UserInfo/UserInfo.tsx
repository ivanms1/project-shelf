import { useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { Button } from 'ui';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import LoginModal from '@/components/Modals/LoginModal';
import {
  UserFollowActions,
  useFollowUserMutation,
  useGetUserForPageQuery,
  useGetUserProjectsQuery,
  useIsUserFollowingQuery,
} from 'apollo-hooks';

import { useTranslation } from 'next-i18next';

import DiscordIcon from '@/assets/icons/discord-icon.svg';
import PlusIcon from '@/assets/icons/plus-icon.svg';
import TwitterIcon from '@/assets/icons/twitter-icon.svg';
import WorldIcon from '@/assets/icons/world-icon.svg';
import kFormatter from '@/helpers/kFormater';

const UserInfo = () => {
  const { query } = useRouter();
  const { isLoggedIn, currentUser } = useIsLoggedIn();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { t } = useTranslation('user');

  const { data } = useGetUserForPageQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const { user } = data || {};

  const { data: projectsData } = useGetUserProjectsQuery({
    variables: {
      userId: String(query?.id),
      input: {
        cursor: null,
      },
    },
    skip: !query?.id,
  });

  const { data: isFollowingData } = useIsUserFollowingQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const [followUser] = useFollowUserMutation();

  const handleFollowUser = async () => {
    if (isLoggedIn) {
      await followUser({
        variables: {
          input: {
            userId: user?.id,
            action: isFollowingData?.user?.isFollowing
              ? UserFollowActions.Unfollow
              : UserFollowActions.Follow,
          },
        },
      });
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const SOCIALS = [
    {
      id: 'website',
      icon: WorldIcon,
      link: user?.website,
    },
    {
      id: 'twitter',
      icon: TwitterIcon,
      link: user?.twitter,
    },
    {
      id: 'discord',
      icon: DiscordIcon,
      link: user?.discord,
    },
  ];

  const arrOfStats = useMemo(
    () => [
      {
        id: '1',
        stats: kFormatter(projectsData?.getUserProjects?.totalCount),
        title: 'Projects',
      },
      {
        id: '2',
        stats: kFormatter(user?.likesReceived),
        title: 'Likes',
      },
      {
        id: '3',
        stats: kFormatter(isFollowingData?.user?.followersCount),
        title: 'Followers',
      },
    ],
    [
      projectsData?.getUserProjects?.totalCount,
      user?.likesReceived,
      isFollowingData?.user?.followersCount,
    ]
  );

  return (
    <div className='mt-5'>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <div className='mt-10 flex flex-col justify-between gap-6 md:gap-5 lg:flex-row lg:items-center'>
        <h4 className='text-[28px] font-bold md:text-4xl'>
          {data?.user?.name}
        </h4>

        <Button
          variant='primary'
          onClick={handleFollowUser}
          disabled={user?.id === currentUser?.id}
        >
          <div className='flex flex-row items-center justify-center gap-3'>
            <PlusIcon />
            {t(isFollowingData?.user?.isFollowing ? 'unfollow' : 'follow')}
          </div>
        </Button>
      </div>

      <div className='mt-5 flex flex-col gap-10'>
        <div className='mt-5 flex flex-row gap-20 lg:mt-0'>
          {arrOfStats.map(({ id, stats, title }) => (
            <div key={id} className='flex flex-col gap-0'>
              <h4 className='text-[28px] font-bold'>{stats}</h4>
              <p className='text-[22px] font-normal'>{title}</p>
            </div>
          ))}
        </div>

        {data?.user?.location && (
          <div>
            <h5 className='font-mono text-[22px] font-bold  text-silver'>
              {t('location')}
            </h5>
            <p className='mt-1 text-[22px]'>{data?.user?.location}</p>
          </div>
        )}

        {data?.user?.bio && (
          <div>
            <h5 className='font-mono text-[22px] font-bold  text-silver'>
              {t('bio')}
            </h5>
            <p className='mt-1 text-[22px]'>{data?.user?.bio}</p>
          </div>
        )}

        <div className='flex flex-row gap-3'>
          {SOCIALS.map((social) => {
            const Icon = social.icon;

            if (!social.link) {
              return null;
            }

            return (
              <a
                key={social.id}
                href={social.link}
                target='_blank'
                rel='noreferrer'
              >
                <Icon className='h-8 w-8' />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
