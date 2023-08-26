import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import Button from '../Button';

import SettingsIcon from '@/public/assets/settings.svg';
import LogOutIcon from '@/public/assets/log-out.svg';
import DashboardIcon from '@/public/assets/dashboard.svg';

const SideNav = () => {
  const router = useRouter();
  const selectedTab = router.pathname;

  return (
    <div className='flex h-full w-72 flex-col justify-between border-r border-r-slate-700 pt-8 pb-8 pr-6 pl-6'>
      <div className='flex flex-col gap-4'>
        <Link href='/'>
          <Button selected={selectedTab == '/'} icon={<DashboardIcon />}>
            Home
          </Button>
        </Link>
        <Link href='/users'>
          <Button selected={selectedTab == '/users'} icon={<DashboardIcon />}>
            Users
          </Button>
        </Link>
        <Link href='/projects'>
          <Button
            selected={selectedTab == '/projects'}
            icon={<DashboardIcon />}
          >
            Projects
          </Button>
        </Link>
        <Link href='/reports'>
          <Button selected={selectedTab == '/reports'} icon={<DashboardIcon />}>
            Reports
          </Button>
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        <Link href='/settings'>
          <Button selected={selectedTab == '/settings'} icon={<SettingsIcon />}>
            Settings
          </Button>
        </Link>
        <Link href='/logout'>
          <Button icon={<LogOutIcon />} onClick={signOut}>
            Log Out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
