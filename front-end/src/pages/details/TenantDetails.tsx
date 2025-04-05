import React, { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import TenantLeaseDetails from "../../components/TenantLeaseDetails";
import TenantProfileDetails from "../../components/TenantProfileDetails";
import { fetchTenantInformation } from "../../api/tenantApi";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date | null;
  phoneNumber: string | null;
  additionalInformation: string | null;
  leaseId: string | null;
}

const TenantDetails: React.FC = () => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTenantInfo() {
      try {
        const tenantData = await fetchTenantInformation(id);
        if (tenantData?.response?.data?.message === "Tenant not found.") {
          return navigate("/not-found");
        }
        setTenant(tenantData);
      } catch (err) {
        return err;
      } finally {
        setIsLoading(false);
      }
    }
    fetchTenantInfo();
  }, [id, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Grid2 container spacing={2} padding={2} className="min-h-screen">
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TenantProfileDetails tenant={tenant} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TenantLeaseDetails tenant={tenant} />
      </Grid2>
    </Grid2>
  );
};

export default TenantDetails;
