// import React from "react";
// import { Box, IconButton } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PersonIcon from "@mui/icons-material/Person";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import WorkIcon from "@mui/icons-material/Work";
// import PieChartIcon from "@mui/icons-material/PieChart";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import SettingsIcon from "@mui/icons-material/Settings";
// import BookIcon from "@mui/icons-material/Book";
// import EditIcon from "@mui/icons-material/Edit";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

// const IconBar = () => {
//   const icons = [
//     { icon: <AddIcon />, color: "success.main" },
//     { icon: <CheckCircleIcon />, color: "success.dark" },
//     { icon: <PersonIcon />, color: "info.main" },
//     { icon: <MonetizationOnIcon />, color: "warning.main" },
//     { icon: <ThumbUpIcon />, color: "primary.main" },
//     { icon: <WorkIcon />, color: "warning.dark" },
//     { icon: <PieChartIcon />, color: "error.main" },
//     { icon: <ChatBubbleIcon />, color: "text.secondary" },
//     { icon: <NotificationsIcon />, color: "warning.light" },
//     { icon: <SettingsIcon />, color: "info.dark" },
//     { icon: <BookIcon />, color: "warning.main" },
//     { icon: <EditIcon />, color: "error.main" },
//     { icon: <InsertDriveFileIcon />, color: "primary.dark" },
//   ];

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-around",
//         alignItems: "center",
//         backgroundColor: "primary.dark",
//         padding: "10px",
//         borderRadius: "5px",
//         boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       {icons.map((item, index) => (
//         <IconButton
//           key={index}
//           sx={{
//             backgroundColor: item.color,
//             color: "white",
//             "&:hover": {
//               backgroundColor: item.color,
//               opacity: 0.8,
//             },
//           }}
//         >
//           {item.icon}
//         </IconButton>
//       ))}
//     </Box>
//   );
// };

// export default IconBar;

import React from "react";
import { Box, IconButton } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import WorkIcon from "@mui/icons-material/Work";
import PieChartIcon from "@mui/icons-material/PieChart";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const IconBar = () => {
  const icons = [
    {
      icon: <ApartmentIcon titleAccess="Register School" />,
      color: "success.main",
    },
    { icon: <CheckCircleIcon />, color: "success.dark" },
    { icon: <PersonIcon titleAccess="Students" />, color: "info.main" },
    { icon: <MonetizationOnIcon />, color: "warning.main" },
    { icon: <ThumbUpIcon />, color: "primary.main" },
    { icon: <WorkIcon />, color: "warning.dark" },
    { icon: <PieChartIcon />, color: "error.main" },
    { icon: <ChatBubbleIcon titleAccess="Enquiry" />, color: "text.secondary" },
    {
      icon: <NotificationsIcon titleAccess="Notification" />,
      color: "warning.light",
    },
    { icon: <SettingsIcon titleAccess="Setting" />, color: "info.dark" },
    { icon: <AutoStoriesIcon titleAccess="Library" />, color: "warning.main" },
    {
      icon: <InsertDriveFileIcon titleAccess="Reports" />,
      color: "primary.dark",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px", // Space between icons
        padding: "10px",
        backgroundColor: "primary.dark",
        borderRadius: "5px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        "@media (max-width: 600px)": {
          gap: "20px", // Reduce space for smaller screens
        },
      }}
    >
      {icons.map((item, index) => (
        <IconButton
          key={index}
          sx={{
            backgroundColor: item.color,
            color: "white",
            "&:hover": {
              backgroundColor: item.color,
              opacity: 0.8,
            },
            width: "50px",
            height: "50px",
            "@media (max-width: 600px)": {
              width: "40px", // Reduce size for smaller screens
              height: "40px",
            },
          }}
        >
          {item.icon}
        </IconButton>
      ))}
    </Box>
  );
};

export default IconBar;
