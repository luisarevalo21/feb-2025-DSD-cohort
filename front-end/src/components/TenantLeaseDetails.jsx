import { Card, CardContent, Grid2, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router";

const TenantLeaseDetails = ({ tenant }) => {
  return (
    <React.Fragment>
      <Card sx={{ height: 300, border: 0.5 }}>
        <Typography
          className="text-center py-3 text-lg font-semibold"
          bgcolor={"#e3e7d3"}
        >
          Lease Details
        </Typography>
        <CardContent className="p-4 space-y-3 text-center text-xl-1 font-semi-bold text-gray-800">
          <Grid2 container spacing={2} padding={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <p>
                <strong>Apartment Number: </strong>
                <Link
                  className="underline"
                  to={`/apartment-details/${tenant?.apartment?.apartmentId}`}
                >
                  {tenant?.apartment?.apartmentNumber}
                </Link>
              </p>
              <p>
                <strong>Monthly Rent: </strong>$
                {tenant?.leaseInformation?.rentAmount}
              </p>
              <p>
                <strong>Additional Info: </strong>
                {tenant?.leaseInformation?.notes}
              </p>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <p>
                <strong>Lease Start: </strong>
                {tenant?.leaseInformation?.leaseStartDate}
              </p>
              <p>
                <strong>Lease End: </strong>
                {tenant?.leaseInformation?.leaseEndDate}
              </p>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

TenantLeaseDetails.propTypes = {
  tenant: PropTypes.shape({
    apartment: PropTypes.shape({
      apartmentNumber: PropTypes.string,
    }),
    leaseInformation: PropTypes.shape({
      rentAmount: PropTypes.number,
      notes: PropTypes.string,
      leaseStartDate: PropTypes.string,
      leaseEndDate: PropTypes.string,
    }),
  }),
};

export default TenantLeaseDetails;
