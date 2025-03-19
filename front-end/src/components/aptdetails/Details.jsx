import { Box, Typography, Divider } from "@mui/material";
import React from "react";

const Details = ({ apartmentData }) => {

    const {
        layout,
        squareFootage,
        bedrooms,
        bathrooms,
        floor,
    } = apartmentData;


    return (
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 2,
            display: "flex",
            flexDirection: "column"
          }}
        >
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                Details
            </Typography>

            <Divider orientation="horizontal" flexItem sx={{mb: 2}}/>

            <Typography variant="h4">Layout: {layout}</Typography>
            <Typography variant="h4">Sq. Ft: {squareFootage}</Typography>
            <Typography variant="h4">Beds: {bedrooms}</Typography>
            <Typography variant="h4">Baths: {bathrooms}</Typography>
            <Typography variant="h4">Floor: {floor}</Typography>
        </Box>
    )
}

export default Details;