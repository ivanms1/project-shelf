import React from "react";
import Navbar from "../Navbar";

import { StyledLayout } from "./styles";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <StyledLayout>
      <Navbar />
      {children}
    </StyledLayout>
  );
};

export default Layout;
