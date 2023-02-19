import React from 'react';

import { useTranslation } from 'next-i18next';

import {
  useFollowUserMutation,
  useGetUserForPageQuery,
  useGetUserProjectsQuery,
  useIsUserFollowingQuery,
  UserFollowActions,
} from 'apollo-hooks';
import { useRouter } from 'next/router';

import Image from 'next/future/image';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import ProfileInfo from './ProfileInfo';
import ProjectsGrid from '@/components/ProjectsGrid';

const User = () => {
  const { query } = useRouter();
  const { isLoggedIn } = useIsLoggedIn();

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

  console.log('pronjectsData', projectsData);

  const { data: isFollowingData } = useIsUserFollowingQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const { user } = data;

  console.log('user data', data);

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
            followersCount: isFollowingData?.user?.isFollowing
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
    <div className='bg-black'>
      <div className='relative flex flex-col items-center lg:items-start'>
        <Image
          className='w-full h-[320px] object-cover'
          src={data?.user?.cover}
          alt={user?.name}
          width={1000}
          height={1000}
        />

        {user?.avatar && (
          <Image
            className='absolute top-[250px] left-none lg:left-[150px]  rounded-lg border-2 border-black'
            src={user?.avatar}
            alt={user?.name}
            height={320}
            width={150}
          />
        )}
      </div>

      <div className='mt-8 lg:mt-16 py-[40px] px-10 lg:px-[155px]'>
        <ProfileInfo />
      </div>
      <div className='bg-grey-dark py-[40px] px-10 lg:px-[155px]'>
        <ProjectsGrid projects={projectsData?.getUserProjects?.results} />
      </div>
    </div>
  );
};

export default User;
