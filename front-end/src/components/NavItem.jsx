import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, text, icon, open, onClick }) => {
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Tooltip title={!open ? text : ""} placement="right">
        <ListItemButton
          onClick={onClick}
          component={NavLink}
          to={to}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
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
  );
};

export default NavItem;
