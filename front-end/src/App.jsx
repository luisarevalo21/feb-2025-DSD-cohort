import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import HomePageLogin from "./pages/HomePageLogin";
import Register from "./pages/Register";
import RootLayout from "./pages/RootLayout";
import Example from "./reactQueryExample";
import LeasePage from "./pages/LeasePage";


function App() {
  return (
    <Routes>
      {/* Public routes  */}
        <Route path="login" element={<HomePageLogin />} />
        <Route path="register" element={<Register />} />
      {/* Protected Routes wrapped by RootLayout. ALL "details" pages must include "detail" in the path name for navbar state."  */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePageLogin />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="complaints" element={<Complaints />}></Route>
        <Route path="example" element={<Example />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="leases" element={<LeasePage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
