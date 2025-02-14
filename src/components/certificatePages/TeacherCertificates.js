// // import React, { useState } from "react";
// import {
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   Divider,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   ListItem,
//   ListItemText,
//   List,
//   Menu,
//   Modal,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import {
//   ExpandMore,
//   Close,
//   Download,
//   SchoolOutlined,
//   TransferWithinAStationOutlined,
//   VerifiedUserOutlined,
// } from "@mui/icons-material";

// const TeacherCertificate = ({ schools, teachers }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSchool, setSelectedSchool] = useState("");

//   // Menu state
//   const [menuAnchorEl, setMenuAnchorEl] = useState(null);

//   // Modal states
//   const [bonafideCertOpen, setBonafideCertOpen] = useState(false);

//   const handleCertificateClick = (event, student) => {
//     setMenuAnchorEl(event.currentTarget);
//     setSelectedStudent(student);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchorEl(null);
//   };

//   return (
//     <>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           Student Certificates
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
//           <TextField
//             sx={{ width: 200 }}
//             label="Search by Name"
//             size="small"
//             variant="outlined"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>
//       </Box>
//       <Divider sx={{ my: 1 }} />

//       <Grid container spacing={1} sx={{ mb: 1, mt: 1 }}>
//         <Grid item xs={6} sm={4}>
//           <FormControl fullWidth size="small">
//             <InputLabel>School</InputLabel>
//             <Select
//               value={selectedSchool}
//               label="School"
//               onChange={(e) => {
//                 setSelectedSchool(e.target.value);
//                 setSelectedStandard("");
//                 setSelectedDivision("");
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Select School
//               </MenuItem>
//               {schools.map((school) => (
//                 <MenuItem key={school.id} value={school.name}>
//                   {school.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={6} sm={4}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Teacher</InputLabel>
//             <Select
//               value={selectedSchool}
//               label="School"
//               onChange={(e) => {
//                 setSelectedSchool(e.target.value);
//                 setSelectedDivision("");
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Select Teacher
//               </MenuItem>
//               {teachers.map((teacher) => (
//                 <MenuItem key={teacher.id} value={teacher.name}>
//                   {teacher.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* Students List */}
//       {filteredStudents.length > 0 ? (
//         <List>
//           {filteredStudents.map((student) => (
//             <ListItem
//               key={student.id}
//               sx={{
//                 borderBottom: "1px solid #ccc",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 "&:hover": { background: "#f5f5f5" },
//                 backgroundColor: "white",
//               }}
//             >
//               <ListItemText
//                 primary={student.name}
//                 secondary={`Standard: ${student.standard}, Division: ${student.division}`}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={(e) => handleCertificateClick(e, student)}
//                 endIcon={<ExpandMore />}
//               >
//                 Certificates
//               </Button>
//             </ListItem>
//           ))}
//         </List>
//       ) : (
//         <Typography align="center" sx={{ color: "#757575" }}>
//           No students found for the selected criteria.
//         </Typography>
//       )}

//       {/* Certificate Options Menu */}
//       <Menu
//         anchorEl={menuAnchorEl}
//         open={Boolean(menuAnchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem
//           onClick={() => {
//             setLeavingCertOpen(true);
//             handleMenuClose();
//           }}
//         >
//           <SchoolOutlined sx={{ mr: 1 }} /> Leaving Certificate
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             setTransferCertOpen(true);
//             handleMenuClose();
//           }}
//         >
//           <TransferWithinAStationOutlined sx={{ mr: 1 }} /> Transfer Certificate
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             setBonafideCertOpen(true);
//             handleMenuClose();
//           }}
//         >
//           <VerifiedUserOutlined sx={{ mr: 1 }} /> Bonafide Certificate
//         </MenuItem>
//       </Menu>

