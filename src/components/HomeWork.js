// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Autocomplete,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// // Constants for dropdowns
// const STANDARDS = Array.from({ length: 10 }, (_, i) => ({
//   label: `Standard ${i + 1}`,
//   value: i + 1,
// }));
// const DIVISIONS = ["A", "B", "C"].map((div) => ({
//   label: `Division ${div}`,
//   value: div,
// }));

// const HomeWork = ({ schools }) => {
//   const navigate = useNavigate();

//   // Form state
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [selectedStandard, setSelectedStandard] = useState(null);
//   const [selectedDivision, setSelectedDivision] = useState(null);
//   const [homeworkTitle, setHomeworkTitle] = useState("");
//   const [homeworkDescription, setHomeworkDescription] = useState("");
//   const [attachments, setAttachments] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedSchool || !selectedStandard || !selectedDivision) {
//       toast.error("Please fill in all required fields!");
//       return;
//     }

//     const homeworkData = {
//       id: Date.now(),
//       school: selectedSchool.name,
//       standard: selectedStandard.value,
//       division: selectedDivision.value,
//       title: homeworkTitle,
//       description: homeworkDescription,
//       attachments: attachments,
//       dateAssigned: new Date().toISOString(),
//     };

//     console.log("Homework Data:", homeworkData);
//     toast.success("Homework assigned successfully!");

//     // Reset form
//     setSelectedSchool(null);
//     setSelectedStandard(null);
//     setSelectedDivision(null);
//     setHomeworkTitle("");
//     setHomeworkDescription("");
//     setAttachments([]);
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setAttachments((prevAttachments) => [...prevAttachments, ...files]);
//   };

//   const removeAttachment = (indexToRemove) => {
//     setAttachments((prevAttachments) =>
//       prevAttachments.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   return (
//     <>
//       <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 1 }}>
//         Go Back
//       </Button>
//       <Grid container justifyContent="center" style={{ minHeight: "100vh" }}>
//         <Grid item xs={12} sm={8} md={6} lg={4}>
//           <Card sx={{ padding: "20px" }}>
//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               gutterBottom
//             >
//               Assign Homework
//             </Typography>
//             <CardContent>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <Autocomplete
//                       options={schools}
//                       getOptionLabel={(option) => option.name}
//                       value={selectedSchool}
//                       onChange={(_, newValue) => setSelectedSchool(newValue)}
//                       renderInput={(params) => (
//                         <TextField {...params} label="Select School" required />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Autocomplete
//                       options={STANDARDS}
//                       getOptionLabel={(option) => option.label}
//                       value={selectedStandard}
//                       onChange={(_, newValue) => setSelectedStandard(newValue)}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Select Standard"
//                           required
//                         />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Autocomplete
//                       options={DIVISIONS}
//                       getOptionLabel={(option) => option.label}
//                       value={selectedDivision}
//                       onChange={(_, newValue) => setSelectedDivision(newValue)}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Select Division"
//                           required
//                         />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Homework Title"
//                       value={homeworkTitle}
//                       onChange={(e) => setHomeworkTitle(e.target.value)}
//                       required
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       multiline
//                       rows={4}
//                       label="Homework Description"
//                       value={homeworkDescription}
//                       onChange={(e) => setHomeworkDescription(e.target.value)}
//                       required
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button
//                       variant="outlined"
//                       component="label"
//                       fullWidth
//                       sx={{ mb: 2 }}
//                     >
//                       Upload Attachments
//                       <input
//                         type="file"
//                         hidden
//                         multiple
//                         onChange={handleFileChange}
//                       />
//                     </Button>
//                     {attachments.length > 0 && (
//                       <Grid container spacing={1}>
//                         {attachments.map((file, index) => (
//                           <Grid item xs={12} key={index}>
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <Typography variant="body2">
//                                 {file.name}
//                               </Typography>
//                               <Button
//                                 size="small"
//                                 color="error"
//                                 onClick={() => removeAttachment(index)}
//                               >
//                                 Remove
//                               </Button>
//                             </div>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     )}
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                       fullWidth
//                     >
//                       Assign Homework
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </form>
//             </CardContent>
//           </Card>
//         </Grid>
//         <ToastContainer />
//       </Grid>
//     </>
//   );
// };

// export default HomeWork;

// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Checkbox,
//   ListItemText,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Box,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// // Constants for dropdowns
// const STANDARDS = Array.from({ length: 10 }, (_, i) => ({
//   label: `Standard ${i + 1}`,
//   value: i + 1,
// }));
// const DIVISIONS = ["A", "B", "C"].map((div) => ({
//   label: `Division ${div}`,
//   value: div,
// }));

// const HomeWork = ({ schools }) => {
//   const navigate = useNavigate();

//   // Form state
//   const [selectedSchools, setSelectedSchools] = useState([]);
//   const [selectedStandard, setSelectedStandard] = useState(null);
//   const [selectedDivisions, setSelectedDivisions] = useState([]);
//   const [homeworkTitle, setHomeworkTitle] = useState("");
//   const [homeworkDescription, setHomeworkDescription] = useState("");
//   const [attachments, setAttachments] = useState([]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       selectedSchools.length === 0 ||
//       !selectedStandard ||
//       selectedDivisions.length === 0
//     ) {
//       toast.error("Please fill in all required fields!");
//       return;
//     }

//     const homeworkData = {
//       id: Date.now(),
//       schools: selectedSchools,
//       standard: selectedStandard,
//       divisions: selectedDivisions,
//       title: homeworkTitle,
//       description: homeworkDescription,
//       attachments: attachments,
//       dateAssigned: new Date().toISOString(),
//     };

//     console.log("Homework Data:", homeworkData);
//     toast.success("Homework assigned successfully!");

//     // Reset form
//     setSelectedSchools([]);
//     setSelectedStandard(null);
//     setSelectedDivisions([]);
//     setHomeworkTitle("");
//     setHomeworkDescription("");
//     setAttachments([]);
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setAttachments((prevAttachments) => [...prevAttachments, ...files]);
//   };

//   const removeAttachment = (indexToRemove) => {
//     setAttachments((prevAttachments) =>
//       prevAttachments.filter((_, index) => index !== indexToRemove)
//     );
//   };

//   // Handle multi-select changes
//   const handleSchoolChange = (event) => {
//     const value = event.target.value;
//     setSelectedSchools(typeof value === "string" ? value.split(",") : value);
//   };

//   const handleDivisionChange = (event) => {
//     const value = event.target.value;
//     setSelectedDivisions(typeof value === "string" ? value.split(",") : value);
//   };

//   return (
//     <>
//       <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 1 }}>
//         Go Back
//       </Button>
//       <Grid container justifyContent="center" style={{ minHeight: "100vh" }}>
//         <Grid item xs={12} sm={8} md={6} lg={4}>
//           <Card sx={{ padding: "20px" }}>
//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               gutterBottom
//             >
//               Assign Homework
//             </Typography>
//             <CardContent>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <FormControl fullWidth required>
//                       <InputLabel>Select Schools</InputLabel>
//                       <Select
//                         multiple
//                         value={selectedSchools}
//                         onChange={handleSchoolChange}
//                         renderValue={(selected) =>
//                           `${selected.length} schools selected`
//                         }
//                       >
//                         {schools.map((school) => (
//                           <MenuItem key={school.name} value={school}>
//                             <Checkbox
//                               checked={selectedSchools.indexOf(school) > -1}
//                             />
//                             <ListItemText primary={school.name} />
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <FormControl fullWidth required>
//                       <InputLabel>Select Standard</InputLabel>
//                       <Select
//                         value={selectedStandard || ""}
//                         onChange={(e) => setSelectedStandard(e.target.value)}
//                       >
//                         {STANDARDS.map((standard) => (
//                           <MenuItem key={standard.value} value={standard}>
//                             {standard.label}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <FormControl fullWidth required>
//                       <InputLabel>Select Divisions</InputLabel>
//                       <Select
//                         multiple
//                         value={selectedDivisions}
//                         onChange={handleDivisionChange}
//                         renderValue={(selected) =>
//                           `${selected.length} divisions selected`
//                         }
//                       >
//                         {DIVISIONS.map((division) => (
//                           <MenuItem key={division.value} value={division}>
//                             <Checkbox
//                               checked={selectedDivisions.indexOf(division) > -1}
//                             />
//                             <ListItemText primary={division.label} />
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Homework Title"
//                       value={homeworkTitle}
//                       onChange={(e) => setHomeworkTitle(e.target.value)}
//                       required
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       multiline
//                       rows={4}
//                       label="Homework Description"
//                       value={homeworkDescription}
//                       onChange={(e) => setHomeworkDescription(e.target.value)}
//                       required
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button
//                       variant="outlined"
//                       component="label"
//                       fullWidth
//                       sx={{ mb: 2 }}
//                     >
//                       Upload Attachments
//                       <input
//                         type="file"
//                         hidden
//                         multiple
//                         onChange={handleFileChange}
//                       />
//                     </Button>
//                     {attachments.length > 0 && (
//                       <Grid container spacing={1}>
//                         {attachments.map((file, index) => (
//                           <Grid item xs={12} key={index}>
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <Typography variant="body2">
//                                 {file.name}
//                               </Typography>
//                               <Button
//                                 size="small"
//                                 color="error"
//                                 onClick={() => removeAttachment(index)}
//                               >
//                                 Remove
//                               </Button>
//                             </Box>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     )}
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                       fullWidth
//                     >
//                       Assign Homework
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </form>
//             </CardContent>
//           </Card>
//         </Grid>
//         <ToastContainer />
//       </Grid>
//     </>
//   );
// };

