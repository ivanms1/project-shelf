import React from 'react';

import Footer from '../Footer';
import Navbar from '../Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
