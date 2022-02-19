import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useGetUserForPageQuery } from 'apollo-hooks';

import {
  StyledUser,
  StyledAvatar,
  StyledUserContainer,
  StyledTitle,
  StyledProjectContainer,
  StyledCard,
  StyledLink,
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
          <StyledLink key={project.id}>
            <Link href={`/project/${project.id}`} passHref>
              <StyledCard key={project.id}>
                <Image
                  src={project.preview}
                  alt={project.title}
                  height={300}
                  width={400}
                />
                <div>{project.title}</div>
              </StyledCard>
            </Link>
          </StyledLink>
        ))}
      </StyledProjectContainer>
    </StyledUser>
  );
}

export default User;
