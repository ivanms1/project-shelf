import React from 'react';
import { NextSeo } from 'next-seo';
import { useGetUserForPageQuery } from 'apollo-hooks';
import ProjectCard from '@/components/ProjectCard';
import { buildImageUrl } from 'cloudinary-build-url';

import {
  StyledUser,
  StyledAvatar,
  StyledUserContainer,
  StyledTitle,
  StyledProjectContainer,
} from './styles';

function User(props) {
  const { data = {} } = useGetUserForPageQuery({
    variables: {
      id: String(props?.userId),
    },
    skip: !props?.userId,
  });

  const { user } = data;

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
        {user?.projects.map((project) => (
          <ProjectCard key={project?.id} project={project} />
        ))}
      </StyledProjectContainer>
      <NextSeo
        title={user?.name}
        description={user?.name}
        openGraph={{
          type: 'website',
          title: user?.name,
          description: user?.role,
          site_name: 'Project Shelf',
          images: [
            {
              url: buildImageUrl(user?.avatar, {
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
}

export default User;
