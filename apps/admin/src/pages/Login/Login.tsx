import React from 'react';
import { signIn } from 'next-auth/react';
import { NextSeo } from 'next-seo';

import { Button } from 'ui';

const Login = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-col'>
        <span className='text-gray-900 text-[30px] font-bold'>Get Started</span>
        <Button onClick={() => signIn('github')}>Login</Button>
      </div>

      <NextSeo title='Login | Admin' />
    </div>
  );
};

export default Login;
