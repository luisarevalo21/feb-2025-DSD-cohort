import React from "react";
import { TextField, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo1 from "../assets/dwellify-high-resolution-logo.png";

const MainHeader = () => {
  return (
    //<header> tag, main container for the bar
    //w-full for full width(tailwind)
    //px and py for horizontal and vertical padding
    //flex items-center justify-end uses flexbox, centers items vertically, and aligns them to the right
    <header className="w-full flex items-center justify-end px-4 py-2">
      <div className="flex items-center space-x-4">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        />

        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <img src={logo1} alt="Our site logo" className="h-16" />
      </div>
    </header>
  );
};

export default MainHeader;
