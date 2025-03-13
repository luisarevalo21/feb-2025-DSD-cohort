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

//Map complaint type enum to their corresponding icons
const complaintTypeIcons = {
    Noise: <VolumeUpIcon fontSize='small' />,
    Disturbance: <WarningIcon fontSize='small' />,
    Emergency: <PriorityHighIcon fontSize='small' />,
    Maintenance: <BuildIcon fontSize='small' />,
    Other: <HelpOutlineIcon fontSize='small' />
}


const ComplaintCard = ({ complaint }) => {
    const {
        complaint_type,
        timestamp,
        description,
        status,
    } = complaint;

    //choose an icon based on the complaint type or default to "other"
    const iconElement = complaintTypeIcons[complaint_type] || <HelpOutlineIcon fontSize='small' />;

    //Format the timestamp in Month, Day, Year format
    const dateString = new Date(timestamp).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numberic",
    })

    //We only want to show the first 50 characters of the description on these cards, unless it's already shorted than 50 characters
    const shortDescription = description && description.length > 50 ? description.slice(0,50) + "..." : description;


    return (
        
    )







}