import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ApartmentTable from "../components/tables/ApartmentTable";

const Dashboard = () => {
  return (
    <>
      <Typography
        component="h1"
        align="left"
        fontWeight={"bold"}
        fontSize={"2rem"}
        marginBottom={"2rem"}
      >
        Dashboard
      </Typography>

      <Grid container spacing={10}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Upcoming Renewals
          </Typography>
          <Box p={10} border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <Typography>hello from left box</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Pending Leases
          </Typography>
          <Box p={10} border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <Typography>hello from right box</Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4" fontSize={"1.5rem"} marginBottom={"1rem"}>
            Apartments Info
          </Typography>
          <Box border={"1px solid black"} bgcolor={"#f5f5f5"}>
            <ApartmentTable />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
