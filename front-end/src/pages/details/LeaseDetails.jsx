import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { fetchLeaseDetails } from "../../api/leaseApi";
import Spinner from "../../components/Spinner";
import LeaseApartmentDetails from "../../components/leaseDetails/LeaseApartmentDetails";
import LeaseDetailsHeader from "../../components/leaseDetails/LeaseDetailsHeader";
import LeaseDuration from "../../components/leaseDetails/LeaseDuration";
import LeaseRent from "../../components/leaseDetails/LeaseRent";
import LeaseTenantDetails from "../../components/leaseDetails/LeaseTenantDetails";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
const Lease = () => {
  const { id } = useParams();
  const [lease, setLease] = useState(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaseInfo() {
      try {
        // if (location.state && location.state.message) {
        //   toast.success("Lease signed successfully");
        // }
        const lease = await fetchLeaseDetails(id);
        setLease(lease);
        setIsLoading(false);
      } catch (err) {
        return err;
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeaseInfo(id);
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh", p: 2 }}>
      <Button
        component={Link}
        to={`/lease-pdf-details/${id}`}
        variant="contained"
        sx={{
          display: "flex",
          marginLeft: "auto",
          marginBottom: "5px",
          width: "15%",
          p: 1,
        }}
      >
        View PDF
      </Button>

      <LeaseDetailsHeader status={lease.leaseStatus} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          border: 1,
          p: 2,
        }}
      >
        <LeaseApartmentDetails apartment={lease.apartmentInformation} />
        <LeaseTenantDetails tenant={lease.tenantInformation} />
      </Box>

      <LeaseDuration startDate={lease.leaseStartDate} endDate={lease.leaseEndDate} />

      <LeaseRent rent={lease.monthlyRent} />
    </Box>
  );
};

export default Lease;
