import React from "react";
import { Grid2 } from "@mui/material";
import LoginForm from "../components/LoginForm";
import apartmentPhoto from "../assets/ApartmentPhoto.jpeg";

const HomePage = () => {
  return (
    <Grid2 className="grid place-items-center w-full h-full">
      <div
        className="grid grid-cols-2 gap-3
       w-full max-w-2x1"
      >
        {/* Left Column */}
        <Grid2 className="grid place-items-center">
          <img
            className="loginPhoto"
            src={apartmentPhoto}
            alt="A stylish urban apartment building with large glass windows and balconies, surrounded by tall, leafy green trees. The building has a sleek, contempora.webp"
          />
        </Grid2>
        {/*Right Column */}
        <Grid2
          sx={{ bgcolor: "#83a2a7" }}
          className="grid place-items-center min-w-0 w-full"
        >
          <div className="w-full max-w-md overflow-hidden flex items-center justify-center">
            <LoginForm />
          </div>
        </Grid2>
      </div>
    </Grid2>
  );
};

export default HomePage;
