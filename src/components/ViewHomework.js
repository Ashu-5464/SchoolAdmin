// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   Divider,
//   Box,
//   TextField,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   Button,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { HomeWork } from "@mui/icons-material";

// const ViewHomeWork = ({ homeworks }) => {
//   const [standardFilter, setStandardFilter] = useState([]);
//   const navigate = useNavigate();

//   // Get unique standards from homeworks
//   const STANDARDS = [...new Set(homeworks.map((hw) => hw.standard))];

//   const handleFilterChange = (event) => {
//     const value = event.target.value;
//     setStandardFilter(typeof value === "string" ? value.split(",") : value);
//   };

//   const filteredHomeworks =
//     standardFilter.length === 0
//       ? homeworks
//       : homeworks.filter((homework) =>
//           standardFilter.includes(homework.standard)
//         );

//   return (
//     <Card
//       sx={{ padding: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
//     >
//       <CardContent>
//         <Typography
//           variant="h5"
//           gutterBottom
//           textAlign="center"
//           fontWeight="bold"
//           color="primary"
//         >
//           Assigned Homeworks
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Button variant="outlined" onClick={() => navigate("/dashboard")}>
//             Back To Home
//           </Button>

//           <TextField
//             select
//             label="Filter by Standard"
//             value={standardFilter}
//             size="small"
//             onChange={handleFilterChange}
//             SelectProps={{
//               multiple: true,
//               renderValue: (selected) => selected.join(", "),
//             }}
//             sx={{ minWidth: "250px" }}
//           >
//             {STANDARDS.map((standard) => (
//               <MenuItem key={standard} value={standard}>
//                 <Checkbox checked={standardFilter.includes(standard)} />
//                 <ListItemText primary={standard} />
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>

//         <Divider sx={{ my: 1 }} />

//         <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
//           <List sx={{ display: "inline-flex", gap: "8px" }}>
//             <ListItem
//               button
//               component={Link}
//               to="/homework"
//               sx={{
//                 backgroundColor: "#d6d6d6",
//                 color: "#111",
//                 borderRadius: "20px",
//                 padding: "4px 12px",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 "&:hover": { backgroundColor: "#333", color: "#f5f5f5" },
//                 whiteSpace: "nowrap",
//               }}
//             >
//               <HomeWork style={{ marginRight: "5px", fontSize: "16px" }} />
//               <ListItemText
//                 primary="Assign Homework"
//                 primaryTypographyProps={{
//                   style: { fontSize: "12px", fontWeight: "bold" },
//                 }}
//               />
//             </ListItem>
//           </List>
//         </Box>

//         <List sx={{ maxHeight: "100%", overflow: "auto" }}>
//           {filteredHomeworks.length > 0 ? (
//             filteredHomeworks.map((homework) => (
//               <React.Fragment key={homework.id}>
//                 <ListItem
//                   sx={{
//                     padding: "15px",
//                     borderRadius: "8px",
//                     backgroundColor: "#f9f9f9",
//                     boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
//                     "&:hover": { backgroundColor: "#f1f1f1" },
//                   }}
//                 >
//                   <Box>
//                     <Typography variant="h6" color="secondary" gutterBottom>
//                       {homework.title}
//                     </Typography>
//                     <Typography variant="body1">
//                       {homework.description}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       <strong>Standard:</strong> {homework.standard}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       <strong>Divisions:</strong>{" "}
//                       {homework.divisions.join(", ")}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       <strong>Schools:</strong> {homework.schools.join(", ")}
//                     </Typography>
//                     {homework.attachments && (
//                       <Typography variant="body2" color="textSecondary">
//                         <strong>Attachments:</strong>{" "}
//                         {homework.attachments.join(", ")}
//                       </Typography>
//                     )}
//                     <Typography variant="body2" color="textSecondary">
//                       <strong>Date Assigned:</strong>{" "}
//                       {new Date(homework.dateAssigned).toLocaleString()}
//                     </Typography>
//                   </Box>
//                 </ListItem>
//                 <Divider sx={{ margin: "10px 0" }} />
//               </React.Fragment>
//             ))
//           ) : (
//             <Typography
//               variant="body1"
//               color="textSecondary"
//               textAlign="center"
//               marginTop="20px"
//             >
//               No homework available for the selected standard.
//             </Typography>
//           )}
//         </List>
//       </CardContent>
//     </Card>
//   );
// };

