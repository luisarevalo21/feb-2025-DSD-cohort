import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Dashboard = () => {
  return (
    <>
      <Typography> hello from Dashboard page!</Typography>

      <Grid container spacing={2}>
        <Grid size={6}>
          <Box p={10} border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <Typography>hello from left box</Typography>
          </Box>
        </Grid>

        <Grid size={6}>
          <Box p={10} border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <Typography>hello from right box</Typography>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box p={10} border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <Typography>hello from bottom box</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
