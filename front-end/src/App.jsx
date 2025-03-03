import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import HomePageLogin from "./pages/HomePageLogin";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import RootLayout from "./pages/RootLayout";
import Example from "./reactQueryExample";
function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePageLogin />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="complaints" element={<Complaints />}></Route>
        <Route path="example" element={<Example />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
