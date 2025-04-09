import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, TextField } from "@mui/material";
import logo from "../assets/logo_background_removed.png";

const MainHeader = () => {
  return (
    <header className="w-full bg-gray-200 flex items-center justify-end px-4 py-2">
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
          <NotificationsIcon style={{ color: "white" }} />
        </IconButton>

        <img src={logo} alt="Our site logo" className="h-14" />
      </div>
    </header>
  );
};

export default MainHeader;
