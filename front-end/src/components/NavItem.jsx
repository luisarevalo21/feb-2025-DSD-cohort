//This component is just a helper component for the left navigation bar, to keep the code cleaner.
import React, { useState } from 'react';
import {
    Drawer,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Tooltip
} from '@mui/material';
//Icons
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/DashBoard'
import LockIcon from '@mui/icons-material/Lock';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';

