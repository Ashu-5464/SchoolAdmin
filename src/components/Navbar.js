import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  // Menu,
  // MenuItem,
  // Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = ({ toggleSidebar }) => {
  // const [anchorEl, setAnchorEl] = useState(null); // State to control the profile menu

  // const executiveName = localStorage.getItem("executiveName");

  // Handle profile menu opening
  // const handleProfileMenuClick = (event) => {
  //   setAnchorEl(event.currentTarget); // Open the menu on profile icon click
  // };

  // // Handle menu item close
  // const handleMenuClose = () => {
  //   setAnchorEl(null); // Close the profile menu
  // };

  const navigate = useNavigate();

  const openNotification = () => {
    navigate("/view-notification");
  };

  return (
    <AppBar
      position="fixed"
      style={{
        zIndex: 1201,
        height: "64px",
        backgroundColor: "#333",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: "bold" }}>
          School Admin Panel
        </Typography>

        {/* Notification Button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="notification"
          title="Notifications"
          sx={{
            marginRight: "0px",
            "&:hover": {
              color: "#000000",
              backgroundColor: "#f5f5f5",
              borderRadius: 3,
            },
          }}
          onClick={openNotification}
        >
          <NotificationsIcon />
          <Typography variant="subtitle2" ml={0} fontWeight={"bold"}>
            Notifications
          </Typography>
        </IconButton>

        {/* Profile Button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="profile"
          // onClick={handleProfileMenuClick} // Open the profile menu
        >
          <AccountCircleIcon />
          {/* <Typography style={{ flexGrow: 1, fontWeight: "bold" }}>
            {executiveName}
          </Typography> */}
        </IconButton>

        {/* Profile Menu */}
        {/* <Menu
          anchorEl={anchorEl} // Menu anchor (the profile button)
          open={Boolean(anchorEl)} // Open menu if anchorEl is set
          onClose={handleMenuClose} // Close menu
        >
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
