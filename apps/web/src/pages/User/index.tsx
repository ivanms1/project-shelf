import React from 'react';
import { NextSeo } from 'next-seo';
import {
  useFollowUserMutation,
  useGetUserForPageQuery,
  useGetUserProjectsQuery,
  UserFollowActions,
} from 'apollo-hooks';
import { useRouter } from 'next/router';

import ProjectsGrid from '@/components/ProjectsGrid';

import { buildImageUrl } from 'cloudinary-build-url';

import {
  FollowButton,
  StyledUser,
  StyledAvatar,
  StyledUserContainer,
  StyledTitle,
  StyledProjectContainer,
} from './styles';

const User = () => {
  const { query } = useRouter();

  const { data = {} } = useGetUserForPageQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
  });

  const {
    data: projectsData,
    fetchMore,
    loading,
    error,
  } = useGetUserProjectsQuery({
    variables: {
      userId: data?.user?.id,
      cursor: null,
    },
    skip: !data?.user?.id,
  });

  const { user } = data;

  const [followUser] = useFollowUserMutation();

  const handleFollowUser = async () => {
    await followUser({
      variables: {
        input: {
          userId: user?.id,
          action: user.isFollowing
            ? UserFollowActions.Unfollow
            : UserFollowActions.Follow,
        },
      },
      optimisticResponse: {
        followUser: {
          ...user,
          followerCount: user.isFollowing
            ? user.followerCount - 1
            : user.followerCount + 1,
          isFollowing: !user.isFollowing,
        },
      },
    });
  };

  const onRefetch = () => {
    if (!projectsData?.getUserProjects?.nextCursor) {
      return;
    }

    fetchMore({
      variables: {
        cursor: projectsData?.getUserProjects?.nextCursor,
      },
    });
  };

  return (
    <StyledUser>
      <StyledUserContainer>
        {user?.avatar && (
          <StyledAvatar
            src={user?.avatar}
            alt={user?.name}
            height={200}
            width={200}
          />
        )}
        <StyledTitle>{user?.name}</StyledTitle>
      </StyledUserContainer>
      {user ? (
        <StyledProjectContainer>
          <FollowButton onClick={handleFollowUser}>
            {user?.isFollowing ? 'Unfollow' : 'Follow'}
          </FollowButton>
          <h4>{user?.followerCount} Followers</h4>
          <ProjectsGrid
            projects={projectsData?.getUserProjects?.results ?? []}
            loading={loading}
            onRefetch={onRefetch}
            nextCursor={projectsData?.getUserProjects?.nextCursor}
          />
        </StyledProjectContainer>
      ) : (
        <StyledUserContainer>
          <StyledTitle>User not found</StyledTitle>
        </StyledUserContainer>
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
              url: buildImageUrl(user?.avatar ?? '', {
                transformations: {
                  resize: {
                    type: 'scale',
                    width: 200,
                    height: 200,
                  },
                },
              }),
              width: 200,
              height: 200,
              alt: user?.name,
            },
          ],
        }}
      />
    </StyledUser>
  );
};

export default User;
