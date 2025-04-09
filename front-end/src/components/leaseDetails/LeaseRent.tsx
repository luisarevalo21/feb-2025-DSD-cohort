import { Box, Grid2, Typography } from "@mui/material";

const LeaseRent = ({ rent }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        borderRadius: "0px 0px 5px 5px",
      }}
    >
      <Typography>Rent</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid2 size={{ xs: 12, md: 20 }}>
          <Typography>Payable on</Typography>
          <p>First of every month</p>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 20 }}>
          <Typography>Current Rent</Typography>
          <p>${rent} per month</p>
        </Grid2>
      </Box>
    </Box>
  );
};

export default LeaseRent;
