import React from 'react';
import { NextSeo } from 'next-seo';
import { useGetUserForPageQuery } from 'apollo-hooks';

import ProjectCard from '@/components/ProjectCard';

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
  console.log('user', user);
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
    </StyledUser>
  );
}

export default User;
