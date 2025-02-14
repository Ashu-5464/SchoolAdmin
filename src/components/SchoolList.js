import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Divider,
  List,
  ListItem,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  ListItemText,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Menu,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import AddSchoolIcon from "@mui/icons-material/DomainAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import {
  CalendarToday,
  Download,
  InsertDriveFile,
  PictureAsPdf,
  ShowChart,
  TableChart,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf"; // For PDF generation
import "jspdf-autotable";

const SchoolList = ({ schools, teachers, officeStaff, committeeMembers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teacherStandardsWithDivisions, setTeacherStandardsWithDivisions] =
    useState([]);
  const [selectedOfficeStaff, setSelectedOfficeStaff] = useState([]);
  const [selectedCommitteeMembers, setSelectedCommitteeMembers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order
  const [anchorEl, setAnchorEl] = useState(null); // Anchor for the dropdown menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  // const [subTeacherMenuAnchorEl, setTeacherSubMenuAnchorEl] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (order) => {
    if (order) {
      setSortOrder(order); // Set the selected sorting order
    }
    setAnchorEl(null); // Close the dropdown menu
  };

  const handleMenuOpen = (event, teacher) => {
    setAnchorEl(event.currentTarget);
    // setSelectedTeachers(teacher);
  };

  const handleReportMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleReportMenuClose = () => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
    // setSelectedReport(null);
    setSubMenuAnchorEl(null);
  };

  const handleSubMenuOpen = (event, reportType) => {
    setSelectedReport(reportType);
    setSubMenuAnchorEl(event.currentTarget);
  };

  // const handleTeacherMenuOpen = (event, teacher) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleReportTeacherMenuClose = () => {
  //   setAnchorEl(null);
  //   setSelectedReport(null);
  //   setTeacherSubMenuAnchorEl(null);
  // };

  // const handleSubMenuNonTeacherOpen = (event, reportType) => {
  //   setSelectedReport(reportType);
  //   setTeacherSubMenuAnchorEl(event.currentTarget);
  // };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setViewMode("");
  };

  const handleToggleOfficeStaff = (schoolId) => {
    const school = schools.find((s) => s.id.toString() === schoolId.toString());
    const filteredOfficeStaff = officeStaff.filter(
      (staff) => staff.schoolId.toString() === schoolId.toString()
    );

    // Log the full names of sorted staff
    console.log(
      "Full Names (Sorted): ",
      filteredOfficeStaff.map((staff) => staff.fullName)
    );

    console.log("Filtered Data after Sort: ", filteredOfficeStaff);

    setSelectedSchool(school);
    setSelectedOfficeStaff(filteredOfficeStaff);
    setSelectedTeachers([]);
    setActiveTab(0); // Default to Office Staff tab
  };

  const handleViewTeachers = (schoolId, type) => {
    const school = schools.find((s) => s.id.toString() === schoolId.toString());
    const filteredTeachers = teachers.filter(
      (teacher) =>
        teacher.schoolId === schoolId.toString() && teacher.type === type
    );
    setSelectedSchool(school);
    setSelectedTeachers(filteredTeachers);
    setSelectedOfficeStaff([]); // Reset office staff data
    setSearchTerm(""); // Reset search term when switching views
    setActiveTab(type === "Teaching" ? 1 : 2);
  };

  const handleViewCommitteeMembers = (schoolId) => {
    const school = schools.find((s) => s.id.toString() === schoolId.toString());
    const filteredCommitteeMembers = committeeMembers.filter(
      (committeeMembers) => committeeMembers.schoolId === schoolId.toString()
    );
    setSelectedSchool(school);
    setSelectedCommitteeMembers(filteredCommitteeMembers);
    setSelectedTeachers([]);
    setSelectedOfficeStaff([]); // Reset office staff data
    setSearchTerm(""); // Reset search term when switching views
    setActiveTab(3);
  };

  const handleOpenDialog = (teacherId) => {
    const teacher = teachers.find(
      (t) => t.id.toString() === teacherId.toString()
    );
    const standardsWithDivisions = teacher
      ? teacher.standards.map((standard, index) => ({
          standard,
          divisions: teacher.divisions[index] || [],
          subjects: teacher.subjects[standard] || [], // Add subjects for the standard
        }))
      : [];
    setTeacherStandardsWithDivisions(standardsWithDivisions);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTeacherStandardsWithDivisions([]);
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

  const filteredOfficeStaff = selectedOfficeStaff
    .filter((officeStaff) =>
      officeStaff.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName)
    );

  const filteredTeachers = selectedTeachers
    .filter((teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const filteredCommitteeMembers = selectedCommitteeMembers
    .filter((committeeMembers) =>
      committeeMembers.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.fullName.localeCompare(b.fullName)
        : b.fullName.localeCompare(a.fullName)
    );

  const [isPromoteMode, setIsPromoteMode] = useState(false); // Tracks whether promote mode is active
  const [selectedDesignations, setSelectedDesignations] = useState({});
  const designationsList = [
    "School Counselor",
    "Supervisor",
    "Principal",
    "Clerk",
    "IT Administrator",
    "Vice Principal",
    "Administrative Assistant",
    "Teacher",
    "Librarian",
    "Receptionist",
    "Guidance Counselor",
  ]; // Static designations

  const handlePromoteClick = () => {
    setIsPromoteMode(true); // Enable promote mode to show dropdowns
  };

  const handleCancelClick = () => {
    setIsPromoteMode(false); // Disable promote mode and hide dropdowns
  };

  const handleDesignationChange = (staffId, newDesignation) => {
    setSelectedDesignations((prev) => ({
      ...prev,
      [staffId]: newDesignation,
    }));
  };

  const handleUpdateClick = (staffId) => {
    const updatedStaff = selectedOfficeStaff.map((staff) =>
      staff.id === staffId
        ? {
            ...staff,
            designation: selectedDesignations[staffId] || staff.designation,
          }
        : staff
    );
    setSelectedOfficeStaff(updatedStaff);
    setIsPromoteMode(false); // Reset promote mode after updating
  };

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  // const [anchorMenu, setAnchorMenu] = useState(null); // Anchor for the dropdown menu

  // Static attendance data (P: Present, A: Absent)
  const staticAttendance = {
    1: { 1: "P", 2: "A", 13: "P", 17: "P", 25: "A" }, // John Doe's attendance
    2: { 21: "P", 22: "P", 20: "A", 25: "A", 26: "P" }, // Jane Smith's attendance
    3: { 11: "A", 12: "P", 13: "P", 24: "P", 25: "A" }, // Alice Johnson's attendance
    6: { 1: "P", 2: "A", 13: "P", 17: "P", 25: "A" }, // John Doe's attendance
    5: { 21: "P", 22: "P", 20: "A", 25: "A", 26: "P" }, // Jane Smith's attendance
    4: { 11: "A", 12: "P", 13: "P", 24: "P", 25: "A" }, // Alice Johnson's attendance
  };

  // Open the dropdown menu
  // const handleReportTypeMenuClick = (event) => {
  //   setAnchorMenu(event.currentTarget);
  // };

  // // Close the dropdown menu
  // const handleReportTypeMenuClose = () => {
  //   setAnchorMenu(null);
  // };

  const getDatesBetweenRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(date.getDate());
    }
    return dates;
  };

  const getWeekDates = (year, month, week) => {
    const firstDay = new Date(year, month - 1, 1);
    const startDay = new Date(firstDay);
    startDay.setDate(1 + (week - 1) * 7);
    const dates = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDay);
      currentDate.setDate(startDay.getDate() + i);
      if (currentDate.getMonth() === month - 1) {
        dates.push(currentDate.getDate());
      }
    }
    return dates;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const handleGeneratePDF = () => {
    console.log("Selected School : ", selectedSchool.name);
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    let mainTitle = "";
    let reportTitle = "";
    let reportDates = [];

    mainTitle = `${selectedSchool.name}`;
    if (viewMode === "weekly") {
      reportTitle = `Attendance Report - Week ${selectedWeek} ${new Date(
        0,
        selectedMonth - 1
      ).toLocaleString("default", { month: "long" })} ${selectedYear}`;
      reportDates = getWeekDates(selectedYear, selectedMonth, selectedWeek);
    } else if (viewMode === "toFromDate") {
      reportTitle = `Attendance Report (${fromDate} - ${toDate})`;
      reportDates = getDatesBetweenRange(fromDate, toDate);
    } else {
      reportTitle = `Attendance Report - ${new Date(
        0,
        selectedMonth - 1
      ).toLocaleString("default", { month: "long" })} ${selectedYear}`;
      reportDates = Array.from(
        { length: getDaysInMonth(selectedYear, selectedMonth) },
        (_, i) => i + 1
      );
    }

    doc.setFontSize(14);
    doc.text(mainTitle, 148.5, 15, { align: "center" });
    doc.text(reportTitle, 148.5, 20, { align: "center" });

    const headers = [
      [
        "ID",
        "Teachers",
        ...reportDates.map((day) => `${day}`),
        "Present",
        "Absent",
      ],
    ];

    const data = filteredTeachers.map((teachers) => {
      const attendanceData = staticAttendance[teachers.id] || {};
      const presentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "P" ? 1 : 0),
        0
      );
      const absentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "A" ? 1 : 0),
        0
      );

      return [
        teachers.id,
        teachers.name,
        ...reportDates.map((day) => {
          const status = attendanceData[day];
          if (status === "P")
            return { content: "P", styles: { textColor: [41, 128, 185] } };
          if (status === "A")
            return { content: "A", styles: { textColor: [192, 57, 43] } };
          return "-";
        }),
        presentCount,
        absentCount,
      ];
    });

    doc.autoTable({
      head: headers,
      body: data,
      startY: 25,
      theme: "grid",
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontSize: 9,
      },
      bodyStyles: { fontSize: 9, cellPadding: 2 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save(`attendance_report_${selectedMonth}_${selectedYear}.pdf`);
    handleReportMenuClose();
  };

  const handleGenerateExcel = () => {
    let mainTitle = "";
    let reportDates = [];

    mainTitle = `${selectedSchool.name}`;
    if (viewMode === "weekly") {
      reportDates = getWeekDates(selectedYear, selectedMonth, selectedWeek);
    } else if (viewMode === "toFromDate") {
      reportDates = getDatesBetweenRange(fromDate, toDate);
    } else {
      reportDates = Array.from(
        { length: getDaysInMonth(selectedYear, selectedMonth) },
        (_, i) => i + 1
      );
    }

    const headers = [
      "ID",
      "Teachers",
      ...reportDates.map((day) => `${day}`),
      "Present",
      "Absent",
    ];
    const data = filteredTeachers.map((teachers) => {
      const attendanceData = staticAttendance[teachers.id] || {};
      const presentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "P" ? 1 : 0),
        0
      );
      const absentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "A" ? 1 : 0),
        0
      );

      return [
        teachers.id,
        teachers.name,
        ...reportDates.map((day) => attendanceData[day] || "-"),
        presentCount,
        absentCount,
      ];
    });

    const ws = XLSX.utils.aoa_to_sheet([[mainTitle], [], headers, ...data]);
    // Merge the title row across all columns
    const mergeRange = {
      s: { r: 0, c: 0 }, // Start cell (row 0, column 0)
      e: { r: 0, c: headers.length - 1 }, // End cell (row 0, last column)
    };

    if (!ws["!merges"]) ws["!merges"] = [];
    ws["!merges"].push(mergeRange);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    XLSX.writeFile(
      wb,
      `attendance_report_${selectedMonth}_${selectedYear}.xlsx`
    );
    handleReportMenuClose();
  };

  const handleGenerateCSV = () => {
    let reportDates = [];
    if (viewMode === "weekly") {
      reportDates = getWeekDates(selectedYear, selectedMonth, selectedWeek);
    } else if (viewMode === "toFromDate") {
      reportDates = getDatesBetweenRange(fromDate, toDate);
    } else {
      reportDates = Array.from(
        { length: getDaysInMonth(selectedYear, selectedMonth) },
        (_, i) => i + 1
      );
    }

    const headers = [
      "ID,Teachers," + reportDates.join(",") + ",Present,Absent",
    ];
    const data = filteredTeachers.map((teachers) => {
      const attendanceData = staticAttendance[teachers.id] || {};
      const presentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "P" ? 1 : 0),
        0
      );
      const absentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "A" ? 1 : 0),
        0
      );

      return [
        teachers.id,
        teachers.name,
        ...reportDates.map((day) => attendanceData[day] || "-"),
        presentCount,
        absentCount,
      ].join(",");
    });

    const csvContent = headers.concat(data).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `attendance_report_${selectedMonth}_${selectedYear}.csv`;
    link.click();
    handleReportMenuClose();
  };

  const generatePerformanceReport = (selectedSchool, selectedTeacher) => {
    // console.log("Selected School : ", selectedSchool);
    // console.log("Selected Teacher : ", selectedTeacher);
    const doc = new jsPDF();

    // Add header image/logo
    doc.addImage(`/images/Sanshraya.png`, "PNG", 5, 5, 35, 35);

    // Add title
    doc.setFontSize(16);
    doc.text(`${selectedSchool?.name}`, 105, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text("TEACHER PERFORMANCE EVALUATION FORM", 105, 30, {
      align: "center",
    });

    // Add form fields with filtered data
    doc.setFontSize(12);
    const startY = 50;
    const lineHeight = 10;

    // Header information with pre-filled data
    doc.text(
      `Teacher's Name: ${selectedTeacher?.name || "_______________"}`,
      20,
      startY
    );
    doc.text(
      `Position: ${selectedTeacher?.designation || "_______________"}`,
      120,
      startY
    );

    doc.text("Evaluator's Name: _______________", 20, startY + lineHeight);
    doc.text(
      `School/Department: ${selectedSchool?.name || "_______________"}`,
      120,
      startY + lineHeight
    );

    // Get current school year
    const currentYear = new Date().getFullYear();
    const schoolYear = `${currentYear}-${currentYear + 1}`;
    doc.text(`School Year: ${schoolYear}`, 20, startY + 2 * lineHeight);

    // Get current date
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 120, startY + 2 * lineHeight);

    doc.text(
      "Observation Dates/Time/Duration: _______________",
      20,
      startY + 3 * lineHeight
    );

    // Evaluation Key
    doc.setFontSize(10);
    doc.rect(20, startY + 4 * lineHeight, 170, 15);
    doc.text(
      "EVALUATION KEY: UL: Unsatisfactory and lack of satisfactory progress over time; U = Unsatisfactory;",
      25,
      startY + 5 * lineHeight
    );
    doc.text(
      "1, 2, 3 = Low to high satisfactory performance range; NA = Not applicable or not observed",
      25,
      startY + 6 * lineHeight
    );

    // Section: CURRICULUM AND INSTRUCTION
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CURRICULUM AND INSTRUCTION", 20, startY + 8 * lineHeight);
    doc.setFont("helvetica", "normal");

    // Create evaluation table
    const headers = [
      ["Planning and Preparation", "UL", "U", "1", "2", "3", "NA"],
    ];
    const data = [
      [
        "1. Communicates high standards and expectations to students.",
        "□",
        "□",
        "□",
        "□",
        "□",
        "□",
      ],
      [
        "2. Is up to date regarding curriculum content.",
        "□",
        "□",
        "□",
        "□",
        "□",
        "□",
      ],
      ["3. Effectively plans instruction.", "□", "□", "□", "□", "□", "□"],
      [
        "4. Curriculum reflects State and CPS frameworks and learning expectations.",
        "□",
        "□",
        "□",
        "□",
        "□",
        "□",
      ],
      [
        "5. Effectively plans assessment of students' learning.",
        "□",
        "□",
        "□",
        "□",
        "□",
        "□",
      ],
      [
        "6. Monitors students' understanding of the curriculum effectively.",
        "□",
        "□",
        "□",
        "□",
        "□",
        "□",
      ],
    ];

    doc.autoTable({
      head: headers,
      body: data,
      startY: startY + 9 * lineHeight,
      theme: "grid",
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 15 },
        2: { cellWidth: 15 },
        3: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 15 },
        6: { cellWidth: 15 },
      },
    });

    // Add Comments section
    const currentY = doc.previousAutoTable.finalY + 10;
    doc.text("Comments:", 20, currentY);
    doc.rect(20, currentY + 5, 170, 30);

    // Add Instruction section
    doc.autoTable({
      head: [["Instruction", "UL", "U", "1", "2", "3", "NA"]],
      body: [
        [
          "1. Makes learning goals clear to students.",
          "□",
          "□",
          "□",
          "□",
          "□",
          "□",
        ],
        [
          "2. Uses appropriate instructional strategies.",
          "□",
          "□",
          "□",
          "□",
          "□",
          "□",
        ],
        [
          "3. Uses appropriate questioning strategies.",
          "□",
          "□",
          "□",
          "□",
          "□",
          "□",
        ],
        [
          "4. Evaluates, tries innovative approaches, and refines instructional strategies.",
          "□",
          "□",
          "□",
          "□",
          "□",
          "□",
        ],
      ],
      startY: currentY + 40,
      theme: "grid",
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { cellWidth: 15 },
        2: { cellWidth: 15 },
        3: { cellWidth: 15 },
        4: { cellWidth: 15 },
        5: { cellWidth: 15 },
        6: { cellWidth: 15 },
      },
    });

    // Generate filename using teacher and school names
    const filename = `${selectedTeacher?.name.replace(
      /\s+/g,
      "_"
    )}_${selectedSchool?.name.replace(/\s+/g, "_")}_evaluation.pdf`;
    doc.save(filename);
    handleMenuClose();
  };

  return (
    <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {selectedSchool
            ? `${selectedSchool.name} Teachers & Office Staff`
            : "Registered Schools"}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            variant="outlined"
            size="small"
            label={selectedSchool ? "Search staff" : "Search Schools"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 250 }}
          />
          <IconButton
            onClick={handleMenuClick}
            sx={{
              ml: 0,
              backgroundColor: "white",
              color: "black",
            }}
          >
            <SortByAlphaIcon fontSize="medium" titleAccess="Sort List" />
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
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <List sx={{ display: "inline-flex", gap: "3px" }}>
          {/* Register School Button */}
          <ListItem
            button
            component={Link}
            to="/register-school"
            sx={{
              backgroundColor: "#d6d6d6",
              color: "#111",
              borderRadius: "20px", // Rounded buttons
              padding: "4px 8px", // Smaller size
              // minWidth: "120px", // Ensure consistent width
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#333",
                color: "#f5f5f5",
              },
              // whiteSpace: "nowrap", // Prevent text wrapping
            }}
          >
            <AddSchoolIcon style={{ marginRight: "5px", fontSize: "16px" }} />
            <ListItemText
              primary="Register School"
              primaryTypographyProps={{
                style: { fontSize: "12px", fontWeight: "bold" },
              }}
            />
          </ListItem>

          {/* Register Teacher Button */}
          <ListItem
            button
            component={Link}
            to="/register-teacher"
            sx={{
              backgroundColor: "#d6d6d6",
              color: "#111",
              borderRadius: "20px",
              padding: "4px 8px",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#333",
                color: "#f5f5f5",
              },
              // whiteSpace: "nowrap",
            }}
          >
            <PersonAddIcon style={{ marginRight: "5px", fontSize: "16px" }} />
            <ListItemText
              primary="Register Teacher"
              primaryTypographyProps={{
                style: { fontSize: "12px", fontWeight: "bold" },
              }}
            />
          </ListItem>

          {/* Office Staff Button */}
          <ListItem
            button
            component={Link}
            to="/office-staff"
            sx={{
              backgroundColor: "#d6d6d6",
              color: "#111",
              borderRadius: "20px",
              padding: "4px 8px",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#333",
                color: "#f5f5f5",
              },
              // whiteSpace: "nowrap",
            }}
          >
            <GroupsIcon style={{ marginRight: "5px", fontSize: "16px" }} />
            <ListItemText
              primary="Register Office Staff"
              primaryTypographyProps={{
                style: { fontSize: "12px", fontWeight: "bold" },
              }}
            />
          </ListItem>

          {/* Committee Button */}
          <ListItem
            button
            component={Link}
            to="/register-committee"
            sx={{
              backgroundColor: "#d6d6d6",
              color: "#111",
              borderRadius: "20px",
              padding: "4px 8px",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#333",
                color: "#f5f5f5",
              },
              // whiteSpace: "nowrap",
            }}
          >
            <Diversity1Icon style={{ marginRight: "5px", fontSize: "16px" }} />
            <ListItemText
              primary="Register Committee"
              primaryTypographyProps={{
                style: { fontSize: "12px", fontWeight: "bold" },
              }}
            />
          </ListItem>
        </List>
      </div>

      {!selectedSchool ? (
        <Grid container spacing={1}>
          {filteredSchools.map((school) => (
            <Grid item xs={12} sm={6} md={4} key={school.id}>
              <ListItem
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  background: "#fff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  "&:hover": { background: "#f5f5f5" },
                }}
              >
                <Tooltip title="View School Details" arrow>
                  <InfoIcon
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      cursor: "pointer",
                      color: "#007BFF",
                    }}
                    onClick={() => handleToggleOfficeStaff(school.id)}
                  />
                </Tooltip>
                <Typography variant="h6" fontWeight="bold">
                  {school.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Address: {school.address}
                  <br />
                  City: {school.city}
                  <br />
                  Contact No.: {school.contactNumber}
                </Typography>
              </ListItem>
            </Grid>
          ))}

          {filteredSchools.length === 0 && (
            <Grid item xs={12}>
              <Typography align="center">No schools found.</Typography>
            </Grid>
          )}
        </Grid>
      ) : (
        <>
          <Paper elevation={4} sx={{ width: "100%", margin: "auto", mb: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                backgroundColor: "#e0f7fa",
                mb: 2,
                "& .MuiTabs-flexContainer": {
                  flexWrap: "nowrap",
                },
              }}
            >
              <Tab
                label="Office Staff"
                sx={{ flexShrink: 1 }}
                onClick={() => handleToggleOfficeStaff(selectedSchool.id)}
              />
              <Tab
                label="Teaching"
                sx={{ flexShrink: 1 }}
                onClick={() =>
                  handleViewTeachers(selectedSchool.id, "Teaching")
                }
              />
              <Tab
                label="Non-Teaching"
                sx={{ flexShrink: 1 }}
                onClick={() =>
                  handleViewTeachers(selectedSchool.id, "Non-Teaching")
                }
              />
              <Tab
                label="Committee"
                sx={{ flexShrink: 1 }}
                onClick={() =>
                  handleViewCommitteeMembers(selectedSchool.id, "Committee")
                }
              />
            </Tabs>

            {/* Office Staff Details Tab */}
            {activeTab === 0 &&
              selectedSchool &&
              selectedOfficeStaff.length > 0 && (
                <Box>
                  <div style={{ marginLeft: "10px" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSelectedSchool(null);
                        setSelectedOfficeStaff([]);
                      }}
                    >
                      Back to Schools
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ ml: 1 }}
                      onClick={handlePromoteClick}
                      disabled={isPromoteMode} // Disable promote button when in promote mode
                    >
                      Promote
                    </Button>
                    {isPromoteMode && (
                      <Button
                        variant="outlined"
                        sx={{ ml: 1 }}
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                  <Grid
                    container
                    spacing={1}
                    sx={{ mt: 0, pl: 1, pr: 1, pb: 1 }}
                  >
                    {filteredOfficeStaff.length > 0 ? (
                      filteredOfficeStaff.map((staff) => (
                        <Grid item xs={12} sm={6} md={4} key={staff.id}>
                          <Box
                            sx={{
                              border: "1px solid #ccc",
                              borderRadius: "8px",
                              padding: "10px",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              backgroundColor: "#fff",
                            }}
                          >
                            <Grid container spacing={2}>
                              {/* Left Content */}
                              <Grid item xs={8}>
                                <Typography
                                  variant="h6"
                                  fontWeight="bold"
                                  gutterBottom
                                >
                                  {staff.fullName}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ marginBottom: "8px" }}
                                >
                                  <strong>Employee ID:</strong>{" "}
                                  {staff.employeeId}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ marginBottom: "8px" }}
                                >
                                  <strong>Designation:</strong>{" "}
                                  {staff.designation}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ marginBottom: "8px" }}
                                >
                                  <strong>Contact:</strong>{" "}
                                  {staff.contactNumber}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ marginBottom: "8px" }}
                                >
                                  <strong>Qualification:</strong>{" "}
                                  {staff.highestQualification}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ marginBottom: "8px" }}
                                >
                                  <strong>Work Experience:</strong>{" "}
                                  {staff.workExperience}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ marginBottom: "8px" }}
                                >
                                  <strong>Joining Date:</strong>{" "}
                                  {staff.joiningDate}
                                </Typography>

                                {/* Show dropdown and update button when in promote mode */}
                                {isPromoteMode && (
                                  <Box sx={{ marginTop: "16px" }}>
                                    <Select
                                      value={
                                        selectedDesignations[staff.id] ||
                                        staff.designation
                                      }
                                      onChange={(e) =>
                                        handleDesignationChange(
                                          staff.id,
                                          e.target.value
                                        )
                                      }
                                      fullWidth
                                      size="small"
                                    >
                                      {designationsList.map((designation) => (
                                        <MenuItem
                                          key={designation}
                                          value={designation}
                                        >
                                          {designation}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    <Button
                                      variant="contained"
                                      sx={{ mt: 1 }}
                                      size="small"
                                      onClick={() =>
                                        handleUpdateClick(staff.id)
                                      }
                                    >
                                      Update
                                    </Button>
                                  </Box>
                                )}
                              </Grid>
                              <style>
                                {`
                                  .zoomable-image {
                                    transition: transform 0.3s ease-in-out; /* Smooth zoom effect */
                                  }

                                  .zoomable-image:hover {
                                    transform: scale(1.1); /* Slight zoom on hover */
                                  }
                                `}
                              </style>

                              {/* Right Image */}
                              <Grid item xs={4}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                  }}
                                >
                                  <img
                                    // src="/images/profile.png"
                                    src={
                                      staff.gender === "Male"
                                        ? "/images/MaleAvatar.jpg"
                                        : staff.gender === "Female"
                                        ? "/images/FemaleAvatar.jpg"
                                        : "/images/profile.png"
                                    }
                                    alt="Staff Image"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "100%",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                      cursor: "pointer",
                                      transition: "transform 0.3s ease-in-out", // Smooth transition for hover effect
                                    }}
                                    className="zoomable-image" // Adjust for module usage
                                  />
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography align="center">
                          No office staff found for this school.
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}

            {/* Teaching Staff Details Tab */}
            {activeTab === 1 &&
              selectedSchool &&
              selectedTeachers.length > 0 && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      // mt: 2,
                      mb: 1,
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        ml: 1,
                      }}
                      onClick={() => {
                        setSelectedSchool(null);
                        setSearchTerm(""); // Reset search term when going back
                      }}
                    >
                      Back to Schools
                    </Button>

                    <TextField
                      select
                      label="Report Type"
                      value={viewMode}
                      size="small"
                      onChange={(e) => setViewMode(e.target.value)}
                      sx={{ width: 200 }}
                    >
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="toFromDate">To-From Date</MenuItem>
                    </TextField>

                    {viewMode === "toFromDate" && (
                      <>
                        <TextField
                          label="From Date"
                          type="date"
                          value={fromDate}
                          size="small"
                          onChange={(e) => setFromDate(e.target.value)}
                          sx={{ width: 180 }}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          label="To Date"
                          type="date"
                          value={toDate}
                          size="small"
                          onChange={(e) => setToDate(e.target.value)}
                          sx={{ width: 180 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </>
                    )}

                    {viewMode === "weekly" && (
                      <>
                        <TextField
                          select
                          label="Week"
                          value={selectedWeek}
                          size="small"
                          onChange={(e) => setSelectedWeek(e.target.value)}
                          sx={{ width: 150 }}
                        >
                          {[1, 2, 3, 4].map((week) => (
                            <MenuItem key={week} value={week}>
                              Week {week}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          select
                          label="Month"
                          value={selectedMonth}
                          size="small"
                          onChange={(e) => setSelectedMonth(e.target.value)}
                          sx={{ width: 150 }}
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
                          label="Year"
                          type="number"
                          value={selectedYear}
                          size="small"
                          onChange={(e) => setSelectedYear(e.target.value)}
                          sx={{ width: 150 }}
                          InputProps={{
                            inputProps: {
                              min: 2000,
                              max: new Date().getFullYear(),
                            },
                          }}
                        />
                      </>
                    )}

                    {viewMode === "monthly" && (
                      <>
                        <TextField
                          select
                          label="Month"
                          value={selectedMonth}
                          size="small"
                          onChange={(e) => setSelectedMonth(e.target.value)}
                          sx={{ width: 150 }}
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
                          label="Year"
                          type="number"
                          value={selectedYear}
                          size="small"
                          onChange={(e) => setSelectedYear(e.target.value)}
                          sx={{ width: 150 }}
                          InputProps={{
                            inputProps: {
                              min: 2000,
                              max: new Date().getFullYear(),
                            },
                          }}
                        />
                      </>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      // onClick={handleReportTypeMenuClick}
                      onClick={(event) => handleReportMenuOpen(event)}
                      disabled={
                        !selectedMonth ||
                        !selectedYear ||
                        !selectedSchool ||
                        (viewMode === "weekly" && !selectedWeek) ||
                        (viewMode === "toFromDate" && (!fromDate || !toDate))
                      }
                      startIcon={<Download />}
                    >
                      Report
                    </Button>
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={Boolean(menuAnchorEl)}
                      onClose={handleReportMenuClose}
                    >
                      <MenuItem
                        onClick={(event) =>
                          handleSubMenuOpen(event, "attendance")
                        }
                      >
                        <CalendarToday sx={{ mr: 1 }} />
                        Attendance Report
                      </MenuItem>
                    </Menu>

                    <Menu
                      anchorEl={subMenuAnchorEl}
                      open={Boolean(subMenuAnchorEl)}
                      onClose={handleReportMenuClose}
                    >
                      <MenuItem onClick={handleGeneratePDF}>
                        <PictureAsPdf sx={{ mr: 1 }} />
                        PDF
                      </MenuItem>
                      <MenuItem onClick={handleGenerateExcel}>
                        <TableChart sx={{ mr: 1 }} />
                        Excel
                      </MenuItem>
                      <MenuItem onClick={handleGenerateCSV}>
                        <InsertDriveFile sx={{ mr: 1 }} />
                        CSV
                      </MenuItem>
                    </Menu>

                    {/* <Button
                      variant="contained"
                      onClick={
                        viewMode === "performance"
                          ? generatePerformanceReport
                          : handleMenuOpen
                      }
                      disabled={
                        viewMode !== "performance" &&
                        (!selectedMonth ||
                          !selectedYear ||
                          (viewMode === "weekly" && !selectedWeek) ||
                          (viewMode === "toFromDate" && (!fromDate || !toDate)))
                      }
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Report
                    </Button>

                    {viewMode !== "performance" && (
                      <Menu
                        anchorEl={subMenuAnchorEl}
                        open={Boolean(subMenuAnchorEl)}
                        onClose={handleReportMenuClose}
                      >
                        <MenuItem onClick={handleReportMenuClose}>
                          <PictureAsPdf className="h-4 w-4 mr-2" />
                          PDF
                        </MenuItem>
                        <MenuItem onClick={handleReportMenuClose}>
                          <TableChart className="h-4 w-4 mr-2" />
                          Excel
                        </MenuItem>
                        <MenuItem onClick={handleReportMenuClose}>
                          <InsertDriveFile className="h-4 w-4 mr-2" />
                          CSV
                        </MenuItem>
                      </Menu>
                    )} */}
                  </Box>

                  <Grid container spacing={1} sx={{ pl: 1, pr: 1, pb: 1 }}>
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((teacher) => (
                        <Grid item xs={12} sm={6} md={4} key={teacher.id}>
                          <ListItem
                            key={teacher.id}
                            sx={{
                              border: "1px solid #ccc",
                              borderRadius: "8px",
                              marginBottom: "10px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              padding: "10px",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ marginBottom: "5px" }}
                            >
                              {teacher.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ marginBottom: "5px" }}
                            >
                              <strong>Employee Id:</strong> {teacher.employeeId}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ marginBottom: "5px" }}
                            >
                              <strong>Qualification:</strong>{" "}
                              {teacher.qualification}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ marginBottom: "5px" }}
                            >
                              <strong>Years of Experience:</strong>{" "}
                              {teacher.experience}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ marginBottom: "10px" }}
                            >
                              <strong>Joining Date:</strong>{" "}
                              {new Date(
                                teacher.dateOfJoining
                              ).toLocaleDateString()}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                              }}
                            >
                              <Button
                                variant="contained"
                                color="info"
                                size="small"
                                onClick={() => handleOpenDialog(teacher.id)}
                              >
                                View Standards
                              </Button>
                              {/* <Button
                                variant="contained"
                                color="info"
                                size="small"
                                // onClick={(event) =>
                                //   handleMenuOpen(event, teacher)
                                // }
                                onClick={() => generatePerformanceReport()}
                              >
                                Performance Report
                              </Button> */}
                              <Button
                                variant="contained"
                                color="info"
                                size="small"
                                onClick={() =>
                                  generatePerformanceReport(
                                    filteredSchools[0],
                                    filteredTeachers[0]
                                  )
                                }
                                disabled={
                                  !filteredSchools.length ||
                                  !filteredTeachers.length
                                }
                              >
                                Performance Report
                              </Button>
                            </Box>
                          </ListItem>
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography>No teachers found.</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Teaching Standards and Divisions</DialogTitle>
              <DialogContent>
                {teacherStandardsWithDivisions.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography fontWeight="bold">Standard</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">Divisions</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">Subjects</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teacherStandardsWithDivisions.map(
                        ({ standard, divisions, subjects }, index) => (
                          <TableRow key={index}>
                            <TableCell>{standard}</TableCell>
                            <TableCell>
                              {divisions.join(", ") || "None"}
                            </TableCell>
                            <TableCell>
                              {subjects.join(", ") || "None"}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography>No standards found for this teacher.</Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} variant="outlined">
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            {/* Non Teaching Staff Details Tab*/}
            {activeTab === 2 &&
              selectedSchool &&
              selectedTeachers.length > 0 && (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      // mt: 2,
                      mb: 1,
                      gap: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        ml: 1,
                      }}
                      onClick={() => {
                        setSelectedSchool(null);
                        setSearchTerm(""); // Reset search term when going back
                      }}
                    >
                      Back to Schools
                    </Button>

                    <TextField
                      select
                      label="Report Type"
                      value={viewMode}
                      size="small"
                      onChange={(e) => setViewMode(e.target.value)}
                      sx={{ width: 200 }}
                    >
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="toFromDate">To-From Date</MenuItem>
                    </TextField>

                    {viewMode === "toFromDate" && (
                      <>
                        <TextField
                          label="From Date"
                          type="date"
                          value={fromDate}
                          size="small"
                          onChange={(e) => setFromDate(e.target.value)}
                          sx={{ width: 180 }}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          label="To Date"
                          type="date"
                          value={toDate}
                          size="small"
                          onChange={(e) => setToDate(e.target.value)}
                          sx={{ width: 180 }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </>
                    )}

                    {viewMode === "weekly" && (
                      <>
                        <TextField
                          select
                          label="Week"
                          value={selectedWeek}
                          size="small"
                          onChange={(e) => setSelectedWeek(e.target.value)}
                          sx={{ width: 150 }}
                        >
                          {[1, 2, 3, 4].map((week) => (
                            <MenuItem key={week} value={week}>
                              Week {week}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          select
                          label="Month"
                          value={selectedMonth}
                          size="small"
                          onChange={(e) => setSelectedMonth(e.target.value)}
                          sx={{ width: 150 }}
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
                          label="Year"
                          type="number"
                          value={selectedYear}
                          size="small"
                          onChange={(e) => setSelectedYear(e.target.value)}
                          sx={{ width: 150 }}
                          InputProps={{
                            inputProps: {
                              min: 2000,
                              max: new Date().getFullYear(),
                            },
                          }}
                        />
                      </>
                    )}

                    {viewMode === "monthly" && (
                      <>
                        <TextField
                          select
                          label="Month"
                          value={selectedMonth}
                          size="small"
                          onChange={(e) => setSelectedMonth(e.target.value)}
                          sx={{ width: 150 }}
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
                          label="Year"
                          type="number"
                          value={selectedYear}
                          size="small"
                          onChange={(e) => setSelectedYear(e.target.value)}
                          sx={{ width: 150 }}
                          InputProps={{
                            inputProps: {
                              min: 2000,
                              max: new Date().getFullYear(),
                            },
                          }}
                        />
                      </>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      // onClick={handleReportTypeMenuClick}
                      onClick={(event) => handleReportMenuOpen(event)}
                      disabled={
                        !selectedMonth ||
                        !selectedYear ||
                        !selectedSchool ||
                        (viewMode === "weekly" && !selectedWeek) ||
                        (viewMode === "toFromDate" && (!fromDate || !toDate))
                      }
                      startIcon={<Download />}
                    >
                      Report
                    </Button>
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={Boolean(menuAnchorEl)}
                      onClose={handleReportMenuClose}
                    >
                      <MenuItem
                        onClick={(event) =>
                          handleSubMenuOpen(event, "attendance")
                        }
                      >
                        <CalendarToday sx={{ mr: 1 }} />
                        Attendance Report
                      </MenuItem>
                    </Menu>

                    <Menu
                      anchorEl={subMenuAnchorEl}
                      open={Boolean(subMenuAnchorEl)}
                      onClose={handleReportMenuClose}
                    >
                      <MenuItem onClick={handleGeneratePDF}>
                        <PictureAsPdf sx={{ mr: 1 }} />
                        PDF
                      </MenuItem>
                      <MenuItem onClick={handleGenerateExcel}>
                        <TableChart sx={{ mr: 1 }} />
                        Excel
                      </MenuItem>
                      <MenuItem onClick={handleGenerateCSV}>
                        <InsertDriveFile sx={{ mr: 1 }} />
                        CSV
                      </MenuItem>
                    </Menu>
                  </Box>

                  <Grid container spacing={1} sx={{ pl: 1, pr: 1, pb: 1 }}>
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((teacher) => (
                        <Grid item xs={12} sm={6} md={4} key={teacher.id}>
                          <ListItem
                            key={teacher.id}
                            sx={{
                              border: "1px solid #ccc",
                              borderRadius: "8px",
                              marginBottom: "10px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              padding: "10px",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ marginBottom: "5px" }}
                            >
                              {teacher.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ marginBottom: "5px" }}
                            >
                              <strong>Employee Id:</strong> {teacher.employeeId}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ marginBottom: "5px" }}
                            >
                              <strong>Qualification:</strong>{" "}
                              {teacher.qualification}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ marginBottom: "5px" }}
                            >
                              <strong>Years of Experience:</strong>{" "}
                              {teacher.experience}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ marginBottom: "10px" }}
                            >
                              <strong>Joining Date:</strong>{" "}
                              {new Date(
                                teacher.dateOfJoining
                              ).toLocaleDateString()}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                              }}
                            >
                              <Button
                                variant="contained"
                                color="info"
                                size="small"
                                onClick={() => handleOpenDialog(teacher.id)}
                              >
                                View Standards
                              </Button>
                              <Button
                                variant="contained"
                                color="info"
                                size="small"
                                onClick={() =>
                                  generatePerformanceReport(
                                    filteredSchools[0],
                                    filteredTeachers[0]
                                  )
                                }
                                disabled={
                                  !filteredSchools.length ||
                                  !filteredTeachers.length
                                }
                              >
                                Performance Report
                              </Button>
                            </Box>
                          </ListItem>
                        </Grid>
                      ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography>No teachers found.</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Teaching Standards and Divisions</DialogTitle>
              <DialogContent>
                {teacherStandardsWithDivisions.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography fontWeight="bold">Standard</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">Divisions</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight="bold">Subjects</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teacherStandardsWithDivisions.map(
                        ({ standard, divisions, subjects }, index) => (
                          <TableRow key={index}>
                            <TableCell>{standard}</TableCell>
                            <TableCell>
                              {divisions.join(", ") || "None"}
                            </TableCell>
                            <TableCell>
                              {subjects.join(", ") || "None"}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography>No standards found for this teacher.</Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} variant="outlined">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            {/* committee Members Details tab */}
            {activeTab === 3 &&
              selectedSchool &&
              selectedCommitteeMembers.length > 0 && (
                <Box>
                  <Button
                    variant="outlined"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      setSelectedSchool(null);
                      setSearchTerm(""); // Reset search term when going back
                    }}
                  >
                    Back to Schools
                  </Button>
                  {filteredCommitteeMembers.length > 0 ? (
                    <List sx={{ m: 1 }}>
                      {filteredCommitteeMembers.map((committee) => (
                        <ListItem
                          key={committee.id}
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            padding: "10px",
                          }}
                        >
                          <Typography variant="h6" sx={{ marginBottom: "5px" }}>
                            {committee.fullName}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ marginBottom: "5px" }}
                          >
                            <strong>Email:</strong> {committee.email}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ marginBottom: "5px" }}
                          >
                            <strong>Phone:</strong> {committee.phone}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ marginBottom: "10px" }}
                          >
                            <strong>Education:</strong>{" "}
                            {new Date(committee.education).toLocaleDateString()}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ marginBottom: "10px" }}
                          >
                            <strong>Designation:</strong>{" "}
                            {new Date(
                              committee.designation
                            ).toLocaleDateString()}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography>No Committee Members found.</Typography>
                  )}
                </Box>
              )}
          </Paper>
        </>
      )}
    </Box>
  );
};

export default SchoolList;
