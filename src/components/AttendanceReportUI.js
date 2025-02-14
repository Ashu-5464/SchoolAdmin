import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const AttendanceReportUI = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Static student data
  const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];

  // Static attendance data (P: Present, A: Absent)
  const staticAttendance = {
    1: { 1: "P", 2: "A", 3: "P", 4: "P", 5: "A" }, // John Doe's attendance
    2: { 1: "P", 5: "P", 10: "A", 15: "A", 16: "P" }, // Jane Smith's attendance
    3: { 11: "A", 12: "P", 13: "P", 24: "P", 25: "A" }, // Alice Johnson's attendance
  };

  const [daysInMonth, setDaysInMonth] = useState([]);

  // Generate calendar days when month and year are selected
  const generateCalendar = () => {
    if (selectedMonth && selectedYear) {
      const totalDays = new Date(selectedYear, selectedMonth, 0).getDate();
      setDaysInMonth([...Array(totalDays).keys()].map((day) => day + 1));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          width: "100%",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mb: 3, fontWeight: "bold", color: "#333" }}
        >
          Attendance Report
        </Typography>

        {/* Month and Year Selection */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <TextField
            select
            label="Select Month"
            value={selectedMonth}
            size="small"
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{ width: "200px" }}
          >
            {Array.from({ length: 12 }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {new Date(0, index).toLocaleString("default", {
                  month: "long",
                })}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Select Year"
            type="number"
            value={selectedYear}
            size="small"
            onChange={(e) => setSelectedYear(e.target.value)}
            sx={{ width: "200px" }}
            InputProps={{
              inputProps: { min: 2000, max: new Date().getFullYear() },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={generateCalendar}
            disabled={!selectedMonth || !selectedYear}
          >
            Generate Report
          </Button>
        </Box>

        {/* Attendance Table */}
        {daysInMonth.length > 0 && (
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Student ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Student Name</TableCell>
                {daysInMonth.map((day) => (
                  <TableCell key={day} sx={{ fontWeight: "bold" }}>
                    {day}
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: "bold" }}>Total Present</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Absent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => {
                const attendanceData = staticAttendance[student.id] || {};
                const presentCount = Object.values(attendanceData).filter(
                  (status) => status === "P"
                ).length;
                const absentCount = Object.values(attendanceData).filter(
                  (status) => status === "A"
                ).length;

                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    {daysInMonth.map((day) => (
                      <TableCell key={day}>
                        {attendanceData[day] || "-"}
                      </TableCell>
                    ))}
                    <TableCell>{presentCount}</TableCell>
                    <TableCell>{absentCount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>
    </Box>
  );
};

export default AttendanceReportUI;
