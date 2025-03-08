//This component is just a helper component for the left navigation bar, to keep the code cleaner.
import React, { useState } from 'react';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip
} from '@mui/material';
//Icons
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