//       {/* Certificate Modals */}
//       {/* Leaving Certificate Modal */}
//       <Modal open={leavingCertOpen} onClose={() => setLeavingCertOpen(false)}>
//         <Paper sx={modalStyle}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6">Leaving Certificate Preview</Typography>
//             <Box>
//               <IconButton
//                 onClick={() => handleDownload("leaving")}
//                 title="Download"
//               >
//                 <Download />
//               </IconButton>
//               <IconButton
//                 onClick={() => setLeavingCertOpen(false)}
//                 title="Close"
//               >
//                 <Close />
//               </IconButton>
//             </Box>
//           </Box>
//           <div id="leaving-certificate">
//             <LeavingCertificate
//               student={selectedStudent}
//               school={selectedSchool}
//             />
//           </div>
//         </Paper>
//       </Modal>

//       {/* Transfer Certificate Modal */}
//       <Modal open={transferCertOpen} onClose={() => setTransferCertOpen(false)}>
//         <Paper sx={modalStyle}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6">Transfer Certificate Preview</Typography>
//             <Box>
//               <IconButton
//                 onClick={() => handleDownload("transfer")}
//                 title="Download"
//               >
//                 <Download />
//               </IconButton>
//               <IconButton
//                 onClick={() => setTransferCertOpen(false)}
//                 title="Close"
//               >
//                 <Close />
//               </IconButton>
//             </Box>
//           </Box>
//           <div id="transfer-certificate">
//             <TransferCertificate student={selectedStudent} />
//           </div>
//         </Paper>
//       </Modal>

//       {/* Bonafide Certificate Modal */}
//       <Modal open={bonafideCertOpen} onClose={() => setBonafideCertOpen(false)}>
//         <Paper sx={modalStyle}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6">Bonafide Certificate Preview</Typography>
//             <Box>
//               <IconButton
//                 onClick={() => handleDownload("bonafide")}
//                 title="Download"
//               >
//                 <Download />
//               </IconButton>
//               <IconButton
//                 onClick={() => setBonafideCertOpen(false)}
//                 title="Close"
//               >
//                 <Close />
//               </IconButton>
//             </Box>
//           </Box>
//           <div id="bonafide-certificate">
//             <BonafideCertificate student={selectedStudent} />
//           </div>
//         </Paper>
//       </Modal>
//     </>
//   );
// };

// export default TeacherCertificate;

import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  List,
  Menu,
  Modal,
  IconButton,
} from "@mui/material";
import {
  ExpandMore,
  Close,
  Download,
  WorkHistory,
  VerifiedUser,
  Receipt,
} from "@mui/icons-material";
import { format, isValid } from "date-fns";

// Modal Style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "700px",
  width: "100%",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isValid(date) ? format(date, "dd MMMM yyyy") : "N/A";
};

// Experience Letter Component
// const ExperienceLetter = ({ teachers, schools }) => (
//   <Box
//     className="certificate-content"
//     sx={{
//       border: "5px solid #1976d2",
//       padding: 4,
//       borderRadius: 2,
//       backgroundColor: "white",
//     }}
//   >
//     {/* Header */}
//     <Box textAlign="center" mb={4}>
//       <img
//         src={schools?.logo || "/school-logo.png"}
//         alt="School Logo"
//         style={{ width: 100, height: 100, marginBottom: 16 }}
//       />
//       <Typography variant="h4" fontWeight="bold" color="primary">
//         {schools?.name || "School Name"}
//       </Typography>
//       <Typography variant="subtitle1" color="text.secondary">
//         {schools?.address || "School Address"}
//       </Typography>
//     </Box>

//     <Divider sx={{ mb: 4, backgroundColor: "#333" }} />

//     {/* Content */}
//     <Typography variant="h5" textAlign="center" mb={4}>
//       Experience Letter
//     </Typography>

//     <Typography paragraph>Date: {formatDate(new Date())}</Typography>

//     <Typography paragraph>TO WHOM IT MAY CONCERN</Typography>

