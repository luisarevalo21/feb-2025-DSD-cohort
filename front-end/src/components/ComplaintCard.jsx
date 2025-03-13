import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box
} from '@mui/material';

//Complaint type icons
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; //Noise
import WarningIcon from '@mui/icons-material/Warning'; //Disturbance
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'; //Emergency
import BuildIcon from '@mui/icons-material/Build'; //Maintenance
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

//Map complaint type enum to their corresponding icons and colors
const complaintTypeIcons = {
    Noise: <VolumeUpIcon fontSize='small' sx={{ color: "purple" }} />,
    Disturbance: <WarningIcon fontSize='small' sx={{ color: "red" }} />,
    Emergency: <PriorityHighIcon fontSize='small' sx={{ color: "orange" }} />,
    Maintenance: <BuildIcon fontSize='small' sx={{ color: "blue" }} />,
    Other: <HelpOutlineIcon fontSize='small' sx={{ color: "gray" }} />,
}

//Colors for each status
const statusColors = {
    New: "blue",
    "In Progress": "orange",
    Resolved: "green",
}


const ComplaintCard = ({ complaint }) => {
    const {
        complaint_type,
        timestamp,
        description,
        status,
    } = complaint;

    //choose an icon based on the complaint type or default to "other"
    const iconElement = complaintTypeIcons[complaint_type] || <HelpOutlineIcon fontSize='small' sx={{ color: "gray" }} />;

    //Format the timestamp in Month, Day, Year format
    const dateString = new Date(timestamp).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    //We only want to show the first 50 characters of the description on these cards, unless it's already shorted than 50 characters
    const shortDescription = description && description.length > 250 ? description.slice(0,250) + "..." : description;


    return (
        <Card sx={{ display: "flex", flexDirection: "column", height: "100%", border: "1px solid #ccc", borderRadius: 1, boxShadow: 1, }}>
            <CardContent sx={{ flexGrow: 1 }}>
                {/* date complaint was submitted  */}
                <Typography variant='caption' color='text.secondary'>
                    {dateString}
                </Typography>

                {/* Complaint type and corresponding icon  */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb:2 }}>
                    {iconElement}
                    <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: "bold" }}>
                        {complaint_type}
                    </Typography>
                </Box>

                {/* The first 50 characters of the potentially longer description.  */}
                <Typography variant='body2' sx={{ mb: 2 }}>
                    {shortDescription}
                </Typography>

                {/* Complaint status  */}
                <Typography variant='body2' sx={{ fontWeight: "bold", color: statusColors[status] || "text.primary", }}>
                    {status}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button variant='contained' size="small">
                    View Details
                </Button>
            </CardActions>
        </Card>
    )







}

export default ComplaintCard;