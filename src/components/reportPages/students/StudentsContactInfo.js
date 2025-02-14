// import React, { useState } from "react";
// import {
//   Button,
//   Typography,
//   IconButton,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   TextField,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

// const StudentsContactInfo = () => {
//   const navigate = useNavigate();

//   // State for filters
//   const [selectedSchool, setSelectedSchool] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedDivision, setSelectedDivision] = useState("");

//   // Mock data for filters
//   const schools = [
//     { id: 1, name: "ABC School" },
//     { id: 2, name: "XYZ School" },
//   ];
//   const standards = ["1st", "2nd", "3rd"];
//   const divisions = ["A", "B", "C"];

//   return (
//     <div>
//       {/* Back Button */}
//       <Button
//         variant="outlined"
//         size="small"
//         sx={{ mb: 1 }}
//         onClick={() => navigate(0)}
//       >
//         Back
//       </Button>

//       {/* Title with Sorting Icon */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h6" fontWeight={"bold"}>
//           Students Contact Information
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//           <TextField
//             sx={{ width: 200 }}
//             label="Search by name / email"
//             size="small"
//             variant="outlined"
//             // value={searchTerm}
//             // onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <IconButton
//             sx={{
//               ml: 0,
//               backgroundColor: "white",
//               color: "black",
//             }}
//           >
//             <SortByAlphaIcon fontSize="medium" titleAccess="Sort List" />
//           </IconButton>
//         </Box>
//       </div>

//       {/* Filters Section */}
//       <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
//         <Grid item xs={12} sm={4}>
//           {/* School Filter */}
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
//           {/* Standard Filter */}
//           <FormControl fullWidth size="small">
//             <InputLabel>Standard</InputLabel>
//             <Select
//               value={selectedStandard}
//               label="Standard"
//               onChange={(e) => {
//                 setSelectedStandard(e.target.value);
//                 setSelectedDivision("");
//               }}
//               disabled={!selectedSchool}
//             >
//               <MenuItem value="" disabled>
//                 Select Standard
//               </MenuItem>
//               {standards.map((standard) => (
//                 <MenuItem key={standard} value={standard}>
//                   {standard}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={6} sm={4}>
//           {/* Division Filter */}
//           <FormControl fullWidth size="small">
//             <InputLabel>Division</InputLabel>
//             <Select
//               value={selectedDivision}
//               label="Division"
//               onChange={(e) => setSelectedDivision(e.target.value)}
//               disabled={!selectedStandard}
//             >
//               <MenuItem value="" disabled>
//                 Select Division
//               </MenuItem>
//               {divisions.map((division) => (
//                 <MenuItem key={division} value={division}>
//                   {division}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* Content */}
//       <Typography variant="body1" sx={{ marginTop: 2 }}>
//         This page contains detailed contact information of students.
//       </Typography>
//     </div>
//   );
// };

// export default StudentsContactInfo;

