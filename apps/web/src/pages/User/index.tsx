import React from 'react';
import Image from 'next/image';

import { useGetUserForPageQuery } from 'apollo-hooks';

import {
  StyledUser,
  StyledAvatar,
  StyledUserContainer,
  StyledTitle,
  StyledProjectContainer,
  StyledCard,
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
          <StyledCard key={project.id}>
            <Image
              src={project.preview}
              alt={project.title}
              height={300}
              width={400}
            />
            <div>{project.title}</div>
          </StyledCard>
        ))}
      </StyledProjectContainer>
    </StyledUser>
  );
}

export default User;
//ckzkzm2zd00021etjgdfh0z58
