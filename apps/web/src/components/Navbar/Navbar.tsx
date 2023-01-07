import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Image from 'next/future/image';
import { Button, DropDown, Select } from 'ui';
import { useTranslation } from 'next-i18next';
import IndiaFlag from '@/assets/flags/india.svg';
import EnglishFlag from '@/assets/flags/english.svg';
import NepalFlag from '@/assets/flags/nepal.svg';
import KoreaFlag from '@/assets/flags/korea.svg';
import SpainFlag from '@/assets/flags/spain.svg';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import {
  avatarStyle,
  logoStyle,
  navbarStyle,
  popoverItemsStyle,
  popoverItemStyle,
  rightSectionStyle,
} from './Navbar.css';

const PLACEHOLDER_OPTIONS = [
  { value: 'en', label: <EnglishFlag /> },
  { value: 'np', label: <NepalFlag /> },
  { value: 'in', label: <IndiaFlag /> },
  { value: 'kr', label: <KoreaFlag /> },
  { value: 'es', label: <SpainFlag /> },
];

const Navbar = () => {
  const { isLoggedIn, logout, currentUser } = useIsLoggedIn();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('nav');

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className={navbarStyle}>
      <Link href='/'>
        <Image
          className={logoStyle}
          src={'/assets/images/shelf.png'}
          alt='project shelf logo'
          height={50}
          width={50}
        />
      </Link>

      <div className={rightSectionStyle}>
        <Select
          options={PLACEHOLDER_OPTIONS}
          onChange={(e) => {
            onToggleLanguageClick(e.value);
            window.localStorage.setItem('lang', e.value);
          }}
        />

        <Link href='/about'>
          <a>
            <Button variant='secondary'>{t('About')}</Button>
          </a>
        </Link>
        <Link href='/search'>
          <a>
            <Button variant='secondary'>{t('Search')}</Button>
          </a>
        </Link>

        {isLoggedIn ? (
          <>
            <DropDown
              open={open}
              setOpen={setOpen}
              parent={
                <Image
                  className={avatarStyle}
                  src={currentUser?.avatar}
                  width={32}
                  height={32}
                  alt={currentUser?.name}
                />
              }
            >
              <div className={popoverItemsStyle}>
                <Link href={`/user/${currentUser?.id}`}>
                  <a className={popoverItemStyle}>{t('Profile')}</a>
                </Link>

                <Link href={`/user-edit/${currentUser?.id}`}>
                  <a className={popoverItemStyle}>{t('Edit.Profile')}</a>
                </Link>
                <Button
                  className={popoverItemStyle}
                  variant='ghost'
                  onClick={logout}
                >
                  {t('Sign.Out')}
                </Button>
              </div>
            </DropDown>
            <Link href='/create-project' passHref>
              <Button>{t('Add.Project')}</Button>
            </Link>
          </>
        ) : (
          <Button onClick={() => signIn('github')}>{t('Login')}</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
