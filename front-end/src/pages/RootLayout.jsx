import React from "react";

import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
const RootLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>{/* if needed */}</footer>
    </>
  );
};

export default RootLayout;
