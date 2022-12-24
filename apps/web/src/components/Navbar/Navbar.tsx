import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Image from 'next/future/image';
import { Button, DropDown } from 'ui';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import {
  avatarStyle,
  logoStyle,
  navbarStyle,
  popoverItemsStyle,
  popoverItemStyle,
  rightSectionStyle,
} from './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout, currentUser } = useIsLoggedIn();
  const [open, setOpen] = useState(false);

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
            <Button variant='secondary'>About</Button>
          </a>
        </Link>
        <Link href='/search'>
          <a>
            <Button variant='secondary'>Search</Button>
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
                  <a className={popoverItemStyle}>Profile</a>
                </Link>

                <Link href={`/user-edit/${currentUser?.id}`}>
                  <a className={popoverItemStyle}>Edit Profile</a>
                </Link>
                <Button
                  className={popoverItemStyle}
                  variant='ghost'
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </div>
            </DropDown>
            <Link href='/create-project' passHref>
              <Button>Add Project</Button>
            </Link>
          </>
        ) : (
          <Button onClick={() => signIn('github')}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
