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

const NavItem = ({ to, text, icon, open }) => {
    //A helper component for the options in the toolbar
    //props:
    //to = page to navigate to
    //text = text to display by the selection
    //icon = icon to display from MUI library of icons
    return (
        <ListItem disablePadding sx={{ display: "block" }}>
            <Tooltip title={!open ? text : ""} placement="right">
                <ListItemButton
                  component={NavLink}
                  to={to}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    //Highlight the selection if active
                    "&.active": {
                      backgroundColor: "#ede7f6",
                      color: "#4527a0",
                    },
                  }}
                >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : "auto",
                        justifyContent: "center",
                      }}
                    >
                        {icon}
                    </ListItemIcon>
                    {open && <ListItemText primary={text} />}
                </ListItemButton>
            </Tooltip>
        </ListItem>
    )
}

export default NavItem;