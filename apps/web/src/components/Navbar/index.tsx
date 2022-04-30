import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from 'ui';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import { RightSection, StyledNavbar } from './styles';

const Navbar = () => {
  const { isLoggedIn, logout } = useIsLoggedIn();

  return (
    <StyledNavbar>
      <Link href='/'>
        <a>
          <Image
            src={'/assets/images/shelf.png'}
            alt='project shelf logo'
            height={50}
            width={50}
          />
        </a>
      </Link>

      <RightSection>
        <Link href='/about'>
          <a>
            <Button variant='secondary'>About</Button>
          </a>
        </Link>
        <Button variant='secondary'>Search</Button>

        {isLoggedIn ? (
          <>
            <Link href='/create-project'>
              <a>
                <Button>Add Project</Button>
              </a>
            </Link>
            <Button variant='secondary' onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
      </RightSection>
    </StyledNavbar>
  );
};

export default Navbar;
