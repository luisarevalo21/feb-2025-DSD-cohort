import { Box, Typography, Divider, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import floorplan1 from '../../assets/floorplans/floorplan1.png'
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';

const Hero = ({ apartmentData }) => {

    const {
        id,
        apartmentNumber,
        status,
        leaseEnd,
        tenantName
    } = apartmentData;

    const [open, setOpen] = useState(false);
    //hardcoded address, in variables so it can be changed
    const address1 = `515 East Broadway #${apartmentNumber}`;
    const address2 = "Eugene, Oregon";
    const address3 = "97401"

    const statusColor = status === "Occupied" ? "red" : "green";

    const leaseEndDate = new Date(leaseEnd);
    const today = new Date();
    const daysLeft = (leaseEndDate - today) / (1000 * 60 * 60 * 24);
    const leaseExpirationColor = daysLeft <= 30 ? "red" : "green";

    return (
        <Box>
            <Box sx={{
                display: "flex",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: 1,
                overflow: "hidden",
            }}
            >
                {/* Left section  */}
                <Box sx={{ flex: 3, p: 2, position: "relative" }}>
                    <Typography
                    variant="h6"
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                    }}
                    >
                        ID: {id}
                    </Typography>

                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        Apartment {apartmentNumber}
                    </Typography>

                    <Typography variant="h6">{address1}</Typography>
                    <Typography variant="h6">{address2}</Typography>
                    <Typography variant="h6">{address3}</Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box sx={{ flex: 3, p:2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        <strong>Status: </strong>
                        <span style={{ color: statusColor }}>{status}</span>
                    </Typography>
                    
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        <strong>Lease Expires: </strong>
                        <span style={{ color: leaseExpirationColor }}>{leaseEnd}</span>
                    </Typography>

                    <Typography variant="h5" sx={{ mb: 1 }}>
                        <strong>Current Occupant: </strong>
                        <span style={{ color: "green" }}>{tenantName}</span>
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem />

                <Box
                sx={{
                    flex: 1,
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                >
                    <img
                    src={floorplan1}
                    alt="Floor Plan 1"
                    style={{
                        maxWidth: "160px",
                        maxHeight: "150px",
                        objectFit: "contain",
                    }}
                    />

                    <IconButton aria-label="Zoom Floor Plan" onClick={() => setOpen(true)}>
                        <AddCircleOutlineIcon sx={{ color: "green" }} />
                    </IconButton>
                </Box>
                
            </Box>

            {/* Dialog/modal for enlarged image */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <img
                  src={floorplan1}
                  alt="Floor Plan Large"
                  style={{
                    maxWidth: "80vw",
                    maxHeight: "80vh",
                    objectFit: "contain",
                  }}
                />
            </Dialog>
        </Box>
    )



}

export default Hero;