import { Grid2 } from "@mui/material";
import TenantLeaseDetails from "../../components/TenantLeaseDetails";
import TenantProfileDetails from "../../components/TenantProfileDetails";
import { fetchTenantInformation } from "../../api/tenantApi";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const TenantDetails = () => {
  const [tenant, setTenant] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTenantInfo() {
      try {
        const tenant = await fetchTenantInformation(id);
        if (tenant?.response?.data?.message === "Tenant not found.") {
          return navigate("/not-found");
        }
        setTenant(tenant);
      } catch (err) {
        return err;
      } finally {
        setIsLoading(false);
      }
    }
    fetchTenantInfo(id);
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
