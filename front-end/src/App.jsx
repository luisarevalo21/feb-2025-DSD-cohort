import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import RootLayout from "./pages/RootLayout";
import Register from "./pages/Register";
import Example from "./reactQueryExample";
function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="complaints" element={<Complaints />}></Route>
        <Route path="example" element={<Example />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
