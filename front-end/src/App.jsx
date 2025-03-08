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

function App() {
  return (
    <Routes>
      {/* Public routes  */}
        <Route path="login" element={<HomePageLogin />} />
        <Route path="register" element={<Register />} />
      {/* Protected Routes wrapped by RootLayout. ALL "details" pages must include "detail" in the path name for navbar state."  */}
      <Route path="/" element={<RootLayout />}>
        {/* Default page(index route ) */}
        <Route index element={<Dashboard />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="example" element={<Example />} />
      </Route>
    </Routes>
  );
}

export default App;
