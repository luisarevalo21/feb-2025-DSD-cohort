import React from "react";

import Navbar from "../components/Navbar";
import MainHeader from "../components/MainHeader";
import SideNavigation from "../components/SideNavigation";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    // This setup works but is having some trouble with screen size responsiveness, even when I correct the breakpoints in Register.jsx. I can redo this File
    // using Material UI grid if I really need to...
    <div className="min-h-screen flex flex-col">
      {/* Header section  */}
      {/* Mainheader component already has a <header> inside of it  */}
      <MainHeader />
      
      {/* Main layout area  */}
      <div className="flex flex-1">
        {/* Side nav bar */}
        <SideNavigation />
        
        {/* Content for the page  */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;

