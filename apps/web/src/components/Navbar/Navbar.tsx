import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Image from 'next/future/image';
import { Button, DropDown, Select } from 'ui';
import { useTranslation } from 'next-i18next';
import cookie from 'react-cookies';

import MobileMenu from '../MobileMenu';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import { LOCALES, NEXT_LOCALE } from 'const';

const Navbar = () => {
  const { isLoggedIn, logout, currentUser } = useIsLoggedIn();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  const onToggleLanguageClick = (newLocale: string) => {
    cookie.save(NEXT_LOCALE, newLocale);
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const CurrentLocalFlag = LOCALES.find(
    (locale) => locale.code === router.locale
  ).flag;

  const currentLocale = {
    value: LOCALES.find((locale) => locale.code === router.locale).code,
    label: <CurrentLocalFlag className='w-6' />,
  };

  return (
    <div className='bg-black flex text-white flex-row py-5 px-12 justify-between max-lg:py-3 max-lg:px-7'>
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
        <Link href='/about' className='py-5 px-3'>
          {t('about')}
        </Link>
        <Link href='/search' className='py-5 px-3'>
          {t('search')}
        </Link>
        <Select
          // @ts-expect-error TODO: add correct type
          value={currentLocale}
          options={LOCALES.map((locale) => {
            const Flag = locale.flag;
            return {
              value: locale.code,
              label: (<Flag className='w-6' />) as unknown as string,
            };
          })}
          customStyles={{
            control: (provided) => ({
              ...provided,
              cursor: 'pointer',
              minHeight: 'auto',
              marginRight: '0.75rem',
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: '0 0.2rem',
            }),
            option: (provided) => ({
              ...provided,
              padding: '0.4rem',
            }),
          }}
          onChange={(e) => {
            onToggleLanguageClick(e.value);
          }}
        />
        {isLoggedIn ? (
          <>
            <Link href='/create-project' passHref>
              <Button className='px-7' size='small'>
                {t('add-project')}
              </Button>
            </Link>
            <DropDown
              open={open}
              setOpen={setOpen}
              parent={
                <Image
                  className='cursor-pointer rounded-full'
                  src={currentUser?.avatar}
                  width={40}
                  height={40}
                  alt={currentUser?.name}
                />
              }
            >
              <div className='bg-white flex flex-col rounded-sm'>
                <Link
                  href={`/user/${currentUser?.id}`}
                  className='py-3 px-8 text-black text-center hover:bg-slate-100 w-full'
                >
                  {t('profile')}
                </Link>

                <Link
                  href={`/user-edit/${currentUser?.id}`}
                  className='py-3 px-8 text-black text-center hover:bg-slate-100 w-full'
                >
                  {t('edit-profile')}
                </Link>
                <Button
                  variant='ghost'
                  className='py-3 px-8 text-black text-center hover:bg-slate-100 w-full'
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
  );
};

export default Navbar;
