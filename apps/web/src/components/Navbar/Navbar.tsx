import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/future/image';
import Link from 'next/link';
import { Button, DropDown } from 'ui';

import MobileMenu from '../MobileMenu';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

const Navbar = () => {
  const { isLoggedIn, logout, currentUser, loading, session } = useIsLoggedIn();
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isTopOpen, setIsTopOpen] = useState(false);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      setIsAuthLoading(false);
    }
  }, [session.status]);

  const handleLogout = async () => {
    setIsAuthLoading(true);
    await logout();
    // Not setting the isAuthLoading state to false because of the loading UI flicker on click
  };

  return (
    <div className='flex flex-row justify-between bg-black py-5 px-12 text-white max-lg:py-3 max-lg:px-7'>
      <Link className='flex flex-row items-center gap-3' href='/'>
        <>
          <Image
            className='cursor-pointer'
            src={'/assets/images/shelf.png'}
            alt='project shelf logo'
            height={50}
            width={50}
          />
          <p className='font-mono text-xl font-bold lg:text-2xl'>
            {t('project-shelf')}
          </p>
        </>
      </Link>
      <div className='flex flex-row items-center gap-[10px] max-lg:hidden'>
        <Link href='/search' className='py-5 px-3 hover:text-primary'>
          {t('search')}
        </Link>

        <DropDown
          open={isTopOpen}
          setOpen={setIsTopOpen}
          parent={
            <Button variant='ghost' className='px-3 hover:text-primary'>
              {t('top')}
            </Button>
          }
        >
          <div className='flex w-40 flex-col rounded-sm bg-grey-dark'>
            <Link
              href='/top-projects'
              className='w-full rounded-t-sm py-3 px-8 text-center hover:bg-grey-light'
            >
              {t('projects')}
            </Link>

            <Link
              href='/top-creators'
              className='w-full rounded-b-sm py-3 px-8 text-center hover:bg-grey-light'
            >
              {t('creators')}
            </Link>
          </div>
        </DropDown>

        {isLoggedIn ? (
          <>
            <Link href='/create-project' passHref>
              <Button className='mr-1 px-7' size='small'>
                {t('add-project')}
              </Button>
            </Link>
            <DropDown
              open={open}
              setOpen={setOpen}
              parent={
                currentUser?.avatar ? (
                  <Image
                    className='h-10 w-10 cursor-pointer rounded-full object-cover'
                    src={currentUser?.avatar}
                    width={40}
                    height={40}
                    alt={currentUser?.name ?? 'user avatar'}
                  />
                ) : (
                  <div className='h-10 w-10 animate-pulse rounded-full bg-slate-700' />
                )
              }
            >
              <div className='flex w-40 flex-col rounded-sm bg-grey-dark'>
                <Link
                  href={`/user/${currentUser?.id}`}
                  className='w-full rounded-t-sm py-3 px-8 text-center hover:bg-grey-light'
                >
                  {t('profile')}
                </Link>

                <Link
                  href={`/user-edit/${currentUser?.id}`}
                  className='w-full py-3 px-8 text-center hover:bg-grey-light'
                >
                  {t('edit-profile')}
                </Link>
                <Button
                  variant='ghost'
                  className='w-full rounded-b-sm py-3 px-8 text-center hover:bg-grey-light'
                  isLoading={isAuthLoading}
                  onClick={handleLogout}
                >
                  {t('sign-out')}
                </Button>
              </div>
            </DropDown>
          </>
        ) : (
          <Link href='/login' passHref>
            <Button
              className='min-w-[120px] px-7'
              size='small'
              isLoading={loading || isAuthLoading}
            >
              {t('login')}
            </Button>
          </Link>
        )}
      </div>
      <MobileMenu />
    </div>
  );
};

export default Navbar;
