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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

const TeacherNotes = () => {
  const navigate = useNavigate();

  // State for filters
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

  // Mock data for filters
  const schools = [
    { id: 1, name: "ABC School" },
    { id: 2, name: "XYZ School" },
  ];
  const standards = ["1st", "2nd", "3rd"];
  const divisions = ["A", "B", "C"];

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
          Teacher Notes
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            sx={{ width: 200 }}
            label="Search by name / email"
            size="small"
            variant="outlined"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />

          <IconButton
            sx={{
              ml: 0,
              backgroundColor: "white",
              color: "black",
            }}
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

      {/* Content */}
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        This page contains notes of Teacher.
      </Typography>
    </div>
  );
};

export default TeacherNotes;