// export default HomeWork;

import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Constants for dropdowns
const STANDARDS = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}`,
  value: i + 1,
}));
const DIVISIONS = ["A", "B", "C"].map((div) => ({
  label: `${div}`,
  value: div,
}));

const HomeWork = ({ schools, onAssignHomework }) => {
  const navigate = useNavigate();

  // Form state
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [homeworkTitle, setHomeworkTitle] = useState("");
  const [homeworkDescription, setHomeworkDescription] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      selectedSchools.length === 0 ||
      !selectedStandard ||
      selectedDivisions.length === 0
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const homeworkData = {
      id: Date.now(),
      schools: selectedSchools.map((school) => school.name), // Ensure correct school names
      standard: selectedStandard.label,
      divisions: selectedDivisions.map((division) => division.label), // Ensure correct division labels
      title: homeworkTitle,
      description: homeworkDescription,
      attachments: attachments.length > 0 ? attachments : null, // If no attachments, set to null
      dateAssigned: new Date().toISOString(),
    };

    onAssignHomework(homeworkData);

    console.log("Homework Data:", homeworkData);
    toast.success("Homework assigned successfully!");

    // Reset form
    setSelectedSchools([]);
    setSelectedStandard(null);
    setSelectedDivisions([]);
    setHomeworkTitle("");
    setHomeworkDescription("");
    setAttachments([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...files]);
  };

  const removeAttachment = (indexToRemove) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 1 }}>
        Go Back
      </Button>
      <Grid container justifyContent="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ padding: "20px" }}>
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="bold"
              gutterBottom
            >
              Assign Homework
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={schools}
                      getOptionLabel={(option) => option.name}
                      value={selectedSchools}
                      onChange={(event, newValue) => {
                        console.log("Selected Schools:", newValue); // Debugging log
                        setSelectedSchools(newValue);
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Schools"
                          placeholder="Choose schools"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      options={STANDARDS}
                      getOptionLabel={(option) => option.label}
                      value={selectedStandard}
                      onChange={(_, newValue) => setSelectedStandard(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Standard"
                          placeholder="Choose standard"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      options={DIVISIONS}
                      getOptionLabel={(option) => option.label}
                      value={selectedDivisions}
                      onChange={(event, newValue) =>
                        setSelectedDivisions(newValue)
                      }
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.label}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Divisions"
                          placeholder="Choose divisions"
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Homework Title"
                      value={homeworkTitle}
                      onChange={(e) => setHomeworkTitle(e.target.value)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Homework Description"
                      value={homeworkDescription}
                      onChange={(e) => setHomeworkDescription(e.target.value)}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      Upload Attachments (Optional)
                      <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleFileChange}
                      />
                    </Button>
                    {attachments.length > 0 && (
                      <Grid container spacing={1}>
                        {attachments.map((file, index) => (
                          <Grid item xs={12} key={index}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="body2">
                                {file.name}
                              </Typography>
                              <Button
                                size="small"
                                color="error"
                                onClick={() => removeAttachment(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Assign Homework
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <ToastContainer />
      </Grid>
    </>
  );
};

export default HomeWork;
