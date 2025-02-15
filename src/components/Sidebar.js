import React, { useState } from "react";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { ExpandLess, ExpandMore, Forum, HomeWork } from "@mui/icons-material";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";

const Sidebar = ({ open, onClose }) => {
  const drawerWidth = 220;
  const navbarHeight = 64;

  const [studentsOpen, setStudentsOpen] = useState(false);
  const [certificatesOpen, setCertificatesOpen] = useState(false);

  const handleStudentsClick = () => {
    setStudentsOpen(!studentsOpen);
  };

  const handleCertificatesClick = () => {
    setCertificatesOpen(!certificatesOpen);
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        style: {
          width: drawerWidth,
          top: navbarHeight,
          height: `calc(100% - ${navbarHeight}px)`,
          backgroundColor: "#1c1c1c",
          color: "#ffffff",
          borderRight: "1px solid #444",
        },
      }}
      aria-label="Sidebar navigation"
    >
      <Box
        sx={{
          flexGrow: 1, // Allows the list to take available space
          overflowY: "auto", // Enables scrolling for the list
        }}
      >
        <List>
          <ListItem
            button
            component={Link}
            to="/dashboard"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <SpeedIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider
            sx={{ backgroundColor: "white", marginLeft: 2, marginRight: 2 }}
          />
          <ListItem
            button
            component={Link}
            to="/schools-list"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <SchoolIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Schools" />
          </ListItem>

          <ListItem
            button
            onClick={handleStudentsClick}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <PersonIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Students" />
            {studentsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          {/* Collapsible Options */}
          <Collapse in={studentsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/students-list"
                onClick={onClose}
                sx={{
                  pl: 6,
                  color: "#ffffff",
                  "&:hover": {
                    color: "#000000",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 3,
                  },
                }}
              >
                <ListItemText primary="Student Information" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/generate-id-card"
                onClick={onClose}
                sx={{
                  pl: 6,
                  color: "#ffffff",
                  "&:hover": {
                    color: "#000000",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 3,
                  },
                }}
              >
                <ListItemText primary="Generate ID Card" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/student-promotion"
                onClick={onClose}
                sx={{
                  pl: 6,
                  color: "#ffffff",
                  "&:hover": {
                    color: "#000000",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 3,
                  },
                }}
              >
                <ListItemText primary="Promote Students" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/previous-students"
                onClick={onClose}
                sx={{
                  pl: 6,
                  color: "#ffffff",
                  "&:hover": {
                    color: "#000000",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 3,
                  },
                }}
              >
                <ListItemText primary="Previous Students" />
              </ListItem>
            </List>
          </Collapse>

          <Divider
            sx={{ backgroundColor: "white", marginLeft: 2, marginRight: 2 }}
          />
          <ListItem
            button
            component={Link}
            to="/calendar"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <CalendarMonthIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/attendance"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <CalendarTodayIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Attendance" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/reports"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <SummarizeIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Reports" />
          </ListItem>

          <Divider
            sx={{ backgroundColor: "white", marginLeft: 2, marginRight: 2 }}
          />

          {/* Home Work Component */}
          <ListItem
            button
            component={Link}
            to="/view-homework"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <HomeWork style={{ marginRight: "8px" }} />
            <ListItemText primary="Homework" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/examination"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <AssignmentIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Examination" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/library"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <LibraryBooksIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Library" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/fees"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <CurrencyRupeeIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Fees" />
          </ListItem>

          <Divider
            sx={{ backgroundColor: "white", marginLeft: 2, marginRight: 2 }}
          />

          <ListItem
            button
            onClick={handleCertificatesClick}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <WorkspacePremiumIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Certificates" />
            {certificatesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          {/* Collapsible Options */}
          <Collapse in={certificatesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/students-certificates"
                onClick={onClose}
                sx={{
                  pl: 6,
                  color: "#ffffff",
                  "&:hover": {
                    color: "#000000",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 3,
                  },
                }}
              >
                <ListItemText primary="Student certificates" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/teachers-certificates"
                onClick={onClose}
                sx={{
                  pl: 6,
                  color: "#ffffff",
                  "&:hover": {
                    color: "#000000",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 3,
                  },
                }}
              >
                <ListItemText primary="Teacher Certificates" />
              </ListItem>
            </List>
          </Collapse>

          <Divider
            sx={{ backgroundColor: "white", marginLeft: 2, marginRight: 2 }}
          />

          {/* Subscription Component */}
          <ListItem
            button
            component={Link}
            to="/subscription-plan"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <SubscriptionsIcon style={{ marginRight: "8px" }} />
            <ListItemText primary="Subscription" />
          </ListItem>

          {/* Software Enquiry Component */}
          <ListItem
            button
            component={Link}
            to="/softWare-enquiry"
            onClick={onClose}
            sx={{
              color: "#ffffff",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#000000",
              },
            }}
          >
            <Forum style={{ marginRight: "8px" }} />
            <ListItemText primary="Software Enquiry" />
          </ListItem>
        </List>
      </Box>

      {/* Sticky User Section */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "auto",
          borderTop: "2px solid #444",
          backgroundColor: "#1c1c1c",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="/images/Picture1.jpg" // Replace with dynamic avatar URL
            alt=""
            sx={{ width: 32, height: 32, margin: "8px" }}
          />
          <ListItemText
            primary="Ashwini" // Replace with dynamic user name
            sx={{
              span: { fontSize: "14px", color: "#ffffff", fontWeight: "bold" },
            }}
          />
        </Box>
        <IconButton sx={{ color: "#ffffff" }}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
