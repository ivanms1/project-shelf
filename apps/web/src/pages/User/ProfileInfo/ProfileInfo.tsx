import React, { useState } from 'react';

import { useRouter } from 'next/router';

import { Button } from 'ui';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import {
  UserFollowActions,
  useFollowUserMutation,
  useGetUserForPageQuery,
  useGetUserProjectsQuery,
  useIsUserFollowingQuery,
} from 'apollo-hooks';
import { useTranslation } from 'react-i18next';
import LoginModal from '@/components/Modals/LoginModal';

import DiscordIcon from '@/assets/icons/discord-icon.svg';
import YoutubeIcon from '@/assets/icons/youtube-icon.svg';
import TwitterIcon from '@/assets/icons/twitter-icon.svg';
import PlusIcon from '@/assets/icons/plus-icon.svg';
import ProfileStats from './ProfileStats';
import ProfileLinks from './ProfileLinks';

interface YourProfileProps {}

const ProfileInfo = ({}: YourProfileProps) => {
  const { query } = useRouter();
  const { isLoggedIn } = useIsLoggedIn();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { t } = useTranslation('user');

  const { data } = useGetUserForPageQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const {
    data: projectsData,
    fetchMore,
    loading,
  } = useGetUserProjectsQuery({
    variables: {
      userId: data?.user?.id,
      input: {
        cursor: null,
      },
    },
    skip: !data?.user?.id,
  });

  const { data: isFollowingData } = useIsUserFollowingQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const { user } = data;

  console.log('user data', isFollowingData);

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
        optimisticResponse: {
          followUser: {
            ...user,
            followerCount: isFollowingData?.user?.isFollowing
              ? isFollowingData?.user?.followersCount - 1
              : isFollowingData?.user?.followersCount + 1,
            isFollowing: !isFollowingData?.user?.isFollowing,
          },
        },
      });
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const onRefetch = () => {
    if (!projectsData?.getUserProjects?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        userId: data?.user?.id,
        input: {
          cursor: projectsData?.getUserProjects?.nextCursor,
        },
      },
    });
  };

  return (
    <div className='mt-5'>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <div className='flex flex-col lg:flex-row gap-6 md:gap-5 justify-between lg:items-center mt-10'>
        <h4 className='text-[28px] md:text-4xl font-bold'>
          {data?.user?.name}
        </h4>

        <Button
          variant='primary'
          onClick={handleFollowUser}
          // disabled={data?.user.name === data?.user.name}
        >
          <div className='flex flex-row items-center justify-center gap-3'>
            <PlusIcon />
            {isFollowingData?.user?.isFollowing ? 'Following' : 'Follow'}
          </div>
        </Button>
      </div>

      <div className='flex flex-col gap-10 mt-5'>
        <div className='mt-5 lg:mt-0'>
          <ProfileStats />
        </div>
        <div>
          <h5 className='font-bold font-mono text-silver  text-[22px]'>Bio</h5>
          <p className='mt-1 text-[22px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
            repudiandae.
          </p>
        </div>
        <div>
          <ProfileLinks />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
