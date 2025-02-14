// import React, { useState } from "react";
// import {
//   CardContent,
//   Typography,
//   Box,
//   IconButton,
//   Button,
//   ToggleButton,
//   ToggleButtonGroup,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Collapse,
// } from "@mui/material";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Today,
//   ExpandMore,
// } from "@mui/icons-material";

// const mockClassesData = [
//   { id: 1, className: "Class 1 - A" },
//   { id: 2, className: "Class 2 - B" },
//   { id: 3, className: "Class 3 - C" },
// ];

// const AttendanceComponent = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [filter, setFilter] = useState("All");
//   const [expandedClass, setExpandedClass] = useState(null); // Tracks expanded class for attendance options

//   const [status, setStatus] = useState("present"); // Default state
//   const [classStatuses, setClassStatuses] = useState({}); // Tracks individual class statuses

//   const handleStatusChange = (event, newStatus) => {
//     if (newStatus !== null) {
//       setStatus(newStatus);
//       // Update the attendance status for all classes based on the selected global status
//       const updatedClassStatuses = mockClassesData.reduce((acc, curr) => {
//         acc[curr.id] = newStatus;
//         return acc;
//       }, {});
//       setClassStatuses(updatedClassStatuses);
//     }
//   };

//   const handleNavigate = (direction) => {
//     const currentDate = new Date(selectedDate);
//     if (direction === "PREV") {
//       currentDate.setDate(currentDate.getDate() - 1);
//     } else if (direction === "NEXT") {
//       currentDate.setDate(currentDate.getDate() + 1);
//     } else if (direction === "TODAY") {
//       currentDate.setDate(new Date().getDate());
//     }
//     setSelectedDate(currentDate);
//   };

//   const handleFilterChange = (event, newFilter) => {
//     if (newFilter !== null) {
//       setFilter(newFilter);
//     }
//   };

//   const handleExpandClass = (classId) => {
//     setExpandedClass((prev) => (prev === classId ? null : classId)); // Toggle expand/collapse
//   };

//   const handleMarkStatus = (newStatus, classId) => {
//     setClassStatuses((prevStatuses) => ({
//       ...prevStatuses,
//       [classId]: newStatus,
//     }));
//   };

//   return (
//     <>
//       <Typography variant="h5" sx={{ fontWeight: "bold", m: 1 }}>
//         Attendance
//       </Typography>
//       <div style={{ backgroundColor: "white", borderRadius: 5 }}>
//         <CardContent>
//           {/* Date Navigation */}
//           <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 2 }}>
//             <IconButton onClick={() => handleNavigate("PREV")}>
//               <ChevronLeft />
//             </IconButton>
//             <Button
//               variant="outlined"
//               startIcon={<Today />}
//               onClick={() => handleNavigate("TODAY")}
//               sx={{ marginX: 1 }}
//             >
//               Today
//             </Button>
//             <IconButton onClick={() => handleNavigate("NEXT")}>
//               <ChevronRight />
//             </IconButton>
//             <Typography variant="body1" sx={{ marginLeft: 2 }}>
//               {selectedDate.toDateString()}
//             </Typography>

//             <ToggleButtonGroup
//               value={status}
//               exclusive
//               onChange={handleStatusChange}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//               }}
//             >
//               <ToggleButton value="present" sx={{ marginLeft: 2 }}>
//                 Mark All Present
//               </ToggleButton>
//               <ToggleButton value="absent">Mark All Absent</ToggleButton>
//             </ToggleButtonGroup>
//           </Box>

//           {/* Filter Toggle */}
//           <Box display="flex" justifyContent="center" mb={2}>
//             <ToggleButtonGroup
//               value={filter}
//               exclusive
//               onChange={handleFilterChange}
//               aria-label="attendance filter"
//             >
//               <ToggleButton value="All" aria-label="all">
//                 All
//               </ToggleButton>
//               <ToggleButton value="Per Day" aria-label="per day">
//                 Per Day
//               </ToggleButton>
//               <ToggleButton value="Per Session" aria-label="per session">
//                 Per Session
//               </ToggleButton>
//             </ToggleButtonGroup>
//           </Box>

