import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
//commenting out stylesheet since we're not using it and doing this makes it "full screen"
// import "./App.css";
import { Routes, Route } from "react-router";
import HomePageLogin from "./pages/HomePageLogin";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import RootLayout from "./pages/RootLayout";
import Register from "./pages/Register";
import Example from "./reactQueryExample";
function App() {
  return (
    <Routes>
      {/* Public routes  */}
        <Route path="login" element={<HomePageLogin />} />
        <Route path="register" element={<Register />} />
      {/* Protected Routes wrapped by RootLayout  */}
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
