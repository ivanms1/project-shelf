import React, { useState } from 'react';
import { Button, Drawer } from 'ui';
import { useTranslation } from 'react-i18next';
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
            className='w-full py-3 px-8 text-center font-semibold'
          >
            {t('about')}
          </Link>
          <Link
            href='/search'
            onClick={() => setOpen(false)}
            className='w-full py-3 px-8 text-center font-semibold'
          >
            {t('search')}
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href={`/user/${currentUser?.id}`}
                className='w-full py-3 px-8 text-center font-semibold'
                onClick={() => setOpen(false)}
              >
                {t('profile')}
              </Link>
              <Link
                href={`/user-edit/${currentUser?.id}`}
                onClick={() => setOpen(false)}
                className='w-full py-3 px-8 text-center font-semibold'
              >
                {t('edit-profile')}
              </Link>
              <Button
                variant='ghost'
                className='w-full py-3 px-8 text-center font-semibold'
                isLoading={isAuthLoading}
                onClick={handleLogout}
              >
                {t('sign-out')}
              </Button>
              <Link
                href='/create-project'
                className='w-full text-center'
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
