// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   Grid,
//   Paper,
//   Divider,
// } from "@mui/material";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Event,
//   CalendarToday,
//   Add,
//   MoreVert,
//   Print,
//   FilterAlt,
//   Settings,
// } from "@mui/icons-material";

// const CalendarComponent = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const isMenuOpen = Boolean(anchorEl);
//   const [currentView, setCurrentView] = useState("Month");
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   //   const handleViewChange = (view) => {
//   //     setCurrentView(view);
//   //     setAnchorEl(null);
//   //   };

//   const handleDateChange = (direction) => {
//     const newDate = new Date(selectedDate);
//     if (currentView === "Month") {
//       newDate.setMonth(newDate.getMonth() + direction);
//     } else if (currentView === "Week") {
//       newDate.setDate(newDate.getDate() + direction * 7);
//     } else {
//       newDate.setDate(newDate.getDate() + direction);
//     }
//     setSelectedDate(newDate);
//   };

//   return (
//     <Box
//       sx={{ padding: "16px", backgroundColor: "#eaf4f2", minHeight: "100vh" }}
//     >
//       {/* Header Section */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Box display="flex" alignItems="center">
//           <Event fontSize="large" sx={{ marginRight: "8px", color: "#333" }} />
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             Calendar
//           </Typography>
//         </Box>
//         <Box>
//           <IconButton>
//             <Settings />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* Controls Section */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <IconButton>
//           <FilterAlt />
//         </IconButton>
//         <Box display="flex" alignItems="center">
//           <IconButton onClick={() => handleDateChange(-1)}>
//             <ChevronLeft />
//           </IconButton>
//           <Button
//             variant="outlined"
//             startIcon={<CalendarToday />}
//             sx={{ textTransform: "none", marginX: "8px" }}
//           >
//             {selectedDate.toLocaleString("default", {
//               month: "long",
//               year: "numeric",
//             })}
//           </Button>
//           <IconButton onClick={() => handleDateChange(1)}>
//             <ChevronRight />
//           </IconButton>
//         </Box>
//         <Box display="flex" alignItems="center">
//           <Button
//             variant="contained"
//             onClick={() => setCurrentView("Day")}
//             sx={{
//               backgroundColor: currentView === "Day" ? "#333" : "inherit",
//               color: currentView === "Day" ? "#fff" : "#000",
//               textTransform: "none",
//               marginRight: "8px",
//             }}
//           >
//             Day
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => setCurrentView("Week")}
//             sx={{
//               backgroundColor: currentView === "Week" ? "#333" : "inherit",
//               color: currentView === "Week" ? "#fff" : "#000",
//               textTransform: "none",
//               marginRight: "8px",
//             }}
//           >
//             Week
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => setCurrentView("Month")}
//             sx={{
//               backgroundColor: currentView === "Month" ? "#333" : "inherit",
//               color: currentView === "Month" ? "#fff" : "#000",
//               textTransform: "none",
//             }}
//           >
//             Month
//           </Button>
//         </Box>
//         <Box display="flex" alignItems="center">
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             sx={{ textTransform: "none", marginRight: "8px" }}
//           >
//             Add
//           </Button>
//           <IconButton>
//             <Print />
//           </IconButton>
//           <IconButton onClick={handleMenuClick}>
//             <MoreVert />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={isMenuOpen}
//             onClose={handleMenuClose}
//             anchorOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//           >
//             <MenuItem onClick={handleMenuClose}>Event</MenuItem>
//             <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
//           </Menu>
//         </Box>
//       </Box>

//       {/* Calendar Grid */}
//       <Paper>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           p={1}
//           bgcolor="#f6f6f6"
//         >
//           {[
//             "Sunday",
//             "Monday",
//             "Tuesday",
//             "Wednesday",
//             "Thursday",
//             "Friday",
//             "Saturday",
//           ].map((day) => (
//             <Typography key={day} sx={{ width: "100%", textAlign: "center" }}>
//               {day}
//             </Typography>
//           ))}
//         </Box>
//         <Divider />
//         <Grid container spacing={0.5} p={1}>
//           {[...Array(31).keys()].map((date) => (
//             <Grid item xs={12 / 7} key={date}>
//               <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 height={100}
//                 border={1}
//                 borderColor="#ccc"
//                 bgcolor={date === selectedDate.getDate() ? "#e0f7fa" : "#fff"}
//               >
//                 <Typography>{date + 1}</Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default CalendarComponent;

// import React, { useState } from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import { format, parse, startOfWeek, getDay } from "date-fns";
// import enUS from "date-fns/locale/en-US";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import {
//   Box,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";

// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
//   getDay,
//   locales,
// });

// const events = [
//   {
//     title: "Sample Event",
//     start: new Date(),
//     end: new Date(),
//   },
// ];

// const CalendarComponent = () => {
//   const [view, setView] = useState("week");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [date, setDate] = useState(new Date());

//   const handleViewChange = (newView) => {
//     setView(newView);
//   };

