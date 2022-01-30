import Link from 'next/link';
import React from 'react';
import { Button } from 'ui';

import useIsLoggedIn from 'hooks/useIsLoggedIn';

import { RightSection, searchButtonStyles, StyledNavbar } from './styles';

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <StyledNavbar>
      <Link href='/'>
        <a>Project Shelf</a>
      </Link>

      <RightSection>
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
          <Link href='/login'>
            <a>
              <Button>Login</Button>
            </a>
          </Link>
        )}
      </RightSection>
    </StyledNavbar>
  );
};

export default Navbar;
