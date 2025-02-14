import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import { Download } from "@mui/icons-material";

const getSubjectsForStandard = (standard) => {
  if (standard <= 5) {
    return [
      { name: "English", maxMarks: 100 },
      { name: "Mathematics", maxMarks: 100 },
      { name: "Environmental Studies", maxMarks: 100 },
      { name: "Regional Language", maxMarks: 100 },
    ];
  }
  return [
    { name: "English", maxMarks: 100 },
    { name: "Mathematics", maxMarks: 100 },
    { name: "Science", maxMarks: 100 },
    { name: "Social Science", maxMarks: 100 },
    { name: "Regional Language", maxMarks: 100 },
    { name: "Computer Science", maxMarks: 100 },
  ];
};

const generateRandomMarks = (maxMarks) => {
  return Math.floor(Math.random() * (maxMarks - 35 + 1)) + 35;
};

const calculateGrade = (percentage) => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 35) return "D";
  return "F";
};

const Marksheet = ({ student, open, onClose }) => {
  const [marks, setMarks] = useState([]);

  // Update marks whenever student changes
  useEffect(() => {
    if (student) {
      const subjects = getSubjectsForStandard(student.standard);
      const newMarks = subjects.map((subject) => ({
        ...subject,
        obtainedMarks: generateRandomMarks(subject.maxMarks),
      }));
      setMarks(newMarks);
    }
  }, [student]); // Dependency on student ensures marks update when student changes

  const totalMarks = marks.reduce(
    (sum, subject) => sum + subject.obtainedMarks,
    0
  );
  const totalMaxMarks = marks.reduce(
    (sum, subject) => sum + subject.maxMarks,
    0
  );
  const percentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);
  const finalGrade = calculateGrade(percentage);

  const handleDownload = () => {
    // Create a new iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Get the marksheet content
    const marksheetElement = document.getElementById("marksheet-content");

    // Get all stylesheets from the main document
    const styleSheets = Array.from(document.styleSheets);
    let styles = "";
    styleSheets.forEach((styleSheet) => {
      try {
        const rules = Array.from(styleSheet.cssRules || styleSheet.rules);
        rules.forEach((rule) => {
          styles += rule.cssText;
        });
      } catch (e) {
        console.warn("Could not load stylesheet rules");
      }
    });

    // Additional print-specific styles
    const printStyles = `
      @page {
        size: A4;
        margin: 15mm;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background-color: white !important;
      }
      * {
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      .marksheet-content {
        width: 100% !important;
        padding: 20px !important;
        box-sizing: border-box !important;
      }
      .MuiPaper-root {
        box-shadow: none !important;
        border: 1px solid #ccc !important;
      }
      @media print {
        .MuiDialog-paper {
          box-shadow: none !important;
        }
      }
    `;

    // Create the print document
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Student Marksheet - ${student.name}</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <style>
            ${styles}
            ${printStyles}
          </style>
        </head>
        <body>
          <div class="marksheet-content">
            ${marksheetElement.outerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.frameElement.remove();
              };
            }
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <div id="marksheet-content">
        <DialogTitle>
          <Box textAlign="center">
            <Typography
              variant="h4"
              fontWeight={"bold"}
              sx={{ color: "orange" }}
              component="div"
              gutterBottom
            >
              {student.school}
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              Academic Report Card
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Year 2024-25
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Name:</strong> {student.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Standard:</strong> {student.standard}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <strong>Division:</strong> {student.division}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Roll No:</strong> {student.id}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
          <Box
            sx={{
              width: "100%",
              mb: 2,
              overflowX: "auto",
            }}
          >
            <Paper>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>
                      <strong>Subject</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Max Marks</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Marks Obtained</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Grade</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marks.map((subject, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {subject.name}
                      </TableCell>
                      <TableCell align="right">{subject.maxMarks}</TableCell>
                      <TableCell align="right">
                        {subject.obtainedMarks}
                      </TableCell>
                      <TableCell align="right">
                        {calculateGrade(
                          (subject.obtainedMarks / subject.maxMarks) * 100
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>

          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body1">
                      <strong>Total Marks:</strong>
                    </Typography>
                    <Typography variant="body1">
                      {totalMarks} / {totalMaxMarks}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" my={1}>
                    <Typography variant="body1">
                      <strong>Percentage:</strong>
                    </Typography>
                    <Typography variant="body1">{percentage}%</Typography>
                  </Box>
                  <Divider />
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body1">
                      <strong>Final Grade:</strong>
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight={"bold"}
                    >
                      {finalGrade}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </DialogContent>
      </div>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
      >
        <Button
          size="small"
          variant="outlined"
          color="primary"
          sx={{ mr: 2 }}
          onClick={handleDownload}
        >
          <Download titleAccess="Download Marksheet" /> Download
        </Button>
      </Grid>
    </Dialog>
  );
};

export default Marksheet;
