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

