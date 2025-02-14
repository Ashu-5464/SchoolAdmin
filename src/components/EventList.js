import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const EventList = ({ events }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState("schools");
  const [searchQuery, setSearchQuery] = useState("");

  // Group events by school
  const groupedEvents = events.reduce((acc, event) => {
    acc[event.schoolName] = acc[event.schoolName] || [];
    acc[event.schoolName].push(event);
    return acc;
  }, {});

  // Filter schools based on search query
  const filteredSchools = Object.keys(groupedEvents).filter((schoolName) =>
    schoolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewEvents = (schoolName) => {
    setSelectedSchool(schoolName);
    setViewMode("events");
  };

  const handleViewMedia = (event, type) => {
    setSelectedEvent(event);
    setViewMode(type); // "images" or "videos"
  };

  const handleBackToSchools = () => {
    setSelectedSchool(null);
    setSelectedEvent(null);
    setViewMode("schools");
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setViewMode("events");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Events by School
        </Typography>
        {viewMode === "schools" ? (
          <TextField
            variant="outlined"
            placeholder="Search by School Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
          />
        ) : (
          <></>
        )}
      </Box>
      <Divider />
      <>
        <Button
          variant="outlined"
          onClick={() => navigate("/dashboard")} // Go one step back in history
          sx={{ mt: 1 }}
        >
          Back to Home
        </Button>
      </>
      {viewMode === "schools" && (
        <Grid container spacing={3}>
          {filteredSchools.map((schoolName) => (
            <Grid item xs={12} sm={6} md={3} mt={2} key={schoolName}>
              <Card sx={{ padding: 2, textAlign: "center" }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {schoolName}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewEvents(schoolName)}
                >
                  View Events
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {viewMode === "events" && selectedSchool && (
        <Box>
          <Typography variant="h6" mt={1} fontWeight="bold" gutterBottom>
            Events for {selectedSchool}
          </Typography>
          <Button
            variant="outlined"
            sx={{ marginBottom: 1 }}
            onClick={handleBackToSchools}
          >
            Back to Schools
          </Button>
          <Grid container spacing={2}>
            {groupedEvents[selectedSchool].map((event, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {event.eventName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ marginTop: 1 }}
                    >
                      <strong>Description: </strong>
                      {event.aboutEvent}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Date:</strong> {event.eventDate} <br />
                      <strong>Time:</strong> {event.eventTime}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      //   size="small"
                      sx={{ marginBottom: 2 }}
                      onClick={() => handleViewMedia(event, "images")}
                    >
                      View Images
                    </Button>
                    <Button
                      variant="outlined"
                      //   size="small"
                      sx={{ marginBottom: 2 }}
                      onClick={() => handleViewMedia(event, "videos")}
                    >
                      View Videos
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {viewMode === "images" && selectedEvent && (
        <Box>
          <Typography variant="h6" mt={2} fontWeight="bold" gutterBottom>
            Images for {selectedEvent.eventName}
          </Typography>
          <Button
            variant="outlined"
            sx={{ marginBottom: 2 }}
            onClick={handleBackToEvents}
          >
            Back to Events
          </Button>
          {selectedEvent.photos && selectedEvent.photos.length > 0 ? (
            <Grid container spacing={2}>
              {selectedEvent.photos.map((photo, index) => (
                <Grid item xs={12} sm={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="250"
                      image={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No images available for this event.
            </Typography>
          )}
        </Box>
      )}

      {viewMode === "videos" && selectedEvent && (
        <Box>
          <Typography variant="h6" mt={2} fontWeight="bold" gutterBottom>
            Videos for {selectedEvent.eventName}
          </Typography>
          <Button
            variant="outlined"
            sx={{ marginBottom: 2 }}
            onClick={handleBackToEvents}
          >
            Back to Events
          </Button>
          {selectedEvent.videos && selectedEvent.videos.length > 0 ? (
            <Grid container spacing={2}>
              {selectedEvent.videos.map((video, index) => (
                <Grid item xs={12} sm={3} key={index}>
                  <Card>
                    <CardMedia
                      component="video"
                      controls
                      height="250"
                      src={URL.createObjectURL(video)}
                      alt={`Video ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No videos available for this event.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EventList;

// import React, { useState } from "react";
// import {
//   Typography,
//   Box,
//   Button,
//   Grid,
//   TextField,
//   Card,
//   CardMedia,
// } from "@mui/material";

// const EventList = ({ events }) => {
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [viewMode, setViewMode] = useState("schools");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Group events by school
//   const groupedEvents = events.reduce((acc, event) => {
//     acc[event.schoolName] = acc[event.schoolName] || [];
//     acc[event.schoolName].push(event);
//     return acc;
//   }, {});

//   // Filter schools based on search query
//   const filteredSchools = Object.keys(groupedEvents).filter((schoolName) =>
//     schoolName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleViewEvents = (schoolName) => {
//     setSelectedSchool(schoolName);
//     setViewMode("events");
//   };

//   const handleViewMedia = (event, type) => {
//     setSelectedEvent(event);
//     setViewMode(type); // "images" or "videos"
//   };

//   const handleBackToSchools = () => {
//     setSelectedSchool(null);
//     setSelectedEvent(null);
//     setViewMode("schools");
//   };

//   const handleBackToEvents = () => {
//     setSelectedEvent(null);
//     setViewMode("events");
//   };

//   return (
//     <Box>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 3,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold">
//           Events by School
//         </Typography>
//         <TextField
//           variant="outlined"
//           placeholder="Search by School Name"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           size="small"
//         />
//       </Box>

//       {viewMode === "schools" && (
//         <>
//           {filteredSchools.map((schoolName) => (
//             <Box key={schoolName} sx={{ marginBottom: 4 }}>
//               <Typography variant="h6" color="primary">
//                 {schoolName}
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleViewEvents(schoolName)}
//                 sx={{ marginTop: 1 }}
//               >
//                 View Events
//               </Button>
//             </Box>
//           ))}
//         </>
//       )}

//       {viewMode === "events" && selectedSchool && (
//         <Box>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Events for {selectedSchool}
//           </Typography>
//           <Button
//             variant="outlined"
//             sx={{ marginBottom: 2 }}
//             onClick={handleBackToSchools}
//           >
//             Back to Schools
//           </Button>
//           {groupedEvents[selectedSchool].map((event, index) => (
//             <Box key={index} sx={{ marginBottom: 3 }}>
//               <Typography variant="h6">{event.eventName}</Typography>
//               <Typography>Description: {event.aboutEvent}</Typography>
//               <Button
//                 variant="outlined"
//                 sx={{ marginRight: 1, marginTop: 1 }}
//                 onClick={() => handleViewMedia(event, "images")}
//               >
//                 View Images
//               </Button>
//               <Button
//                 variant="outlined"
//                 sx={{ marginTop: 1 }}
//                 onClick={() => handleViewMedia(event, "videos")}
//               >
//                 View Videos
//               </Button>
//             </Box>
//           ))}
//         </Box>
//       )}

//       {viewMode === "images" && selectedEvent && (
//         <Box>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Images for {selectedEvent.eventName}
//           </Typography>
//           <Button
//             variant="outlined"
//             sx={{ marginBottom: 2 }}
//             onClick={handleBackToEvents}
//           >
//             Back to Events
//           </Button>
//           <Grid container spacing={2}>
//             {selectedEvent.photos.map((photo, index) => (
//               <Grid item xs={12} sm={3} key={index}>
//                 <Card>
//                   <CardMedia
//                     component="img"
//                     height="250"
//                     image={URL.createObjectURL(photo)}
//                     alt={`Photo ${index + 1}`}
//                   />
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}

//       {viewMode === "videos" && selectedEvent && (
//         <Box>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Videos for {selectedEvent.eventName}
//           </Typography>
//           <Button
//             variant="outlined"
//             sx={{ marginBottom: 2 }}
//             onClick={handleBackToEvents}
//           >
//             Back to Events
//           </Button>
//           <Grid container spacing={2}>
//             {selectedEvent.videos.map((video, index) => (
//               <Grid item xs={12} sm={3} key={index}>
//                 <Card>
//                   <CardMedia
//                     component="video"
//                     controls
//                     height="250"
//                     src={URL.createObjectURL(video)}
//                     alt={`Video ${index + 1}`}
//                   />
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default EventList;
