import { Typography, Grid2, Card, CardContent } from "@mui/material";
import React from "react";

// const Details = ({ apartmentData }) => {
//   const { floorPlanName, squareFootage, bedrooms, bathrooms, floor } =
//     apartmentData;

//   return (
//     <Box
//       className=" text-white text-center py-3 text-lg font-semibold rounded-lg"
//       bgcolor={"#697A21"}
//       sx={{
//         border: "2px solid black",
//         p: 2,
//         display: "flex",
//         flexDirection: "column",
//         textAlign: "center",
//         flex: 1,
//         overflow: "hidden",
//       }}
//     >
//       <Typography variant="h2" sx={{ fontWeight: "bold" }}>
//         Details
//       </Typography>

//       <Divider sx={{ bgcolor: "#ede7f6", my: 2 }} />

//       <Typography variant="h4">Layout: {floorPlanName}</Typography>
//       <Typography variant="h4">Sq. Ft: {squareFootage}</Typography>
//       <Typography variant="h4">Beds: {bedrooms}</Typography>
//       <Typography variant="h4">Baths: {bathrooms}</Typography>
//       <Typography variant="h4">Floor: {floor}</Typography>
//     </Box>
//   );
// };

const Details = ({ apartmentData }) => {
  const { floorPlanName, squareFootage, bedrooms, bathrooms, floor } =
    apartmentData;
  return (
    <React.Fragment>
      <Card sx={{ height: 300 }}>
        <Typography
          className=" text-white text-center py-3 text-lg font-semibold rounded-t-lg"
          bgcolor={"#697A21"}
        >
          Details
        </Typography>
        <CardContent className="p-4 space-y-3 text-center text-xl-1 font-semi-bold text-gray-800">
          <Grid2 container direction="column">
            <p>
              <strong>Layout: </strong>
              {floorPlanName}
            </p>
            <p>
              <strong>Sq. Ft: </strong>
              {squareFootage}
            </p>
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
