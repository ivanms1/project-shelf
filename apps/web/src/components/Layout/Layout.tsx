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
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
