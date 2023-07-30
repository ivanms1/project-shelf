import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from 'ui';

import GithubIcon from '@/assets/icons/github.svg';
import DiscordIcon from '@/assets/icons/discord-white-icon.svg';

const Login = () => {
  const { t } = useTranslation('login');
  return (
    <div className='px-28 py-20 max-lg:min-h-[70vh] max-lg:px-[30px]'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-[67px] font-semibold leading-tight'>
          {t('login-title')}
        </h1>
        <p className='text-[22px] max-lg:text-base'>{t('login-description')}</p>
        <div className='flex flex-col gap-4'>
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
  );
};

Login.auth = true;

export default Login;