// export default ViewHomeWork;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { HomeWork } from "@mui/icons-material";

const ViewHomeWork = ({ homeworks, schools }) => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const navigate = useNavigate();

  // Fixed Standard List (1 to 10)
  const standards = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  // Fixed Division List (A, B, C)
  const divisions = ["A", "B", "C"];

  // Filtered Homework List
  const filteredHomeworks = homeworks.filter((hw) => {
    return (
      (!selectedSchool || hw.schools.includes(selectedSchool)) &&
      (!selectedStandard || hw.standard === selectedStandard) &&
      (!selectedDivision || hw.divisions.includes(selectedDivision))
    );
  });

  return (
    <Card
      sx={{ padding: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          color="primary"
        >
          Assigned Homeworks
        </Typography>

        {/* Filters Section */}
        {/* <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}> */}
        {/* School Dropdown */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
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
                <MenuItem value="">All Schools</MenuItem>
                {schools.map((school) => (
                  <MenuItem key={school.id} value={school.name}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            {/* Standard Dropdown */}
            <FormControl fullWidth size="small">
              <InputLabel>Standard</InputLabel>
              <Select
                value={selectedStandard}
                label="Standard"
                onChange={(e) => {
                  setSelectedStandard(e.target.value);
                  setSelectedDivision("");
                }}
              >
                <MenuItem value="">All Standards</MenuItem>
                {standards.map((standard) => (
                  <MenuItem key={standard} value={standard}>
                    {standard}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            {/* Division Dropdown */}
            <FormControl fullWidth size="small">
              <InputLabel>Division</InputLabel>
              <Select
                value={selectedDivision}
                label="Division"
                onChange={(e) => setSelectedDivision(e.target.value)}
                disabled={!selectedStandard}
              >
                <MenuItem value="">All Divisions</MenuItem>
                {divisions.map((division) => (
                  <MenuItem key={division} value={division}>
                    {division}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* </Box> */}

        <Button
          variant="outlined"
          onClick={() => navigate("/dashboard")}
          sx={{
            size: "small",
            alignSelf: "center",
            whiteSpace: "nowrap",
          }}
        >
          Back To Home
        </Button>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
          <List sx={{ display: "inline-flex", gap: "8px" }}>
            <ListItem
              button
              component={Link}
              to="/homework"
              sx={{
                backgroundColor: "#d6d6d6",
                color: "#111",
                borderRadius: "20px",
                padding: "4px 12px",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": { backgroundColor: "#333", color: "#f5f5f5" },
                whiteSpace: "nowrap",
              }}
            >
              <HomeWork style={{ marginRight: "5px", fontSize: "16px" }} />
              <ListItemText
                primary="Assign Homework"
                primaryTypographyProps={{
                  style: { fontSize: "12px", fontWeight: "bold" },
                }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Homework List */}
        <List sx={{ maxHeight: "100%", overflow: "auto" }}>
          {filteredHomeworks.length > 0 ? (
            filteredHomeworks.map((homework) => (
              <React.Fragment key={homework.id}>
                <ListItem
                  sx={{
                    padding: "15px",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    "&:hover": { backgroundColor: "#f1f1f1" },
                  }}
                >
                  <Box>
                    <Typography variant="h6" color="secondary" gutterBottom>
                      {homework.title}
                    </Typography>
                    <Typography variant="body1">
                      {homework.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Standard:</strong> {homework.standard}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Divisions:</strong>{" "}
                      {homework.divisions.join(", ")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Schools:</strong> {homework.schools.join(", ")}
                    </Typography>
                    {homework.attachments && (
                      <Typography variant="body2" color="textSecondary">
                        <strong>Attachments:</strong>{" "}
                        {homework.attachments.join(", ")}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      <strong>Date Assigned:</strong>{" "}
                      {new Date(homework.dateAssigned).toLocaleString()}
                    </Typography>
                  </Box>
                </ListItem>
                <Divider sx={{ margin: "10px 0" }} />
              </React.Fragment>
            ))
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              textAlign="center"
              marginTop="20px"
            >
              No homework available for the selected filters.
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default ViewHomeWork;
