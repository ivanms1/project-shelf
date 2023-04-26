import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Image from 'next/future/image';
import { Button, DropDown } from 'ui';
import { useTranslation } from 'next-i18next';

import MobileMenu from '../MobileMenu';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

const Navbar = () => {
  const { isLoggedIn, logout, currentUser } = useIsLoggedIn();
  const [open, setOpen] = useState(false);
  const [isTopOpen, setIsTopOpen] = useState(false);
  const { t } = useTranslation('common');

  return (
    <div className='bg-black '>
      <div className='max-w-screen-2xl mx-auto flex text-white flex-row py-5 px-12 justify-between max-lg:py-3 max-lg:px-7'>
        <Link className='flex flex-row items-center gap-3' href='/'>
          <>
            <Image
              className='cursor-pointer'
              src={'/assets/images/shelf.png'}
              alt='project shelf logo'
              height={50}
              width={50}
            />
            <p className='lg:text-2xl font-bold font-mono text-xl'>
              {t('project-shelf')}
            </p>
          </>
        </Link>
        <div className='flex flex-row gap-[10px] items-center max-lg:hidden'>
          <Link href='/search' className='py-5 px-3'>
            {t('search')}
          </Link>

          <DropDown
            open={isTopOpen}
            setOpen={setIsTopOpen}
            parent={
              <Button variant='ghost' className='px-3'>
                {t('top')}
              </Button>
            }
          >
            <div className='bg-grey-dark flex w-40 flex-col rounded-sm'>
              <Link
                href='/top-projects'
                className='py-3 px-8 text-center hover:bg-grey-light w-full rounded-t-sm'
              >
                {t('projects')}
              </Link>

              <Link
                href='/top-creators'
                className='py-3 px-8 text-center hover:bg-grey-light w-full rounded-b-sm'
              >
                {t('creators')}
              </Link>
            </div>
          </DropDown>

          {isLoggedIn ? (
            <>
              <Link href='/create-project' passHref>
                <Button className='px-7 mr-1' size='small'>
                  {t('add-project')}
                </Button>
              </Link>
              <DropDown
                open={open}
                setOpen={setOpen}
                parent={
                  <Image
                    className='cursor-pointer rounded-full h-10 w-10 object-cover'
                    src={currentUser?.avatar}
                    width={40}
                    height={40}
                    alt={currentUser?.name}
                  />
                }
              >
                <div className='bg-grey-dark flex w-40 flex-col rounded-sm'>
                  <Link
                    href={`/user/${currentUser?.id}`}
                    className='py-3 px-8 text-center hover:bg-grey-light w-full rounded-t-sm'
                  >
                    {t('profile')}
                  </Link>

                  <Link
                    href={`/user-edit/${currentUser?.id}`}
                    className='py-3 px-8 text-center hover:bg-grey-light w-full'
                  >
                    {t('edit-profile')}
                  </Link>
                  <Button
                    variant='ghost'
                    className='py-3 px-8 text-center hover:bg-grey-light w-full rounded-b-sm'
                    onClick={logout}
                  >
                    {t('sign-out')}
                  </Button>
                </div>
              </DropDown>
            </>
          ) : (
            <Button
              className='px-7'
              size='small'
              onClick={() => signIn('github')}
            >
              {t('login')}
            </Button>
          )}
        </div>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
