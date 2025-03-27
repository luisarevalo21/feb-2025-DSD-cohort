import { Card, CardContent, Grid2, Typography } from "@mui/material";
import React from "react";

const Details = ({ apartmentData }) => {
  const { squareFootage, bedrooms, bathrooms, floor } = apartmentData;

  return (
    <React.Fragment>
      <Card sx={{ height: 350, border: 0.5 }}>
        <Typography
          className="text-center py-3 text-lg font-semibold"
          bgcolor={"#e3e7d3"}
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