import React, { useState } from "react";
import {
  Button,
  Typography,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  DialogActions,
  DialogContent,
  Dialog,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import InfoIcon from "@mui/icons-material/Info";
import PrintIcon from "@mui/icons-material/Print";

const schools = [
  {
    id: 1,
    name: "ABC High School",
    city: "New York",
    address: "123 Main St, New York, NY 10001",
    contactNumber: "(212) 555-1234",
  },
  {
    id: 2,
    name: "XYZ Public School",
    city: "Los Angeles",
    address: "456 Elm St, Los Angeles, CA 90001",
    contactNumber: "(310) 555-5678",
  },
];

const students = [
  {
    id: 1,
    name: "John Doe",
    standard: "10th",
    division: "A",
    school: "ABC High School",
    contactNo: "1234567890",
    subjects: [
      { subject: "Math", marks: 95, grade: "A" },
      { subject: "Science", marks: 89, grade: "B" },
      { subject: "English", marks: 75, grade: "C" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    standard: "9th",
    division: "B",
    school: "XYZ Public School",
    contactNo: "9876543210",
    subjects: [
      { subject: "Math", marks: 85, grade: "B" },
      { subject: "Science", marks: 92, grade: "A" },
      { subject: "English", marks: 60, grade: "C" },
    ],
  },
  {
    id: 3,
    name: "Alice Brown",
    standard: "10th",
    division: "A",
    school: "ABC High School",
    contactNo: "1234567890",
    subjects: [
      { subject: "Math", marks: 78, grade: "C" },
      { subject: "Science", marks: 91, grade: "A" },
      { subject: "English", marks: 85, grade: "B" },
    ],
  },
  {
    id: 4,
    name: "Bob White",
    standard: "8th",
    division: "C",
    school: "XYZ Public School",
    contactNo: "9876543210",
    subjects: [
      { subject: "Math", marks: 65, grade: "C" },
      { subject: "Science", marks: 80, grade: "B" },
      { subject: "English", marks: 88, grade: "B" },
    ],
  },
];

// Static data for modals (sample images and details)
const documentData = [
  { type: "Photograph", url: "/images/MaleAvatar.jpg" },
  { type: "Aadhaar Card", url: "/images/FemaleAvatar.jpg" },
  { type: "PAN Card", url: "/images/profile.png" },
];

const StudentsContactInfo = () => {
  const navigate = useNavigate();

  // State for filters
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Modal states
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Derived data for divisions based on selected school and standard
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

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setOpenDetailsModal(true);
    console.log("Student Details : ", student);
  };

  // Print functionality for the reports
  const handlePrint = (students) => {
    console.log(students);
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write(`
      <html>
        <head><title>Print Report</title></head>
        <body>
          <pre>${students}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      {/* Back Button */}
      <Button
        variant="outlined"
        size="small"
        sx={{ mb: 1 }}
        onClick={() => navigate(0)}
      >
        Back
      </Button>

      {/* Title with Sorting Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          Students Contact Information
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            sx={{ width: 200 }}
            label="Search by name / email"
            size="small"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <IconButton
            sx={{
              ml: 0,
              backgroundColor: "white",
              color: "black",
            }}
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            <SortByAlphaIcon fontSize="medium" titleAccess="Sort List" />
          </IconButton>
        </Box>
      </div>

      {/* Filters Section */}
      <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
        <Grid item xs={12} sm={4}>
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

        <Grid item xs={6} sm={4}>
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
              {Array.from(
                new Set(
                  students
                    .filter((student) => student.school === selectedSchool)
                    .map((student) => student.standard)
                )
              ).map((standard) => (
                <MenuItem key={standard} value={standard}>
                  {standard}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4}>
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
      </Grid>

      {/* Students List */}
      {filteredStudents.length > 0 ? (
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
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ mr: 1 }}
                onClick={() => setOpenDocumentModal(true)}
              >
                <DocumentScannerIcon titleAccess="View Uploaded Documents" />
                Documents
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleViewDetails(student)}
              >
                <InfoIcon titleAccess="View Details" /> Details
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography align="center" sx={{ color: "#757575" }}>
          No students found for the selected criteria.
        </Typography>
      )}

      {/* Document Modal */}
      <Dialog
        open={openDocumentModal}
        onClose={() => setOpenDocumentModal(false)}
      >
        <DialogContent>
          <Typography variant="h6">Uploaded Documents</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            {documentData.map((doc, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedDocument(doc)}
              >
                <img
                  src={doc.url}
                  alt={doc.type}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <Typography variant="caption">{doc.type}</Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        {selectedDocument && (
          <DialogActions>
            <Button onClick={() => setSelectedDocument(null)} color="primary">
              Close
            </Button>
            <Dialog
              open={!!selectedDocument}
              onClose={() => setSelectedDocument(null)}
            >
              <DialogContent>
                <img
                  src={selectedDocument.url}
                  alt={selectedDocument.type}
                  style={{ width: "100%", height: "auto" }}
                />
              </DialogContent>
            </Dialog>
          </DialogActions>
        )}
      </Dialog>

      {/* Details Modal */}
      <Modal open={openDetailsModal} onClose={() => setOpenDetailsModal(false)}>
        <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto", mt: 5 }}>
          <Typography variant="h6" fontWeight={"bold"} align={"center"}>
            Student Details
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ marginTop: 2 }}>
            {selectedStudent ? (
              <>
                <Typography>
                  <strong>Name: </strong>
                  {selectedStudent.name}
                </Typography>
                <Typography>
                  <strong>School: </strong>
                  {selectedStudent.school}
                </Typography>
                <Typography>
                  <strong>Standard: </strong>
                  {selectedStudent.standard}
                </Typography>
                <Typography>
                  <strong>Division: </strong>
                  {selectedStudent.division}
                </Typography>
                <Typography>
                  <strong>Contact No: </strong>
                  {selectedStudent.contactNo}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handlePrint(selectedStudent)}
                >
                  <PrintIcon sx={{ mr: 1 }} />
                  Print Details
                </Button>
              </>
            ) : (
              <Typography>Student not found.</Typography>
            )}
          </Box>
        </Paper>
      </Modal>
    </div>
  );
};

export default StudentsContactInfo;
