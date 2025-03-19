import React from "react";
import { CardContent, Typography, Card, Grid2 } from "@mui/material";
import PropTypes from "prop-types";

const TenantLeaseDetails = ({ tenant }) => {
  return (
    <React.Fragment>
      <Card>
        <Typography className="bg-gray-500 text-white text-center py-3 text-lg font-semibold rounded-t-lg">
          Lease Details
        </Typography>
        <CardContent className="p-4 space-y-3 text-center text-xl-1 font-semi-bold text-gray-800">
          <Grid2 container spacing={2} padding={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <p>Apartment Number: {tenant.apartmentNumber}</p>
              <p>Monthly Rent: {tenant.rentAmount}</p>{" "}
              <p>Additional Info:{tenant.notes}</p>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <p>Lease Start: {tenant.leaseStartDate}</p>
              <p>Lease End: {tenant.leaseEndDate}</p>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

TenantLeaseDetails.propTypes = {
  tenant: PropTypes.shape({
    apartmentNumber: PropTypes.string,
    rentAmount: PropTypes.number,
    notes: PropTypes.string,
    leaseStartDate: PropTypes.string,
    leaseEndDate: PropTypes.string,
  }),
};

export default TenantLeaseDetails;
