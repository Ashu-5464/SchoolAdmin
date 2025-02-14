// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Grid,
//   Box,
//   Card,
//   CardContent,
//   Button,
// } from "@mui/material";
// import { Download } from "@mui/icons-material";
// import jsPDF from "jspdf";

// const getSubjectsForStandard = (standard) => {
//   if (standard <= 5) {
//     return [
//       { name: "English", maxMarks: 100 },
//       { name: "Mathematics", maxMarks: 100 },
//       { name: "Environmental Studies", maxMarks: 100 },
//       { name: "Regional Language", maxMarks: 100 },
//     ];
//   }
//   return [
//     { name: "English", maxMarks: 100 },
//     { name: "Mathematics", maxMarks: 100 },
//     { name: "Science", maxMarks: 100 },
//     { name: "Social Science", maxMarks: 100 },
//     { name: "Regional Language", maxMarks: 100 },
//     { name: "Computer Science", maxMarks: 100 },
//   ];
// };

// const generateRandomMarks = (maxMarks) => {
//   return Math.floor(Math.random() * (maxMarks - 35 + 1)) + 35;
// };

// const calculateGrade = (percentage) => {
//   if (percentage >= 90) return "A+";
//   if (percentage >= 80) return "A";
//   if (percentage >= 70) return "B+";
//   if (percentage >= 60) return "B";
//   if (percentage >= 50) return "C";
//   if (percentage >= 35) return "D";
//   return "F";
// };

// const MarksheetPreview = ({ students, open, onClose }) => {
//   const [marksheets, setMarksheets] = useState([]);

//   useEffect(() => {
//     if (students.length > 0) {
//       const newMarksheets = students.map((student) => {
//         const subjects = getSubjectsForStandard(student.standard);
//         const marks = subjects.map((subject) => ({
//           ...subject,
//           obtainedMarks: generateRandomMarks(subject.maxMarks),
//         }));
//         const totalMarks = marks.reduce(
//           (sum, subject) => sum + subject.obtainedMarks,
//           0
//         );
//         const totalMaxMarks = marks.reduce(
//           (sum, subject) => sum + subject.maxMarks,
//           0
//         );
//         const percentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);
//         const grade = calculateGrade(percentage);
//         return { student, marks, totalMarks, totalMaxMarks, percentage, grade };
//       });
//       setMarksheets(newMarksheets);
//     }
//   }, [students]);

//   const handleDownloadAll = () => {
//     const pdf = new jsPDF();

//     marksheets.forEach((marksheet, index) => {
//       if (index > 0) pdf.addPage(); // Add a new page for each student
//       pdf.setFontSize(16);
//       pdf.text(20, 20, `School: ${marksheet.student.school}`);
//       pdf.setFontSize(12);
//       pdf.text(20, 30, `Name: ${marksheet.student.name}`);
//       pdf.text(20, 40, `Standard: ${marksheet.student.standard}`);
//       pdf.text(20, 50, `Division: ${marksheet.student.division}`);
//       pdf.text(20, 60, `Roll No: ${marksheet.student.id}`);

//       pdf.autoTable({
//         startY: 70,
//         head: [["Subject", "Max Marks", "Obtained Marks", "Grade"]],
//         body: marksheet.marks.map((subject) => [
//           subject.name,
//           subject.maxMarks,
//           subject.obtainedMarks,
//           calculateGrade((subject.obtainedMarks / subject.maxMarks) * 100),
//         ]),
//       });

//       pdf.text(
//         20,
//         pdf.lastAutoTable.finalY + 10,
//         `Total Marks: ${marksheet.totalMarks} / ${marksheet.totalMaxMarks}`
//       );
//       pdf.text(
//         20,
//         pdf.lastAutoTable.finalY + 20,
//         `Percentage: ${marksheet.percentage}%`
//       );
//       pdf.text(20, pdf.lastAutoTable.finalY + 30, `Grade: ${marksheet.grade}`);
//     });