//     <Typography paragraph sx={{ textAlign: "justify", lineHeight: 1.8 }}>
//       This is to certify that
//       <strong> {teachers?.name || "Teacher Name"} </strong>has been employed
//       with {schools?.name || "our institution"} as a{" "}
//       {teachers?.designation || "Teacher"} from{" "}
//       {formatDate(teachers?.joiningDate || "2020-01-01")} to{" "}
//       {teachers?.isCurrentEmployee ? "present" : formatDate(teachers?.endDate)}.
//     </Typography>

//     <Typography paragraph sx={{ textAlign: "justify", lineHeight: 1.8 }}>
//       During {teachers?.gender === "F" ? "her" : "his"} tenure,{" "}
//       {teachers?.gender === "F" ? "she" : "he"} has demonstrated exceptional
//       professionalism, dedication, and expertise in{" "}
//       {teachers?.subject || "teaching"}.
//       {teachers?.gender === "F" ? "She" : "He"} has consistently shown excellent
//       leadership abilities and maintained high standards of teaching.
//     </Typography>

//     <Typography paragraph sx={{ textAlign: "justify", lineHeight: 1.8 }}>
//       We wish {teachers?.gender === "F" ? "her" : "him"} the very best in all
//       future endeavors.
//     </Typography>

//     {/* Footer */}
//     <Box sx={{ mt: 10, display: "flex", justifyContent: "space-between" }}>
//       <Box>
//         <Typography>Place: {schools?.city || "City"}</Typography>
//         <Typography>Date: {formatDate(new Date())}</Typography>
//       </Box>
//       <Box textAlign="center">
//         <Divider sx={{ width: 200, mb: 1, backgroundColor: "#333" }} />
//         <Typography fontWeight="bold">Principal's Signature</Typography>
//         <Typography>School Seal</Typography>
//       </Box>
//     </Box>
//   </Box>
// );

