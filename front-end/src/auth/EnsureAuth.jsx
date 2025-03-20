import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import api from "../api";

const EnsureAuth = () => {
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("isLogged");

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.get("/users/me").then((res) => res.data.user),
  });

  useEffect(() => {
    if (!isLoading && !user) {
      localStorage.removeItem("isLogged");
      navigate("/");
    }
  }, [navigate, user, isLoading]);

  return isLogged ? <Outlet /> : <Navigate to={"/"} />;
};

export default EnsureAuth;
