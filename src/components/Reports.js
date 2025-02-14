// import React, { useState } from "react";
// import {
//   Tabs,
//   Tab,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
// } from "@mui/material";
// import { Link } from "react-router-dom";

// const sections = {
//   Students: {
//     Generic: [
//       { name: "Students Contact Information", link: "/students-contact-info" },
//       { name: "Student Notes", link: "/student-notes" },
//       { name: "Student Enrollments", link: "#" },
//       { name: "Generic Information", link: "#" },
//       { name: "Students Export", link: "#" },
//     ],
//     Financial: [
//       { name: "Students Payments", link: "#" },
//       { name: "Students Paid Invoices", link: "#" },
//       { name: "Students Unpaid Invoices", link: "#" },
//       { name: "Students Overdue Invoices", link: "#" },
//       { name: "Students Uninvoiced Fees", link: "#" },
//       { name: "Fees Report", link: "#" },
//       { name: "Student Fee", link: "#" },
//     ],
//     Attendance: [
//       { name: "Attendance Summary", link: "#" },
//       { name: "Daily Absence", link: "#" },
//     ],
//   },
//   Teachers: {
//     Generic: [
//       { name: "Teachers Contact Information", link: "#" },
//       { name: "Teacher Notes", link: "#" },
//       { name: "Teacher Lessons", link: "#" },
//     ],
//   },
//   Families: {
//     Generic: [
//       { name: "Guardians Contact Information", link: "#" },
//       { name: "Generic Information", link: "#" },
//     ],
//     Financial: [
//       { name: "Guardians Payments", link: "#" },
//       { name: "Guardians Paid Invoices", link: "#" },
//       { name: "Guardians Unpaid Invoices", link: "#" },
//       { name: "Guardians Overdue Invoices", link: "#" },
//       { name: "Guardians Uninvoiced Fees ", link: "#" },
//     ],
//   },
// };

// function Reports() {
//   const [activeTab, setActiveTab] = useState(0);

//   const handleChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const TabPanel = ({ children, value, index }) => (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );

//   return (
//     <>
//       <Typography variant="h5" sx={{ margin: 1, fontWeight: "bold" }}>
//         Reports
//       </Typography>
//       <Paper elevation={3} sx={{ width: "100%", margin: "auto" }}>
//         <Tabs
//           value={activeTab}
//           onChange={handleChange}
//           textColor="primary"
//           indicatorColor="primary"
//           // centered
//           sx={{ backgroundColor: "#e0f7fa" }}
//         >
//           <Tab label="Students" />
//           <Tab label="Teachers" />
//           <Tab label="Families" />
//         </Tabs>
//         {Object.keys(sections).map((key, index) => (
//           <TabPanel value={activeTab} index={index} key={key}>
//             {Object.entries(sections[key]).map(([section, items]) => (
//               <div key={section}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     backgroundColor: "#f1f5f9",
//                     padding: 2,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {section}
//                 </Typography>
//                 <List>
//                   {items.map((item, i) => (
//                     <ListItem
//                       key={i}
//                       sx={{
//                         padding: "5px 10px",
//                         cursor: "pointer",
//                         "&:hover": {
//                           //   backgroundColor: "#f5f5f5",
//                           color: "blue",
//                         },
//                       }}
//                     >
//                       {/* <ListItemText primary={item.name} /> */}
//                       <Link
//                         to={item.link}
//                         style={{ textDecoration: "none", color: "inherit" }}
//                       >
//                         <ListItemText primary={item.name} />
//                       </Link>
//                     </ListItem>
//                   ))}
//                 </List>
//               </div>
//             ))}
//           </TabPanel>
//         ))}
//       </Paper>
//     </>
//   );
// }

// export default Reports;

