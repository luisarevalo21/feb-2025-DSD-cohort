import React from "react";

import Navbar from "../components/Navbar";
import MainHeader from "../components/MainHeader";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header section  */}
      <MainHeader />
      
      {/* Main content section  */}
      <div className="flex flex-1">
        {/* Side navigation(placeholder for now)  */}
        <aside className="w-64 bg-blue-200 p-4">
          <div className="text-center font-semibold">Side nav placeholder</div>
        </aside>
        {/* Content for the page  */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;

