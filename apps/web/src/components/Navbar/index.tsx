import Link from 'next/link';
import React from 'react';
import { Button } from 'ui';
import { signIn } from 'next-auth/react';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import { RightSection, StyledNavbar } from './styles';

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const { isLoggedIn, logout } = useIsLoggedIn();

  return (
    <StyledNavbar>
      <Link href='/'>
        <a>Project Shelf</a>
      </Link>

      <RightSection>
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
