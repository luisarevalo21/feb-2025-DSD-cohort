import React from "react";
import { CardContent, Typography, Card, Grid2 } from "@mui/material";
import PropTypes from "prop-types";

const TenantProfileDetails = ({ tenant }) => {
  return (
    <React.Fragment>
      <Card sx={{ height: 300 }}>
        <Typography
          className=" text-white text-center py-3 text-lg font-semibold rounded-t-lg"
          bgcolor={"#206129"}
        >
          Personal Information
        </Typography>
        <CardContent className="p-4 space-y-3 text-center text-xl-1 font-semi-bold text-gray-800">
          <Grid2 container spacing={2} padding={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <p>
                <strong>First Name: </strong> {tenant.firstName}
              </p>
              <p>
                <strong>Last Name: </strong>
                {tenant.lastName}
              </p>
              <p>
                <strong>Phone Number: </strong> {tenant.phoneNumber}
              </p>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <p>
                <strong>Email: </strong>
                {tenant.email}
              </p>
              <p>
                <strong>Birthday: </strong>
                {tenant.dateOfBirth}
              </p>
              <p>
                <strong>Additional Info: </strong>{" "}
                {tenant.additionalInformation}
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
