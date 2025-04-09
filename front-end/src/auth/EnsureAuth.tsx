import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import api from "../api/index";
import type { Admin } from "../types";

const EnsureAuth = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: user,
  } = useQuery<Admin>({
    queryKey: ["user"],
    queryFn: () =>
      api.get<{ user: Admin }>("/users/me").then((res) => res.data.user),
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
