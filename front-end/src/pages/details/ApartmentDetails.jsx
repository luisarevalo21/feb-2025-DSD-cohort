import { useState, useEffect } from "react";
import { Box, Grid2 } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import Hero from "../../components/aptdetails/Hero";
import Details from "../../components/aptdetails/Details";
import Features from "../../components/aptdetails/Features";
import Notes from "../../components/aptdetails/Notes";
import { fetchApartmentDetailsById } from "../../api/apartmentApi";
//The valid types are 1bed1bath, 2bed2bath, 3bed2bath(default)
import one_bed_one_bath from "../../assets/floorplans/1bed1bath.png";
import two_bed_two_bath from "../../assets/floorplans/2bed2bath.png";
import three_bed_two_bath from "../../assets/floorplans/3bed2bath.png";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apartmentData, setApartmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApartmentDetailsById(id);
        if (result?.response?.data?.message === "Apartment not found.") {
          return navigate("/not-found");
        }
        if (result.status !== 200) {
          toast.error("Failed to fetch apartment details");
          return;
        }
        let floorPlan = three_bed_two_bath; //defaults to 3 bed 2 bath in case an invalid combo is given
        if (result.data.bedrooms === 1 && result.data.bathrooms === 1) {
          floorPlan = one_bed_one_bath;
        } else if (result.data.bedrooms === 2 && result.data.bathrooms === 2) {
          floorPlan = two_bed_two_bath;
        }

        setApartmentData({
          ...result.data,
          floorPlanImg: floorPlan,
        });
      } catch (error) {
        toast.error("Failed to fetch apartment details", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <Spinner />
      </Box>
    );
  }

  if (!apartmentData) {
    return <div>Error loading apartment data from apartment with id: {id}</div>;
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", minHeight: "90vh", p: 2 }}
    >
      <Hero apartmentData={apartmentData} />

      <Grid2
        container
        spacing={2}
        sx={{ flex: 1, minHeight: 0, mt: 4, alignItems: "stretch" }}
      >
        <Grid2
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Details apartmentData={apartmentData} />
        </Grid2>

        <Grid2
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Features apartmentData={apartmentData} />
        </Grid2>

        <Grid2
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Notes apartmentData={apartmentData} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ApartmentDetails;
