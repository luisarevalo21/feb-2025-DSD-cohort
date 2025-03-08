import React from "react";
import MainHeader from "../components/MainHeader";
import SideNavigation from "../components/SideNavigation";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <div className="flex flex-1">
        <SideNavigation />
          <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;

