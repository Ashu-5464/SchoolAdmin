import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterSchool = () => {
  const [formData, setFormData] = useState({
    name: "",
    registerNumber: "",
    address: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
    schoolType: "",
    phoneNumber: "",
  });
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // addSchool(formData);
    setFormData({
      name: "",
      registerNumber: "",
      address: "",
      pincode: "",
      city: "",
      district: "",
      state: "",
      schoolType: "",
      phoneNumber: "",
    });
    toast.success("School Registered Successfully.");
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
          margin: "0 auto",
          p: 3,
          mt: 1,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          style={{ fontWeight: "bold" }}
        >
          Register School Here
        </Typography>
        <TextField
          label="School Name"
          fullWidth
          margin="normal"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Register Number"
          fullWidth
          margin="normal"
          name="registerNumber"
          required
          value={formData.registerNumber}
          onChange={handleChange}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pincode"
              fullWidth
              margin="normal"
              name="pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              fullWidth
              margin="normal"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="District"
              fullWidth
              margin="normal"
              required
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              fullWidth
              margin="normal"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <FormControl fullWidth margin="normal">
          <InputLabel>School Type*</InputLabel>
          <Select
            name="schoolType"
            value={formData.schoolType}
            label="School Type"
            required
            onChange={handleChange}
          >
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="Government">Government</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="School Contact Number"
          fullWidth
          margin="normal"
          name="phoneNumber"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Register School
        </Button>
        <ToastContainer />
      </Box>
    </>
  );
};

export default RegisterSchool;
