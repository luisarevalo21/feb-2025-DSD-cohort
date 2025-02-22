import React from "react";

import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <Box>
      <NavLink to="/">Home</NavLink>
      <NavLink to="dashboard">Dashboard</NavLink>
      <NavLink to="complaints">Complaints</NavLink>
    </Box>
  );
};

export default Navbar;
