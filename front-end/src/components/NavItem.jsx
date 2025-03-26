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
              backgroundColor: "#E3E7D3",
              color: "#4A5460",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : "auto",
              justifyContent: "center",
              "&.active": {
                color: "#E3E7D3",
              },
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
