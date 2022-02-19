import Link from 'next/link';

import { StyledMember, Card, ProfileImage, Title } from './styles';

interface MemberProps {
  name: string;
  username: string;
}

export const Member = ({ name, username }: MemberProps) => {
  return (
    <StyledMember>
      <Card>
        <Title>{name}</Title>
        <p>
          <Link href={`https://github.com/${username}`}>Github Profile</Link>
        </p>
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
