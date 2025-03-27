import DashboardIcon from "@mui/icons-material/Dashboard";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Divider, Drawer, IconButton, List } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import NavItem from "./NavItem";

const DRAWER_WIDTH = 240;

const SideNavigation = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("details")) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [location]);

  const handleExpandCollapse = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      const confirmation = window.confirm("Are you sure?");
      if (!confirmation) {
        return;
      }
      const result = await api.post("/auth/logout");

      if (result.status !== 200) {
        toast.error("An error occurred. Please try again");
      }

      localStorage.removeItem("isLogged");
      toast.success("Logout completed successfully");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "An error occurred. Please try again"
      );
    }
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
          transition: "width 0.3s",
          boxShadow: "2px 5px 10px #4A5460",
          backgroundColor: "#4A90A4",
          color: "#fff",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-end" : "center",
          p: 1,
        }}
      >
        <IconButton onClick={handleExpandCollapse}>
          <MenuIcon style={{ color: "#fff" }} />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        <NavItem
          to="/dashboard"
          text="Dashboard"
          icon={<DashboardIcon sx={{ color: "white" }} />}
          open={open}
        />
        <NavItem
          to="/access-control"
          text="Access Control"
          icon={<LockIcon sx={{ color: "white" }} />}
          open={open}
        />
        <NavItem
          to="/complaints"
          text="Complaints"
          icon={<ReportIcon sx={{ color: "white" }} />}
          open={open}
        />
        <NavItem
          to="/settings"
          text="Account Settings"
          icon={<SettingsIcon sx={{ color: "white" }} />}
          open={open}
        />
      </List>
      <Divider />
      <List>
        <NavItem
          onClick={handleLogout}
          to={""}
          text="Log out"
          icon={<LogoutIcon sx={{ color: "#871411" }} />}
          open={open}
        />
      </List>
    </Drawer>
  );
};

export default SideNavigation;