import React, { Suspense, useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Grid,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import html2pdf from "html2pdf.js";

const sections = {
  Students: {
    Generic: [
      {
        name: "Students Contact Information",
        path: "./reportPages/students/StudentsContactInfo",
      },
      { name: "Student Notes", path: "./reportPages/students/StudentNotes" },
      {
        name: "Student Enrollments",
        path: "./reportPages/students/StudentEnrollments",
      },
      {
        name: "Generic Information",
        path: "./reportPages/students/GenericInfo",
      },
      {
        name: "Students Export",
        path: "./reportPages/students/StudentsExport",
      },
    ],
    Financial: [
      { name: "Students Payments", path: "./reportPages/students/Payments" },
      {
        name: "Students Paid Invoices",
        path: "./reportPages/students/PaidInvoice",
      },
      {
        name: "Students Unpaid Invoices",
        path: "./reportPages/students/UnPaidInvoice",
      },
      {
        name: "Students Overdue Invoices",
        path: "./reportPages/students/OverdueInvoice",
      },
      {
        name: "Students Uninvoiced Fees",
        path: "./reportPages/students/UninvoicedFees",
      },
      { name: "Fees Report", path: "./reportPages/students/FeesReport" },
      { name: "Student Fee", path: "./reportPages/students/Fees" },
    ],
    Attendance: [
      {
        name: "Attendance Summary",
        path: "./reportPages/students/AttendanceSummary",
      },
      { name: "Daily Absence", path: "./reportPages/students/DailyAbsence" },
    ],
  },
  Teachers: {
    Generic: [
      {
        name: "Teachers Contact Information",
        path: "./reportPages/teachers/TeacherContactInfo",
      },
      { name: "Teacher Notes", path: "./reportPages/teachers/TeacherNotes" },
      {
        name: "Teacher Lessons",
        path: "./reportPages/teachers/TeacherLessons",
      },
    ],
  },
  Families: {
    Generic: [
      {
        name: "Guardians Contact Information",
        path: "./reportPages/families/FamilyContactInfo",
      },
      {
        name: "Generic Information",
        path: "./reportPages/families/GenericInfo",
      },
    ],
    Financial: [
      { name: "Guardians Payments", path: "./reportPages/families/Payments" },
      {
        name: "Guardians Paid Invoices",
        path: "./reportPages/families/PaidInvoice",
      },
      {
        name: "Guardians Unpaid Invoices",
        path: "./reportPages/families/UnPaidInvoice",
      },
      {
        name: "Guardians Overdue Invoices",
        path: "./reportPages/families/OverdueInvoice",
      },
      {
        name: "Guardians Uninvoiced Fees",
        path: "./reportPages/families/UninvoicedFees",
      },
    ],
  },
};

const schoolsData = [
  {
    name: "Green Valley High School",
    registerNumber: "GVHS123",
    startedYear: 2005,
    totalTeachingStaff: 50,
    totalNonTeachingStaff: 20,
    totalAdmittedStudents: 1000,
    totalStandards: 12,
    totalClasses: 36,
    totalDivisions: 72,
    registeredDate: "10/12/2022",
  },
  {
    name: "Sunrise Public School",
    registerNumber: "SPS456",
    startedYear: 2010,
    totalTeachingStaff: 30,
    totalNonTeachingStaff: 15,
    totalAdmittedStudents: 800,
    totalStandards: 10,
    totalClasses: 30,
    totalDivisions: 60,
    registeredDate: "02/6/2020",
  },
];

function Reports() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [selectedItem, setSelectedItem] = useState(null);
  const [SelectedComponent, setSelectedComponent] = useState(null); // Selected component path
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedSchool(null);
    setSelectedComponent(null); // Reset component when switching tabs
    setLoading(false);
  };

  const handleItemClick = async (path) => {
    setLoading(true);
    try {
      const Component = (await import(`${path}`)).default; // Dynamically import component
      setSelectedComponent(() => Component);
    } catch (error) {
      console.error("Error loading component:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSchoolClick = (school) => {
    setSelectedSchool(school);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filteredSchools = schoolsData.filter((school) => {
    school.name.toLowerCase().includes(searchTerm.toLowerCase());
    const registrationDate = new Date(school.registeredDate);
    const isInDateRange =
      (!startDate || registrationDate >= new Date(startDate)) &&
      (!endDate || registrationDate <= new Date(endDate));

    const matchesSearchTerm = school.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isInDateRange && matchesSearchTerm;
  });

  const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  const exportPDF = () => {
    const element = document.getElementById("school-details");

    const options = {
      margin: 1,
      filename: "School_Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <>
      <Typography variant="h5" sx={{ margin: 1, fontWeight: "bold" }}>
        Reports
      </Typography>
      <Paper elevation={3} sx={{ width: "100%", margin: "auto" }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ backgroundColor: "#e0f7fa" }}
        >
          <Tab label="Students" />
          <Tab label="Teachers" />
          <Tab label="Families" />
          <Tab label="Schools" />
        </Tabs>
        <Box sx={{ padding: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : SelectedComponent ? (
            <Suspense fallback={<CircularProgress />}>
              <SelectedComponent />
            </Suspense>
          ) : (
            Object.keys(sections).map((key, index) =>
              activeTab === index ? (
                <Box key={key}>
                  {Object.entries(sections[key]).map(([section, items]) => (
                    <div key={section}>
                      <Typography
                        variant="h6"
                        sx={{
                          backgroundColor: "#f1f5f9",
                          padding: 2,
                          fontWeight: "bold",
                        }}
                      >
                        {section}
                      </Typography>
                      <List>
                        {items.map((item, i) => (
                          <ListItem
                            key={i}
                            button
                            onClick={() => handleItemClick(item.path)}
                            sx={{
                              "&:hover": {
                                color: "blue",
                                cursor: "pointer",
                              },
                            }}
                          >
                            <ListItemText primary={item.name} />
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  ))}
                </Box>
              ) : null
            )
          )}
        </Box>

        {/* Schools Tab */}
        <TabPanel value={activeTab} index={3}>
          {selectedSchool ? (
            <Box sx={{ textAlign: "center" }}>
              {/* Back Button */}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setSelectedSchool(null)}
                sx={{ mb: 2, display: "flex" }}
              >
                Back to School List
              </Button>

              {/* Staff and Other Details */}
              <Paper
                elevation={3}
                sx={{ p: 3, backgroundColor: "#bdf3ff" }}
                id="school-details"
              >
                {/* Selected School Details */}
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1,
                    p: 3,
                    textAlign: "center",
                    fontWeight: "bold",
                    backgroundColor: "lightgoldenrodyellow",
                    border: "2px dotted black",
                    borderRadius: 5,
                  }}
                >
                  {selectedSchool.name}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Registration Number:</strong>{" "}
                      {selectedSchool.registerNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Started Year:</strong>{" "}
                      {selectedSchool.startedYear}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2, borderWidth: "2px" }} />{" "}
                <Typography
                  variant="h5"
                  sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
                >
                  Staff and Other Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Total Teaching Staff:</strong>{" "}
                      {selectedSchool.totalTeachingStaff}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Total Non-Teaching Staff:</strong>{" "}
                      {selectedSchool.totalNonTeachingStaff}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Total Admitted Students:</strong>{" "}
                      {selectedSchool.totalAdmittedStudents}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Total Standards:</strong>{" "}
                      {selectedSchool.totalStandards}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Total Classes:</strong>{" "}
                      {selectedSchool.totalClasses}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Total Divisions:</strong>{" "}
                      {selectedSchool.totalDivisions}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              {/* Export Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={exportPDF}
                sx={{
                  mt: 2,
                  display: "flex",
                }}
              >
                Export Report
              </Button>
            </Box>
          ) : (
            <>
              {/* Schools List */}
              <List>
                <div>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    sx={{
                      backgroundColor: "#f1f5f9",
                      padding: 1,
                      mb: 2,
                    }}
                  >
                    {/* Typography on the left */}
                    <Grid item xs={12} sm={4}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        List of Schools
                      </Typography>
                    </Grid>

                    {/* Controls on the right */}
                    <Grid
                      item
                      xs={12}
                      sm={8}
                      mb={1}
                      container
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      {/* Search Box */}
                      <Grid item>
                        <TextField
                          label="Search by School Name"
                          name="schoolName"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoFocus
                        />
                      </Grid>

                      {/* Start Date */}
                      <Grid item xs={6} sm={3} md={2}>
                        <TextField
                          label="Start Date"
                          name="startDate"
                          type="date"
                          fullWidth
                          size="small"
                          value={startDate}
                          onChange={handleStartDateChange}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            inputProps: {
                              max: new Date().toISOString().split("T")[0], // Ensure dates don't exceed today
                            },
                          }}
                        />
                      </Grid>

                      {/* End Date */}
                      <Grid item xs={6} sm={3} md={2}>
                        <TextField
                          label="End Date"
                          name="endDate"
                          type="date"
                          fullWidth
                          size="small"
                          value={endDate}
                          onChange={handleEndDateChange}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            inputProps: {
                              max: new Date().toISOString().split("T")[0],
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  {filteredSchools.length > 0 ? (
                    filteredSchools.map((school, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          borderRadius: 5,
                          mb: 2, // Add margin between list items
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                            color: "#000000",
                          },
                        }}
                      >
                        {/* School name and registration date in the same column */}
                        <Grid
                          container
                          spacing={1}
                          sx={{ flex: 1, maxWidth: "80%", cursor: "pointer" }}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {school.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                              {school.registeredDate}
                            </Typography>
                          </Grid>
                        </Grid>

                        {/* View Reports Button */}
                        <Grid item xs="auto">
                          <Button
                            variant="outlined"
                            onClick={() => handleSchoolClick(school)}
                            sx={{ alignSelf: "flex-start", mt: 1 }}
                          >
                            View Reports
                          </Button>
                        </Grid>
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      No schools found.
                    </Typography>
                  )}
                </div>
              </List>
            </>
          )}
        </TabPanel>
      </Paper>
    </>
  );
}

export default Reports;

// import React, { useState } from "react";
// import {
//   Tabs,
//   Tab,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
// } from "@mui/material";

// const sections = {
//   Students: {
//     Generic: [
//       {
//         name: "Students Contact Information",
//         content: "Content for Students Contact Information",
//       },
//       { name: "Student Notes", content: "Content for Student Notes" },
//       {
//         name: "Student Enrollments",
//         content: "Content for Student Enrollments",
//       },
//       {
//         name: "Generic Information",
//         content: "Content for Generic Information",
//       },
//       { name: "Students Export", content: "Content for Students Export" },
//     ],
//     Financial: [
//       { name: "Students Payments", content: "Content for Students Payments" },
//       {
//         name: "Students Paid Invoices",
//         content: "Content for Students Paid Invoices",
//       },
//       {
//         name: "Students Unpaid Invoices",
//         content: "Content for Students Unpaid Invoices",
//       },
//       {
//         name: "Students Overdue Invoices",
//         content: "Content for Students Overdue Invoices",
//       },
//       {
//         name: "Students Uninvoiced Fees",
//         content: "Content for Students Uninvoiced Fees",
//       },
//       { name: "Fees Report", content: "Content for Fees Report" },
//       { name: "Student Fee", content: "Content for Student Fee" },
//     ],
//     Attendance: [
//       { name: "Attendance Summary", content: "Content for Attendance Summary" },
//       { name: "Daily Absence", content: "Content for Daily Absence" },
//     ],
//   },
//   Teachers: {
//     Generic: [
//       {
//         name: "Teachers Contact Information",
//         content: "Content for Teachers Contact Information",
//       },
//       { name: "Teacher Notes", content: "Content for Teacher Notes" },
//       { name: "Teacher Lessons", content: "Content for Teacher Lessons" },
//     ],
//   },
//   Families: {
//     Generic: [
//       {
//         name: "Guardians Contact Information",
//         content: "Content for Guardians Contact Information",
//       },
//       {
//         name: "Generic Information",
//         content: "Content for Generic Information",
//       },
//     ],
//     Financial: [
//       { name: "Guardians Payments", content: "Content for Guardians Payments" },
//       {
//         name: "Guardians Paid Invoices",
//         content: "Content for Guardians Paid Invoices",
//       },
//       {
//         name: "Guardians Unpaid Invoices",
//         content: "Content for Guardians Unpaid Invoices",
//       },
//       {
//         name: "Guardians Overdue Invoices",
//         content: "Content for Guardians Overdue Invoices",
//       },
//       {
//         name: "Guardians Uninvoiced Fees",
//         content: "Content for Guardians Uninvoiced Fees",
//       },
//     ],
//   },
// };

// function Reports() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [selectedContent, setSelectedContent] = useState(null);

//   const handleChange = (event, newValue) => {
//     setActiveTab(newValue);
//     setSelectedContent(null); // Reset content when changing tabs
//   };

//   const handleItemClick = (content) => {
//     setSelectedContent(content);
//   };

//   const TabPanel = ({ children, value, index }) => (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );

//   return (
//     <>
//       <Typography variant="h5" sx={{ margin: 1, fontWeight: "bold" }}>
//         Reports
//       </Typography>
//       <Paper elevation={3} sx={{ width: "100%", margin: "auto" }}>
//         <Tabs
//           value={activeTab}
//           onChange={handleChange}
//           textColor="primary"
//           indicatorColor="primary"
//           sx={{ backgroundColor: "#e0f7fa" }}
//         >
//           <Tab label="Students" />
//           <Tab label="Teachers" />
//           <Tab label="Families" />
//         </Tabs>
//         {Object.keys(sections).map((key, index) => (
//           <TabPanel value={activeTab} index={index} key={key}>
//             {selectedContent ? (
//               <Box>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     marginBottom: 2,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {selectedContent.name}
//                 </Typography>
//                 <Typography>{selectedContent.content}</Typography>
//                 <Typography
//                   onClick={() => setSelectedContent(null)}
//                   sx={{
//                     marginTop: 2,
//                     cursor: "pointer",
//                     color: "blue",
//                     textDecoration: "underline",
//                   }}
//                 >
//                   Go Back
//                 </Typography>
//               </Box>
//             ) : (
//               Object.entries(sections[key]).map(([section, items]) => (
//                 <div key={section}>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       backgroundColor: "#f1f5f9",
//                       padding: 2,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {section}
//                   </Typography>
//                   <List>
//                     {items.map((item, i) => (
//                       <ListItem
//                         key={i}
//                         sx={{
//                           padding: "5px 10px",
//                           cursor: "pointer",
//                           "&:hover": {
//                             color: "blue",
//                           },
//                         }}
//                         onClick={() => handleItemClick(item)}
//                       >
//                         <ListItemText primary={item.name} />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </div>
//               ))
//             )}
//           </TabPanel>
//         ))}
//       </Paper>
//     </>
//   );
// }

// export default Reports;
