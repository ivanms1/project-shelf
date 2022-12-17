import React from 'react';

import Navbar from '../Navbar';

import { layoutStyle } from './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={layoutStyle}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
