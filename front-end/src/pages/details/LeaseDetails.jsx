import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import LeaseView from "../LeaseView";
import Spinner from "../../components/Spinner";
import { fetchLeaseDetails } from "../../api/leaseApi";
const LeaseDetails = () => {
  const { id } = useParams();
  const [LeaseDetails, setLeaseDetails] = useState(null);

  useEffect(() => {
    const fetchLease = async () => {
      try {
        const lease = await fetchLeaseDetails(id);
        setLeaseDetails(lease);
      } catch (err) {
        return err;
      }
    };
    fetchLease();
  }, []);

  if (!LeaseDetails) {
    return <Spinner />;
  }
  console.log(LeaseDetails);
  return (
    <Box>
      <Typography component="h1" align="left" sx={{ fontWeight: "bold", fontSize: "2rem" }}>
        Lease Details for: {id}
      </Typography>
      <Typography>
        Lease Status
        <Typography
          sx={{
            borderRadius: "5px",
            color: "white",
            display: "inline",
            padding: "0.5rem",
            backgroundColor: LeaseDetails.leaseStatus ? "green" : "red",
          }}
        >
          {LeaseDetails.leaseStatus ? "Active" : "Not Active"}
        </Typography>
      </Typography>
      <LeaseView leaseData={LeaseDetails} />
    </Box>
  );
};

export default LeaseDetails;
