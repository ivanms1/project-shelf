import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';
import {
  useFollowUserMutation,
  useGetUserForPageQuery,
  useGetUserProjectsQuery,
  useIsUserFollowingQuery,
  UserFollowActions,
} from 'apollo-hooks';
import { useRouter } from 'next/router';
import { Button } from 'ui';
import Image from 'next/image';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import ProjectsGrid from '@/components/ProjectsGrid';
import LoginModal from '@/components/Modals/LoginModal';

import {
  avatarStyle,
  followButtonStyle,
  followerCountStyle,
  projectContainerStyle,
  titleStyle,
  userContainerStyle,
  userStyle,
} from './User.css';

const User = () => {
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
    <div className={userStyle}>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <div className={userContainerStyle}>
        {user?.avatar && (
          <Image
            className={avatarStyle}
            src={user?.avatar}
            alt={user?.name}
            height={200}
            width={200}
          />
        )}
        <p className={titleStyle}>{user?.name}</p>
      </div>
      {user ? (
        <div className={projectContainerStyle}>
          <Button className={followButtonStyle} onClick={handleFollowUser}>
            {isFollowingData?.user?.isFollowing ? t('unfollow') : t('follow')}
          </Button>
          <h4 className={followerCountStyle}>
            {t('follower_count', {
              count: isFollowingData?.user?.followersCount,
            })}
          </h4>
          <ProjectsGrid
            projects={projectsData?.getUserProjects?.results ?? []}
            loading={loading}
            onRefetch={onRefetch}
            nextCursor={projectsData?.getUserProjects?.nextCursor}
          />
        </div>
      ) : (
        <div className={userContainerStyle}>
          <p>{t('user_not_found')}</p>
        </div>
      )}

      <NextSeo
        title={user?.name}
        description={user?.name}
        openGraph={{
          type: 'website',
          title: user?.name,
          description: user?.github,
          site_name: 'Project Shelf',
          images: [
            {
              url: user?.avatar ?? '',
              width: 200,
              height: 200,
              alt: user?.name,
            },
          ],
        }}
      />
    </div>
  );
};

export default User;
