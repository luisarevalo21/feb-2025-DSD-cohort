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
//import helper component
import NavItem from './NavItem';

//fully expanded sidebar width
const DRAWER_WIDTH = 240;


const SideNavigation = () => {
    //open by default for now
    const [open, setOpen] = useState(true);

    //Handler for toggling expanded or collapsed
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? DRAWER_WIDTH : 64,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? DRAWER_WIDTH : 64,
              overflowX: "hidden",
              trainsition: "width 0.3s",
            },
          }}
        >
            {/* Top area with hamburger icon  */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: open ? "flex-end" : "center",
                p:1
              }}
            >
                <IconButton onClick={handleToggle}>
                    <MenuIcon />
                </IconButton>
            </Box>
            <Divider />

            {/* Navigation items  */}
            <List sx={{ flexGrow: 1 }}>
                <NavItem
                  to="/"
                  text="Dashboard"
                  icon={<DashboardIcon />}
                  open={open}
                />
                <NavItem
                  to="/access-control"
                  text="Access Control"
                  icon={<LockIcon />}
                  open={open}
                />
            </List>
        </Drawer>
    )
}


export default SideNavigation;