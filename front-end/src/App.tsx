import { Route, Routes } from "react-router";
import EnsureAuth from "./auth/EnsureAuth";
import EnsureGuest from "./auth/EnsureGuest";
import RootLayout from "./layouts/RootLayout.tsx";
import AccessControlPage from "./pages/AccessControlPage";
import AccountSettings from "./pages/AccountSettings";
import Complaints from "./pages/Complaints";
import CreateLeasePage from "./pages/CreateLeasePage";
import Dashboard from "./pages/Dashboard";
import HomePageLogin from "./pages/HomePageLogin";
import LeaseView from "./pages/LeaseView";
import NotFoundPage from "./pages/NotFoundPage";
import Register from "./pages/Register";
import RenewLeasePage from "./pages/RenewLeasePage";
import ApartmentDetails from "./pages/details/ApartmentDetails";
import ComplaintDetails from "./pages/details/ComplaintDetails";
import LeaseDetails from "./pages/details/LeaseDetails";
import TenantDetails from "./pages/details/TenantDetails";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />}></Route>

      <Route element={<EnsureGuest />}>
        <Route path="/" element={<HomePageLogin />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<EnsureAuth />}>
        <Route element={<RootLayout />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="complaints" element={<Complaints />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="access-control" element={<AccessControlPage />}></Route>
          <Route path="settings" element={<AccountSettings />}></Route>
          <Route
            path="apartment-details/:id"
            element={<ApartmentDetails />}
          ></Route>
          <Route path="lease-details/:id" element={<LeaseDetails />}></Route>
          <Route path="lease-pdf-details/:id" element={<LeaseView />}></Route>
          <Route path="tenant-details/:id" element={<TenantDetails />}></Route>
          <Route
            path="complaint-details/:id"
            element={<ComplaintDetails />}
          ></Route>
          <Route path="create-lease/:id" element={<CreateLeasePage />}></Route>
          <Route path="renew-lease/:id" element={<RenewLeasePage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
