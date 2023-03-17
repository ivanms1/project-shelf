import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '../../components/Button';

import Settings from '../../../public/assets/settings.svg';
import LogOut from '../../../public/assets/log-out.svg';
import Dashboard from '../../../public/assets/dashboard.svg';
import Users from '../../../public/assets/users.svg';

const SideNav = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(router.pathname);

  return (
    <div className='w-72 h-full pt-8 pb-8 pr-6 pl-6 bg-white flex flex-col justify-between border-r-[1px] border-gray-200'>
      <div className='flex flex-col gap-4'>
        <Link href='/dashboard'>
          <Button
            selected={selectedTab == '/dashboard'}
            onClick={() => {
              setSelectedTab('/dashboard');
            }}
            icon={<Dashboard />}
          >
            Dashboard
          </Button>
        </Link>
        <Link href='/users'>
          <Button
            selected={selectedTab == '/users'}
            onClick={() => {
              setSelectedTab('/users');
            }}
            icon={<Users />}
          >
            Users
          </Button>
        </Link>
        <Link href='/projects'>
          <Button
            selected={selectedTab == '/projects'}
            onClick={() => {
              setSelectedTab('/projects');
            }}
            icon={<Dashboard />}
          >
            Projects
          </Button>
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        <Link href='/settings'>
          <Button
            selected={selectedTab == '/settings'}
            onClick={() => {
              setSelectedTab('/settings');
            }}
            icon={<Settings />}
          >
            Settings
          </Button>
        </Link>
        <Link href='/logout'>
          <Button icon={<LogOut />}>Log Out</Button>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
