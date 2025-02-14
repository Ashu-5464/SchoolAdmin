import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Divider,
  IconButton,
  Link,
  Tooltip,
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import "../styles/Dashboard.css";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import CakeIcon from "@mui/icons-material/Cake";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import IconBar from "./IconBar";
import MonthlyIncomeChart from "./dashboardCharts/MonthlyIncomeChart";
import MonthlyExpenseChart from "./dashboardCharts/MonthlyExpenseChart";
import StaffAttendanceOverview from "./dashboardCharts/StaffAttendanceOverview";

// Zoom-in animation for cards
const zoomIn = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`;

const Dashboard = ({ schools }) => {
  const stats = [
    {
      title: "Total Registered Schools",
      value: 10,
      icon: <SchoolIcon fontSize="large" />,
      // bgColor: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
      bgColor: "#E0F7FA",
      textColor: "#004d40",
    },
    {
      title: "Total Student Enquiries",
      value: 20,
      icon: <PeopleIcon fontSize="large" />,
      // bgColor: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
      bgColor: "#FFEBEE",
      textColor: "#2e7d32",
    },
    {
      title: "Total Registered Students",
      value: 30,
      icon: <PersonAddAlt1Icon fontSize="large" />,
      // bgColor: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
      bgColor: "#FFF3E0",
      textColor: "#880e4f",
    },
    {
      title: "Admitted Students",
      value: 40,
      icon: <AssignmentTurnedInIcon fontSize="large" />,
      // bgColor: "linear-gradient(135deg, #ffebee, #ffcdd2)",
      bgColor: "#E3F2FD",
      textColor: "#c62828",
    },
  ];

  const metrics = [
    { label: "Profit This Month", value: "3372" },
    { label: "Income Today", value: "0" },
    { label: "Income This Year", value: "4994" },
    { label: "Profit Today", value: "622" },
    { label: "Profit This Year", value: "3372" },
    { label: "Current Session", value: "2024-2025" },
  ];

  const studentBirthdays = {
    today: [{ name: "John Doe", date: "Jan 8" }],
    upcoming: [{ name: "Jane Smith", date: "Jan 10" }],
    recent: [],
  };

  const teacherBirthdays = {
    today: [],
    upcoming: [{ name: "Mr. Johnson", date: "Jan 12" }],
    recent: [{ name: "Ms. Davis", date: "Jan 5" }],
  };

  const renderBirthdaySection = (title, birthdays) => (
    <>
      <Typography
        variant="body1"
        fontWeight="bold"
        sx={{ marginTop: 2, marginBottom: 1 }}
      >
        {title}
      </Typography>
      {birthdays.length > 0 ? (
        birthdays.map((birthday, index) => (
          <React.Fragment key={index}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2">{birthday.name}</Typography>
              <Typography variant="subtitle2">{birthday.date}</Typography>
            </Box>
            {index < birthdays.length - 1 && <Divider sx={{ marginY: 1 }} />}
          </React.Fragment>
        ))
      ) : (
        <Typography color="textSecondary">No birthdays today!</Typography>
      )}
    </>
  );

  const navigate = useNavigate();

  const handleEnquiryClick = () => {
    navigate("/enquiry"); // Navigate to the enquiry form
  };

  return (
    <div>
      <Grid container justifyContent={"space-between"} sx={{ mb: 1 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="left"
          style={{
            fontWeight: "bold",
            // marginBottom: "15px",
          }}
        >
          Schools Dashboard
        </Typography>
        {/* School Filter */}
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Select School Name</InputLabel>
            <Select
              // value={selectedSchool}
              label="Select School Name"
              // onChange={(e) => {
              //   setSelectedSchool(e.target.value);
              //   setSelectedStandard("");
              //   setSelectedDivision("");
              // }}
            >
              <MenuItem value="" disabled>
                Select School
              </MenuItem>
              {schools.map((school) => (
                <MenuItem key={school.id} value={school.name}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div>
        <IconBar />
      </div>
      <Grid container spacing={1} mt={1}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={3} md={3} key={index}>
            <Card
              sx={{
                // backgroundColor: stat.bgColor,
                // color: stat.textColor,
                borderRadius: 2,
                boxShadow: 2,
                position: "relative",
                transition: "transform 0.3s ease",
                "&:hover": {
                  animation: `${zoomIn} 0.3s forwards`,
                },
              }}
            >
              <CardContent>
                <div
                  style={{
                    display: "flex",
                    // justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* <Tooltip> */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      marginTop: 0.5,
                      color: stat.textColor,
                    }}
                  >
                    {stat.icon}
                  </Typography>
                  {/* </Tooltip> */}
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    fontWeight="bold"
                  >
                    {stat.title}
                  </Typography>
                </div>
                <Typography
                  variant="h5"
                  color="primary"
                  // sx={{ fontWeight: "bold", fontSize: 36 }}
                >
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <div className="dashboard-container">
          <Grid container spacing={1}>
            {metrics.map((metric, index) => (
              <Grid item xs={6} sm={6} md={2} key={index}>
                <Card className="metric-card">
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">
                      {metric.label}
                    </Typography>
                    <Typography variant="h5" color="primary">
                      {metric.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        {/* Additional Widgets */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              boxShadow: 3,
              padding: "20px",
              // background:
              //   "linear-gradient(135deg,rgb(248, 206, 255),rgb(147, 216, 194))",
              background: "#edf5fc",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={"bold"}
              sx={{ marginBottom: 2 }}
            >
              Progress Overview
            </Typography>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              mt={1}
            >
              <Box>
                <Typography fontWeight={"bold"}>
                  Registration Progress
                </Typography>
                <CircularProgress
                  variant="determinate"
                  value={70}
                  size={80}
                  sx={{ color: "#29b6f6" }}
                />
                <Typography align="center">70%</Typography>
              </Box>
              <Box>
                <Typography fontWeight={"bold"}>Admission Progress</Typography>
                <CircularProgress
                  variant="determinate"
                  value={85}
                  size={80}
                  sx={{ color: "#66bb6a" }}
                />
                <Typography align="center">85%</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              // background: "linear-gradient(135deg, #f3e5f5, #ce93d8)",
              // color: "#6a1b9a",
              background: "#fdf2f8",
              boxShadow: 3,
              height: "100%",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                sx={{ marginBottom: 2 }}
                gutterBottom
              >
                Notifications
              </Typography>
              <Divider />
              <Typography variant="body1" mt={1}>
                - School registrations are up by 15% this month!
              </Typography>
              <Typography variant="body1">
                - Reminder: Next admission cycle starts in 3 days.
              </Typography>
              <Typography variant="body1">
                - Staff meeting scheduled for Friday at 10 AM.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Calendar Card */}
        <Grid item xs={12} sm={4} md={4}>
          <Card
            sx={{
              backgroundColor: "#cadcfa",
              borderRadius: 2,
              boxShadow: 2,
              padding: 2,
              height: "195px",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{ color: "#00796B", fontWeight: "bold" }}
              >
                School Academic Year
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
                <CalendarMonthIcon
                  sx={{ color: "#004D40", fontSize: 30, marginRight: 1 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#004D40" }}
                >
                  June 2024 - May 2025
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: "#004D40" }}>
                  Duration 12 Months
                </Typography>
                <IconButton size="small" sx={{ color: "#004D40" }}>
                  <SettingsIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={0}>
        {/* Student Birthdays Card */}
        <Grid item xs={12} sm={4} md={4}>
          <Card
            sx={{
              backgroundColor: "#FFF3E0",
              borderRadius: 2,
              boxShadow: 2,
              padding: 2,
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <CakeIcon sx={{ color: "#FF7043", marginRight: 1 }} />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#BF360C" }}
                >
                  Student Birthdays
                </Typography>
              </Box>
              {renderBirthdaySection("Today", studentBirthdays.today)}
              <Divider />
              {renderBirthdaySection("Upcoming", studentBirthdays.upcoming)}
              <Divider />
              {renderBirthdaySection("Recent", studentBirthdays.recent)}
            </CardContent>
          </Card>
        </Grid>

        {/* Teacher Birthdays Card */}
        <Grid item xs={12} sm={4} md={4}>
          <Card
            sx={{
              backgroundColor: "#E3F2FD",
              borderRadius: 2,
              boxShadow: 2,
              padding: 2,
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom={2}>
                <CakeIcon sx={{ color: "#1976D2", marginRight: 1 }} />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#0D47A1" }}
                >
                  Teacher Birthdays
                </Typography>
              </Box>
              {renderBirthdaySection("Today", teacherBirthdays.today)}
              <Divider />
              {renderBirthdaySection("Upcoming", teacherBirthdays.upcoming)}
              <Divider />
              {renderBirthdaySection("Recent", teacherBirthdays.recent)}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <Card
            sx={{
              maxWidth: "100%",
              height: "280px",
              display: "flex", // Ensure flexbox for alignment
              flexDirection: "column", // Stack children vertically
              alignItems: "center", // Center children horizontally
              justifyContent: "center", // Center children vertically
              mt: 0,
              padding: 2,
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#f8fcff",
              border: "3px dashed #dce4ec",
            }}
          >
            {/* Header with Icon */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"center"}
              mt={3}
            >
              <CalendarMonthIcon color="primary" />
              <Typography variant="h5" fontWeight="bold" color="primary">
                School Events
              </Typography>
            </Box>

            {/* Description */}
            <CardContent
              sx={{
                textAlign: "center",
                padding: 1,
                flexGrow: 1, // Allow content to take available space
                display: "flex", // Flexbox for centering
                flexDirection: "column", // Vertical stacking
                alignItems: "center", // Center horizontally
                justifyContent: "center", // Center vertically
              }}
            >
              <Typography variant="body2" color="text.secondary" mb={2}>
                Add an event across your classes, with the ability to restrict
                to students or teachers.
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              {/* Action Links */}
              <Box display="flex" justifyContent="center" gap={2}>
                <Link
                  href="/post-events"
                  underline="hover"
                  color="primary"
                  fontWeight="bold"
                >
                  Add event
                </Link>
                <Typography color="text.secondary">|</Typography>
                <Link
                  href="/view-events"
                  underline="hover"
                  color="primary"
                  fontWeight="bold"
                >
                  View Events
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={0}>
        <Grid item xs={12} sm={4}>
          <MonthlyIncomeChart />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MonthlyExpenseChart />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StaffAttendanceOverview />
        </Grid>
      </Grid>

      {/* Sticky Button For Enquiry */}
      <Tooltip title="Enquiry" placement="left">
        <Fab
          color="primary"
          aria-label="enquiry"
          onClick={handleEnquiryClick}
          sx={{
            position: "fixed",
            bottom: 16, // Distance from the bottom
            right: 16, // Distance from the right
            backgroundColor: "#1c1c1c",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#444", // Hover color
            },
          }}
        >
          <ChatIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Dashboard;
