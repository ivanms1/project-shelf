import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import Button from '../../components/Button';

import Settings from '@/public/assets/settings.svg';
import LogOut from '@/public/assets/log-out.svg';
import Dashboard from '@/public/assets/dashboard.svg';
import Users from '@/public/assets/users.svg';

const SideNav = () => {
  const router = useRouter();
  const selectedTab = router.pathname;

  return (
    <div className='flex h-full w-72 flex-col justify-between border-r border-gray-200 bg-white pt-8 pb-8 pr-6 pl-6'>
      <div className='flex flex-col gap-4'>
        <Link href='/dashboard'>
          <Button selected={selectedTab == '/dashboard'} icon={<Dashboard />}>
            Dashboard
          </Button>
        </Link>
        <Link href='/users'>
          <Button selected={selectedTab == '/users'} icon={<Users />}>
            Users
          </Button>
        </Link>
        <Link href='/projects'>
          <Button selected={selectedTab == '/projects'} icon={<Dashboard />}>
            Projects
          </Button>
        </Link>
        <Link href='/reports'>
          <Button selected={selectedTab == '/reports'} icon={<Dashboard />}>
            Reports
          </Button>
        </Link>
      </div>

      <div className='flex flex-col gap-4'>
        <Link href='/settings'>
          <Button selected={selectedTab == '/settings'} icon={<Settings />}>
            Settings
          </Button>
        </Link>
        <Link href='/logout'>
          <Button icon={<LogOut />} onClick={signOut}>
            Log Out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
