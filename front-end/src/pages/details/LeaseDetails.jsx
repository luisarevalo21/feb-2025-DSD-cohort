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

const Lease = () => {
  const { id } = useParams();
  const [lease, setLease] = useState(null);

  useEffect(() => {
    async function fetchLeaseInfo() {
      try {
        const lease = await fetchLeaseDetails(id);
        setLease(lease);
      } catch (err) {
        return err;
      }
    }
    fetchLeaseInfo(id);
  }, [id]);

  if (!lease) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", minHeight: "90vh", p: 2 }}
    >
      <Button
        component={Link}
        to={`/lease-details/${id}`}
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

      <LeaseDuration
        startDate={lease.leaseStartDate}
        endDate={lease.leaseEndDate}
      />

      <LeaseRent rent={lease.monthlyRent} />
    </Box>
  );
};

export default Lease;
