import { useState, useEffect } from "react";
import { Box, Grid2 } from "@mui/material";
import { useParams } from "react-router";
import Hero from "../../components/aptdetails/Hero";
import Details from '../../components/aptdetails/Details';
import Features from "../../components/aptdetails/Features";
import Notes from "../../components/aptdetails/Notes";
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
    //for hero
    id: "APT-1205",
    apartmentNumber: "1205",
    status: "Occupied",   
    leaseEnd: "2025-03-20",
    tenantName: "John Drake",
    floorPlanImg: floorPlan,
    //for details
    layout: "3-2-B-SHARED",
    squareFootage: 1047,
    bedrooms: 3,
    bathrooms: 2,
    floor: 12,
    features: [
      "In-unit Washer and Dryer",
      "55-inch LG TV",
      "Oven",
      "Microwave Oven",
      "Fridge/Freezer Combo",
      "Mini Fridge",
      "Walk-out balcony",
      "Fully Furnished"
    ],
    notes: "Overlooks the pool. Next to boiler room. Lorem ipsum whatever whatever long string."
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh", p:2 }}>

      <Hero apartmentData={mockApartmentData} />
      
      <Grid2 container spacing={2} sx={{ flex: 1, minHeight: 0, mt: 4 , alignItems: "stretch" }}>
        <Grid2 size={{ xs: 12, md: 4 }} sx={{ display: "flex", flexDirection: "column"}}>
          <Details apartmentData={mockApartmentData} />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4}} sx={{ display: "flex", flexDirection: "column"}}>
          <Features apartmentData={mockApartmentData} />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4}} sx={{ display: "flex", flexDirection: "column"}}>
          <Notes apartmentData={mockApartmentData} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ApartmentDetails;
