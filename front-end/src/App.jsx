import { Route, Routes } from "react-router";
import Complaints from "./pages/Complaints";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import Example from "./reactQueryExample";
function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="complaints" element={<Complaints />}></Route>
        <Route path="example" element={<Example />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
