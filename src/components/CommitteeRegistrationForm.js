import React, { useState } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CommitteeRegistrationForm = ({ schools }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
    gender: "",
    maritalStatus: "",
    schoolName: "",
    education: "",
    designation: "",
    tenureFrom: "",
    tenureTo: "",
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
    console.log("Form Submitted:", formData);
    toast.success("Committee Details Added Successfully.");
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      dob: "",
      phone: "",
      gender: "",
      schoolName: "",
      education: "",
      designation: "",
      tenureFrom: "",
      tenureTo: "",
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
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 1,
          p: 3,
          border: "1px solid #ccc",
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          mb={2}
          gutterBottom
          fontWeight={"bold"}
        >
          Committee Member Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
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

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="tel"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
                required
              />
            </Grid>

            {/* DOB */}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { max: new Date().toISOString().split("T")[0] },
                }}
                required
              />
            </Grid>

            {/* Gender */}
            <Grid container spacing={1} m={0}>
              <Grid item xs={6}>
                <FormControl component="fieldset" required>
                  <FormLabel>Gender</FormLabel>
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
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset">
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
              </Grid>
            </Grid>

            {/* School Name */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>School Name</InputLabel>
                <Select
                  name="schoolName"
                  label="School Name"
                  value={formData.schoolName}
                  onChange={(e) => handleChange(e, setFormData)}
                >
                  {schools.map((school, index) => (
                    <MenuItem key={index} value={school.name}>
                      {school.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Education */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Designation */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Tenure */}
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tenure (in years)"
                name="tenure"
                value={formData.tenure}
                onChange={handleChange}
                type="number"
                required
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Tenure From"
                name="tenureFrom"
                value={formData.tenureFrom}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { max: new Date().toISOString().split("T")[0] },
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Tenure To"
                name="tenureTo"
                value={formData.tenureTo}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { max: new Date().toISOString().split("T")[0] },
                }}
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <ToastContainer />
    </>
  );
};

export default CommitteeRegistrationForm;
