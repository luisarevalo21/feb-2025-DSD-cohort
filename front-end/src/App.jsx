import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import HomePageLogin from "./pages/HomePageLogin";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import RootLayout from "./pages/RootLayout";
import Register from "./pages/Register";
import Example from "./reactQueryExample";
import LeasePage from "./pages/LeasePage";

function App() {
  return (
    <Routes>
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
