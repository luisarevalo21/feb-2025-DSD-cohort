import { Route, Routes } from "react-router";
import Complaints from "./pages/Complaints";
import Dashboard from "./pages/Dashboard";
import HomePageLogin from "./pages/HomePageLogin";
import Register from "./pages/Register";
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
        <Route path="register" element={<Register />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
