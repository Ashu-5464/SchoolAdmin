import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  TextField,
  Button,
  Modal,
  ToggleButtonGroup,
  ToggleButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Menu,
} from "@mui/material";
import jsPDF from "jspdf"; // For PDF generation
import "jspdf-autotable";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import AddSchoolIcon from "@mui/icons-material/DomainAdd";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import {
  Download,
  InsertDriveFile,
  PictureAsPdf,
  TableChart,
} from "@mui/icons-material";
import * as XLSX from "xlsx";

const StudentsList = ({ schools, students, parents }) => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [parentDetails, setParentDetails] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [markedAttendance, setMarkedAttendance] = useState({});
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order
  const [anchorEl, setAnchorEl] = useState(null); // Anchor for the dropdown menu
  const [anchorMenu, setAnchorMenu] = useState(null); // Anchor for the dropdown menu

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (order) => {
    if (order) {
      setSortOrder(order); // Set the selected sorting order
    }
    setAnchorEl(null); // Close the dropdown menu
  };

  // Open the dropdown menu
  const handleReportMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  // Close the dropdown menu
  const handleReportMenuClose = () => {
    setAnchorMenu(null);
  };

  // Declare subjects statically
  const subjects = ["Math", "Science", "English", "History", "Geography"];

  // Get unique standards and divisions
  const standards = Array.from(
    new Set(
      students
        .filter((student) => student.school === selectedSchool)
        .map((student) => student.standard)
    )
  );

  const divisions = Array.from(
    new Set(
      students
        .filter(
          (student) =>
            student.school === selectedSchool &&
            student.standard === selectedStandard
        )
        .map((student) => student.division)
    )
  );

  // Filtered students based on selected filters and search term
  const filteredStudents = students
    .filter(
      (student) =>
        student.school === selectedSchool &&
        student.standard === selectedStandard &&
        student.division === selectedDivision &&
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  // Static attendance data (P: Present, A: Absent)
  const staticAttendance = {
    1: { 1: "P", 2: "A", 13: "P", 17: "P", 25: "A" }, // John Doe's attendance
    2: { 21: "P", 22: "P", 20: "A", 25: "A", 26: "P" }, // Jane Smith's attendance
    3: { 11: "A", 12: "P", 13: "P", 24: "P", 25: "A" }, // Alice Johnson's attendance
  };

  const [daysInMonth, setDaysInMonth] = useState([]);

  // Generate calendar days when month and year are selected
  // const generateCalendar = () => {
  //   if (selectedMonth && selectedYear) {
  //     const totalDays = new Date(selectedYear, selectedMonth, 0).getDate();
  //     setDaysInMonth([...Array(totalDays).keys()].map((day) => day + 1));
  //   }
  // };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleViewParentDetails = (studentId) => {
    const parent = parents.find((parent) => parent.studentId === studentId);
    setParentDetails(parent);
  };

  const [isAcademicModalOpen, setAcademicModalOpen] = useState(false);

  const handleViewAcademicDetails = (id) => {
    const student = students.find((student) => student.id === id);
    setSelectedStudent(student);
    setAcademicModalOpen(true);
  };

  const handleCloseAcademicModal = () => {
    setAcademicModalOpen(false);
  };

  const handleCloseStudentModal = () => {
    setSelectedStudent(null);
  };

  const handleCloseParentModal = () => {
    setParentDetails(null);
  };

  const handleAttendanceToggle = (studentId, status) => {
    const today = new Date().toLocaleDateString();

    if (markedAttendance[studentId]?.includes(today)) {
      toast.warning("Today's attendance has already been marked.");
      return;
    }

    // Update attendance for the selected student
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        present:
          (prev[studentId]?.present || 0) + (status === "Present" ? 1 : 0),
        absent: (prev[studentId]?.absent || 0) + (status === "Absent" ? 1 : 0),
      },
    }));

    // Show the toast message
    toast.success(`Attendance marked as ${status}.`);

    // Update the marked attendance for the selected student for today
    setMarkedAttendance((prev) => ({
      ...prev,
      [studentId]: [...(prev[studentId] || []), today],
    }));

    // Trigger modal re-render by setting selectedStudent again (force update)
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent((prev) => ({
        ...prev,
        attendance: {
          present:
            (prev.attendance?.present || 0) + (status === "Present" ? 1 : 0),
          absent:
            (prev.attendance?.absent || 0) + (status === "Absent" ? 1 : 0),
        },
      }));
    }
  };

  const generatePDFReport = (studentId) => {
    const doc = new jsPDF();
    // Fetch selected student's data
    const selectedStudent = filteredStudents.find(
      (student) => student.id === studentId
    );
    const attendanceData = attendance[studentId] || { present: 0, absent: 0 };

    // Title Section
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Attendance Report", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`${selectedStudent.school}`, 105, 25, {
      align: "center",
      fontWeight: "bold",
    });
    doc.line(10, 30, 200, 30); // Horizontal line

    if (selectedStudent) {
      // Student Details Section
      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
      doc.text(`Student Name: ${selectedStudent.name}`, 20, 40);
      doc.text(`Student ID: ${selectedStudent.id}`, 20, 50);

      // Attendance Summary Table
      const attendanceSummary = [
        ["Present Days", attendanceData.present],
        ["Absent Days", attendanceData.absent],
      ];

      doc.autoTable({
        startY: 60,
        theme: "grid",
        head: [["Category", "Count"]],
        body: attendanceSummary,
        headStyles: { fillColor: [63, 81, 181], textColor: 255, fontSize: 12 },
        bodyStyles: { fontSize: 12 },
      });

      // Save the PDF
      doc.save(`${selectedStudent.name}_Attendance_Report.pdf`);
    } else {
      console.error("Student not found for the given ID.");
    }
  };

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [viewMode, setViewMode] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  // const handleGenerateAllPDF = () => {
  //   const doc = new jsPDF({
  //     orientation: "landscape",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   // Title Styling
  //   doc.setFontSize(14);
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Attendance Report", 148.5, 15, { align: "center" });

  //   // Prepare table headers
  //   const headers = [
  //     [
  //       "ID",
  //       "Student",
  //       ...daysInMonth.map((day) => `${day}`),
  //       "Present",
  //       "Absent",
  //     ],
  //   ];

  //   // Prepare table data
  //   const data = filteredStudents.map((student) => {
  //     const attendanceData = staticAttendance[student.id] || {};
  //     const presentCount = Object.values(attendanceData).filter(
  //       (status) => status === "P"
  //     ).length;
  //     const absentCount = Object.values(attendanceData).filter(
  //       (status) => status === "A"
  //     ).length;

  //     return [
  //       student.id,
  //       student.name,
  //       ...daysInMonth.map((day) => {
  //         const status = attendanceData[day];
  //         if (status === "P")
  //           return { content: "P", styles: { textColor: [41, 128, 185] } };
  //         if (status === "A")
  //           return { content: "A", styles: { textColor: [192, 57, 43] } };
  //         return "-";
  //       }),
  //       presentCount,
  //       absentCount,
  //     ];
  //   });

  //   // Add table to PDF
  //   doc.autoTable({
  //     head: headers,
  //     body: data,
  //     startY: 25,
  //     theme: "grid",
  //     headStyles: {
  //       fillColor: [41, 128, 185],
  //       textColor: [255, 255, 255],
  //       fontSize: 9,
  //     },
  //     bodyStyles: { fontSize: 9, cellPadding: 2 },
  //     alternateRowStyles: { fillColor: [245, 245, 245] },
  //     columnStyles: {
  //       0: { cellWidth: 7 }, // Roll
  //       1: { cellWidth: 18 }, // Students
  //       // Adjusting day columns for responsiveness
  //       ...daysInMonth.reduce((acc, _, i) => {
  //         acc[i + 2] = { cellWidth: 7 }; // Days
  //         return acc;
  //       }, {}),
  //       [daysInMonth.length + 2]: { cellWidth: 17 }, // Present Days
  //       [daysInMonth.length + 3]: { cellWidth: 16 }, // Absent Days
  //     },
  //     styles: { overflow: "linebreak", halign: "center" },
  //     didDrawCell: (data) => {
  //       // Custom styling if needed per cell
  //     },
  //   });

  //   // Save the PDF
  //   doc.save(`Attendance_Report_${selectedMonth}_${selectedYear}.pdf`);
  // };

  // // Excel Generation
  // const handleGenerateExcel = () => {
  //   const headers = ["ID", "Student", ...daysInMonth, "Present", "Absent"];
  //   const data = filteredStudents.map((student) => {
  //     const attendanceData = staticAttendance[student.id] || {};
  //     const presentCount = Object.values(attendanceData).filter(
  //       (status) => status === "P"
  //     ).length;
  //     const absentCount = Object.values(attendanceData).filter(
  //       (status) => status === "A"
  //     ).length;

  //     return [
  //       student.id,
  //       student.name,
  //       ...daysInMonth.map((day) => attendanceData[day] || "-"),
  //       presentCount,
  //       absentCount,
  //     ];
  //   });

  //   const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

  //   XLSX.writeFile(
  //     workbook,
  //     `Attendance_Report_${selectedMonth}_${selectedYear}.xlsx`
  //   );
  //   handleMenuClose();
  // };

  // // CSV Generation
  // const handleGenerateCSV = () => {
  //   const headers = ["ID,Student," + daysInMonth.join(",") + ",Present,Absent"];
  //   const data = filteredStudents.map((student) => {
  //     const attendanceData = staticAttendance[student.id] || {};
  //     const presentCount = Object.values(attendanceData).filter(
  //       (status) => status === "P"
  //     ).length;
  //     const absentCount = Object.values(attendanceData).filter(
  //       (status) => status === "A"
  //     ).length;

  //     const row = [
  //       student.id,
  //       student.name,
  //       ...daysInMonth.map((day) => attendanceData[day] || "-"),
  //       presentCount,
  //       absentCount,
  //     ];
  //     return row.join(",");
  //   });

  //   const csvContent = headers.concat(data).join("\n");
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.setAttribute(
  //     "download",
  //     `Attendance_Report_${selectedMonth}_${selectedYear}.csv`
  //   );
  //   link.click();
  //   handleMenuClose();
  // };

  // Function to handle marking attendance for all students

  // const getWeekDates = (year, month, week) => {
  //   const firstDayOfMonth = new Date(year, month - 1, 1);
  //   const daysInMonth = new Date(year, month, 0).getDate();

  //   // Calculate start and end dates for the selected week
  //   const weekStart = (week - 1) * 7 + 1;
  //   const weekEnd = Math.min(week * 7, daysInMonth);

  //   const dates = [];
  //   for (let day = weekStart; day <= weekEnd; day++) {
  //     dates.push(day);
  //   }

  //   return dates;
  // };

  // Calendar generation

  const generateCalendar = useCallback(() => {
    if (selectedMonth && selectedYear) {
      const totalDays = new Date(selectedYear, selectedMonth, 0).getDate();
      setDaysInMonth([...Array(totalDays).keys()].map((day) => day + 1));
    }
  }, [selectedMonth, selectedYear]);

  // Effect to regenerate calendar when month/year changes
  useEffect(() => {
    generateCalendar();
  }, [selectedMonth, selectedYear, generateCalendar]);

  // Helper function to get week dates
  const getWeekDates = (year, month, week) => {
    const totalDays = new Date(year, month, 0).getDate();
    const weekStart = (week - 1) * 7 + 1;
    const weekEnd = Math.min(week * 7, totalDays);

    return [...Array(weekEnd - weekStart + 1)].map(
      (_, index) => weekStart + index
    );
  };

  // Helper function to get dates for reports
  // const getReportDates = () => {
  //   switch (viewMode) {
  //     case "weekly":
  //       return getWeekDates(selectedYear, selectedMonth, selectedWeek);
  //     case "toFromDate": {
  //       const start = new Date(fromDate);
  //       const end = new Date(toDate);
  //       const dates = [];
  //       for (
  //         let dt = new Date(start);
  //         dt <= end;
  //         dt.setDate(dt.getDate() + 1)
  //       ) {
  //         dates.push(dt.getDate());
  //       }
  //       return dates;
  //     }
  //     case "monthly":
  //     default:
  //       return daysInMonth;
  //   }
  // };

  // const handleGenerateAllPDF = () => {
  //   const doc = new jsPDF({
  //     orientation: "landscape",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   // Title Styling
  //   doc.setFontSize(14);
  //   doc.setFont("helvetica", "bold");
  //   const reportTitle =
  //     viewMode === "weekly"
  //       ? `Attendance Report - Week ${selectedWeek} ${new Date(
  //           0,
  //           selectedMonth - 1
  //         ).toLocaleString("default", { month: "long" })} ${selectedYear}`
  //       : `Attendance Report - ${new Date(0, selectedMonth - 1).toLocaleString(
  //           "default",
  //           { month: "long" }
  //         )} ${selectedYear}`;
  //   doc.text(reportTitle, 148.5, 15, { align: "center" });

  //   // Get dates based on view mode
  //   const reportDates =
  //     viewMode === "weekly"
  //       ? getWeekDates(selectedYear, selectedMonth, selectedWeek)
  //       : daysInMonth;

  //   // Prepare table headers
  //   const headers = [
  //     [
  //       "ID",
  //       "Student",
  //       ...reportDates.map((day) => `${day}`),
  //       "Present",
  //       "Absent",
  //     ],
  //   ];

  //   // Prepare table data
  //   const data = filteredStudents.map((student) => {
  //     const attendanceData = staticAttendance[student.id] || {};
  //     const presentCount = reportDates.reduce(
  //       (count, day) => count + (attendanceData[day] === "P" ? 1 : 0),
  //       0
  //     );
  //     const absentCount = reportDates.reduce(
  //       (count, day) => count + (attendanceData[day] === "A" ? 1 : 0),
  //       0
  //     );

  //     return [
  //       student.id,
  //       student.name,
  //       ...reportDates.map((day) => {
  //         const status = attendanceData[day];
  //         if (status === "P")
  //           return { content: "P", styles: { textColor: [41, 128, 185] } };
  //         if (status === "A")
  //           return { content: "A", styles: { textColor: [192, 57, 43] } };
  //         return "-";
  //       }),
  //       presentCount,
  //       absentCount,
  //     ];
  //   });

  //   // Add table to PDF
  //   doc.autoTable({
  //     head: headers,
  //     body: data,
  //     startY: 25,
  //     theme: "grid",
  //     headStyles: {
  //       fillColor: [41, 128, 185],
  //       textColor: [255, 255, 255],
  //       fontSize: 9,
  //     },
  //     bodyStyles: { fontSize: 9, cellPadding: 2 },
  //     alternateRowStyles: { fillColor: [245, 245, 245] },
  //     columnStyles: {
  //       0: { cellWidth: 7 },
  //       1: { cellWidth: 18 },
  //       ...reportDates.reduce((acc, _, i) => {
  //         acc[i + 2] = { cellWidth: 7 };
  //         return acc;
  //       }, {}),
  //       [reportDates.length + 2]: { cellWidth: 17 },
  //       [reportDates.length + 3]: { cellWidth: 16 },
  //     },
  //     styles: { overflow: "linebreak", halign: "center" },
  //   });

  //   // Save the PDF
  //   const fileName =
  //     viewMode === "weekly"
  //       ? `Attendance_Report_Week${selectedWeek}_${selectedMonth}_${selectedYear}.pdf`
  //       : `Attendance_Report_${selectedMonth}_${selectedYear}.pdf`;
  //   doc.save(fileName);
  // };

  // // Excel Generation
  // const handleGenerateExcel = () => {
  //   const reportDates =
  //     viewMode === "weekly"
  //       ? getWeekDates(selectedYear, selectedMonth, selectedWeek)
  //       : daysInMonth;

  //   const headers = ["ID", "Student", ...reportDates, "Present", "Absent"];
  //   const data = filteredStudents.map((student) => {
  //     const attendanceData = staticAttendance[student.id] || {};
  //     const presentCount = reportDates.reduce(
  //       (count, day) => count + (attendanceData[day] === "P" ? 1 : 0),
  //       0
  //     );
  //     const absentCount = reportDates.reduce(
  //       (count, day) => count + (attendanceData[day] === "A" ? 1 : 0),
  //       0
  //     );

  //     return [
  //       student.id,
  //       student.name,
  //       ...reportDates.map((day) => attendanceData[day] || "-"),
  //       presentCount,
  //       absentCount,
  //     ];
  //   });

  //   const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

  //   const fileName =
  //     viewMode === "weekly"
  //       ? `Attendance_Report_Week${selectedWeek}_${selectedMonth}_${selectedYear}.xlsx`
  //       : `Attendance_Report_${selectedMonth}_${selectedYear}.xlsx`;
  //   XLSX.writeFile(workbook, fileName);
  //   handleReportMenuClose();
  // };

  // // CSV Generation
  // const handleGenerateCSV = () => {
  //   const reportDates =
  //     viewMode === "weekly"
  //       ? getWeekDates(selectedYear, selectedMonth, selectedWeek)
  //       : daysInMonth;

  //   const headers = ["ID,Student," + reportDates.join(",") + ",Present,Absent"];
  //   const data = filteredStudents.map((student) => {
  //     const attendanceData = staticAttendance[student.id] || {};
  //     const presentCount = reportDates.reduce(
  //       (count, day) => count + (attendanceData[day] === "P" ? 1 : 0),
  //       0
  //     );
  //     const absentCount = reportDates.reduce(
  //       (count, day) => count + (attendanceData[day] === "A" ? 1 : 0),
  //       0
  //     );

  //     const row = [
  //       student.id,
  //       student.name,
  //       ...reportDates.map((day) => attendanceData[day] || "-"),
  //       presentCount,
  //       absentCount,
  //     ];
  //     return row.join(",");
  //   });

  //   const csvContent = headers.concat(data).join("\n");
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   const fileName =
  //     viewMode === "weekly"
  //       ? `Attendance_Report_Week${selectedWeek}_${selectedMonth}_${selectedYear}.csv`
  //       : `Attendance_Report_${selectedMonth}_${selectedYear}.csv`;
  //   link.setAttribute("download", fileName);
  //   link.click();
  //   handleReportMenuClose();
  // };

  // Helper function to get dates between selected range
  const getDatesBetweenRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(date.getDate());
    }
    return dates;
  };

  const handleGenerateAllPDF = () => {
    console.log("Selected School : ", selectedSchool.name);
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Title Styling
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");

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
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      reportTitle = `Attendance Report (${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`;
      reportDates = getDatesBetweenRange(startDate, endDate);
    } else {
      reportTitle = `Attendance Report - ${new Date(
        0,
        selectedMonth - 1
      ).toLocaleString("default", { month: "long" })} ${selectedYear}`;
      reportDates = daysInMonth;
    }

    doc.setFontSize(14);
    doc.text(mainTitle, 148.5, 15, { align: "center" });
    doc.text(reportTitle, 148.5, 20, { align: "center" });

    // Prepare table headers
    const headers = [
      [
        "ID",
        "Student",
        ...reportDates.map((day) => `${day}`),
        "Present",
        "Absent",
      ],
    ];

    // Prepare table data
    const data = filteredStudents.map((student) => {
      const attendanceData = staticAttendance[student.id] || {};
      const presentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "P" ? 1 : 0),
        0
      );
      const absentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "A" ? 1 : 0),
        0
      );

      return [
        student.id,
        student.name,
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

    // Add table to PDF
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
      // columnStyles: {
      //   0: { cellWidth: 7 },
      //   1: { cellWidth: 18 },
      //   ...reportDates.reduce((acc, _, i) => {
      //     acc[i + 2] = { cellWidth: 7 };
      //     return acc;
      //   }, {}),
      //   [reportDates.length + 2]: { cellWidth: 17 },
      //   [reportDates.length + 3]: { cellWidth: 16 },
      // },
      // styles: { overflow: "linebreak", halign: "center" },
    });

    // Save the PDF with appropriate filename
    let fileName = "";
    if (viewMode === "weekly") {
      fileName = `Attendance_Report_Week${selectedWeek}_${selectedMonth}_${selectedYear}.pdf`;
    } else if (viewMode === "toFromDate") {
      const startStr = fromDate.split("-").join("");
      const endStr = toDate.split("-").join("");
      fileName = `Attendance_Report_${startStr}_to_${endStr}.pdf`;
    } else {
      fileName = `Attendance_Report_${selectedMonth}_${selectedYear}.pdf`;
    }

    doc.save(fileName);
    handleReportMenuClose();
  };

  // Excel Generation
  const handleGenerateExcel = () => {
    let reportDates = [];

    if (viewMode === "weekly") {
      reportDates = getWeekDates(selectedYear, selectedMonth, selectedWeek);
    } else if (viewMode === "toFromDate") {
      reportDates = getDatesBetweenRange(new Date(fromDate), new Date(toDate));
    } else {
      reportDates = daysInMonth;
    }

    const headers = ["ID", "Student", ...reportDates, "Present", "Absent"];
    const data = filteredStudents.map((student) => {
      const attendanceData = staticAttendance[student.id] || {};
      const presentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "P" ? 1 : 0),
        0
      );
      const absentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "A" ? 1 : 0),
        0
      );

      return [
        student.id,
        student.name,
        ...reportDates.map((day) => attendanceData[day] || "-"),
        presentCount,
        absentCount,
      ];
    });

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

    let fileName = "";
    if (viewMode === "weekly") {
      fileName = `Attendance_Report_Week${selectedWeek}_${selectedMonth}_${selectedYear}.xlsx`;
    } else if (viewMode === "toFromDate") {
      const startStr = fromDate.split("-").join("");
      const endStr = toDate.split("-").join("");
      fileName = `Attendance_Report_${startStr}_to_${endStr}.xlsx`;
    } else {
      fileName = `Attendance_Report_${selectedMonth}_${selectedYear}.xlsx`;
    }

    XLSX.writeFile(workbook, fileName);
    handleReportMenuClose();
  };

  // CSV Generation
  const handleGenerateCSV = () => {
    let reportDates = [];

    if (viewMode === "weekly") {
      reportDates = getWeekDates(selectedYear, selectedMonth, selectedWeek);
    } else if (viewMode === "toFromDate") {
      reportDates = getDatesBetweenRange(new Date(fromDate), new Date(toDate));
    } else {
      reportDates = daysInMonth;
    }

    const headers = ["ID,Student," + reportDates.join(",") + ",Present,Absent"];
    const data = filteredStudents.map((student) => {
      const attendanceData = staticAttendance[student.id] || {};
      const presentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "P" ? 1 : 0),
        0
      );
      const absentCount = reportDates.reduce(
        (count, day) => count + (attendanceData[day] === "A" ? 1 : 0),
        0
      );

      const row = [
        student.id,
        student.name,
        ...reportDates.map((day) => attendanceData[day] || "-"),
        presentCount,
        absentCount,
      ];
      return row.join(",");
    });

    const csvContent = headers.concat(data).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    let fileName = "";
    if (viewMode === "weekly") {
      fileName = `Attendance_Report_Week${selectedWeek}_${selectedMonth}_${selectedYear}.csv`;
    } else if (viewMode === "toFromDate") {
      const startStr = fromDate.split("-").join("");
      const endStr = toDate.split("-").join("");
      fileName = `Attendance_Report_${startStr}_to_${endStr}.csv`;
    } else {
      fileName = `Attendance_Report_${selectedMonth}_${selectedYear}.csv`;
    }

    link.setAttribute("download", fileName);
    link.click();
    handleReportMenuClose();
  };

  const handleMarkAllAttendance = (status) => {
    const today = new Date().toLocaleDateString();

    // Check if any student already has their attendance marked for today
    for (const studentId of Object.keys(markedAttendance)) {
      if (markedAttendance[studentId]?.includes(today)) {
        toast.warning("Attendance has already been marked for today.");
        return;
      }
    }

    // Mark attendance for all students
    setAttendance((prev) => {
      let updatedAttendance = { ...prev };

      // Loop through each student and mark them as present or absent
      for (const studentId of Object.keys(prev)) {
        updatedAttendance[studentId] = {
          present:
            (updatedAttendance[studentId]?.present || 0) +
            (status === "Present" ? 1 : 0),
          absent:
            (updatedAttendance[studentId]?.absent || 0) +
            (status === "Absent" ? 1 : 0),
        };
      }

      return updatedAttendance;
    });

    // Show the toast message for marking all students' attendance
    toast.success(`Attendance marked as ${status} for all students.`);

    // Mark the attendance for all students as completed for today
    setMarkedAttendance((prev) => {
      let updatedMarkedAttendance = { ...prev };

      // Loop through each student and mark the date as attended
      for (const studentId of Object.keys(prev)) {
        updatedMarkedAttendance[studentId] = [
          ...(prev[studentId] || []),
          today,
        ];
      }

      return updatedMarkedAttendance;
    });
  };

  const handlePrint = () => {
    const modalContent = document.getElementById("academic-modal");

    if (modalContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Academic Details</title>
            <style>
              @media print {
                button {
                  display: none; /* Hide all buttons during printing */
                }
                body {
                  margin: 20;
                  font-family: Poppins, sans-serif;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid #000;
                  padding: 8px;
                  text-align: center;
                }
              }
            </style>
          </head>
          <body>${modalContent.outerHTML}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", margin: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Students List
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

      {/* Month and Year Selectors */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
          mb: 2,
          gap: 1,
        }}
      >
        <TextField
          select
          label="Month"
          value={selectedMonth}
          size="small"
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            generateCalendar();
          }}
          sx={{ width: 150 }}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <MenuItem key={index + 1} value={index + 1}>
              {new Date(0, index).toLocaleString("default", { month: "long" })}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Year"
          type="number"
          value={selectedYear}
          size="small"
          onChange={(e) => {
            setSelectedYear(e.target.value);
            generateCalendar();
          }}
          sx={{ width: 150 }}
          InputProps={{
            inputProps: { min: 2000, max: new Date().getFullYear() },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          // onClick={handleGenerateAllPDF}
          onClick={handleReportMenuClick}
          disabled={
            !selectedMonth ||
            !selectedYear ||
            !selectedSchool ||
            !selectedStandard ||
            !selectedDivision
          }
          startIcon={<Download />}
        >
          Report
        </Button>
        <Menu
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={handleReportMenuClose}
        >
          <MenuItem onClick={handleGenerateAllPDF}>
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
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
          mb: 2,
          gap: 1,
        }}
      >
        <TextField
          select
          label="Report Type"
          value={viewMode}
          size="small"
          onChange={(e) => setViewMode(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="toFromDate">To-From Date</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
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
                inputProps: { min: 2000, max: new Date().getFullYear() },
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
                inputProps: { min: 2000, max: new Date().getFullYear() },
              }}
            />
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleReportMenuClick}
          disabled={
            !selectedMonth ||
            !selectedYear ||
            !selectedSchool ||
            !selectedStandard ||
            !selectedDivision ||
            (viewMode === "weekly" && !selectedWeek) ||
            (viewMode === "toFromDate" && (!fromDate || !toDate))
          }
          startIcon={<Download />}
        >
          Report
        </Button>
        <Menu
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={handleReportMenuClose}
        >
          <MenuItem onClick={handleGenerateAllPDF}>
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

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mt: 2,
          mb: 2,
          gap: 1,
        }}
      >
        <TextField
          select
          label="Report Type"
          value={viewMode}
          size="small"
          onChange={(e) => setViewMode(e.target.value)}
          sx={{ width: 200 }}
        >
          <MenuItem value="toFromDate">To-From Date</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
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
                inputProps: { min: 2000, max: new Date().getFullYear() },
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
                inputProps: { min: 2000, max: new Date().getFullYear() },
              }}
            />
          </>
        )}

        <Button
          variant="contained"
          color="primary"
          // onClick={handleGenerateAllPDF}
          onClick={handleReportMenuClick}
          disabled={
            !selectedMonth ||
            !selectedYear ||
            !selectedSchool ||
            !selectedStandard ||
            !selectedDivision
          }
          startIcon={<Download />}
        >
          Report
        </Button>
        <Menu
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={handleReportMenuClose}
        >
          <MenuItem onClick={handleGenerateAllPDF}>
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
      </Box> */}

      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item xs={6} sm={3}>
          {/* School Filter */}
          <FormControl fullWidth size="small">
            <InputLabel>School</InputLabel>
            <Select
              value={selectedSchool}
              label="School"
              onChange={(e) => {
                setSelectedSchool(e.target.value);
                setSelectedStandard("");
                setSelectedDivision("");
              }}
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

        <Grid item xs={6} sm={3}>
          {/* Standard Filter */}
          <FormControl fullWidth size="small">
            <InputLabel>Standard</InputLabel>
            <Select
              value={selectedStandard}
              label="Standard"
              onChange={(e) => {
                setSelectedStandard(e.target.value);
                setSelectedDivision("");
              }}
              disabled={!selectedSchool}
            >
              <MenuItem value="" disabled>
                Select Standard
              </MenuItem>
              {standards.map((standard) => (
                <MenuItem key={standard} value={standard}>
                  {standard}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3}>
          {/* Division Filter */}
          <FormControl fullWidth size="small">
            <InputLabel>Division</InputLabel>
            <Select
              value={selectedDivision}
              label="Division"
              onChange={(e) => setSelectedDivision(e.target.value)}
              disabled={!selectedStandard}
            >
              <MenuItem value="" disabled>
                Select Division
              </MenuItem>
              {divisions.map((division) => (
                <MenuItem key={division} value={division}>
                  {division}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3}>
          {/* Subject Filter */}
          <FormControl fullWidth size="small">
            <InputLabel>Subject</InputLabel>
            <Select
              value={selectedSubject}
              label="Subject"
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedDivision}
            >
              <MenuItem value="" disabled>
                Select Subject
              </MenuItem>
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Divider />

      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <List sx={{ display: "inline-flex", gap: "8px" }}>
          {/* Register School Button */}
          <ListItem
            button
            component={Link}
            to="/register-student"
            sx={{
              backgroundColor: "#d6d6d6",
              color: "#111",
              borderRadius: "20px", // Rounded buttons
              padding: "4px 12px", // Smaller size
              // minWidth: "120px", // Ensure consistent width
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#333",
                color: "#f5f5f5",
              },
              whiteSpace: "nowrap", // Prevent text wrapping
            }}
          >
            <AddSchoolIcon style={{ marginRight: "5px", fontSize: "16px" }} />
            <ListItemText
              primary="Register Student & Parent"
              primaryTypographyProps={{
                style: { fontSize: "12px", fontWeight: "bold" },
              }}
            />
          </ListItem>
        </List>
      </div>

      {/* Students List */}
      {filteredStudents.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <ToggleButtonGroup
              size="small"
              exclusive
              // value={attendanceStatus}
              onChange={(e, status) => handleMarkAllAttendance(status)}
              sx={{ marginRight: 2 }}
            >
              <ToggleButton value="Present">Mark All Present</ToggleButton>
              <ToggleButton value="Absent">Mark All Absent</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <List>
            {filteredStudents.map((student) => (
              <ListItem
                key={student.id}
                sx={{
                  borderBottom: "1px solid #ccc",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { background: "#f5f5f5" },
                  backgroundColor: "white",
                }}
              >
                <ListItemText
                  primary={student.name}
                  secondary={`Standard: ${student.standard}, Division: ${student.division}`}
                />
                {editingStudentId === student.id ? (
                  <ToggleButtonGroup
                    size="small"
                    exclusive
                    onChange={(e, status) => {
                      handleAttendanceToggle(student.id, status);
                      setEditingStudentId(null); // Switch back to edit icon after selecting status
                    }}
                    sx={{ marginRight: 2 }}
                  >
                    <ToggleButton value="Present">Present</ToggleButton>
                    <ToggleButton value="Absent">Absent</ToggleButton>
                  </ToggleButtonGroup>
                ) : (
                  <IconButton
                    onClick={() => setEditingStudentId(student.id)}
                    sx={{ marginRight: 2 }}
                  >
                    <EditIcon titleAccess="Update Attendance" />
                  </IconButton>
                )}
                <Button
                  // variant="contained"
                  color="primary"
                  onClick={() => handleViewDetails(student)}
                >
                  {/* View Details */}
                  <DoubleArrowIcon titleAccess="View Details" />
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography align="center" sx={{ color: "#757575" }}>
          No students found for the selected criteria.
        </Typography>
      )}

      {/* Student Details Modal */}
      <Modal open={!!selectedStudent} onClose={handleCloseStudentModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {selectedStudent && (
            <>
              <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                {selectedStudent.name}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>Standard: {selectedStudent.standard}</Typography>
              <Typography>Division: {selectedStudent.division}</Typography>
              <Typography>School: {selectedStudent.school}</Typography>
              <Typography>
                Total Present Days:{" "}
                {attendance[selectedStudent.id]?.present || 0}
              </Typography>
              <Typography>
                Total Absent Days: {attendance[selectedStudent.id]?.absent || 0}
              </Typography>
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="primary"
                size="small"
                // onClick={generatePDFReport(selectedStudent.id)}
                onClick={() => generatePDFReport(selectedStudent.id)}
              >
                Generate Attendance Report (PDF)
              </Button>
            </>
          )}
          {selectedStudent && (
            <>
              <Button
                sx={{ mt: 1 }}
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleViewParentDetails(selectedStudent.id)}
              >
                View Parent Details
              </Button>
            </>
          )}
          <br />
          {selectedStudent && (
            <>
              <Button
                sx={{ mt: 1 }}
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleViewAcademicDetails(selectedStudent.id)}
              >
                {selectedStudent.name}'s Academic Details
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Academic Details Modal */}
      <Modal open={isAcademicModalOpen} onClose={handleCloseAcademicModal}>
        <Box
          id="academic-modal"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {selectedStudent && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {selectedStudent.name}'s Academic Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>Name: {selectedStudent.name}</Typography>
              <Typography>Standard: {selectedStudent.standard}</Typography>
              <Typography>Division: {selectedStudent.division}</Typography>
              <Typography>School: {selectedStudent.school}</Typography>

              {/* Subjects Table */}
              <TableContainer
                component={Paper}
                sx={{
                  mt: 3,
                  border: "2px solid #000",
                  borderRadius: "8px",
                  // overflowX: "auto",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          borderBottom: "2px solid #000",
                          borderRight: "2px solid #000",
                        }}
                      >
                        Subject
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          borderBottom: "2px solid #000",
                          borderRight: "2px solid #000",
                        }}
                      >
                        Marks
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          borderBottom: "2px solid #000",
                        }}
                      >
                        Grade
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedStudent.subjects.map((subject, index) => (
                      <TableRow key={index}>
                        <TableCell
                          align="center"
                          sx={{
                            borderBottom: "1px solid #000",
                            borderRight: "2px solid #000",
                          }}
                        >
                          {subject.subject}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderBottom: "1px solid #000",
                            borderRight: "2px solid #000",
                          }}
                        >
                          {subject.marks}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderBottom: "1px solid #000",
                            // borderRight: "2px solid #000",
                          }}
                        >
                          {subject.grade}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                sx={{ mt: 3, mr: 2 }}
                variant="contained"
                color="primary"
                onClick={handlePrint}
              >
                Print
              </Button>
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                color="primary"
                onClick={handleCloseAcademicModal}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Parent Details Modal */}
      <Modal open={!!parentDetails} onClose={handleCloseParentModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {parentDetails && (
            <>
              <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                Parent Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>Name: {parentDetails.name}</Typography>
              <Typography>Contact: {parentDetails.contact}</Typography>
              <Typography>Address: {parentDetails.address}</Typography>
            </>
          )}
        </Box>
      </Modal>
      <ToastContainer />
    </Box>
  );
};

export default StudentsList;
