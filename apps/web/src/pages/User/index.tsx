import React from 'react';
import { useGetUserForPageQuery } from 'apollo-hooks';
import { StyledUser } from './styles';

function User({ userId }) {
  const { data = {} } = useGetUserForPageQuery({
    variables: {
      id: String(userId),
    },
    skip: !userId,
  });

  const [projects, user] = [data?.user.projects, data?.user];

  console.log('user', user.avatar, user.name, projects);
  return <StyledUser>User</StyledUser>;
}

export default User;
