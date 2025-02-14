import React from "react";
import { Box, Typography } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import InfoIcon from "@mui/icons-material/Info";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const StaffAttendanceOverview = () => {
  const attendanceData = [
    {
      icon: (
        <SentimentSatisfiedAltIcon style={{ fontSize: 40, color: "green" }} />
      ),
      value: 3,
      label: "Total present today",
      color: "green",
    },
    {
      icon: (
        <SentimentDissatisfiedIcon style={{ fontSize: 40, color: "red" }} />
      ),
      value: 0,
      label: "Total absent today",
      color: "red",
    },
    {
      icon: <InfoIcon style={{ fontSize: 40, color: "orange" }} />,
      value: 0,
      label: "Total late arrival today",
      color: "orange",
    },
    {
      icon: <InsertDriveFileIcon style={{ fontSize: 40, color: "blue" }} />,
      value: 0,
      label: "Total on leave today",
      color: "blue",
    },
  ];

  return (
    <Box
      sx={{
        padding: "10px",
        height: "345px",
        backgroundColor: "#f4f6f9",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          //   padding: "5px",
          borderRadius: "5px",
        }}
      >
        Staff Attendance Overview
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          marginTop: "10px",
        }}
      >
        {attendanceData.map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {item.icon}
            <Typography
              variant="h4"
              sx={{ color: item.color, marginTop: "10px", fontWeight: "bold" }}
            >
              {item.value}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StaffAttendanceOverview;
