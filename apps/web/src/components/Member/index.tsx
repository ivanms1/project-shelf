import React from 'react';

import { StyledMember, Card, ProfileImage, H1 } from './styles';

interface MemberProps {
  name: string;
  username: string;
}

export const Member: React.FC<MemberProps> = ({ name, username }) => {
  return (
    <StyledMember>
      <Card>
        <H1>{name}</H1>
        <p>github: {username}</p>
        <ProfileImage
          src={`https://github.com/${username}.png`}
          alt='github-profile'
          width={175}
          height={175}
        />
      </Card>
    </StyledMember>
  );
};

export default Member;
