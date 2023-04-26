import React from 'react';
import Footer from '../Footer';

import Navbar from '../Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='grid min-h-screen grid-rows-[auto_1fr_auto]'>
      <Navbar />
      <div className='bg-black'>
        <div className='max-w-screen-2xl mx-auto'>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
