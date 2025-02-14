import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

const recipientOptions = [
  { label: "Teachers", value: "Teachers" },
  { label: "Students", value: "Students" },
  { label: "Parents", value: "Parents" },
  { label: "Staff", value: "Staff" },
];

const DisplayNotification = ({ notifications }) => {
  const [filter, setFilter] = useState([]);
  const navigate = useNavigate();

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(typeof value === "string" ? value.split(",") : value);
  };

  const filteredNotification =
    filter.length === 0
      ? notifications
      : notifications.filter((notification) =>
          filter.some((recipient) =>
            notification.recipientTypes.includes(recipient)
          )
        );

  return (
    <Card
      sx={{
        padding: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          color="primary"
        >
          Notifications
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard")}
            sx={{ mb: 1 }}
          >
            Back To Home
          </Button>

          <TextField
            select
            label="Filter by Recipients"
            value={filter}
            size="small"
            onChange={handleFilterChange}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => selected.join(", "),
            }}
            sx={{ minWidth: "250px" }}
          >
            {recipientOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={filter.includes(option.value)} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <List sx={{ display: "inline-flex", gap: "8px" }}>
            <ListItem
              button
              component={Link}
              to="/send-notification"
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
              <SendIcon style={{ marginRight: "5px", fontSize: "16px" }} />
              <ListItemText
                primary="Send Notification"
                primaryTypographyProps={{
                  style: { fontSize: "12px", fontWeight: "bold" },
                }}
              />
            </ListItem>
          </List>
        </Box>

        <List sx={{ maxHeight: "100%", overflow: "auto" }}>
          {filteredNotification.length > 0 ? (
            filteredNotification.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    padding: "15px",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    "&:hover": { backgroundColor: "#f1f1f1" },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="secondary"
                      gutterBottom
                    >
                      Notification Title : {notification.notificationTitle}
                    </Typography>
                    <Typography variant="body1" color="textPrimary">
                      <strong>Notification Message : </strong>
                      {notification.notificationMessage}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>School Name : </strong>
                      {notification.schools.join(", ")}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      <strong>Recipients: </strong>
                      {notification.recipientTypes.join(", ") ||
                        "No Participients Available."}
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
              No notification available for the selected recipients.
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default DisplayNotification;

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
// import SendIcon from "@mui/icons-material/Send";

// const recipientOptions = [
//   { label: "Teachers", value: "Teachers" },
//   { label: "Students", value: "Students" },
//   { label: "Parents", value: "Parents" },
// ];

// const DisplayNotification = ({ notices }) => {
//   const [filter, setFilter] = useState([]);
//   const navigate = useNavigate(); // Initialize navigate hook

//   const handleFilterChange = (event) => {
//     const value = event.target.value;
//     setFilter(typeof value === "string" ? value.split(",") : value);
//   };

//   // Filter notices based on selected recipient types
//   const filteredNotices =
//     filter.length === 0
//       ? notices
//       : notices.filter((notice) =>
//           filter.some((recipient) => notice.recipientTypes.includes(recipient))
//         );

//   return (
//     <Card
//       sx={{
//         padding: "10px",
//         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//         borderRadius: "5px",
//       }}
//     >
//       <CardContent>
//         <Typography
//           variant="h5"
//           gutterBottom
//           textAlign="center"
//           fontWeight="bold"
//           color="primary"
//         >
//           Notifications
//         </Typography>

//         {/* Dropdown Filter */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             marginBottom: "20px",
//           }}
//         >
//           <TextField
//             select
//             label="Filter by Recipients"
//             value={filter}
//             size="small"
//             onChange={handleFilterChange}
//             SelectProps={{
//               multiple: true,
//               renderValue: (selected) => selected.join(", "),
//             }}
//             sx={{ minWidth: "250px" }}
//           >
//             {recipientOptions.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 <Checkbox checked={filter.includes(option.value)} />
//                 <ListItemText primary={option.label} />
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>
//         <Button
//           variant="outlined"
//           onClick={() => navigate("/dashboard")} // Go one step back in history
//           sx={{ mb: 1 }}
//         >
//           Back To Home
//         </Button>
//         <Divider />

//         <div style={{ display: "flex", justifyContent: "flex-start" }}>
//           <List sx={{ display: "inline-flex", gap: "8px" }}>
//             {/* Register School Button */}
//             <ListItem
//               button
//               component={Link}
//               to="/send-notification"
//               sx={{
//                 backgroundColor: "#d6d6d6",
//                 color: "#111",
//                 borderRadius: "20px", // Rounded buttons
//                 padding: "4px 12px", // Smaller size
//                 // minWidth: "120px", // Ensure consistent width
//                 justifyContent: "center",
//                 alignItems: "center",
//                 "&:hover": {
//                   backgroundColor: "#333",
//                   color: "#f5f5f5",
//                 },
//                 whiteSpace: "nowrap", // Prevent text wrapping
//               }}
//             >
//               <SendIcon style={{ marginRight: "5px", fontSize: "16px" }} />
//               <ListItemText
//                 primary="Send Notification"
//                 primaryTypographyProps={{
//                   style: { fontSize: "12px", fontWeight: "bold" },
//                 }}
//               />
//             </ListItem>
//           </List>
//         </div>

//         <List sx={{ maxHeight: "100%", overflow: "auto" }}>
//           {filteredNotices.length > 0 ? (
//             filteredNotices.map((notice) => (
//               <React.Fragment key={notice.id}>
//                 <ListItem
//                   alignItems="flex-start"
//                   sx={{
//                     padding: "15px",
//                     borderRadius: "8px",
//                     backgroundColor: "#f9f9f9",
//                     boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
//                     "&:hover": {
//                       backgroundColor: "#f1f1f1",
//                     },
//                   }}
//                 >
//                   <Box>
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       color="secondary"
//                       gutterBottom
//                     >
//                       {notice.noticeTitle}
//                     </Typography>
//                     <Typography
//                       variant="subtitle1"
//                       color="textSecondary"
//                       gutterBottom
//                     >
//                       Recipients: {notice.recipientTypes.join(", ")}
//                     </Typography>
//                     <Typography variant="body1" color="textPrimary">
//                       {notice.noticeMessage}
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
//               No notices available for the selected recipients.
//             </Typography>
//           )}
//         </List>
//       </CardContent>
//     </Card>
//   );
// };

// export default DisplayNotification;
