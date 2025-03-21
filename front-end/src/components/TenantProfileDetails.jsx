import React from "react";
import { CardContent, Typography, Card, Grid2 } from "@mui/material";
import PropTypes from "prop-types";

const TenantProfileDetails = ({ tenant }) => {
  return (
    <React.Fragment>
      <Card>
        <Typography className="bg-gray-500 text-white text-center py-3 text-lg font-semibold rounded-t-lg">
          Personal Information
        </Typography>
        <CardContent className="p-4 space-y-3 text-center text-xl-1 font-semi-bold text-gray-800">
          <Grid2 container spacing={2} padding={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <h2>First Name: {tenant.firstName}</h2>
              <h2>Last Name:{tenant.lastName}</h2>
              <p>Phone Number: {tenant.phoneNumber}</p>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <p>Email: {tenant.email}</p>
              <p>Birthday: {tenant.dateOfBirth}</p>
              <p>Additional Info: {tenant.additionalInformation}</p>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

TenantProfileDetails.propTypes = {
  tenant: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    dateOfBirth: PropTypes.string,
    additionalInformation: PropTypes.string,
  }),
};

export default TenantProfileDetails;