//     pdf.save("students-marksheets.pdf");
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>Marksheet Preview</DialogTitle>
//       <DialogContent>
//         {marksheets.map((marksheet, index) => (
//           <Box key={index} mb={4}>
//             <Typography variant="h6" textAlign="center" gutterBottom>
//               {marksheet.student.school}
//             </Typography>
//             <Card variant="outlined" sx={{ mb: 2 }}>
//               <CardContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <Typography variant="body1">
//                       <strong>Name:</strong> {marksheet.student.name}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Standard:</strong> {marksheet.student.standard}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body1">
//                       <strong>Division:</strong> {marksheet.student.division}
//                     </Typography>
//                     <Typography variant="body1">
//                       <strong>Roll No:</strong> {marksheet.student.id}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>

//             <Paper>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Subject</TableCell>
//                     <TableCell align="right">Max Marks</TableCell>
//                     <TableCell align="right">Obtained Marks</TableCell>
//                     <TableCell align="right">Grade</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {marksheet.marks.map((subject, idx) => (
//                     <TableRow key={idx}>
//                       <TableCell>{subject.name}</TableCell>
//                       <TableCell align="right">{subject.maxMarks}</TableCell>
//                       <TableCell align="right">
//                         {subject.obtainedMarks}
//                       </TableCell>
//                       <TableCell align="right">
//                         {calculateGrade(
//                           (subject.obtainedMarks / subject.maxMarks) * 100
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Paper>

//             <Card variant="outlined" sx={{ mt: 2 }}>
//               <CardContent>
//                 <Typography variant="body1">
//                   <strong>Total Marks:</strong> {marksheet.totalMarks} /{" "}
//                   {marksheet.totalMaxMarks}
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Percentage:</strong> {marksheet.percentage}%
//                 </Typography>
//                 <Typography variant="body1">
//                   <strong>Final Grade:</strong> {marksheet.grade}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Box>
//         ))}
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Download />}
//           onClick={handleDownloadAll}
//           fullWidth
//         >
//           Download All MarkSheets
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default MarksheetPreview;

// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Grid,
//   Box,
//   Card,
//   CardContent,
//   Divider,
//   Button,
// } from "@mui/material";
// import { Download } from "@mui/icons-material";

// const getSubjectsForStandard = (standard) => {
//   if (standard <= 5) {
//     return [
//       { name: "English", maxMarks: 100 },
//       { name: "Mathematics", maxMarks: 100 },
//       { name: "Environmental Studies", maxMarks: 100 },
//       { name: "Regional Language", maxMarks: 100 },
//     ];
//   }
//   return [
//     { name: "English", maxMarks: 100 },
//     { name: "Mathematics", maxMarks: 100 },
//     { name: "Science", maxMarks: 100 },
//     { name: "Social Science", maxMarks: 100 },
//     { name: "Regional Language", maxMarks: 100 },
//     { name: "Computer Science", maxMarks: 100 },
//   ];
// };

// const generateRandomMarks = (maxMarks) => {
//   return Math.floor(Math.random() * (maxMarks - 35 + 1)) + 35;
// };

// const calculateGrade = (percentage) => {
//   if (percentage >= 90) return "A+";
//   if (percentage >= 80) return "A";
//   if (percentage >= 70) return "B+";
//   if (percentage >= 60) return "B";
//   if (percentage >= 50) return "C";
//   if (percentage >= 35) return "D";
//   return "F";
// };

// const MarksheetPreview = ({ students, open, onClose }) => {
//   const [marksheets, setMarksheets] = useState([]);

//   // Update marksheets whenever students change
//   useEffect(() => {
//     if (students && students.length > 0) {
//       const updatedMarksheets = students.map((student) => {
//         const subjects = getSubjectsForStandard(student.standard);
//         const marks = subjects.map((subject) => ({
//           ...subject,
//           obtainedMarks: generateRandomMarks(subject.maxMarks),
//         }));

//         const totalMarks = marks.reduce(
//           (sum, subject) => sum + subject.obtainedMarks,
//           0
//         );
//         const totalMaxMarks = marks.reduce(
//           (sum, subject) => sum + subject.maxMarks,
//           0
//         );
//         const percentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);
//         const finalGrade = calculateGrade(percentage);

//         return {
//           student,
//           marks,
//           totalMarks,
//           totalMaxMarks,
//           percentage,
//           finalGrade,
//         };
//       });
//       setMarksheets(updatedMarksheets);
//     }
//   }, [students]);

