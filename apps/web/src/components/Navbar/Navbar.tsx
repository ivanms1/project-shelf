import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Image from 'next/future/image';
import { Button, DropDown, Select } from 'ui';
import { useTranslation } from 'next-i18next';
import cookie from 'react-cookies';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import { LOCALES, NEXT_LOCALE } from 'const';

import {
  avatarStyle,
  flagStyle,
  logoStyle,
  navbarStyle,
  popoverItemsStyle,
  popoverItemStyle,
  rightSectionStyle,
} from './Navbar.css';

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
    label: <CurrentLocalFlag className={flagStyle} />,
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
        <Link href='/about'>
          <a>
            <Button variant='secondary'>{t('about')}</Button>
          </a>
        </Link>
        <Link href='/search'>
          <a>
            <Button variant='secondary'>{t('search')}</Button>
          </a>
        </Link>
        <Select
          // @ts-expect-error TODO: add correct type
          value={currentLocale}
          // @ts-expect-error TODO: add correct type
          options={LOCALES.map((locale) => {
            const Flag = locale.flag;
            return {
              value: locale.code,
              label: <Flag className={flagStyle} />,
            };
          })}
          onChange={(e) => {
            onToggleLanguageClick(e.value);
          }}
        />
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
                  <a className={popoverItemStyle}>{t('profile')}</a>
                </Link>

                <Link href={`/user-edit/${currentUser?.id}`}>
                  <a className={popoverItemStyle}>{t('edit-profile')}</a>
                </Link>
                <Button
                  variant='ghost'
                  className={popoverItemStyle}
                  onClick={logout}
                >
                  {t('sign-out')}
                </Button>
              </div>
            </DropDown>
            <Link href='/create-project' passHref>
              <Button>{t('add-project')}</Button>
            </Link>
          </>
        ) : (
          <Button onClick={() => signIn('github')}>{t('login')}</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
