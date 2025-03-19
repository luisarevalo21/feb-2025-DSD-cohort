import { Grid2 } from "@mui/material";
import TenantLeaseDetails from "../../components/TenantLeaseDetails";
import TenantProfileDetails from "../../components/TenantProfileDetails";
import { fetchTenantInformation } from "../../api/tenantApi";
import { useEffect, useState } from "react";

const TenantDetails = () => {
  const [tenant, setTenant] = useState(null);
  console.log("tenant", tenant);

  useEffect(() => {
    console.log("useEffect");
    async function fetchTenantInfo() {
      try {
        const { tenant } = await fetchTenantInformation();
        console.log("tenant", tenant);
        setTenant(tenant);
      } catch (err) {
        return err;
      }
    }
    console.log("fetching");
    fetchTenantInfo();
  }, [tenant]);

  if (!tenant) {
    return <div>Loading...</div>;
  }

  return (
    <Grid2 container spacing={2} padding={2} className="min-h-screen">
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TenantProfileDetails data={tenant} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <TenantLeaseDetails data={tenant} />
      </Grid2>
    </Grid2>
  );
};

export default TenantDetails;
