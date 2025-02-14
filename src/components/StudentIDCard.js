// import React, { useRef, useState } from "react";
// import {
//   Box,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Grid,
//   TextField,
//   Button,
//   Modal,
//   IconButton,
//   Menu,
//   Avatar,
// } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
// import RememberMeIcon from "@mui/icons-material/RememberMe";
// import PrintIcon from "@mui/icons-material/Print";

// const StudentsIDCard = ({ schools, students }) => {
//   const [selectedSchool, setSelectedSchool] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedDivision, setSelectedDivision] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc"); // State to track sorting order
//   const [anchorEl, setAnchorEl] = useState(null); // Anchor for the dropdown menu

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = (order) => {
//     if (order) {
//       setSortOrder(order); // Set the selected sorting order
//     }
//     setAnchorEl(null); // Close the dropdown menu
//   };

//   // Get unique standards and divisions
//   const standards = Array.from(
//     new Set(
//       students
//         .filter((student) => student.school === selectedSchool)
//         .map((student) => student.standard)
//     )
//   );

//   const divisions = Array.from(
//     new Set(
//       students
//         .filter(
//           (student) =>
//             student.school === selectedSchool &&
//             student.standard === selectedStandard
//         )
//         .map((student) => student.division)
//     )
//   );

//   // Filtered students based on selected filters and search term
//   const filteredStudents = students
//     .filter(
//       (student) =>
//         student.school === selectedSchool &&
//         student.standard === selectedStandard &&
//         student.division === selectedDivision &&
//         student.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) =>
//       sortOrder === "asc"
//         ? a.name.localeCompare(b.name)
//         : b.name.localeCompare(a.name)
//     );
//   console.log("Student Details : ", filteredStudents);

//   const handleGenerateIdCard = (student) => {
//     setSelectedStudent(student);
//   };

//   const handleCloseStudentIDModal = () => {
//     setSelectedStudent(null);
//   };

//   const printRef = useRef();

//   const handlePrint = () => {
//     // Create a new print window
//     const printWindow = window.open("", "PRINT", "height=600,width=800");
//     if (printWindow) {
//       // Extract the styles from the main page and inject them into the print window
//       const styles = Array.from(
//         document.querySelectorAll("style, link[rel='stylesheet']")
//       )
//         .map((style) => style.outerHTML)
//         .join("\n");

//       // Write the content of the modal into the print window
//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Print ID Card</title>
//             ${styles} <!-- Include all styles -->
//             <style>
//             /* Additional print-specific styles */
//               @media print {
//                 .no-print {
//                   display: none !important; /* Hide elements with this class */
//                 }
//               }
//               /* Additional styles for the printed version, if needed */
//               body {
//                 margin: 0;
//                 font-family: Arial, sans-serif;
//                 text-align: center;
//                 background-color: #f5f5f5; /* Optional */
//               }
//               .print-container {
//                 width: 450px;
//                 height: 250px;
//                 margin: auto;
//                 background-size: cover;
//                 background-repeat: no-repeat;
//                 color: #000;
//                 padding: 20px;
//                 display: flex;
//                 flex-direction: column;
//                 justify-content: space-between;
//                 align-items: center;
//               }
//               .avatar {
//                 width: 100px;
//                 height: 100px;
//                 border-radius: 8px;
//                 border: 2px solid #fff;
//                 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//               }
//             </style>
//           </head>
//           <body>
//             <div class="print-container">
//               ${printRef.current.outerHTML} <!-- Inject ID card content -->
//             </div>
//           </body>
//         </html>
//       `);

//       // Print the content
//       printWindow.document.close(); // Close the document
//       printWindow.focus(); // Focus the print window
//       printWindow.print(); // Trigger print
//       printWindow.close(); // Close the print window after printing
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: "100%", margin: 0 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           Generate Student ID Card
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//           <TextField
//             sx={{ width: 200 }}
//             label="Search by Name"
//             size="small"
//             variant="outlined"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <IconButton
//             onClick={handleMenuClick}
//             sx={{
//               ml: 0,
//               backgroundColor: "white",
//               color: "black",
//             }}
//           >
//             <SortByAlphaIcon fontSize="medium" titleAccess="Sort List" />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={() => handleMenuClose(null)}
//           >
//             <MenuItem onClick={() => handleMenuClose("asc")}>
//               Ascending
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("desc")}>
//               Descending
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Box>
//       <Divider sx={{ my: 2 }} />

//       <Grid container spacing={1} sx={{ mb: 2 }}>
//         <Grid item xs={6} sm={3}>
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

//         <Grid item xs={6} sm={3}>
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

//         <Grid item xs={6} sm={3}>
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

//       <Divider />

//       {/* Students List */}
//       {filteredStudents.length > 0 ? (
//         <>
//           <List>
//             {filteredStudents.map((student) => (
//               <ListItem
//                 key={student.id}
//                 sx={{
//                   borderBottom: "1px solid #ccc",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   "&:hover": { background: "#f5f5f5" },
//                   backgroundColor: "white",
//                 }}
//               >
//                 <ListItemText
//                   primary={student.name}
//                   secondary={`Standard: ${student.standard}, Division: ${student.division}`}
//                 />
//                 <Button
//                   variant="contained"
//                   size="small"
//                   color="primary"
//                   onClick={() => handleGenerateIdCard(student)}
//                 >
//                   <RememberMeIcon titleAccess="Create ID Card" sx={{ pr: 1 }} />
//                   Generate ID
//                 </Button>
//               </ListItem>
//             ))}
//           </List>
//         </>
//       ) : (
//         <Typography align="center" sx={{ color: "#757575" }}>
//           No students found for the selected criteria.
//         </Typography>
//       )}

