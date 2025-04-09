import { Box, Grid2, Typography } from "@mui/material";

const LeaseDuration = ({ startDate, endDate }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <Typography>Length of Agreement</Typography>
      <Box sx={{ display: "flex", gap: 4, p: 1 }}>
        <Grid2
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>Start Date</Typography>
          <p>{new Date(startDate).toLocaleDateString()}</p>
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 20 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>End Date</Typography>
          <p>{new Date(endDate).toLocaleDateString()}</p>
        </Grid2>
      </Box>
    </Box>
  );
};

export default LeaseDuration;
