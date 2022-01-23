import React from 'react';
import { signIn } from 'next-auth/react';

import { Button } from 'ui';

function Login() {
  return (
    <div>
      <Button onClick={() => signIn()}>Login</Button>
    </div>
  );
}

export default Login;
