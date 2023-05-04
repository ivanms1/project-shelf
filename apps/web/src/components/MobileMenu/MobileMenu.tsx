import React, { useState } from 'react';
import { Button, Drawer } from 'ui';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import MenuIcon from '@/assets/icons/menu-icon.svg';

const MobileMenu = () => {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout, currentUser } = useIsLoggedIn();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const handleLogout = async () => {
    setIsAuthLoading(true);
    await logout();
    setOpen(false);
    // Not setting the isAuthLoading state to false because of the loading UI flicker on click
  };

  const handleLogin = async () => {
    setIsAuthLoading(true);
    await signIn('github');
    // Not setting the isAuthLoading state to false because of the loading UI flicker on click
  };

  return (
    <div className='hidden items-center max-lg:flex'>
      <Button
        className='hidden max-lg:block'
        onClick={() => setOpen(true)}
        variant='ghost'
      >
        <MenuIcon className='w-7' />
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        className='bg-grey-dark'
        closable
      >
        <div className='flex flex-col text-white'>
          <Link
            href='/about'
            onClick={() => setOpen(false)}
            className='py-3 px-8 font-semibold text-center w-full'
          >
            {t('about')}
          </Link>
          <Link
            href='/search'
            onClick={() => setOpen(false)}
            className='py-3 px-8 font-semibold text-center w-full'
          >
            {t('search')}
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href={`/user/${currentUser?.id}`}
                className='py-3 px-8 font-semibold text-center w-full'
                onClick={() => setOpen(false)}
              >
                {t('profile')}
              </Link>
              <Link
                href={`/user-edit/${currentUser?.id}`}
                onClick={() => setOpen(false)}
                className='py-3 px-8 font-semibold text-center w-full'
              >
                {t('edit-profile')}
              </Link>
              <Button
                variant='ghost'
                className='py-3 px-8 font-semibold text-center w-full'
                isLoading={isAuthLoading}
                onClick={handleLogout}
              >
                {t('sign-out')}
              </Button>
              <Link
                href='/create-project'
                className='text-center w-full'
                passHref
              >
                <Button
                  className='px-7'
                  onClick={() => setOpen(false)}
                  size='small'
                >
                  {t('add-project')}
                </Button>
              </Link>
            </>
          ) : (
            <Button
              className='px-7'
              size='small'
              onClick={handleLogin}
              isLoading={isAuthLoading}
            >
              {t('login')}
            </Button>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
