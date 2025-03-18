import { Box, Typography, Divider, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


const Hero = ({ apartmentData }) => {

    const {
        id,
        apartmentNumber,
        status,
        leaseEnd,
        tenantName
    } = apartmentData;

    const address1 = `515 East Broadway #${apartmentNumber}`;
    const address2 = "Eugene, Oregon";
    const address3 = "97401"

    const statusColor = status === "Occupied" ? "red" : "green";

    const leaseEndDate = new Date(leaseEnd);
    const today = new Date();
    const daysLeft = (leaseEndDate - today) / (1000 * 60 * 60 * 24);
    const leaseExpirationColor = daysLeft <= 30 ? "red" : "green";

    return (
        <Box sx={{
            display: "flex",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: 1,
            overflow: "hidden"
        }}
        >
            {/* Left section  */}
            <Box sx={{ flex: 3, p: 2, position: "relative" }}>
                <Typography
                  variant="body2"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                >
                    ID: {id}
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Apartment {apartmentNumber}
                </Typography>

                <Typography>{address1}</Typography>
            </Box>
        </Box>
    )



}

export default Hero;