//   // Handle download functionality
//   const handleDownload = () => {
//     // Create a new iframe
//     const iframe = document.createElement("iframe");
//     iframe.style.display = "none";
//     document.body.appendChild(iframe);

//     // Get the marksheet content
//     const marksheetElement = document.getElementById("preview");

//     // Get all stylesheets from the main document
//     const styleSheets = Array.from(document.styleSheets);
//     let styles = "";
//     styleSheets.forEach((styleSheet) => {
//       try {
//         const rules = Array.from(styleSheet.cssRules || styleSheet.rules);
//         rules.forEach((rule) => {
//           styles += rule.cssText;
//         });
//       } catch (e) {
//         console.warn("Could not load stylesheet rules");
//       }
//     });

//     // Additional print-specific styles
//     const printStyles = `
//       @page {
//         size: A4;
//         margin: 15mm;
//       }
//       body {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//         background-color: white !important;
//       }
//       * {
//         print-color-adjust: exact !important;
//         -webkit-print-color-adjust: exact !important;
//         color-adjust: exact !important;
//       }
//       .marksheet-content {
//         width: 100% !important;
//         padding: 20px !important;
//         box-sizing: border-box !important;
//       }
//       .MuiPaper-root {
//         box-shadow: none !important;
//         border: 1px solid #ccc !important;
//       }
//       @media print {
//         .MuiDialog-paper {
//           box-shadow: none !important;
//         }
//       }
//     `;

//     // Create the print document
//     const iframeDoc = iframe.contentWindow.document;
//     iframeDoc.open();
//     iframeDoc.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Student Marksheet</title>
//           <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
//           <style>
//             ${styles}
//             ${printStyles}
//           </style>
//         </head>
//         <body>
//           <div class="marksheet-content">
//             ${marksheetElement.outerHTML}
//           </div>
//           <script>
//             window.onload = function() {
//               window.print();
//               window.onafterprint = function() {
//                 window.frameElement.remove();
//               };
//             }
//           </script>
//         </body>
//       </html>
//     `);
//     iframeDoc.close();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <div id="preview">
//         <DialogTitle>
//           <Box textAlign="center">
//             <Typography
//               variant="h5"
//               fontWeight={"bold"}
//               sx={{ color: "orange" }}
//               component="div"
//               gutterBottom
//             >
//               All Students Marksheet
//             </Typography>
//             <Typography variant="body1" component="div" gutterBottom>
//               Academic Report Cards for Students
//             </Typography>
//           </Box>
//         </DialogTitle>

//         <DialogContent>
//           {marksheets.map((marksheet, index) => (
//             <Box key={index} sx={{ mb: 4 }}>
//               <Card variant="outlined" sx={{ mb: 2 }}>
//                 <CardContent>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body1">
//                         <strong>Name:</strong> {marksheet.student.name}
//                       </Typography>
//                       <Typography variant="body1">
//                         <strong>Standard:</strong> {marksheet.student.standard}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body1">
//                         <strong>Division:</strong> {marksheet.student.division}
//                       </Typography>
//                       <Typography variant="body1">
//                         <strong>Roll No:</strong> {marksheet.student.id}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>

