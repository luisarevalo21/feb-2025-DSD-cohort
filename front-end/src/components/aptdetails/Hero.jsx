import {
  Typography,
  Grid2,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Link } from "react-router";
import React from "react";

const Hero = ({ apartmentData }) => {
  const parseAddress = (fullAddress) => {
    if (!fullAddress)
      return {
        address1: "Street Address",
        address2: "City, State",
        address3: "ZIP Code",
      };

    const parts = fullAddress.split(",").map((part) => part.trim());
    return {
      address1: `${parts[0] || "Street Address"} #${apartmentData?.apartmentNumber}`,
      address2: parts[1] || "City",
      address3: parts[2] || "State",
      address4: parts[3] || "ZIP Code",
    };
  };

  const {
    apartmentNumber,
    leaseId,
    leaseStatus = "No Status",
    leaseEndDate,
    tenantId,
    tenantName,
    floorPlanImg,
    apartmentAddress,
  } = apartmentData;

  const { address1, address2, address3, address4 } =
    parseAddress(apartmentAddress);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusColor =
    leaseStatus === "Vacant" || leaseStatus === "Pending" ? "red" : "green";

  const leaseEnd = new Date(leaseEndDate);
  const today = new Date();
  const daysLeft = (leaseEnd - today) / (1000 * 60 * 60 * 24);
  const leaseExpirationColor = daysLeft <= 30 ? "red" : "green";

  return (
    <React.Fragment>
      <Card sx={{ height: "auto" }}>
        <Typography
          className=" text-white text-center py-3 text-lg font-semibold rounded-t-lg"
          bgcolor={"#108C21"}
        >
          Details
        </Typography>
        <CardContent className="text-xl-1 font-semi-bold text-gray-800">
          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 5 }} sx={{ p: 2, position: "relative" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Apartment {apartmentNumber}
              </Typography>

              <p>{address1}</p>
              <p>
                {address2}, {address3}
              </p>
              <p>{address4}</p>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 5 }} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <strong>Status: </strong>
                {leaseId ? (
                  <Link to={`/lease-details/${leaseId}`} className="underline">
                    <span style={{ color: statusColor }}>{leaseStatus}</span>
                  </Link>
                ) : (
                  <span style={{ color: statusColor }}>{leaseStatus}</span>
                )}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <strong>Lease Expires: </strong>
                {leaseEndDate ? (
                  <span style={{ color: leaseExpirationColor }}>
                    {leaseEndDate}
                  </span>
                ) : (
                  <span style={{ color: "black" }}>N/A</span>
                )}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <strong>Current Occupant: </strong>
                {tenantId ? (
                  <Link
                    to={`/tenant-details/${tenantId}`}
                    className="underline"
                  >
                    <span style={{ color: "green" }}>{tenantName}</span>
                  </Link>
                ) : (
                  <span style={{ color: "black" }}>N/A</span>
                )}
              </Typography>
            </Grid2>
            <Grid2
              size={{ xs: 12, md: 2 }}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={floorPlanImg}
                alt="Floor Plan 1"
                style={{
                  maxWidth: "160px",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
              />

              <IconButton
                aria-label="Zoom Floor Plan"
                onClick={() => setIsModalOpen(true)}
              >
                <AddCircleOutlineIcon sx={{ color: "green" }} />
              </IconButton>
            </Grid2>
          </Grid2>
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <img
              src={floorPlanImg}
              alt="Floor Plan Large"
              style={{
                maxWidth: "80vw",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          </Dialog>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Hero;