const ExperienceLetter = ({ teacher, school }) => (
  <Box
    className="certificate-content"
    sx={{
      border: "5px solid #1976d2",
      padding: 4,
      borderRadius: 2,
      backgroundColor: "white",
    }}
  >
    {/* Header */}
    <Box textAlign="center" mb={3}>
      <img
        src={school?.logo || "/images/Sanshraya.png"}
        alt="School Logo"
        style={{ width: 130, height: 100, marginBottom: 16 }}
      />
      <Typography variant="h4" fontWeight="bold" color="primary">
        {school?.name || "School Name"}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {school?.address || "School Address"}
      </Typography>
    </Box>
    <Divider sx={{ mb: 2, backgroundColor: "#333" }} />

    {/* Content */}
    <Typography variant="h5" textAlign="center" mb={4}>
      Experience Letter
    </Typography>
    <Typography paragraph>Date: {formatDate(new Date())}</Typography>
    <Typography paragraph>TO WHOM IT MAY CONCERN</Typography>
    <Typography paragraph sx={{ textAlign: "justify", lineHeight: 1.8 }}>
      This is to certify that
      <strong> {teacher?.name || "Teacher Name"} </strong>has been employed with{" "}
      {school?.name || "our institution"} as a{" "}
      {teacher?.designation || "Teacher"} from{" "}
      {formatDate(teacher?.dateOfJoining)} to{" "}
      {teacher?.isCurrentEmployee ? "present" : formatDate(Date.now())}.
    </Typography>
    <Typography paragraph sx={{ textAlign: "justify", lineHeight: 1.8 }}>
      During {teacher?.gender === "F" ? "her" : "his"} tenure,{" "}
      {teacher?.gender === "F" ? "she" : "he"} has demonstrated exceptional
      professionalism, dedication, and expertise in{" "}
      {teacher?.subject || "teaching"}.{teacher?.gender === "F" ? "She" : "He"}{" "}
      has consistently shown excellent leadership abilities and maintained high
      standards of teaching.
    </Typography>
    <Typography paragraph sx={{ textAlign: "justify", lineHeight: 1.8 }}>
      We wish {teacher?.gender === "Female" ? "her" : "him"} the very best in
      all future endeavors.
    </Typography>

    {/* Footer */}
    <Box sx={{ mt: 10, display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Typography>Place: {school?.city || ""}</Typography>
        <Typography>Date: {formatDate(new Date())}</Typography>
      </Box>
      <Box textAlign="center">
        <Divider sx={{ width: 200, mb: 1, backgroundColor: "#333" }} />
        <Typography fontWeight="bold">Principal's Signature</Typography>
        <Typography>School Seal</Typography>
      </Box>
    </Box>
  </Box>
);

// Bonafide Certificate Component
const BonafideCertificate = ({ teacher, school }) => (
  <Box
    className="certificate-content"
    sx={{
      border: "5px solid #2e7d32",
      padding: 4,
      borderRadius: 2,
      backgroundColor: "white",
    }}
  >
    {/* Header */}
    <Box textAlign="center" mb={4}>
      <img
        src={school?.logo || "/images/Sanshraya.png"}
        alt="School Logo"
        style={{ width: 130, height: 100, marginBottom: 16 }}
      />
      <Typography variant="h4" fontWeight="bold" color="success.main">
        {school?.name || "School Name"}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {school?.address || "School Address"}
      </Typography>
    </Box>

    <Divider sx={{ mb: 4, backgroundColor: "#333" }} />

    {/* Content */}
    <Typography variant="h5" textAlign="center" fontWeight={"bold"} mb={4}>
      Bonafide Certificate
    </Typography>

    <Typography paragraph sx={{ textAlign: "justify", lineHeight: 1.8 }}>
      This is to certify that <strong>{teacher?.name || "Teacher Name"}</strong>
      , is a bonafide employee of our institution working as{" "}
      <strong>{teacher?.designation || "Teacher"}</strong> since{" "}
      {formatDate(teacher?.dateOfJoining || "2020-01-01")}.{" "}
      {teacher?.gender === "F" ? "She" : "He"} is teaching{" "}
      {teacher?.subject || "subjects"} for {teacher?.classes || "classes"}.
    </Typography>

    <Typography paragraph sx={{ textAlign: "justify", lineHeight: 1.8 }}>
      This certificate is issued upon {teacher?.gender === "F" ? "her" : "his"}{" "}
      request for {teacher?.purpose || "official"} purpose.
    </Typography>

    {/* Footer */}
    <Box sx={{ mt: 8, display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Typography>Place: {school?.city || "City"}</Typography>
        <Typography>Date: {formatDate(new Date())}</Typography>
      </Box>
      <Box textAlign="center">
        <Divider sx={{ width: 200, mb: 1, backgroundColor: "#333" }} />
        <Typography fontWeight="bold">Principal's Signature</Typography>
        <Typography>School Seal</Typography>
      </Box>
    </Box>
  </Box>
);

// Salary Slip Component
const SalarySlip = ({ teacher, school }) => (
  <Box
    className="certificate-content"
    sx={{
      border: "5px solid #ed6c02",
      padding: 4,
      borderRadius: 2,
      backgroundColor: "white",
    }}
  >
    {/* Header */}
    <Box textAlign="center" mb={4}>
      <img
        src={school?.logo || "/images/Sanshraya.png"}
        alt="School Logo"
        style={{ width: 130, height: 100, marginBottom: 16 }}
      />
      <Typography variant="h4" fontWeight="bold" color="warning.main">
        {school?.name || "School Name"}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {school?.address || "School Address"}
      </Typography>
    </Box>

    <Divider sx={{ mb: 4 }} />

    {/* Content */}
    <Typography variant="h5" textAlign="center" mb={4}>
      Salary Slip - {format(new Date(), "MMMM yyyy")}
    </Typography>

    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Typography>
          <strong>Employee Name:</strong> {teacher?.name}
        </Typography>
        <Typography>
          <strong>Employee ID:</strong> {teacher?.id}
        </Typography>
        <Typography>
          <strong>Designation:</strong> {teacher?.designation}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          <strong>Department:</strong> {teacher?.department}
        </Typography>
        <Typography>
          <strong>Account No:</strong> {teacher?.accountNo}
        </Typography>
        <Typography>
          <strong>PAN No:</strong> {teacher?.panNo}
        </Typography>
      </Grid>
    </Grid>

    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Earnings
          </Typography>
          <Divider sx={{ backgroundColor: "#333" }} />
          <Box sx={{ mt: 2 }}>
            <Typography>
              Basic Salary: ₹{teacher?.basicSalary || "0"}
            </Typography>
            <Typography>DA: ₹{teacher?.da || "0"}</Typography>
            <Typography>HRA: ₹{teacher?.hra || "0"}</Typography>
            <Typography>
              Other Allowances: ₹{teacher?.otherAllowance || "0"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Deductions
          </Typography>
          <Divider sx={{ backgroundColor: "#333" }} />
          <Box sx={{ mt: 2 }}>
            <Typography>PF: ₹{teacher?.pf || "0"}</Typography>
            <Typography>TDS: ₹{teacher?.tds || "0"}</Typography>
            <Typography>
              Professional Tax: ₹{teacher?.professionalTax || "0"}
            </Typography>
            <Typography>
              Other Deductions: ₹{teacher?.otherDeduction || "0"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>

    <Divider sx={{ my: 4, backgroundColor: "#333" }} />

    <Box sx={{ textAlign: "right" }}>
      <Typography variant="h6">
        Net Salary: ₹{teacher?.netSalary || "0"}
      </Typography>
    </Box>

    {/* Footer */}
    <Box sx={{ mt: 8, display: "flex", justifyContent: "flex-end" }}>
      <Box textAlign="center">
        <Divider sx={{ width: 200, mb: 1 }} />
        <Typography fontWeight="bold">Authorized Signature</Typography>
      </Box>
    </Box>
  </Box>
);

const TeacherCertificates = ({ schools, teachers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [experienceCertOpen, setExperienceCertOpen] = useState(false);
  const [bonafideCertOpen, setBonafideCertOpen] = useState(false);
  const [salaryCertOpen, setSalaryCertOpen] = useState(false);

  // Filter teachers based on selected school and search term
  const filteredTeachers = teachers.filter((teacher) => {
    // Convert both IDs to strings for comparison
    const teacherSchoolId = String(teacher.schoolId);
    const selectedId = String(selectedSchoolId);

    return (
      selectedId &&
      teacherSchoolId === selectedId &&
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleCertificateClick = (event, teacher) => {
    setSelectedTeacher(teacher);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleDownload = (type) => {
    // Create a new iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Get the appropriate certificate content and styles
    let certificateElement;
    if (type === "experience") {
      certificateElement = document.getElementById("experience-certificate");
    } else if (type === "bonafide") {
      certificateElement = document.getElementById("bonafide-certificate");
    } else if (type === "salary") {
      certificateElement = document.getElementById("salary-slip");
    }

    // Get all stylesheets from the main document
    const styleSheets = Array.from(document.styleSheets);
    let styles = "";

    // Extract styles from all stylesheets
    styleSheets.forEach((styleSheet) => {
      try {
        const rules = Array.from(styleSheet.cssRules || styleSheet.rules);
        rules.forEach((rule) => {
          styles += rule.cssText;
        });
      } catch (e) {
        // Handle cross-origin stylesheet errors
        console.warn("Could not load stylesheet rules");
      }
    });

    // Additional print-specific styles
    const printStyles = `
      @page {
        size: A4;
        margin: 20mm;
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
      .certificate-content {
        width: 100% !important;
        padding: 20px !important;
        box-sizing: border-box !important;
      }
    `;

    // Get computed styles of the certificate
    const computedStyles = window.getComputedStyle(certificateElement);
    let elementStyles = "";
    for (let i = 0; i < computedStyles.length; i++) {
      const style = computedStyles[i];
      elementStyles += `${style}: ${computedStyles.getPropertyValue(style)};\n`;
    }

    // Create the print document
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Certificate</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <style>
            ${styles}
            ${printStyles}
            .certificate-to-print {
              ${elementStyles}
            }
          </style>
        </head>
        <body>
          <div class="certificate-content certificate-to-print">
            ${certificateElement.outerHTML}
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

  const findSchool = (schoolId) => {
    if (!schoolId || !schools) return null;
    const id = parseInt(schoolId);
    return schools.find((school) => school.id === id);
  };

  const selectedSchool = selectedTeacher
    ? findSchool(selectedTeacher.schoolId)
    : null;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Teacher Certificates
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            sx={{ width: 200 }}
            label="Search by Name"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Grid
        container
        spacing={1}
        sx={{ mb: 1, mt: 1, display: "flex", justifyContent: "flex-end" }}
      >
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Select School</InputLabel>
            <Select
              value={selectedSchoolId}
              label="Select School"
              onChange={(e) => {
                setSelectedSchoolId(e.target.value);
                setSelectedTeacher("");
              }}
            >
              {schools.map((school) => (
                <MenuItem key={school.id} value={school.id}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Teachers List */}
      {filteredTeachers.length > 0 ? (
        <List>
          {filteredTeachers.map((teacher) => (
            <ListItem
              key={teacher.id}
              sx={{
                borderBottom: "1px solid #ccc",
                backgroundColor: "white",
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              <ListItemText
                primary={teacher.name}
                secondary={`${teacher.qualification} - ${teacher.experience} yrs`}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleCertificateClick(e, teacher)}
                endIcon={<ExpandMore />}
              >
                Certificates
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography align="center" sx={{ color: "#757575" }}>
          No Teachers found for the selected criteria.
        </Typography>
      )}

      {/* Certificate Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setExperienceCertOpen(true);
            handleMenuClose();
          }}
        >
          <WorkHistory sx={{ mr: 1 }} /> Experience Letter
        </MenuItem>
        <MenuItem
          onClick={() => {
            setBonafideCertOpen(true);
            handleMenuClose();
          }}
        >
          <VerifiedUser sx={{ mr: 1 }} /> Bonafide Certificate
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSalaryCertOpen(true);
            handleMenuClose();
          }}
        >
          <Receipt sx={{ mr: 1 }} /> Salary Slip
        </MenuItem>
      </Menu>

      {/* Experience Letter Modal */}
      <Modal
        open={experienceCertOpen}
        onClose={() => setExperienceCertOpen(false)}
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              startIcon={<Download />}
              onClick={() => handleDownload("experience")}
              sx={{ mr: 1 }}
            >
              Download
            </Button>
            <IconButton onClick={() => setExperienceCertOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <div id="experience-certificate">
            <ExperienceLetter
              teacher={selectedTeacher}
              // school={schools.find((s) => s.name === selectedSchoolId)}
              school={selectedSchool}
            />
          </div>
        </Box>
      </Modal>

      {/* Bonafide Certificate Modal */}
      <Modal open={bonafideCertOpen} onClose={() => setBonafideCertOpen(false)}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              startIcon={<Download />}
              onClick={() => handleDownload("bonafide")}
              sx={{ mr: 1 }}
            >
              Download
            </Button>
            <IconButton onClick={() => setBonafideCertOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <div id="bonafide-certificate">
            <BonafideCertificate
              teacher={selectedTeacher}
              school={selectedSchool}
              // school={schools.find((s) => s.name === selectedSchoolId)}
            />
          </div>
        </Box>
      </Modal>

      {/* Salary Slip Modal */}
      <Modal open={salaryCertOpen} onClose={() => setSalaryCertOpen(false)}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              startIcon={<Download />}
              onClick={() => handleDownload("salary")}
              sx={{ mr: 1 }}
            >
              Download
            </Button>
            <IconButton onClick={() => setSalaryCertOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <div id="salary-slip">
            <SalarySlip
              teacher={selectedTeacher}
              school={selectedSchool}
              // school={schools.find((s) => s.name === selectedSchoolId)}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default TeacherCertificates;
