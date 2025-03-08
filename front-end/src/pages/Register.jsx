import React from "react";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styled from "@mui/system/styled";
import SignupForm from "../components/SignupForm";

import placeholder from "../assets/placeholder.jpg";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  border: "1px solid",
  borderColor: "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
    borderColor: "#444d58",
  }),
})); 

const Register = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid size={{ xs: 12, md: 6 }}>
          <img src={placeholder} alt="" width={"100%"} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SignupForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