//       {/* Modal for ID Card */}
//       <Modal open={!!selectedStudent} onClose={handleCloseStudentIDModal}>
//         <Box
//           ref={printRef} // Reference the content to be printed
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 450,
//             height: 250,
//             p: 3,
//             borderRadius: 3,
//             backgroundImage: `url('/images/IDbackground2.jpg')`,
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             color: "#000000",
//             boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
//             textAlign: "center",
//           }}
//         >
//           {selectedStudent && (
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <Typography variant="h5" fontWeight={"bold"}>
//                 {selectedStudent.school}
//               </Typography>
//               <Divider sx={{ backgroundColor: "#333" }} />
//               <Grid container spacing={1} sx={{ mt: 3 }}>
//                 <Grid item xs={4}>
//                   <Avatar
//                     src={selectedStudent.photo || "/images/Rushya.jpg"}
//                     alt={selectedStudent.name}
//                     sx={{
//                       width: 150,
//                       height: 150,
//                       borderRadius: "8px",
//                       border: "2px solid #fff",
//                       boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={7} sx={{ textAlign: "left", ml: 1 }}>
//                   <Typography variant="body1">
//                     <strong>Student Name:</strong> {selectedStudent.name}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Student ID:</strong> {selectedStudent.id}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Standard:</strong> {selectedStudent.standard}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Division:</strong> {selectedStudent.division}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Contact:</strong> {selectedStudent.contactNo}
//                   </Typography>
//                 </Grid>
//               </Grid>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 1 }}
//                 onClick={handlePrint} //Call print function
//                 className="no-print" // Add no-print class to hide during printing
//               >
//                 <PrintIcon sx={{ mr: 1 }} />
//                 Print
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Modal>
//       <ToastContainer />
//     </Box>
//   );
// };

// export default StudentsIDCard;

import React, { useRef, useState } from "react";
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
  IconButton,
  Menu,
  Avatar,
} from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import PrintIcon from "@mui/icons-material/Print";

const StudentsIDCard = ({ schools, students }) => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState("background1");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (order) => {
    if (order) {
      setSortOrder(order);
    }
    setAnchorEl(null);
  };

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

  const handleGenerateIdCard = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseStudentIDModal = () => {
    setSelectedStudent(null);
  };

  const printRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open("", "PRINT", "height=600,width=800");
    if (printWindow) {
      const styles = Array.from(
        document.querySelectorAll("style, link[rel='stylesheet']")
      )
        .map((style) => style.outerHTML)
        .join("\n");

      printWindow.document.write(`
        <html>
          <head>
            <title>Print ID Card</title>
            ${styles}
            <style>
            /* Additional print-specific styles */
              @media print {
                .no-print {
                  display: none !important; /* Hide elements with this class */
                }
              }
            </style>
          </head>
          <body>
            <div>${printRef.current.outerHTML}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const backgrounds = {
    background1: "/images/IDbackground.jpg",
    background2: "/images/IDbackground2.jpg",
  };

  return (
    <Box sx={{ maxWidth: "100%", margin: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Generate Student ID Card
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
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item xs={6} sm={3}>
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
          <FormControl fullWidth size="small">
            <InputLabel>Background</InputLabel>
            <Select
              value={selectedBackground}
              label="Background"
              onChange={(e) => setSelectedBackground(e.target.value)}
            >
              <MenuItem value="background1">Background 1</MenuItem>
              <MenuItem value="background2">Background 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Divider />
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
                size="small"
                color="primary"
                onClick={() => handleGenerateIdCard(student)}
              >
                <RememberMeIcon titleAccess="Create ID Card" sx={{ pr: 1 }} />
                Generate ID
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography align="center" sx={{ color: "#757575" }}>
          No students found for the selected criteria.
        </Typography>
      )}
      <Modal open={!!selectedStudent} onClose={handleCloseStudentIDModal}>
        <Box
          ref={printRef}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            height: 250,
            p: 3,
            borderRadius: 3,
            backgroundImage: `url(${backgrounds[selectedBackground]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            color: "#000000",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          {selectedStudent && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" fontWeight={"bold"}>
                {selectedStudent.school}
              </Typography>
              <Divider sx={{ backgroundColor: "#333" }} />
              <Grid container spacing={1} sx={{ mt: 3 }}>
                <Grid item xs={4}>
                  <Avatar
                    src={selectedStudent.photo || "/images/Rushya.jpg"}
                    alt={selectedStudent.name}
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: "8px",
                      border: "2px solid #fff",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    }}
                  />
                </Grid>
                <Grid item xs={7} sx={{ textAlign: "left", ml: 1 }}>
                  <Typography variant="body1">
                    <strong>Student Name:</strong> {selectedStudent.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Student ID:</strong> {selectedStudent.id}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Standard:</strong> {selectedStudent.standard}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Division:</strong> {selectedStudent.division}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Contact:</strong> {selectedStudent.contactNo}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1 }}
                onClick={handlePrint} //Call print function
                className="no-print" // Add no-print class to hide during printing
              >
                <PrintIcon sx={{ mr: 1 }} />
                Print
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default StudentsIDCard;
