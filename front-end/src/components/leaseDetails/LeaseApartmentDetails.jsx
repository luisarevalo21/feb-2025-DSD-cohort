import { Box, Typography, Grid2 } from "@mui/material";

const LeaseApartmentDetails = ({ apartment }) => {
  return (
    <Box>
      <Typography>Apartment Details</Typography>
      <Grid2 size={{ xs: 12, md: 20 }}>
        <p>Apt. #: {apartment.apartmentNumber}</p>
        <p>Address: {apartment.apartmentAddress}</p>
      </Grid2>
    </Box>
  );
};

export default LeaseApartmentDetails;
