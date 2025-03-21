import { Box, Grid2 } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchLease } from "../../api/leaseApi";
import Spinner from "../../components/Spinner";
import LeaseDetailsHeader from "../../components/leaseDetails/LeaseDetailsHeader";
import LeaseApartmentDetails from "../../components/leaseDetails/LeaseApartmentDetails";
import LeaseTenantDetails from "../../components/leaseDetails/LeaseTenantDetails";
import LeaseDuration from "../../components/leaseDetails/LeaseDuration";
import LeaseRent from "../../components/leaseDetails/LeaseRent";

const Lease = () => {
  // Id took from the URL parameters, used to fetch the specific item
  const { id } = useParams();
  const [lease, setLease] = useState(null);

  useEffect(() => {
    console.log("useEffect");
    async function fetchLeaseInfo() {
      try {
        const lease = await fetchLease(id);
        console.log(lease)
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh", p:2 }}>
      {/* <Grid2 container spacing={2} padding={2} className="min-h-screen"> */}
        {/* <Grid2 size={{ xs: 12, md: 6 }}>
          Lease Summary : 
          <p>Status: {lease.leaseStatus}</p>
        </Grid2> */}
        <LeaseDetailsHeader status={lease.leaseStatus} />


        {/* <Grid2 size={{ xs: 12, md: 6 }}>
          Apartment Details:
          <p>Apt. #: {lease.apartmentInformation.apartmentNumber}</p>
          <p>Address: {lease.apartmentInformation.apartmentAddress}</p>
        </Grid2> */}
        
        
        {/* <Grid2 size={{ xs: 12, md: 6 }}>
          Tenant:
          <p>Name: {lease.tenantInformation.tenantName}</p>
        </Grid2> */}

        <Box sx={{ 
          display: "flex", 
          justifyContent: 'space-between', 
          border: 1,
          p:2 }}
        >
          <LeaseApartmentDetails apartment={lease.apartmentInformation}/>
          <LeaseTenantDetails tenant={lease.tenantInformation}/>
        </Box>


        {/* <Grid2 size={{ xs: 12, md: 6 }}>
          Length of Agreement:
          <p>Start Date: {lease.leaseStartDate}</p>
          <p>End Date: {lease.leaseEndDate}</p>
        </Grid2> */}
        <LeaseDuration startDate={lease.leaseStartDate} endDate={lease.leaseEndDate}/>


        {/* <Grid2 size={{ xs: 12, md: 6 }}>
          Rent:
          <p>Payable on: I dunno how to determine this</p>
          <p>Current Rent: ${lease.monthlyRent} per month</p>
        </Grid2> */}
        <LeaseRent rent={lease.monthlyRent}/>
      {/* </Grid2> */}
    </Box>
  );
};

export default Lease;