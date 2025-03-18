import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import Hero from "../../components/aptdetails/Hero";

const ApartmentDetails = () => {
  // Id took from the URL parameters, used to fetch the specific items
  const { id } = useParams();

  //THIS MOCK DATA WILL NOT BE IN THE PULL REQUEST AND IS JUST FOR TESTING WHILE I BUILD THE COMPONENTS
  const mockApartmentData = {
    id: "APT-1205",
    apartmentNumber: "1205",
    status: "Occupied",   
    leaseEnd: "2025-05-05",
    tenantName: "John Drake",
  };

  return (
    <Box sx={{ p:2 }}>
      <Typography
        component="h1"
        align="left"
        sx={{ fontWeight: "bold", fontSize: "2rem" }}
      >
        Apartment details for: {id}
      </Typography>
      <Hero apartmentData={mockApartmentData} />
    </Box>
  );
};

export default ApartmentDetails;
