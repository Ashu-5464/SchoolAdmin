import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    experience: "",
    qualification: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    spouseName: "",
    address: "",
    email: "",
    contactNumber: "",
    alternativeContactNumber: "",
    type: "",
    dateOfJoining: "",
    photograph: null,
    aadhaarCard: null,
    panCard: null,
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // [name]: files ? files[0] : value,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set default image if photograph is not provided
    const defaultMaleImage = "/images/MaleAvatar.jpg";
    const defaultFemaleImage = "/images/MaleAvatar.jpg";

    const finalFormData = {
      ...formData,
      photograph:
        formData.photograph ||
        (formData.gender === "Male" ? defaultMaleImage : defaultFemaleImage),
    };
    console.log("Form Data Submitted:", formData);
    console.log("Final Form Data :", finalFormData);
    toast.success("Form Submitted Successfully.");
    setFormData({
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      experience: "",
      qualification: "",
      dob: "",
      gender: "",
      maritalStatus: "",
      spouseName: "",
      address: "",
      email: "",
      contactNumber: "",
      alternativeContactNumber: "",
      type: "",
      dateOfJoining: "",
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
        sx={{ mb: 1 }}
      >
        Back to Schools
      </Button>
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto",
          p: 2,
          boxShadow: 3,
          backgroundColor: "#f9f9f9",
          padding: 5,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight={"bold"}
          gutterBottom
        >
          Register Teacher
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            {/* Title and Full Name */}
            <Grid item xs={3}>
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
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Experience and Qualification */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years of Experience"
                name="experience"
                value={formData.experience}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 0) {
                    handleChange(e);
                  }
                }}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Date of Birth */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { max: new Date().toISOString().split("T")[0] },
                }}
                required
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" fullWidth>
                <Typography variant="body1" gutterBottom>
                  Gender
                </Typography>
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
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Marital Status */}
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth required>
                <InputLabel>Marital Status</InputLabel>
                <Select
                  name="maritalStatus"
                  label="Marital Status"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                >
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Unmarried">Unmarried</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Spouse Name */}
            {formData.maritalStatus === "Married" && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={
                    formData.gender === "Male"
                      ? "Wife's Name"
                      : formData.gender === "Female"
                      ? "Husband's Name"
                      : "Spouse's Name"
                  }
                  name="spouseName"
                  value={formData.spouseName}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
            </Grid>

            {/* Email and Contact Numbers */}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                type="tel"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Alternative Contact Number"
                name="alternativeContactNumber"
                value={formData.alternativeContactNumber}
                onChange={handleChange}
                type="tel"
                required
              />
            </Grid>

            {/* Staff Type and Date of Joining */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Staff Type</InputLabel>
                <Select
                  name="type"
                  label="Staff Type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <MenuItem value="Teaching">Teaching</MenuItem>
                  <MenuItem value="Non-Teaching">Non-Teaching</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            {/* File Uploads */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="photograph"
                label="Photograph"
                value={formData.photograph}
                type="file"
                accept="image/*"
                InputLabelProps={{ shrink: true }}
                // onChange={handleChange}
                onChange={(e) => handleChange(e, setFormData)}
                // required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="aadhaarCard"
                label="Aadhaar Card"
                value={formData.aadhaarCard}
                type="file"
                accept="image/*"
                InputLabelProps={{ shrink: true }}
                // onChange={handleChange}
                onChange={(e) => handleChange(e, setFormData)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="panCard"
                label="PAN Card"
                value={formData.panCard}
                type="file"
                accept="image/*"
                InputLabelProps={{ shrink: true }}
                // onChange={handleChange}
                onChange={(e) => handleChange(e, setFormData)}
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <ToastContainer />
    </>
  );
};

export default RegisterTeacher;