//               <Box
//                 sx={{
//                   width: "100%",
//                   mb: 2,
//                   overflowX: "auto",
//                 }}
//               >
//                 <Paper>
//                   <Table>
//                     <TableHead>
//                       <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                         <TableCell>
//                           <strong>Subject</strong>
//                         </TableCell>
//                         <TableCell align="right">
//                           <strong>Max Marks</strong>
//                         </TableCell>
//                         <TableCell align="right">
//                           <strong>Marks Obtained</strong>
//                         </TableCell>
//                         <TableCell align="right">
//                           <strong>Grade</strong>
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {marksheet.marks.map((subject, index) => (
//                         <TableRow key={index}>
//                           <TableCell component="th" scope="row">
//                             {subject.name}
//                           </TableCell>
//                           <TableCell align="right">
//                             {subject.maxMarks}
//                           </TableCell>
//                           <TableCell align="right">
//                             {subject.obtainedMarks}
//                           </TableCell>
//                           <TableCell align="right">
//                             {calculateGrade(
//                               (subject.obtainedMarks / subject.maxMarks) * 100
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </Paper>
//               </Box>

//               <Card variant="outlined">
//                 <CardContent>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <Box display="flex" justifyContent="space-between" mb={1}>
//                         <Typography variant="body1">
//                           <strong>Total Marks:</strong>
//                         </Typography>
//                         <Typography variant="body1">
//                           {marksheet.totalMarks} / {marksheet.totalMaxMarks}
//                         </Typography>
//                       </Box>
//                       <Divider />
//                       <Box display="flex" justifyContent="space-between" my={1}>
//                         <Typography variant="body1">
//                           <strong>Percentage:</strong>
//                         </Typography>
//                         <Typography variant="body1">
//                           {marksheet.percentage}%
//                         </Typography>
//                       </Box>
//                       <Divider />
//                       <Box display="flex" justifyContent="space-between" mt={1}>
//                         <Typography variant="body1">
//                           <strong>Final Grade:</strong>
//                         </Typography>
//                         <Typography
//                           variant="h6"
//                           color="primary"
//                           fontWeight={"bold"}
//                         >
//                           {marksheet.finalGrade}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Box>
//           ))}
//         </DialogContent>
//       </div>
//       <Grid
//         container
//         sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}
//       >
//         <Button
//           size="small"
//           color="primary"
//           sx={{ mr: 2 }}
//           onClick={handleDownload}
//         >
//           <Download titleAccess="Download" />
//         </Button>
//       </Grid>
//     </Dialog>
//   );
// };

// export default MarksheetPreview;

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

const MarksheetPreview = ({ students, open, onClose }) => {
  const [marksheets, setMarksheets] = useState([]);

  // Update marksheets whenever students change
  useEffect(() => {
    if (students && students.length > 0) {
      const updatedMarksheets = students.map((student) => {
        const subjects = getSubjectsForStandard(student.standard);
        const marks = subjects.map((subject) => ({
          ...subject,
          obtainedMarks: generateRandomMarks(subject.maxMarks),
        }));

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

        return {
          student,
          marks,
          totalMarks,
          totalMaxMarks,
          percentage,
          finalGrade,
        };
      });
      setMarksheets(updatedMarksheets);
    }
  }, [students]);

  // Handle download functionality
  const handleDownload = () => {
    // Create a new iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Get the marksheet content
    const marksheetElement = document.getElementById("preview");

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
        .marksheet-page {
          page-break-after: always;
        }
        .marksheet-page:last-child {
          page-break-after: auto; /* No page break after the last student */
        }
        .marksheet-page:first-child {
          page-break-before: avoid;
        }
        .marksheet-page {
          padding: 20px;
        }
        .marksheet-page:last-child {
          page-break-before: avoid;
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
          <title>Student Marksheet</title>
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
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          position: "sticky",
        }}
      >
        <Button
          size="small"
          color="primary"
          sx={{ mr: 2 }}
          onClick={handleDownload}
        >
          <Download titleAccess="Download" />
        </Button>
      </Grid>
      <div id="preview">
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h2"
              fontWeight={"bold"}
              sx={{ color: "orange" }}
              component="div"
              gutterBottom
            >
              ABC High School
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
              All Students Marksheets
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Year 2024-25
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent>
          {marksheets.map((marksheet, index) => (
            <Box
              key={index}
              sx={{ mb: 4, pageBreakBefore: "always" }}
              className="marksheet-page"
            >
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Name:</strong> {marksheet.student.name}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Standard:</strong> {marksheet.student.standard}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        <strong>Division:</strong> {marksheet.student.division}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Roll No:</strong> {marksheet.student.id}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

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
                      {marksheet.marks.map((subject, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {subject.name}
                          </TableCell>
                          <TableCell align="right">
                            {subject.maxMarks}
                          </TableCell>
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
                          {marksheet.totalMarks} / {marksheet.totalMaxMarks}
                        </Typography>
                      </Box>
                      <Divider />
                      <Box display="flex" justifyContent="space-between" my={1}>
                        <Typography variant="body1">
                          <strong>Percentage:</strong>
                        </Typography>
                        <Typography variant="body1">
                          {marksheet.percentage}%
                        </Typography>
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
                          {marksheet.finalGrade}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          ))}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default MarksheetPreview;
