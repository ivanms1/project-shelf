import React from 'react';
import { useGetUserForPageQuery } from 'apollo-hooks';
import {
  StyledUser,
  StyledAvatar,
  StyledUserContainer,
  StyledTitle,
  StyledProject,
  StyledProjectContainer,
} from './styles';

function User(props) {
  console.log('useId', props?.userId);
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
        <StyledAvatar
          src={user?.avatar}
          alt={user?.name}
          height={200}
          width={200}
        />
        <StyledTitle>{user.name}</StyledTitle>
      </StyledUserContainer>
      <StyledProjectContainer>
        {user.projects.map((project) => (
          <StyledProject
            key={project.id}
            src={project.preview}
            alt={project.title}
            height={300}
            width={400}
          />
        ))}
      </StyledProjectContainer>
    </StyledUser>
  );
}

export default User;
//ckzkzm2zd00021etjgdfh0z58
