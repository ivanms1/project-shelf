import React from 'react';
import { signIn } from 'next-auth/react';
import { NextSeo } from 'next-seo';

import { Button } from 'ui';

import GithubIcon from '@/public/assets/icons/github.svg';
import DiscordIcon from '@/public/assets/icons/discord.svg';
import Image from 'next/future/image';

const Login = () => {
  return (
    <div className='flex h-screen   bg-black'>
      <div className='flex flex-1  flex-row '>
        <div className='flex w-full flex-col items-center justify-center '>
          <div className='flex flex-col gap-4 '>
            <span className='text-center text-[30px] font-medium text-white'>
              Log In
            </span>
            <Button
              className='flex w-80 items-center justify-center gap-2'
              size='small'
              onClick={() => signIn('discord')}
            >
              <DiscordIcon className='h-8 fill-white' />
              Discord
            </Button>
            <Button
              className='flex w-80 items-center justify-center gap-2'
              size='small'
              onClick={() => signIn('github')}
            >
              <GithubIcon className='h-7 fill-white' />
              Github
            </Button>
          </div>
        </div>

        <div className='hidden w-full sm:hidden lg:flex'>
          <div className='relative w-full'>
            <Image
              priority
              src='/assets/images/login-bg.jpg'
              fill
              alt='library'
            />
          </div>
        </div>
      </div>
      <NextSeo
        title='Admin | Login'
        description='Admin Login page'
        openGraph={{
          type: 'website',
          title: 'Admin | Login',
          description: 'Login into project shelf as an Admin',
          site_name: 'Admin Login page',
          images: [
            {
              url: 'https://project-shelf-dev.netlify.app/assets/images/shelf.png',
              width: 200,
              height: 200,
              alt: 'Project Shelf',
            },
          ],
        }}
      />
    </div>
  );
};

export default Login;
