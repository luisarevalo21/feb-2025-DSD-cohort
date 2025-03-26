import { Typography, Grid2, Card, CardContent } from "@mui/material";
import React from "react";

const Details = ({ apartmentData }) => {
  const { squareFootage, bedrooms, bathrooms, floor } = apartmentData;

  return (
    <React.Fragment>
      <Card sx={{ height: 350 }}>
        <Typography
          className=" text-white text-center py-3 text-lg font-semibold rounded-t-lg"
          bgcolor={"#206129"}
        >
          Details
        </Typography>
        <CardContent className="p-4 space-y-3 text-center text-xl-1 font-semi-bold text-gray-800">
          <Grid2>
            <h2>
              <strong>Sq. Ft: </strong>
              {squareFootage}
            </h2>
            <p>
              <strong>Beds: </strong>
              {bedrooms}
            </p>
            <p>
              <strong>Baths: </strong>
              {bathrooms}
            </p>
            <p>
              <strong>Floor: </strong>
              {floor}
            </p>
          </Grid2>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Details;
