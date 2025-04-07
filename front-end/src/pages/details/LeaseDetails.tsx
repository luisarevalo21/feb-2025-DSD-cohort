import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { fetchLeaseDetails } from "../../api/leaseApi";
import Spinner from "../../components/Spinner";
import LeaseApartmentDetails from "../../components/leaseDetails/LeaseApartmentDetails";
import LeaseDetailsHeader from "../../components/leaseDetails/LeaseDetailsHeader";
import LeaseDuration from "../../components/leaseDetails/LeaseDuration";
import LeaseRent from "../../components/leaseDetails/LeaseRent";
import LeaseTenantDetails from "../../components/leaseDetails/LeaseTenantDetails";

interface Lease {
  leaseId: string;
  leaseStartDate: Date;
  leaseEndDate: Date;
  leaseStatus: string;
  monthlyRent: number;
  leaseNotes: string | null;
  tenantInformation: {
    tenantId: string;
    tenantName: string;
    phoneNumber: string | null;
    email: string;
  } | null;
  apartmentInformation: {
    apartmentId: string;
    apartmentNumber: string;
    apartmentAddress: string;
    squareFootage: number;
    bedrooms: number;
    bathrooms: number;
    floor: number;
    features: string[] | null;
    apartmentNotes: string | null;
  } | null;
  
}

const LeaseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lease, setLease] = useState<Lease | null>(null);
  // const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLeaseInfo() {
      try {
        // if (location.state && location.state.message) {
        //   toast.success("Lease signed successfully");
        // }
        const leaseData = await fetchLeaseDetails(id);
        if (leaseData?.response?.data?.message === "Lease not found.") {
          return navigate("/not-found");
        }
        setLease(lease);
        setIsLoading(false);
      } catch (err) {
        return err;
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeaseInfo();
  }, [id, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", minHeight: "90vh", p: 2 }}
    >
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
          backgroundColor: "#4a5460",
        }}
      >
        View PDF
      </Button>

      <Box sx={{ border: 0.5, borderRadius: 1 }}>
        <LeaseDetailsHeader status={lease?.leaseStatus} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <LeaseApartmentDetails apartment={lease?.apartmentInformation} />
          <LeaseTenantDetails tenant={lease?.tenantInformation} />
        </Box>

        <LeaseDuration
          startDate={lease?.leaseStartDate}
          endDate={lease?.leaseEndDate}
        />

        <LeaseRent rent={lease?.monthlyRent} />
      </Box>
    </Box>
  );
};

export default LeaseDetails;
