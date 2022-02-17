import React from 'react';
import { signIn } from 'next-auth/react';

import { StyledSignin } from './styles';

interface SigninProps {
  providers: { id: string; name: string }[];
}

const Signin = ({ providers }: SigninProps) => {
  return (
    <StyledSignin>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </StyledSignin>
  );
};

export default Signin;
