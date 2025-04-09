import { Card, CardContent, Grid2, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const TenantProfileDetails = ({ tenant }) => {
  return (
    <React.Fragment>
      <Card sx={{ height: 300, border: 0.5 }}>
        <Typography
          className="text-center py-3 text-lg font-semibold"
          bgcolor={"#e3e7d3"}
        >
          Personal Information
        </Typography>
        <CardContent className="p-4 space-y-3 text-center text-xl-1 font-semi-bold text-gray-800">
          <Grid2 container spacing={2} padding={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <h2>
                <strong>First Name: </strong>
                {tenant?.firstName}
              </h2>
              <h2>
                <strong>Last Name: </strong>
                {tenant?.lastName}
              </h2>
              <p>
                <strong>Phone Number: </strong>
                {tenant?.phoneNumber}
              </p>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <p>
                <strong>Email: </strong>
                {tenant?.email}
              </p>
              <p>
                <strong>Birthday: </strong>
                {tenant?.dateOfBirth}
              </p>
              <p>
                <strong>Additional Info: </strong>
                {tenant?.additionalInformation}
              </p>
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
