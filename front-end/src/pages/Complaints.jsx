import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ComplaintCard from '../components/ComplaintCard';

const Complaints = () => {
  //get data from api
  return (
    <Box>
      <Typography
        component="h1"
        align="left"
        sx={{ fontWeight: "bold", fontSize: "2rem", mb: 2 }}
      >
        Tenant Complaints
      </Typography>

      {/* Scrollable grid of complaint cards */}
      <Grid
        container
        spacing={2}
        sx={{
          maxHeight: "100vh", 
          overflowY: "auto", 
        }}
      >
        {dummyComplaints.map((complaint) => (
          <Grid size={{ xs:12, sm:6, md:4, lg:3 }} key={complaint.id}>
            <ComplaintCard complaint={complaint} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Complaints;
