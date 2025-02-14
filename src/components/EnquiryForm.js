import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EnquiryForm = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    motherName: "",
    fatherName: "",
    dob: "",
    phone: "",
    altPhone: "",
    parentEmail: "",
    gender: "",
    address: "",
    previousSchool: "",
    previousStandard: "",
    currentStandard: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Thanks for enquiry, We will connect you shortly");
      console.log("Form Data Submitted: ", formData);
      // Reset the form after submission
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        motherName: "",
        fatherName: "",
        dob: "",
        phone: "",
        altPhone: "",
        parentEmail: "",
        gender: "",
        address: "",
        previousSchool: "",
        previousStandard: "",
        currentStandard: "",
      });
      setErrors({});
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => navigate("/dashboard")}
        sx={{ mb: 1 }}
      >
        Back to Home
      </Button>
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          fontWeight={"bold"}
        >
          Student Enquiry Form
        </Typography>
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Student First Name"
                name="firstName"
                fullWidth
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Middle Name"
                name="middleName"
                fullWidth
                error={!!errors.middleName}
                helperText={errors.middleName}
                value={formData.middleName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { max: new Date().toISOString().split("T")[0] },
                }}
                error={!!errors.dob}
                helperText={errors.dob}
                value={formData.dob}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  label="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mother's Name"
                name="motherName"
                fullWidth
                required
                error={!!errors.motherName}
                helperText={errors.motherName}
                value={formData.motherName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Father's Name"
                name="fatherName"
                fullWidth
                required
                error={!!errors.fatherName}
                helperText={errors.fatherName}
                value={formData.fatherName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phone"
                fullWidth
                required
                error={!!errors.phone}
                helperText={errors.phone}
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Alternative Phone Number"
                name="altPhone"
                fullWidth
                error={!!errors.altPhone}
                helperText={errors.altPhone}
                value={formData.altPhone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Parent Email"
                name="parentEmail"
                fullWidth
                required
                error={!!errors.parentEmail}
                helperText={errors.parentEmail}
                value={formData.parentEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                required
                multiline
                rows={3}
                error={!!errors.address}
                helperText={errors.address}
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Previous School Name"
                name="previousSchool"
                fullWidth
                required
                error={!!errors.previousSchool}
                helperText={errors.previousSchool}
                value={formData.previousSchool}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Previous Standard"
                name="previousStandard"
                fullWidth
                required
                error={!!errors.previousStandard}
                helperText={errors.previousStandard}
                value={formData.previousStandard}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Current Standard"
                name="currentStandard"
                fullWidth
                required
                error={!!errors.currentStandard}
                helperText={errors.currentStandard}
                value={formData.currentStandard}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Enquiry
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default EnquiryForm;