//   const handleNavigate = (action) => {
//     const newDate = new Date(date);
//     if (action === "TODAY") {
//       setDate(new Date());
//     } else if (action === "PREV") {
//       newDate.setDate(date.getDate() - (view === "month" ? 30 : 7));
//       setDate(newDate);
//     } else if (action === "NEXT") {
//       newDate.setDate(date.getDate() + (view === "month" ? 30 : 7));
//       setDate(newDate);
//     }
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ padding: 2, backgroundColor: "#fcfcfc", borderRadius: 5 }}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Typography variant="h5" fontWeight={"bold"}>
//           Calendar
//         </Typography>
//         <Box>
//           <IconButton onClick={() => handleNavigate("PREV")}>
//             <ChevronLeft />
//           </IconButton>
//           <Button
//             variant="outlined"
//             startIcon={<Today />}
//             onClick={() => handleNavigate("TODAY")}
//           >
//             Today
//           </Button>
//           <IconButton onClick={() => handleNavigate("NEXT")}>
//             <ChevronRight />
//           </IconButton>
//         </Box>
//         <Box>
//           <Button variant="contained" onClick={handleMenuClick}>
//             {view.charAt(0).toUpperCase() + view.slice(1)}
//           </Button>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//           >
//             {["day", "week", "month"].map((v) => (
//               <MenuItem
//                 key={v}
//                 selected={v === view}
//                 onClick={() => {
//                   handleViewChange(v);
//                   handleMenuClose();
//                 }}
//               >
//                 {v.charAt(0).toUpperCase() + v.slice(1)}
//               </MenuItem>
//             ))}
//           </Menu>
//         </Box>
//       </Box>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         defaultView={view}
//         view={view}
//         date={date}
//         onNavigate={(newDate) => setDate(newDate)}
//         style={{ height: 600 }}
//       />
//     </Box>
//   );
// };

// export default CalendarComponent;

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Today, Add } from "@mui/icons-material";
import "../styles/customCalendarStyles.css"; // Custom CSS file

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const CalendarComponent = () => {
  const [view, setView] = useState("week");
  const [anchorEl, setAnchorEl] = useState(null);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      title: "Sample Event",
      start: new Date(),
      end: new Date(),
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
  });

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigate = (action) => {
    const newDate = new Date(date);
    if (action === "TODAY") {
      setDate(new Date());
    } else if (action === "PREV") {
      newDate.setDate(date.getDate() - (view === "month" ? 30 : 7));
      setDate(newDate);
    } else if (action === "NEXT") {
      newDate.setDate(date.getDate() + (view === "month" ? 30 : 7));
      setDate(newDate);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setNewEvent({ title: "", start: "", end: "" });
  };

  const handleEventSubmit = () => {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
      },
    ]);
    handleModalClose();
  };

  return (
    <>
      <Typography
        variant="h5"
        fontWeight={"bold"}
        mb={{ xs: 1, sm: 1 }}
        sx={{ m: 1 }}
      >
        Calendar
      </Typography>
      <Box sx={{ padding: 2, backgroundColor: "#fcfcfc", borderRadius: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexDirection={{ xs: "column", sm: "row" }} // Responsive flex direction
        >
          <Box display="flex" alignItems="center" mb={{ xs: 1, sm: 1 }}>
            <IconButton onClick={() => handleNavigate("PREV")}>
              <ChevronLeft />
            </IconButton>
            <Button
              variant="outlined"
              startIcon={<Today />}
              onClick={() => handleNavigate("TODAY")}
              sx={{ marginX: 1 }}
            >
              Today
            </Button>
            <IconButton onClick={() => handleNavigate("NEXT")}>
              <ChevronRight />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mb={{ xs: 1, sm: 1 }}>
            <Button
              variant="contained"
              onClick={handleMenuClick}
              sx={{ marginRight: 1 }}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {["day", "week", "month"].map((v) => (
                <MenuItem
                  key={v}
                  selected={v === view}
                  onClick={() => {
                    handleViewChange(v);
                    handleMenuClose();
                  }}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleModalOpen}
          >
            Add Event
          </Button>
        </Box>

        <Box sx={{ width: "100%", height: "auto", overflowX: "auto" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={view}
            view={view}
            date={date}
            onNavigate={(newDate) => setDate(newDate)}
            style={{ height: "70vh" }} // Responsive height
            // toolbar={false} // Disable default toolbar to remove toggle buttons
            min={new Date(1970, 1, 1, 10, 0, 0)} // Start time: 10:00 AM
            max={new Date(1970, 1, 1, 18, 0, 0)} // End time: 5:00 PM
            components={{
              day: {
                header: (headerProps) => (
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {headerProps.label}
                  </div>
                ),
              },
              week: {
                header: ({ date }) => (
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {format(date, "EEEE")} {/* Day Name */}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        marginTop: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      {format(date, "MM/dd")} {/* Date */}
                    </div>
                  </div>
                ),
              },
            }}
          />
        </Box>

        <Modal open={modalOpen} onClose={handleModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: { xs: 300, sm: 400 }, // Responsive modal width
            }}
          >
            <Typography variant="h6" mb={2} fontWeight={"bold"}>
              Schedule Event
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Start Time"
                  InputLabelProps={{ shrink: true }}
                  value={newEvent.start}
                  onChange={(e) =>
                    setNewEvent((prev) => ({ ...prev, start: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="End Time"
                  InputLabelProps={{ shrink: true }}
                  value={newEvent.end}
                  onChange={(e) =>
                    setNewEvent((prev) => ({ ...prev, end: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleModalClose}
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleEventSubmit}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default CalendarComponent;
