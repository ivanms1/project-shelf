import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'ui';
import Image from 'next/future/image';

import AuthProvider from '@/components/AuthProvider';

import GithubIcon from '@/assets/icons/github.svg';
import DiscordIcon from '@/assets/icons/discord-white-icon.svg';

import type { NextPageWithLayout } from 'pages/_app';

const Login: NextPageWithLayout = () => {
  const { t } = useTranslation('login');
  return (
    <div className='flex h-screen max-lg:flex-col'>
      <div className='flex h-full w-1/2 items-center justify-center px-28 py-20 max-lg:min-h-[70vh] max-lg:w-full max-lg:px-[30px]'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-center text-[67px] font-semibold leading-none'>
            {t('login-title')}
          </h1>
          <p className='text-center text-[22px] max-lg:text-base'>
            {t('login-description')}
          </p>
          <div className='flex flex-col items-center gap-4'>
            <Button
              className='flex w-80 items-center justify-center gap-2'
              size='small'
              onClick={() => signIn('discord')}
            >
              <DiscordIcon className='h-8 fill-white' />
              {t('discord')}
            </Button>
            <Button
              className='flex w-80 items-center justify-center gap-2'
              size='small'
              onClick={() => signIn('github')}
            >
              <GithubIcon className='h-7 fill-white' />
              {t('github')}
            </Button>
          </div>
        </div>
      </div>
      <div className='relative w-1/2'>
        <Image priority src='/assets/images/login-bg.jpg' fill alt='library' />
      </div>
    </div>
  );
};

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthProvider>{page}</AuthProvider>;
};

export default Login;
