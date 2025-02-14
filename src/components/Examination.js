import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Divider,
  Menu,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import dayjs from "dayjs";
import { Edit } from "@mui/icons-material";

const ExaminationComponent = ({ schools }) => {
  const [exams, setExams] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [examDetails, setExamDetails] = useState({
    standard: "",
    testType: "",
    schedule: [
      {
        subject: "",
        date: "",
        time: "",
      },
    ],
  });
  const [showExams, setShowExams] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const standards = ["1st", "2nd", "3rd", "4th", "5th"];
  const subjects = ["Marathi", "Hindi", "Math", "Science", "English"];
  const testTypes = ["Unit Test", "Class Test", "Preliminary Test", "Other"];

  useEffect(() => {
    const mockExams = [
      {
        id: 1,
        standard: "1st",
        testType: "Unit Test",
        schedule: [
          { subject: "Math", date: "2025-01-15", time: "10:00 AM" },
          { subject: "Science", date: "2025-02-15", time: "1:00 PM" },
        ],
        schoolName: "ABC High School",
      },
      {
        id: 2,
        standard: "2nd",
        testType: "Class Test",
        schedule: [
          { subject: "English", date: "2025-01-20", time: "11:00 AM" },
        ],
        schoolName: "XYZ Public School",
      },
    ];
    setExams(mockExams);
  }, []);

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field === "schedule") {
      const updatedSchedule = examDetails.schedule.map((s, i) =>
        i === index ? { ...s, [name]: value } : s
      );
      setExamDetails((prev) => ({ ...prev, schedule: updatedSchedule }));
    } else {
      setExamDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddMoreFields = () => {
    setExamDetails((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { subject: "", date: "", time: "" }],
    }));
  };

  const handleRemoveField = (index) => {
    const updatedSchedule = examDetails.schedule.filter((_, i) => i !== index);
    setExamDetails((prev) => ({ ...prev, schedule: updatedSchedule }));
  };

  const handleScheduleExam = () => {
    setExams((prev) => [
      ...prev,
      { ...examDetails, id: prev.length + 1, schoolName: selectedSchool.name },
    ]);
    setOpenDialog(false);
    setExamDetails({
      standard: "",
      testType: "",
      schedule: [{ subject: "", date: "", time: "" }],
    });
  };

  const getExamStatus = (date) => {
    const today = dayjs();
    const examDate = dayjs(date);
    return examDate.isBefore(today) ? "Completed" : "Upcoming";
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (order) => {
    if (order) {
      setSortOrder(order); // Set the selected sorting order
    }
    setAnchorEl(null); // Close the dropdown menu
  };

  const filteredSchools = schools
    .filter((school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <Box>
      {showExams ? (
        <>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Scheduled Exams for {showExams.name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Button
            variant="outlined"
            onClick={() => setShowExams(null)}
            sx={{ mb: 0 }}
          >
            Back to Schools
          </Button>
          <Box
            mt={1}
            sx={{
              border: "1px solid #ccc",
              padding: 1,
              backgroundColor: "white",
              borderRadius: 2,
            }}
          >
            <Table sx={{ border: "2px solid #333" }}>
              <TableHead sx={{ border: "2px solid #333" }}>
                <TableRow sx={{ backgroundColor: "lightgray" }}>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "2px solid #333" }}
                  >
                    Standard
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "2px solid #333" }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "2px solid #333" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "2px solid #333" }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "2px solid #333" }}
                  >
                    Subject
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "2px solid #333" }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", border: "2px solid #333" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams
                  .filter((exam) => exam.schoolName === showExams.name)
                  .flatMap((exam) =>
                    exam.schedule.map((s) => ({
                      ...s,
                      standard: exam.standard,
                      testType: exam.testType,
                    }))
                  )
                  .map((schedule, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ border: "2px solid #333" }}>
                        {schedule.standard}
                      </TableCell>
                      <TableCell sx={{ border: "2px solid #333" }}>
                        {schedule.testType}
                      </TableCell>
                      <TableCell sx={{ border: "2px solid #333" }}>
                        {schedule.date}
                      </TableCell>
                      <TableCell sx={{ border: "2px solid #333" }}>
                        {schedule.time}
                      </TableCell>
                      <TableCell sx={{ border: "2px solid #333" }}>
                        {schedule.subject}
                      </TableCell>
                      <TableCell sx={{ border: "2px solid #333" }}>
                        <Chip
                          label={getExamStatus(schedule.date)}
                          color={
                            getExamStatus(schedule.date) === "Completed"
                              ? "success"
                              : "warning"
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ border: "2px solid #333" }}>
                        <Edit titleAccess="Edit Scheduled Exam" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </>
      ) : (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Examination Management
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                sx={{ width: 200 }}
                label="Search by Name"
                size="small"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton
                onClick={handleMenuClick}
                sx={{ backgroundColor: "white" }}
              >
                <SortByAlphaIcon fontSize="medium" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleMenuClose(null)}
              >
                <MenuItem onClick={() => handleMenuClose("asc")}>
                  Ascending
                </MenuItem>
                <MenuItem onClick={() => handleMenuClose("desc")}>
                  Descending
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={1}>
            {filteredSchools.map((school) => (
              <Grid item xs={12} sm={4} key={school.id}>
                <Card>
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6">{school.name}</Typography>
                    <Box>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setSelectedSchool(school);
                          setOpenDialog(true);
                        }}
                      >
                        Schedule Exam
                      </Button>
                      <IconButton
                        color="primary"
                        onClick={() => setShowExams(school)}
                      >
                        <DoubleArrowIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle fontWeight={"bold"}>
          Schedule Exam for {selectedSchool?.name}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
            <InputLabel>Standard</InputLabel>
            <Select
              value={examDetails.standard}
              name="standard"
              label="Standard"
              onChange={(e) => handleInputChange(e, null, "standard")}
            >
              {standards.map((std) => (
                <MenuItem key={std} value={std}>
                  {std}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Test Type</InputLabel>
            <Select
              value={examDetails.testType}
              name="testType"
              label="Test Type"
              onChange={(e) => handleInputChange(e, null, "testType")}
            >
              {testTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {examDetails.schedule.map((s, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                gap: 1,
                mb: 2,
                alignItems: "center",
              }}
            >
              <TextField
                label="Subject"
                name="subject"
                value={s.subject}
                onChange={(e) => handleInputChange(e, index, "schedule")}
                select
                sx={{ width: "170px" }}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                // label="Date"
                title="Date"
                name="date"
                value={s.date}
                type="date"
                onChange={(e) => handleInputChange(e, index, "schedule")}
                sx={{ width: "200px" }}
              />
              <TextField
                // label="Time"
                title="Time"
                name="time"
                value={s.time}
                type="time"
                onChange={(e) => handleInputChange(e, index, "schedule")}
                sx={{ width: "150px" }}
              />
              <IconButton
                color="secondary"
                onClick={() => handleRemoveField(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            // variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddMoreFields}
          >
            Add More
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleScheduleExam}
            color="primary"
          >
            Schedule Exam
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExaminationComponent;
