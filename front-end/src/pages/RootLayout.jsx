import React from "react";

import Navbar from "../components/Navbar";
import MainHeader from "../components/MainHeader";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

