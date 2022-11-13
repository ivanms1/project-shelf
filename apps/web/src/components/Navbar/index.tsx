import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Button } from 'ui';
import { DropDown } from 'ui/DropDown';

import useIsLoggedIn from '@/hooks/useIsLoggedIn';

import { Avatar, PopoverItem, RightSection, StyledNavbar } from './styles';

const Navbar = () => {
  const { isLoggedIn, logout, currentUser } = useIsLoggedIn();
  const [open, setOpen] = useState<boolean>(false);

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
        <Link href='/search'>
          <a>
            <Button variant='secondary'>Search</Button>
          </a>
        </Link>

        {isLoggedIn && (
          <>
            <DropDown
              open={open}
              setOpen={setOpen}
              parent={
                <Avatar
                  src={currentUser?.avatar}
                  width={32}
                  height={32}
                  alt={currentUser?.name}
                />
              }
            >
              <PopoverItem>
                <Link href={`/user/${currentUser?.id}`}>
                  <a>
                    <span>Profile</span>
                  </a>
                </Link>

                <span onClick={logout}>Sign Out</span>
              </PopoverItem>
            </DropDown>
          </>
        )}

        {isLoggedIn ? (
          <>
            <Link href='/create-project'>
              <a>
                <Button>Add Project</Button>
              </a>
            </Link>
          </>
        ) : (
          <Button onClick={() => signIn()}>Login</Button>
        )}
      </RightSection>
    </StyledNavbar>
  );
};

export default Navbar;
