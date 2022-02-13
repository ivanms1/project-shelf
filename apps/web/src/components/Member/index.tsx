import React from 'react';

import { StyledMember, Card } from './styles';

interface MemberProps {
  name: string;
  profile: string;
}

export const Member: React.FC<MemberProps> = ({ name, profile }) => {
  return (
    <StyledMember>
      <Card>
        <h2>name: {name}</h2>
        <p>github: {profile}</p>
      </Card>
    </StyledMember>
  );
};

export default Member;
