import React from 'react';
import { NextSeo } from 'next-seo';
import {
  useFollowUserMutation,
  useGetUserForPageQuery,
  UserFollowActions,
} from 'apollo-hooks';
import { useRouter } from 'next/router';

import ProjectCard from '@/components/ProjectCard';

import { buildImageUrl } from 'cloudinary-build-url';

import {
  FollowButton,
  StyledUser,
  StyledAvatar,
  StyledUserContainer,
  StyledTitle,
  StyledProjectContainer,
  StyledProjectsGrid,
} from './styles';

const User = () => {
  const { query } = useRouter();

  const { data = {} } = useGetUserForPageQuery({
    variables: {
      id: String(query?.id),
    },
    skip: !query?.id,
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

      <StyledProjectContainer>
        <FollowButton onClick={handleFollowUser}>
          {user?.isFollowing ? 'Unfollow' : 'Follow'}
        </FollowButton>
        <h4>{user?.followerCount} Followers</h4>

        <StyledProjectsGrid>
          {user?.projects?.map((project) => (
            <ProjectCard
              key={project?.id}
              previous={`/user/${user?.id}`}
              project={{
                ...project,
                author: {
                  id: user?.id,
                  name: user?.name,
                  avatar: user?.avatar,
                },
              }}
            />
          ))}
        </StyledProjectsGrid>
      </StyledProjectContainer>

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
