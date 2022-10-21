import {
  CardLinks,
  Card,
  ProfileImage,
  Title,
  Wrapper,
  ImageContainer,
  Username,
  StyledLink,
} from './styles';

interface MemberProps {
  name: string;
  username: string;
}

export const Member = ({ name, username }: MemberProps) => {
  return (
    <StyledLink target='_blank' href={`https://github.com/${username}`}>
      <Card>
        <ImageContainer>
          <ProfileImage
            src={`https://github.com/${username}.png`}
            alt='github-profile'
            width={110}
            height={110}
          />
        </ImageContainer>
        <Wrapper>
          <Title>{name}</Title>
          <Username>@{username}</Username>
          <CardLinks>
            <ProfileImage
              src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
              alt='github-profile'
              width={42}
              height={42}
            />
          </CardLinks>
        </Wrapper>
      </Card>
    </StyledLink>
  );
};

export default Member;