//           {/* Classes List */}
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>Class Name</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Attendance</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {mockClassesData.map((classItem) => (
//                   <React.Fragment key={classItem.id}>
//                     <TableRow>
//                       <TableCell>{classItem.className}</TableCell>
//                       <TableCell>{filter}</TableCell>
//                       {/* <TableCell>{status}</TableCell> */}
//                       <TableCell>
//                         {classStatuses[classItem.id] || "None"}
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={() => handleExpandClass(classItem.id)}
//                           endIcon={<ExpandMore />}
//                         >
//                           {expandedClass === classItem.id
//                             ? "Hide Options"
//                             : "Track Attendance"}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell colSpan={3} style={{ padding: 0 }}>
//                         <Collapse
//                           in={expandedClass === classItem.id}
//                           timeout="auto"
//                           unmountOnExit
//                         >
//                           <Box
//                             p={2}
//                             display="flex"
//                             justifyContent="space-evenly"
//                             alignItems="center"
//                             bgcolor="lightgray"
//                           >
//                             <Button
//                               variant="contained"
//                               color="success"
//                               onClick={() =>
//                                 handleMarkStatus("present", classItem.id)
//                               }
//                             >
//                               Mark Present
//                             </Button>
//                             <Button
//                               variant="contained"
//                               color="error"
//                               onClick={() =>
//                                 handleMarkStatus("absent", classItem.id)
//                               }
//                             >
//                               Mark Absent
//                             </Button>
//                             <Button
//                               variant="contained"
//                               color="warning"
//                               onClick={() =>
//                                 handleMarkStatus("leave", classItem.id)
//                               }
//                             >
//                               Mark Leave
//                             </Button>
//                           </Box>
//                         </Collapse>
//                       </TableCell>
//                     </TableRow>
//                   </React.Fragment>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </div>
//     </>
//   );
// };

// export default AttendanceComponent;

import React, { useState } from "react";
import {
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Today } from "@mui/icons-material";

// Mock data for classes with static present students data
const mockClassesData = [
  { id: 1, className: "Class 1 - A", totalStrength: 30, presentStudents: 25 },
  { id: 2, className: "Class 2 - B", totalStrength: 25, presentStudents: 20 },
  { id: 3, className: "Class 3 - C", totalStrength: 28, presentStudents: 22 },
];

const AttendanceComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("All"); // Tracks the current filter status

  const handleNavigate = (direction) => {
    const currentDate = new Date(selectedDate);
    if (direction === "PREV") {
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (direction === "NEXT") {
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (direction === "TODAY") {
      currentDate.setDate(new Date().getDate());
    }
    setSelectedDate(currentDate);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const calculateAbsentStudents = (totalStrength, presentStudents) => {
    return totalStrength - presentStudents;
  };

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "bold", m: 1 }}>
        Attendance
      </Typography>
      <div style={{ backgroundColor: "white", borderRadius: 5 }}>
        <CardContent>
          {/* Date Navigation */}
          <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 2 }}>
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
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              {selectedDate.toDateString()}
            </Typography>
          </Box>

          {/* Filter Toggle */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Button
              variant={filter === "All" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("All")}
              sx={{ marginRight: 1 }}
            >
              All
            </Button>
            <Button
              variant={filter === "Per Day" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("Per Day")}
              sx={{ marginRight: 1 }}
            >
              Per Day
            </Button>
            <Button
              variant={filter === "Per Session" ? "contained" : "outlined"}
              onClick={() => handleFilterChange("Per Session")}
            >
              Per Session
            </Button>
          </Box>

          {/* Classes List */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Class Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Strength
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Present
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Total Absent
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockClassesData.map((classItem) => {
                  const totalAbsent = calculateAbsentStudents(
                    classItem.totalStrength,
                    classItem.presentStudents
                  );
                  return (
                    <TableRow key={classItem.id}>
                      <TableCell>{classItem.className}</TableCell>
                      <TableCell>{filter}</TableCell>
                      <TableCell>{classItem.totalStrength}</TableCell>
                      <TableCell>{classItem.presentStudents}</TableCell>
                      <TableCell>{totalAbsent}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </div>
    </>
  );
};

export default AttendanceComponent;
