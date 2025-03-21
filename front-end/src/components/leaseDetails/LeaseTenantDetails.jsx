import { Box, Typography, Grid2 } from "@mui/material";

const LeaseTenantDetails = ({ tenant }) => {
  return (
    <Box>
      <Typography>Tenant</Typography>
      <Grid2 size={{ xs: 12, md: 20 }}><p>{tenant.tenantName}</p></Grid2>
    </Box>
  );
};

export default LeaseTenantDetails;