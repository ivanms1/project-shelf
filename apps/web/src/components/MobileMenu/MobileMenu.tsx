import React, { useMemo, useState } from 'react';
import { Button, Drawer } from 'ui';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import MenuIcon from '@/assets/icons/menu-icon.svg';
import { LOCALES } from 'const';
import { useRouter } from 'next/router';

const MobileMenu = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout, currentUser } = useIsLoggedIn();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleLogout = async () => {
    setIsAuthLoading(true);
    await logout();
    setOpen(false);
    // Not setting the isAuthLoading state to false because of the loading UI flicker on click
  };

  const CurrentLocaleFlag = useMemo(() => {
    return LOCALES.filter((a) => a.code == router.locale)[0]?.flag;
  }, [router.locale]);

  return (
    <div className='hidden items-center  max-lg:flex'>
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
        <div className='flex h-full flex-col justify-between '>
          <div className='flex flex-col  text-white'>
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
              <Link href='/login' passHref>
                <Button className='w-full px-7' size='small'>
                  {t('login')}
                </Button>
              </Link>
            )}
          </div>

          <div
            className={`flex flex-row ${
              !showOptions ? 'justify-center' : 'justify-between'
            } `}
          >
            <div className='flex items-center justify-center '>
              <button
                onClick={toggleOptions}
                className='rounded-circle bg-black p-2'
              >
                <div className='overflow-hidden rounded-circle'>
                  <CurrentLocaleFlag />
                </div>
              </button>
            </div>

            <div
              className={`flex ${
                showOptions ? 'flex-row' : 'hidden'
              } translate-x-0 flex-wrap justify-between gap-3 rounded-sm  bg-black px-3 py-2 transition-transform duration-300 lg:-translate-x-full`}
            >
              {LOCALES.map((locale) => {
                if (locale.code !== router.locale) {
                  const Flag = locale.flag;
                  return (
                    <Link
                      key={locale.code}
                      href={router.asPath}
                      locale={locale.code}
                    >
                      <div className='flex cursor-pointer items-center justify-center rounded-circle bg-grey-dark p-2'>
                        <Flag />
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
