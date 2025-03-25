import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import api from "../../api";
import {
  complaintTypeIcons,
  statusColors,
} from "../../components/ComplaintCard";
import Spinner from "../../components/Spinner";

const ComplaintDetails = () => {
  const { id: complaintId } = useParams();
  const navigate = useNavigate();

  const {
    isPending,
    error,
    data: complaint,
  } = useQuery({
    queryKey: ["complaint", complaintId],
    queryFn: async () => {
      const result = await api.get(`/api/complaints/${complaintId}`);
      return result.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: () => api.put(`/api/complaints/${complaintId}`),
    onSuccess: (data) => {
      toast.success(data.message || "Complaint solved successfully");
      navigate("/complaints");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred. Please try again");
    },
  });

  const handleSolveIssue = () => {
    mutate();
  };

  const iconElement = complaintTypeIcons[complaint?.complaint_type] || (
    <HelpOutlineIcon fontSize="small" sx={{ color: "gray" }} />
  );

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <div>An error occurred. Please try again</div>;
  }

  return (
    <Box>
      <Typography
        component="h1"
        align="left"
        sx={{ fontWeight: "bold", fontSize: "2rem", mb: 2 }}
      >
        Complaint Details
      </Typography>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <Box
            sx={{
              backgroundColor: "#1976D2",
              color: "white",
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="div">
              {complaint?.complaint_type}
            </Typography>
            {iconElement}
          </Box>

          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CalendarTodayIcon
                fontSize="small"
                sx={{ mr: 1, color: "gray" }}
              />
              <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                Submitted on: {complaint?.date_submitted}
              </Typography>
            </Box>

            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {complaint?.description}
            </Typography>

            <Typography
              sx={{
                mb: 2,
                color: statusColors[complaint?.status] || "text.primary",
              }}
            >
              Status: {complaint?.status}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PersonIcon fontSize="small" sx={{ mr: 1, color: "gray" }} />
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Submitted by:
              </Typography>
            </Box>
            <Typography variant="body2">
              {complaint?.tenant?.first_name} {complaint?.tenant?.last_name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Email: {complaint?.tenant?.email}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Phone: {complaint?.tenant?.phone_number}
            </Typography>
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
            {complaint?.status !== "Resolved" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSolveIssue}
              >
                Solve Issue
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default ComplaintDetails;
