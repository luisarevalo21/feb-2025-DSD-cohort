import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

const LeasePage = () => {
  return (
    <Box>
      <Typography>hello from lease page</Typography>

      <Grid container spacing={2}>
        <Grid size={6} flexDirection={"column"} display={"flex"}>
          <Typography variant="p">Tenants Name</Typography>
          <Typography variant="p">Lease Date</Typography>
          <Typography variant="p">Rent </Typography>
          <Typography variant="p">Apartment Number</Typography>
        </Grid>

        <Grid size={6}>
          <Box p={10} border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <Typography>lease tempalte goes here</Typography>
          </Box>
        </Grid>

        <Box
          border={"1px solid black"}
          p={1}
          borderRadius={"5px"}
          width={"100%"}
          height={"150px"}
          bgcolor={"#999"}
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
        >
          Sign here
        </Box>

        <Button
          variant="contained"
          sx={{
            marginLeft: "auto",
          }}
        >
          Approve lease
        </Button>
      </Grid>
    </Box>
  );
};

export default LeasePage;
