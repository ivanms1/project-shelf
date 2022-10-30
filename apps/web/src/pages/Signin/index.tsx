import { signIn } from 'next-auth/react';
import { StyledSignin, LoginButton, LoginContent, Header } from './styles';

interface SigninProps {
  providers: { id: string; name: string }[];
}

const Signin = ({ providers }: SigninProps) => {
  return (
    <StyledSignin>
      <LoginContent>
        {Object?.values(providers).map((provider) => (
          <div key={provider.name}>
            <Header>Project Shelf</Header>
            <LoginButton
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: `${window.location.origin}/`,
                })
              }
              variant={'secondary'}
            >
              Sign in with {provider.name}
            </LoginButton>
          </div>
        ))}
      </LoginContent>
    </StyledSignin>
  );
};

export default Signin;
