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
    <div className='bg-gray-200 flex flex-row h-screen w-screen'>
      <SideNav />

      <div className='flex flex-col w-full h-full'>
        <Navbar />

        <div className='bg-gray-200 w-full h-full flex-1 p-[30px]'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
