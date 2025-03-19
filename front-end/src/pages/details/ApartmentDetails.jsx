import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router";
import Hero from "../../components/aptdetails/Hero";
//import floor plan photos
import floorPlan1 from '../../assets/floorplans/floorplan1.png';
import floorPlan2 from '../../assets/floorplans/floorplan2.png'
import floorPlan3 from '../../assets/floorplans/floorplan3.png';
import floorPlan4 from '../../assets/floorplans/floorplan4.png'
import floorPlan5 from '../../assets/floorplans/floorplan5.png'

const ApartmentDetails = () => {
  // Id took from the URL parameters, used to fetch the specific items
  const { id } = useParams();
  const floorPlans = [floorPlan1, floorPlan2, floorPlan3, floorPlan4, floorPlan5];

  const [floorPlan, setFloorPlan] = useState(null);

  //pick a random floor plan when the component mounts
  useEffect(() => {
    const randIndex = Math.floor(Math.random() * floorPlans.length);
    setFloorPlan(floorPlans[randIndex]);
  }, []);

  //THIS MOCK DATA WILL NOT BE IN THE PULL REQUEST AND IS JUST FOR TESTING WHILE I BUILD THE COMPONENTS
  const mockApartmentData = {
    id: "APT-1205",
    apartmentNumber: "1205",
    status: "Occupied",   
    leaseEnd: "2025-03-20",
    tenantName: "John Drake",
    floorPlanImg: floorPlan,
  };

  return (
    <Box sx={{ p:2 }}>
      <Hero apartmentData={mockApartmentData} />
    </Box>
  );
};

export default ApartmentDetails;
