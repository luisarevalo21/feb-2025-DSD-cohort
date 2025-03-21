import { Navigate, Outlet } from "react-router";

const EnsureGuest = () => {
  const isLogged = localStorage.getItem("isLogged");
  return isLogged ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default EnsureGuest;
