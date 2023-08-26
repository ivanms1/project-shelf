import useIsLoggedIn from '@/hooks/useIsLoggedIn';
import React from 'react';

import Navbar from '../Navbar';
import SideNav from '../SideNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isLoggedIn } = useIsLoggedIn();

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className='flex h-screen w-screen flex-row'>
      <SideNav />

      <div className='flex h-full w-full flex-col'>
        <Navbar />

        <div className='h-full w-full flex-1 p-[30px]'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
