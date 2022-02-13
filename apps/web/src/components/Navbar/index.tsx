import Link from 'next/link';
import React from 'react';
import { Button } from 'ui';
import { signIn } from 'next-auth/react';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import { RightSection, searchButtonStyles, StyledNavbar } from './styles';

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <StyledNavbar>
      <Link href='/'>
        <a>Project Shelf</a>
      </Link>

      <RightSection>
        <Link href='/projects'>
          <Button variant='secondary' className={searchButtonStyles()}>
            Projects
          </Button>
        </Link>
        <Button variant='secondary' className={searchButtonStyles()}>
          Search
        </Button>
        {isLoggedIn ? (
          <Link href='/create-project'>
            <a>
              <Button>Add Project</Button>
            </a>
          </Link>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
      </RightSection>
    </StyledNavbar>
  );
};

export default Navbar;
