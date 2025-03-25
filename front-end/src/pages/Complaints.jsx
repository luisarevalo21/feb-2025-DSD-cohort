import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import ComplaintCard from "../components/ComplaintCard";
import Spinner from "../components/Spinner";

const Complaints = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      const result = await api.get("/api/complaints");
      return result.data;
    },
  });
  if (isPending) return <Spinner />;

  if (error)
    return <Typography>An error has occurred: {error.message} </Typography>;
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
        {data?.length > 0 ? (
          data.map((complaint) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={complaint.id}>
              <ComplaintCard complaint={complaint} />
            </Grid>
          ))
        ) : (
          <Typography>No complaints found</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Complaints;
