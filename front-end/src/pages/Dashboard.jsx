import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import api from "../api";
const Dashboard = () => {
  const [expiredLeases, setExpiredLeases] = useState([]);

  //fetches expired leases from backend
  useEffect(() => {
    const fetchExpiredLeases = async () => {
      api
        .get("/api/dashboard/expiringLeases")
        .then(res => {
          setExpiredLeases(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    fetchExpiredLeases();
  }, []);
  return (
    <>
      <Typography> hello from Dashboard page!</Typography>

      <Grid container spacing={2}>
        <Grid size={6}>
          <Box p={10} border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <Typography>hello from left box</Typography>

            {expiredLeases.length === 0 ? (
              <Typography>no expired leases</Typography>
            ) : (
              expiredLeases.map(lease => (
                <Box key={lease.id}>
                  <Typography>{lease.lease_end_date}</Typography>
                </Box>
              ))
            )}
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
