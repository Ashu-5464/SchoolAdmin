import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OfficeStaffRegistration = ({ schools }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    schoolName: "",
    maritalStatus: "",
    contactNumber: "",
    altContactNumber: "",
    emailAddress: "",
    joiningDate: "",
    designation: "",
    workExperience: "",
    highestQualification: "",
    photograph: null,
    aadhaarCard: null,
    panCard: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const defaultMaleImage = "/images/MaleAvatar.jpg";
    const defaultFemaleImage = "/images/MaleAvatar.jpg";

    const finalFormData = {
      ...formData,
      photograph:
        formData.photograph ||
        (formData.gender === "Male" ? defaultMaleImage : defaultFemaleImage),
    };
    console.log("Form Data Submitted:", finalFormData);
    toast.success("Office Staff Added Successfully.");
    // Reset the form data to its initial state
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      schoolName: "",
      maritalStatus: "",
      contactNumber: "",
      altContactNumber: "",
      emailAddress: "",
      joiningDate: "",
      designation: "",
      workExperience: "",
      highestQualification: "",
      photograph: "",
      aadhaarCard: "",
      panCard: "",
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)} // Go one step back in history
      >
        Back to Schools
      </Button>
      <Grid
        container
        mt={1}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={"bold"}
            align="center"
            gutterBottom
            mb={2}
          >
            Office Staff Registration
          </Typography>

          {/* <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            margin="normal"
            required
          /> */}
          <Grid container spacing={1}>
            {/* Title and Full Name */}
            {/* <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select
                  name="title"
                  label="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Mr.">Mr.</MenuItem>
                  <MenuItem value="Mrs.">Mrs.</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            type="date"
            label="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: { max: new Date().toISOString().split("T")[0] },
            }}
            margin="normal"
            required
          />

          <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
            <FormControl component="fieldset" sx={{ flex: 1 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ flex: 1 }}>
              <FormLabel component="legend">Marital Status</FormLabel>
              <RadioGroup
                row
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Married"
                  control={<Radio />}
                  label="Married"
                />
                <FormControlLabel
                  value="Unmarried"
                  control={<Radio />}
                  label="Unmarried"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Alternative Contact Number"
                name="altContactNumber"
                value={formData.altContactNumber}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Email Address"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            // margin="normal"
            type="email"
            required
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 1, mt: 1 }}>
            <InputLabel>School Name</InputLabel>
            <Select
              name="schoolName"
              label="School Name"
              value={formData.schoolName}
              onChange={handleChange}
            >
              {schools.map((school, index) => (
                <MenuItem key={index} value={school.name}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Designation</InputLabel>
                <Select
                  name="designation"
                  label="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                >
                  <MenuItem value="Teacher">Teacher</MenuItem>
                  <MenuItem value="Principal">Principal</MenuItem>
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="Clerk">Clerk</MenuItem>
                  <MenuItem value="Support Staff">Support Staff</MenuItem>
                  <MenuItem value="Peon">Peon</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              {/* <Box display="flex" flexWrap="wrap" gap={1} marginBottom={1}> */}
              <TextField
                fullWidth
                label="Work Experience (in years)"
                name="workExperience"
                value={formData.workExperience}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    handleChange(e); // Only update state if the value is >= 0
                  }
                }}
                sx={{ flex: 1 }}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Highest Qualification"
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
                sx={{ flex: 1 }}
                required
              />
              {/* </Box> */}
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Joining Date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                // margin="normal"
                required
              />
            </Grid>
          </Grid>
          <TextField
            label="Photograph"
            fullWidth
            margin="normal"
            name="photograph"
            value={formData.photograph}
            type="file"
            accept="image/*"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange(e, setFormData)}
            // required
          />
          <TextField
            label="Aadhar Card"
            fullWidth
            margin="normal"
            name="aadhaarCard"
            value={formData.aadhaarCard}
            type="file"
            accept="image/*"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange(e, setFormData)}
            required
          />
          <TextField
            label="PAN Card"
            fullWidth
            margin="normal"
            name="panCard"
            value={formData.panCard}
            type="file"
            accept="image/*"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange(e, setFormData)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Box>
        <ToastContainer />
      </Grid>
    </>
  );
};

export default OfficeStaffRegistration;
