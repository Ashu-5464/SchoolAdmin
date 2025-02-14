import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EventManagement = ({ schools, addEvent }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    aboutEvent: "",
    schoolName: "",
  });
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === "photo") {
      setPhotos((prev) => [...prev, ...files]);
    } else {
      setVideos((prev) => [...prev, ...files]);
    }
  };

  const handleFileRemove = (index, type) => {
    if (type === "photo") {
      setPhotos((prev) => prev.filter((_, i) => i !== index));
    } else {
      setVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { ...formData, photos, videos };
    addEvent(newEvent);
    setFormData({
      eventName: "",
      eventDate: "",
      eventTime: "",
      aboutEvent: "",
      schoolName: "",
    });
    setPhotos([]);
    setVideos([]);
    console.log("New Event Added:", newEvent);
    toast.success("Event Posted Successfully.");
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
            maxWidth: 600,
            width: "100%",
            border: "1px solid #ddd",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Event Management Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Name"
                  variant="outlined"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Event Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  InputProps={{
                    inputProps: { max: new Date().toISOString().split("T")[0] },
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Event Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>School Name</InputLabel>
                  <Select
                    name="schoolName"
                    label="School Name"
                    value={formData.schoolName}
                    onChange={handleChange}
                  >
                    {schools.map((school) => (
                      <MenuItem key={school.id} value={school.name}>
                        {school.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="About Event"
                  variant="outlined"
                  multiline
                  rows={4}
                  name="aboutEvent"
                  value={formData.aboutEvent}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Upload Photos</InputLabel>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginBottom: 2 }}
                >
                  Add Photos
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={(e) => handleFileUpload(e, "photo")}
                  />
                </Button>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {photos.map((photo, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Typography variant="body2">{photo.name}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleFileRemove(index, "photo")}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Upload Videos</InputLabel>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginBottom: 2 }}
                >
                  Add Videos
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    hidden
                    onChange={(e) => handleFileUpload(e, "video")}
                  />
                </Button>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {videos.map((video, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Typography variant="body2">{video.name}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleFileRemove(index, "video")}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Submit Event
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <ToastContainer />
      </Box>
    </>
  );
};

export default EventManagement;
