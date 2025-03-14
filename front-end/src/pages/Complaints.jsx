import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import ComplaintCard from '../components/ComplaintCard';

const Complaints = () => {
  //some generated dummy complaints objects that match the current state of the backend schema, for testing my new card component. This part will be replaced with a fetch from the backend.
  const dummyComplaints = [
    {
      id: 1,
      apt_num: 101,
      complaint_type: "Noise",
      description:
        "Description of submitted complaint, this can display quite a few characters here to give a basic idea for what the complaint is about.",
      location: "Living Room",
      timestamp: "2024-06-13T12:00:00Z",
      status: "New",
      admin_response: null,
      priority: "Medium",
    },
    {
      id: 2,
      apt_num: 202,
      complaint_type: "Disturbance",
      description:
        "Resident is causing disturbance in the hallway. It happens frequently and is affecting the neighbors.",
      location: "Hallway",
      timestamp: "2024-06-13T15:30:00Z",
      status: "In Progress",
      admin_response: null,
      priority: "High",
    },
    {
      id: 3,
      apt_num: 303,
      complaint_type: "Emergency",
      description:
        "Water pipe burst in the kitchen causing flooding, immediate attention required!",
      location: "Kitchen",
      timestamp: "2024-06-14T09:45:00Z",
      status: "New",
      admin_response: null,
      priority: "Urgent",
    },
    {
      id: 4,
      apt_num: 404,
      complaint_type: "Maintenance",
      description:
        "AC unit not working, the apartment is extremely hot and we need a repair soon. It's been broken for a few days.",
      location: "Apartment 404",
      timestamp: "2024-06-15T08:10:00Z",
      status: "Resolved",
      admin_response: "Technician dispatched and problem resolved.",
      priority: "Low",
    },
    {
      id: 5,
      apt_num: 505,
      complaint_type: "Other",
      description:
        "Some other type of complaint that doesn't quite fit in the other categories. Possibly an administrative issue.",
      location: "Leasing Office",
      timestamp: "2024-06-16T11:00:00Z",
      status: "New",
      admin_response: null,
      priority: "Medium",
    },
  ];
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
