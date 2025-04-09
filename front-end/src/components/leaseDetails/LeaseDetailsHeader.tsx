import { Box, Grid2, Typography } from "@mui/material";

const LeaseDetailsHeader = ({ status }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        borderRadius: "5px 5px 0px 0px",
        bgcolor: "#e3e7d3",
      }}
    >
      <Typography>Lease Summary</Typography>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <p>Status: {status}</p>
      </Grid2>
    </Box>
  );
};

export default LeaseDetailsHeader;
