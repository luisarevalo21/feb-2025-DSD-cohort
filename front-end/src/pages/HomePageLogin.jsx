import React from "react";
import { Typography, Grid2 } from "@mui/material";
import apartmentPhoto from "../assets/ApartmentPhoto.jpeg";

const HomePage = () => {
  return (
    <Grid2 container spacing={2} className="grid-container">
      {/* Left Column */}
      <Grid2 item size={6}>
        <img
          className="loginPhoto"
          src={apartmentPhoto}
          alt="A stylish urban apartment building with large glass windows and balconies, surrounded by tall, leafy green trees. The building has a sleek, contempora.webp"
        />
      </Grid2>
      {/*Right Column */}
      <Grid2 item size={6} sx={{ bgcolor: "#83a2a7" }}>
        <Typography>LogIn Component goes here</Typography>
      </Grid2>
    </Grid2>
  );
};

export default HomePage;
