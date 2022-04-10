import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import { APOLLO_STATE_PROP_NAME } from '../../../apollo/index';
import HamburgerIcon from '../Icons/Hamburger';
import CloseIcon from '../Icons/Close';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout } = useIsLoggedIn();

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <nav className='navbar'>
        <Link href='/'>
          <a className='nav-logo'>
            <Image
              src={'/assets/images/shelf.png'}
              alt='project shelf logo'
              height={50}
              width={50}
            />
          </a>
        </Link>
        <div onClick={handleClick} className='nav-icon'>
          {open ? <CloseIcon /> : <HamburgerIcon />}
        </div>
        <ul className={open ? 'nav-links active' : 'nav-links'}>
          <li className='nav-item'>
            <Link href='/'>
              <a onClick={closeMenu} className='nav-link'>
                Search
              </a>
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/about'>
              <a onClick={closeMenu} className='nav-link'>
                About
              </a>
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className='nav-item'>
                <Link href='/create-project'>
                  <a className='nav-link'>Add Project</a>
                </Link>
              </li>
              <li className='nav-item'>
                <a className='nav-link' onClick={logout}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li className='nav-item'>
              <a
                className='nav-link'
                onClick={() => {
                  closeMenu;
                  signIn();
                }}
              >
                Login
              </a>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        .navbar {
          height: 60px;
          width: 100%;
          background: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2.5rem;
          font-size: 1rem;
        }

        .nav-links {
          width: 100%;
          display: flex;
          justify-content: end;
          list-style: none;
        }
        .nav-link {
          margin: 0 10px;
          text-decoration: none;
          color: black;
          transition: 0.3s all;
          cursor: pointer;
        }
        .nav-link:hover {
          text-decoration: underline;
        }
        .nav-icon {
          display: none;
          font-size: 2rem;
          cursor: pointer;
        }
        .nav-logo {
          cursor: pointer;
        }
        @media only screen and (max-width: 580px) {
          .navbar {
            position: relative;
            z-index: 9999;
          }
          .nav-links {
            display: flex;
            flex-direction: column;
            position: absolute;
            text-align: center;
            width: 100%;
            top: 45px;
            left: -100%;
            transition: 0.5s all;
            grid-gap: 0;
            padding-left: 0;

            cursor: pointer;
          }
          .nav-links.active {
            background: black;
            left: 0;
          }
          .nav-link {
            color: white;
          }
          .nav-item {
            padding: 18px 0;
            border-bottom: 1px solid salmon;
          }
          .nav-icon {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};
export default Navbar;
