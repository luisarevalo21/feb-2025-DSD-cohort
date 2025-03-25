import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import api from "../api";

const EnsureAuth = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.get("/users/me").then((res) => res.data.user),
    retry: false,
  });

  useEffect(() => {
    if ((!isLoading && !user) || error) {
      localStorage.removeItem("isLogged");
      navigate("/");
    }
  }, [navigate, user, isLoading, error]);

  if (isLoading) return null;
  return user ? <Outlet /> : <Navigate to={"/"} />;
};

export default EnsureAuth;
