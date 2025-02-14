// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Box,
//   TextField,
//   Divider,
// } from "@mui/material";

// const StudentPromotion = ({ students, schools }) => {
//   const [selectedSchool, setSelectedSchool] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedDivision, setSelectedDivision] = useState("");
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [promotionStandard, setPromotionStandard] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

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
//   const filteredStudents = students.filter(
//     (student) =>
//       student.school === selectedSchool &&
//       student.standard === selectedStandard &&
//       student.division === selectedDivision &&
//       student.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle student selection
//   const handleStudentSelect = (studentId) => {
//     setSelectedStudents((prev) =>
//       prev.includes(studentId)
//         ? prev.filter((id) => id !== studentId)
//         : [...prev, studentId]
//     );
//   };

//   // Select all students
//   const handleSelectAll = () => {
//     setSelectedStudents(
//       selectedStudents.length === filteredStudents.length
//         ? []
//         : filteredStudents.map((student) => student.id)
//     );
//   };

//   // Open promotion confirmation dialog
//   const handlePromoteStudents = () => {
//     setOpenConfirmDialog(true);
//   };

//   const confirmPromotion = () => {
//     // Update the student list with new standards
//     const updatedStudentList = students.map((student) =>
//       selectedStudents.includes(student.id)
//         ? { ...student, standard: promotionStandard }
//         : student
//     );

//     // Update the state with the new student list
//     setSelectedStudents(updatedStudentList);

//     // Reset selections
//     setSelectedStudents([]);
//     setOpenConfirmDialog(false);
//   };

//   return (
//     <>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           Promote Students
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

//       {/* Students List */}
//       <Grid item xs={12}>
//         <Card>
//           <CardContent>
//             <Typography variant="h6" gutterBottom fontWeight={"bold"}>
//               Students List
//             </Typography>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={selectedStudents.length === filteredStudents.length}
//                   indeterminate={
//                     selectedStudents.length > 0 &&
//                     selectedStudents.length < filteredStudents.length
//                   }
//                   onChange={handleSelectAll}
//                 />
//               }
//               label="Select All"
//             />
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ backgroundColor: "#999" }}>
//                     <TableCell sx={{ fontWeight: "bold" }}>Select</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>
//                       Current Standard
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: "bold" }}>Division</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredStudents.map((student) => (
//                     <TableRow key={student.id}>
//                       <TableCell>
//                         <Checkbox
//                           checked={selectedStudents.includes(student.id)}
//                           onChange={() => handleStudentSelect(student.id)}
//                         />
//                       </TableCell>
//                       <TableCell>{student.name}</TableCell>
//                       <TableCell>{student.standard}</TableCell>
//                       <TableCell>{student.division}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>
//       </Grid>

//       {/* Promotion Actions */}
//       {selectedStudents.length > 0 && (
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12} md={6}>
//                   <FormControl fullWidth>
//                     <InputLabel>Promote to Standard</InputLabel>
//                     <Select
//                       value={promotionStandard}
//                       label="Promote to Standard"
//                       onChange={(e) => setPromotionStandard(e.target.value)}
//                     >
//                       {["9", "10", "11", "12"].map((standard) => (
//                         <MenuItem key={standard} value={standard}>
//                           {standard}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handlePromoteStudents}
//                     disabled={!promotionStandard}
//                   >
//                     Promote Selected Students
//                   </Button>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       )}

//       {/* Confirmation Dialog */}
//       <Dialog
//         open={openConfirmDialog}
//         onClose={() => setOpenConfirmDialog(false)}
//       >
//         <DialogTitle>Confirm Student Promotion</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to promote {selectedStudents.length} students
//             to standard {promotionStandard}?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={confirmPromotion} color="primary">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default StudentPromotion;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentPromotion = ({ students: initialStudents, schools }) => {
  const [students, setStudents] = useState(initialStudents); // State to manage the student list
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [promotionStandard, setPromotionStandard] = useState(""); // Promotion standard now is a fixed value
  const [searchTerm, setSearchTerm] = useState("");

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
  const filteredStudents = students.filter(
    (student) =>
      student.school === selectedSchool &&
      student.standard === selectedStandard &&
      student.division === selectedDivision &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle student selection
  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Select all students
  const handleSelectAll = () => {
    setSelectedStudents(
      selectedStudents.length === filteredStudents.length
        ? []
        : filteredStudents.map((student) => student.id)
    );
  };

  // Open promotion confirmation dialog
  const handlePromoteStudents = () => {
    setOpenConfirmDialog(true);
  };

  // Confirm promotion and update the student list
  const confirmPromotion = () => {
    const updatedStudentList = students.map((student) =>
      selectedStudents.includes(student.id)
        ? { ...student, standard: promotionStandard }
        : student
    );

    // Update state with the new student list
    setStudents(updatedStudentList);

    // Reset selections
    setSelectedStudents([]);
    setOpenConfirmDialog(false);
    toast.success("Students are promoted to next standard.");
  };

  // Calculate the next standard
  // const nextStandard = (standard) => {
  //   const standardInt = parseInt(standard);
  //   return standardInt < 10 ? (standardInt + 1).toString() : standard;
  // };

  const nextStandard = (standard) => {
    const standardInt = parseInt(standard);
    if (standardInt >= 10) {
      return null; // No promotion after 10th standard
    }
    return (standardInt + 1).toString(); // Otherwise, promote to the next standard
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Promote Students
        </Typography>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <TextField
            sx={{ width: 200 }}
            label="Search by Name"
            size="small"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />

      <Grid container spacing={1} sx={{ mb: 1, mt: 1 }}>
        <Grid item xs={6} sm={4}>
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
              {standards.map((standard) => (
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
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
              Students List
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedStudents.length === filteredStudents.length}
                  indeterminate={
                    selectedStudents.length > 0 &&
                    selectedStudents.length < filteredStudents.length
                  }
                  onChange={handleSelectAll}
                />
              }
              label="Select All"
            />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#999" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Select</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Current Standard
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Promoted Standard
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Division</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentSelect(student.id)}
                        />
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.standard}</TableCell>
                      <TableCell>{promotionStandard || "-"}</TableCell>
                      <TableCell>{student.division}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Promotion Actions */}
      {selectedStudents.length > 0 && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Promote to Standard</InputLabel>
                    <Select
                      value={promotionStandard}
                      label="Promote to Standard"
                      onChange={(e) => setPromotionStandard(e.target.value)}
                      disabled={
                        nextStandard(filteredStudents[0].standard) === null
                      } // Disable if student is in 10th standard
                    >
                      {/* Show only the next standard, or disable promotion if it's 10th standard */}
                      <MenuItem
                        value={nextStandard(filteredStudents[0].standard)}
                        disabled={
                          nextStandard(filteredStudents[0].standard) === null
                        }
                      >
                        {nextStandard(filteredStudents[0].standard) ||
                          "No promotion after 10th standard"}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePromoteStudents}
                    disabled={!promotionStandard}
                  >
                    Promote Selected Students
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Student Promotion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to promote {selectedStudents.length} students
            to standard {promotionStandard}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmPromotion} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default StudentPromotion;
