// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Checkbox,
//   Typography,
//   Autocomplete,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const recipientOptions = [
//   { label: "Teachers", value: "Teachers" },
//   { label: "Students", value: "Students" },
//   { label: "Parents", value: "Parents" },
// ];

// const SendNotification = ({ onSendNotification, schools }) => {
//   const navigate = useNavigate();

//   const [recipientTypes, setRecipientTypes] = useState([]);
//   const [selectedSchools, setSelectedSchools] = useState([]);
//   const [notificationTitle, setNotificationTitle] = useState("");
//   const [notificationMessage, setNotificationMessage] = useState("");

//   const handleSelectAllSchools = () => {
//     setSelectedSchools(schools);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // if (recipientTypes.length === 0 || selectedSchools.length === 0) {
//     //   toast.error("Please select at least one recipient type and one school!");
//     //   return;
//     // }

//     const newNotification = {
//       id: Date.now(),
//       recipientTypes: recipientTypes.map((r) => r.value),
//       schools: selectedSchools.map((s) => s.name),
//       notificationTitle,
//       notificationMessage,
//     };

//     onSendNotification(newNotification);
//     setNotificationTitle("");
//     setNotificationMessage("");
//     setRecipientTypes([]);
//     setSelectedSchools([]);
//     console.log("Notification : ", newNotification);
//     toast.success("Notification sent successfully!");
//   };

//   return (
//     <>
//       <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 1 }}>
//         Go Back
//       </Button>
//       <Grid container justifyContent="center" style={{ minHeight: "100vh" }}>
//         <Grid item xs={12} sm={8} md={6} lg={4}>
//           <Card sx={{ padding: "20px" }}>
//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               gutterBottom
//             >
//               Send Notification
//             </Typography>
//             <CardContent>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={1}>
//                   <Grid item xs={12}>
//                     <Autocomplete
//                       multiple
//                       options={recipientOptions}
//                       getOptionLabel={(option) => option.label}
//                       value={recipientTypes}
//                       onChange={(event, newValue) =>
//                         setRecipientTypes(newValue)
//                       }
//                       renderOption={(props, option, { selected }) => (
//                         <li {...props}>
//                           <Checkbox
//                             style={{ marginRight: 8 }}
//                             checked={selected}
//                           />
//                           {option.label}
//                         </li>
//                       )}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Recipient Types"
//                           placeholder="Select recipients"
//                         />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       size="small"
//                       onClick={handleSelectAllSchools}
//                       sx={{ mb: 1 }}
//                     >
//                       Select All Schools
//                     </Button>
//                     <Autocomplete
//                       multiple
//                       options={schools}
//                       getOptionLabel={(option) => option.name}
//                       value={selectedSchools}
//                       onChange={(event, newValue) =>
//                         setSelectedSchools(newValue)
//                       }
//                       renderOption={(props, option, { selected }) => (
//                         <li {...props}>
//                           <Checkbox
//                             style={{ marginRight: 8 }}
//                             checked={selected}
//                           />
//                           {option.name}
//                         </li>
//                       )}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Select Schools"
//                           placeholder="Choose schools"
//                         />
//                       )}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="Notification Title"
//                       value={notificationTitle}
//                       onChange={(e) => setNotificationTitle(e.target.value)}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       multiline
//                       rows={4}
//                       label="Notification Message"
//                       value={notificationMessage}
//                       onChange={(e) => setNotificationMessage(e.target.value)}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                       fullWidth
//                     >
//                       Send Notification
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </form>
//             </CardContent>
//           </Card>
//         </Grid>
//         <ToastContainer />
//       </Grid>
//     </>
//   );
// };

// export default SendNotification;

//=================================================================================================

// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Checkbox,
//   Typography,
//   Autocomplete,
//   Tabs,
//   Tab,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemButton,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const recipientOptions = [
//   { label: "Teachers", value: "Teachers" },
//   { label: "Students", value: "Students" },
//   { label: "Parents", value: "Parents" },
// ];

// // Predefined notification templates
// const notificationTemplates = [
//   {
//     id: 1,
//     title: "School Holiday Announcement",
//     message:
//       "Dear all, this is to inform you that the school will remain closed on [DATE] due to [REASON]. Regular classes will resume on [DATE].",
//     recipientTypes: ["Teachers", "Students", "Parents"],
//   },
//   {
//     id: 2,
//     title: "Parent-Teacher Meeting",
//     message:
//       "Dear parents, we are organizing a parent-teacher meeting on [DATE] at [TIME]. Your presence is highly appreciated.",
//     recipientTypes: ["Parents"],
//   },
//   {
//     id: 3,
//     title: "Exam Schedule Update",
//     message:
//       "Dear students, the upcoming examination schedule has been updated. Please check the attached schedule for your respective classes.",
//     recipientTypes: ["Students", "Teachers"],
//   },
// ];

// const TabPanel = ({ children, value, index }) => (
//   <div hidden={value !== index} role="tabpanel" id={`tabpanel-${index}`}>
//     {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//   </div>
// );

// const SendNotification = ({ onSendNotification, schools }) => {
//   const navigate = useNavigate();
//   const [currentTab, setCurrentTab] = useState(0);

//   const [recipientTypes, setRecipientTypes] = useState([]);
//   const [selectedSchools, setSelectedSchools] = useState([]);
//   const [notificationTitle, setNotificationTitle] = useState("");
//   const [notificationMessage, setNotificationMessage] = useState("");

//   const handleSelectAllSchools = () => {
//     setSelectedSchools(schools);
//   };

//   const handleTabChange = (event, newValue) => {
//     setCurrentTab(newValue);
//   };

//   const handleTemplateSelect = (template) => {
//     setNotificationTitle(template.title);
//     setNotificationMessage(template.message);
//     setRecipientTypes(
//       template.recipientTypes.map((type) =>
//         recipientOptions.find((option) => option.value === type)
//       )
//     );
//     setCurrentTab(0); // Switch back to form tab
//     toast.info(
//       "Template loaded! You can now customize and send the notification."
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (recipientTypes.length === 0 || selectedSchools.length === 0) {
//       toast.error("Please select at least one recipient type and one school!");
//       return;
//     }

//     const newNotification = {
//       id: Date.now(),
//       recipientTypes: recipientTypes.map((r) => r.value),
//       schools: selectedSchools.map((s) => s.name),
//       notificationTitle,
//       notificationMessage,
//     };

//     onSendNotification(newNotification);
//     setNotificationTitle("");
//     setNotificationMessage("");
//     setRecipientTypes([]);
//     setSelectedSchools([]);
//     toast.success("Notification sent successfully!");
//   };

//   const renderNotificationForm = () => (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={1}>
//         <Grid item xs={12}>
//           <Autocomplete
//             multiple
//             options={recipientOptions}
//             getOptionLabel={(option) => option.label}
//             value={recipientTypes}
//             onChange={(event, newValue) => setRecipientTypes(newValue)}
//             renderOption={(props, option, { selected }) => (
//               <li {...props}>
//                 <Checkbox style={{ marginRight: 8 }} checked={selected} />
//                 {option.label}
//               </li>
//             )}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Recipient Types"
//                 placeholder="Select recipients"
//               />
//             )}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Button
//             variant="outlined"
//             color="primary"
//             size="small"
//             onClick={handleSelectAllSchools}
//             sx={{ mb: 1 }}
//           >
//             Select All Schools
//           </Button>
//           <Autocomplete
//             multiple
//             options={schools}
//             getOptionLabel={(option) => option.name}
//             value={selectedSchools}
//             onChange={(event, newValue) => setSelectedSchools(newValue)}
//             renderOption={(props, option, { selected }) => (
//               <li {...props}>
//                 <Checkbox style={{ marginRight: 8 }} checked={selected} />
//                 {option.name}
//               </li>
//             )}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Select Schools"
//                 placeholder="Choose schools"
//               />
//             )}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Notification Title"
//             value={notificationTitle}
//             onChange={(e) => setNotificationTitle(e.target.value)}
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="Notification Message"
//             value={notificationMessage}
//             onChange={(e) => setNotificationMessage(e.target.value)}
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Send Notification
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );

//   const renderTemplates = () => (
//     <List>
//       {notificationTemplates.map((template) => (
//         <ListItem
//           key={template.id}
//           disablePadding
//           sx={{ border: "1px solid #e0e0e0", mb: 1, borderRadius: 1 }}
//         >
//           <ListItemButton onClick={() => handleTemplateSelect(template)}>
//             <ListItemText
//               primary={template.title}
//               secondary={
//                 <>
//                   <Typography
//                     component="span"
//                     variant="body2"
//                     color="text.primary"
//                     sx={{ display: "block" }}
//                   >
//                     Recipients: {template.recipientTypes.join(", ")}
//                   </Typography>
//                   <Typography
//                     component="span"
//                     variant="body2"
//                     color="text.secondary"
//                   >
//                     {template.message}
//                   </Typography>
//                 </>
//               }
//             />
//           </ListItemButton>
//         </ListItem>
//       ))}
//     </List>
//   );

//   return (
//     <>
//       <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 1 }}>
//         Go Back
//       </Button>
//       <Grid container justifyContent="center" style={{ minHeight: "100vh" }}>
//         <Grid item xs={12} sm={8} md={6} lg={4}>
//           <Card sx={{ padding: "20px" }}>
//             <Typography
//               variant="h5"
//               textAlign="center"
//               fontWeight="bold"
//               gutterBottom
//             >
//               Send Notification
//             </Typography>
//             <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
//               <Tabs value={currentTab} onChange={handleTabChange} centered>
//                 <Tab label="Create New" />
//                 <Tab label="Templates" />
//               </Tabs>
//             </Box>
//             <CardContent>
//               <TabPanel value={currentTab} index={0}>
//                 {renderNotificationForm()}
//               </TabPanel>
//               <TabPanel value={currentTab} index={1}>
//                 {renderTemplates()}
//               </TabPanel>
//             </CardContent>
//           </Card>
//         </Grid>
//         <ToastContainer />
//       </Grid>
//     </>
//   );
// };

// export default SendNotification;

//=====================================================================================================

// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Checkbox,
//   Typography,
//   Autocomplete,
//   Tabs,
//   Tab,
//   Box,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
// } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import {
//   EditNotifications,
//   Send,
//   ExpandMore,
//   ContentCopy,
// } from "@mui/icons-material";

// const recipientOptions = [
//   { label: "Teachers", value: "Teachers" },
//   { label: "Students", value: "Students" },
//   { label: "Parents", value: "Parents" },
//   { label: "Staff", value: "Staff" },
// ];

// // const notificationTemplates = [
// //   {
// //     id: 1,
// //     title: "School Holiday Announcement",
// //     message:
// //       "Dear all, this is to inform you that the school will remain closed on [DATE] due to [REASON]. Regular classes will resume on [DATE].",
// //     recipientTypes: ["Teachers", "Students", "Parents", "Staff"],
// //     category: "Administrative",
// //   },
// //   {
// //     id: 2,
// //     title: "Parent-Teacher Meeting",
// //     message:
// //       "Dear parents, we are organizing a parent-teacher meeting on [DATE] at [TIME]. Your presence is highly appreciated. Please confirm your attendance.",
// //     recipientTypes: ["Parents"],
// //     category: "Events",
// //   },
// //   {
// //     id: 3,
// //     title: "Exam Schedule Update",
// //     message:
// //       "Dear students, the upcoming examination schedule has been updated. Please check the attached schedule for your respective classes. For any queries, contact your class teacher.",
// //     recipientTypes: ["Students", "Teachers"],
// //     category: "Academic",
// //   },
// //   {
// //     id: 4,
// //     title: "Sports Day Announcement",
// //     message:
// //       "We are excited to announce our Annual Sports Day on [DATE]. All students are encouraged to participate. Registration for various events starts from [DATE].",
// //     recipientTypes: ["Students", "Teachers", "Parents"],
// //     category: "Events",
// //   },
// //   {
// //     id: 5,
// //     title: "Fee Payment Reminder",
// //     message:
// //       "This is a gentle reminder that the last date for payment of [TERM] term fees is approaching. Please ensure timely payment to avoid late fees.",
// //     recipientTypes: ["Parents"],
// //     category: "Administrative",
// //   },
// //   {
// //     id: 6,
// //     title: "Staff Meeting Notice",
// //     message:
// //       "All teaching and non-teaching staff are required to attend a general meeting on [DATE] at [TIME] in the conference room.",
// //     recipientTypes: ["Teachers", "Staff"],
// //     category: "Administrative",
// //   },
// //   {
// //     id: 7,
// //     title: "Cultural Event Information",
// //     message:
// //       "Our school's annual cultural fest is scheduled for [DATE]. Students interested in participating should register with their class teachers by [DATE].",
// //     recipientTypes: ["Students", "Teachers", "Parents"],
// //     category: "Events",
// //   },
// //   {
// //     id: 8,
// //     title: "School Infrastructure Update",
// //     message:
// //       "We are pleased to inform you that the new computer lab will be operational from [DATE]. A proper schedule for each class will be shared soon.",
// //     recipientTypes: ["Teachers", "Students", "Parents"],
// //     category: "Administrative",
// //   },
// //   {
// //     id: 9,
// //     title: "Health and Safety Notice",
// //     message:
// //       "In light of recent health concerns, we are implementing additional safety measures. All students and staff must follow the updated guidelines attached.",
// //     recipientTypes: ["Teachers", "Students", "Parents", "Staff"],
// //     category: "Administrative",
// //   },
// //   {
// //     id: 10,
// //     title: "Academic Achievement Recognition",
// //     message:
// //       "We are proud to announce that our school has achieved [ACHIEVEMENT]. We thank all teachers, students, and parents for their continuous support.",
// //     recipientTypes: ["Teachers", "Students", "Parents", "Staff"],
// //     category: "Academic",
// //   },
// // ];

// const notificationTemplates = [
//   // Administrative Templates
//   {
//     id: 1,
//     title: "School Holiday Announcement",
//     message:
//       "Dear all, this is to inform you that the school will remain closed on [DATE] due to [REASON]. Regular classes will resume on [DATE].",
//     recipientTypes: ["Teachers", "Students", "Parents", "Staff"],
//     category: "Administrative",
//   },
//   {
//     id: 2,
//     title: "Fee Payment Reminder",
//     message:
//       "This is a gentle reminder that the last date for payment of [TERM] term fees is approaching. Please ensure timely payment to avoid late fees.",
//     recipientTypes: ["Parents"],
//     category: "Administrative",
//   },
//   {
//     id: 3,
//     title: "Staff Meeting Notice",
//     message:
//       "All teaching and non-teaching staff are required to attend a general meeting on [DATE] at [TIME] in the conference room.",
//     recipientTypes: ["Teachers", "Staff"],
//     category: "Administrative",
//   },
//   {
//     id: 4,
//     title: "School Infrastructure Update",
//     message:
//       "We are pleased to inform you that the new computer lab will be operational from [DATE]. A proper schedule for each class will be shared soon.",
//     recipientTypes: ["Teachers", "Students", "Parents"],
//     category: "Administrative",
//   },
//   {
//     id: 5,
//     title: "Health and Safety Notice",
//     message:
//       "In light of recent health concerns, we are implementing additional safety measures. All students and staff must follow the updated guidelines attached.",
//     recipientTypes: ["Teachers", "Students", "Parents", "Staff"],
//     category: "Administrative",
//   },
//   {
//     id: 6,
//     title: "Transportation Schedule Change",
//     message:
//       "Please note that school bus timings will be modified from [DATE]. New pickup and drop-off schedule is attached.",
//     recipientTypes: ["Parents", "Students", "Staff"],
//     category: "Administrative",
//   },

//   // Academic Templates
//   {
//     id: 7,
//     title: "Exam Schedule Update",
//     message:
//       "Dear students, the upcoming examination schedule has been updated. Please check the attached schedule for your respective classes. For any queries, contact your class teacher.",
//     recipientTypes: ["Students", "Teachers"],
//     category: "Academic",
//   },
//   {
//     id: 8,
//     title: "Academic Achievement Recognition",
//     message:
//       "We are proud to announce that our school has achieved [ACHIEVEMENT]. We thank all teachers, students, and parents for their continuous support.",
//     recipientTypes: ["Teachers", "Students", "Parents", "Staff"],
//     category: "Academic",
//   },
//   {
//     id: 9,
//     title: "Report Card Distribution",
//     message:
//       "Report cards for [TERM] will be distributed on [DATE]. Parents are requested to acknowledge receipt through the school portal.",
//     recipientTypes: ["Parents", "Students"],
//     category: "Academic",
//   },
//   {
//     id: 10,
//     title: "Academic Competition Announcement",
//     message:
//       "We are organizing [COMPETITION_NAME] on [DATE]. Interested students should register with their subject teachers by [DEADLINE].",
//     recipientTypes: ["Students", "Teachers"],
//     category: "Academic",
//   },
//   {
//     id: 11,
//     title: "Study Material Update",
//     message:
//       "New study materials for [SUBJECT] have been uploaded to the school portal. Students can access them using their login credentials.",
//     recipientTypes: ["Students", "Parents"],
//     category: "Academic",
//   },

//   // Events Templates
//   {
//     id: 12,
//     title: "Parent-Teacher Meeting",
//     message:
//       "Dear parents, we are organizing a parent-teacher meeting on [DATE] at [TIME]. Your presence is highly appreciated. Please confirm your attendance.",
//     recipientTypes: ["Parents"],
//     category: "Events",
//   },
//   {
//     id: 13,
//     title: "Sports Day Announcement",
//     message:
//       "We are excited to announce our Annual Sports Day on [DATE]. All students are encouraged to participate. Registration for various events starts from [DATE].",
//     recipientTypes: ["Students", "Teachers", "Parents"],
//     category: "Events",
//   },
//   {
//     id: 14,
//     title: "Cultural Event Information",
//     message:
//       "Our school's annual cultural fest is scheduled for [DATE]. Students interested in participating should register with their class teachers by [DATE].",
//     recipientTypes: ["Students", "Teachers", "Parents"],
//     category: "Events",
//   },
//   {
//     id: 15,
//     title: "Annual Day Celebration",
//     message:
//       "Join us for our Annual Day celebration on [DATE] at [VENUE]. Details about performances and schedule are attached.",
//     recipientTypes: ["Parents", "Students", "Teachers", "Staff"],
//     category: "Events",
//   },

//   // Extra-Curricular Templates
//   {
//     id: 16,
//     title: "Sports Team Selection",
//     message:
//       "Trials for school [SPORT] team will be held on [DATE]. Interested students from grades [GRADES] can participate.",
//     recipientTypes: ["Students", "Teachers"],
//     category: "Extra-Curricular",
//   },
//   {
//     id: 17,
//     title: "Club Activities Update",
//     message:
//       "New activities for [CLUB_NAME] have been scheduled. Members are requested to check the updated schedule on the notice board.",
//     recipientTypes: ["Students", "Teachers"],
//     category: "Extra-Curricular",
//   },
//   {
//     id: 18,
//     title: "Inter-School Competition",
//     message:
//       "Selected students will represent our school in [COMPETITION_NAME] at [VENUE] on [DATE]. Parent consent forms will be distributed shortly.",
//     recipientTypes: ["Parents", "Students"],
//     category: "Extra-Curricular",
//   },

//   // Emergency Notifications
//   {
//     id: 19,
//     title: "Weather Emergency Alert",
//     message:
//       "Due to severe weather conditions, school will [ACTION] on [DATE]. Updates will be sent through SMS and email.",
//     recipientTypes: ["Parents", "Students", "Teachers", "Staff"],
//     category: "Emergency",
//   },
//   {
//     id: 20,
//     title: "Security Alert",
//     message:
//       "Important security update: [DETAILS]. Please follow the prescribed safety protocols until further notice.",
//     recipientTypes: ["Teachers", "Staff"],
//     category: "Emergency",
//   },
//   {
//     id: 21,
//     title: "Medical Emergency Protocol",
//     message:
//       "Updated medical emergency protocols are now in effect. All staff members must review the attached guidelines.",
//     recipientTypes: ["Teachers", "Staff"],
//     category: "Emergency",
//   },

//   // Facility Updates
//   {
//     id: 22,
//     title: "Library Update",
//     message:
//       "The school library will be closed for inventory from [START_DATE] to [END_DATE]. Please return all books before [DEADLINE].",
//     recipientTypes: ["Students", "Teachers"],
//     category: "Facility",
//   },
//   {
//     id: 23,
//     title: "Maintenance Notice",
//     message:
//       "The [FACILITY_NAME] will be under maintenance on [DATE] from [START_TIME] to [END_TIME]. Please plan accordingly.",
//     recipientTypes: ["Teachers", "Staff", "Students"],
//     category: "Facility",
//   },
//   {
//     id: 24,
//     title: "New Facility Announcement",
//     message:
//       "We are pleased to announce the opening of our new [FACILITY_NAME]. Students can start using it from [DATE].",
//     recipientTypes: ["Students", "Parents", "Teachers"],
//     category: "Facility",
//   },

//   // Career Guidance
//   {
//     id: 25,
//     title: "Career Counseling Session",
//     message:
//       "A career counseling session with [COUNSELOR_NAME] is scheduled for grade [GRADE] students on [DATE].",
//     recipientTypes: ["Students", "Parents"],
//     category: "Career Guidance",
//   },
//   {
//     id: 26,
//     title: "College Fair",
//     message:
//       "Annual college fair will be held on [DATE]. Representatives from [NUMBER] universities will be present to guide students.",
//     recipientTypes: ["Students", "Parents"],
//     category: "Career Guidance",
//   },
//   {
//     id: 27,
//     title: "Internship Opportunity",
//     message:
//       "New internship opportunity available for senior students at [COMPANY]. Interested students should submit applications by [DEADLINE].",
//     recipientTypes: ["Students"],
//     category: "Career Guidance",
//   },
// ];

// const TabPanel = ({ children, value, index }) => (
//   <div hidden={value !== index} role="tabpanel" id={`tabpanel-${index}`}>
//     {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//   </div>
// );

// const SendNotification = ({ onSendNotification, schools }) => {
//   const navigate = useNavigate();
//   const [currentTab, setCurrentTab] = useState(0);
//   const [recipientTypes, setRecipientTypes] = useState([]);
//   const [selectedSchools, setSelectedSchools] = useState([]);
//   const [notificationTitle, setNotificationTitle] = useState("");
//   const [notificationMessage, setNotificationMessage] = useState("");

//   // Group templates by category
//   const templatesByCategory = notificationTemplates.reduce((acc, template) => {
//     if (!acc[template.category]) {
//       acc[template.category] = [];
//     }
//     acc[template.category].push(template);
//     return acc;
//   }, {});

//   const handleCopyMessage = (message) => {
//     navigator.clipboard.writeText(message);
//     toast.success("Message copied to clipboard!");
//   };

//   const handleSelectAllSchools = () => {
//     setSelectedSchools(schools);
//   };

//   const handleTabChange = (event, newValue) => {
//     setCurrentTab(newValue);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // if (recipientTypes.length === 0 || selectedSchools.length === 0) {
//     //   toast.error("Please select at least one recipient type and one school!");
//     //   return;
//     // }

//     const newNotification = {
//       id: Date.now(),
//       recipientTypes: recipientTypes.map((r) => r.value),
//       schools: selectedSchools.map((s) => s.name),
//       notificationTitle,
//       notificationMessage,
//     };

//     onSendNotification(newNotification);
//     setNotificationTitle("");
//     setNotificationMessage("");
//     setRecipientTypes([]);
//     setSelectedSchools([]);
//     toast.success("Notification sent successfully!");
//   };

//   const renderNotificationForm = () => (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={1}>
//         <Grid item xs={12}>
//           <Autocomplete
//             multiple
//             options={recipientOptions}
//             getOptionLabel={(option) => option.label}
//             value={recipientTypes}
//             onChange={(event, newValue) => setRecipientTypes(newValue)}
//             renderOption={(props, option, { selected }) => (
//               <li {...props}>
//                 <Checkbox style={{ marginRight: 8 }} checked={selected} />
//                 {option.label}
//               </li>
//             )}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Recipient Types"
//                 placeholder="Select recipients"
//               />
//             )}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Button
//             variant="outlined"
//             color="primary"
//             size="small"
//             onClick={handleSelectAllSchools}
//             sx={{ mb: 1 }}
//           >
//             Select All Schools
//           </Button>
//           <Autocomplete
//             multiple
//             options={schools}
//             getOptionLabel={(option) => option.name}
//             value={selectedSchools}
//             onChange={(event, newValue) => setSelectedSchools(newValue)}
//             renderOption={(props, option, { selected }) => (
//               <li {...props}>
//                 <Checkbox style={{ marginRight: 8 }} checked={selected} />
//                 {option.name}
//               </li>
//             )}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Select Schools"
//                 placeholder="Choose schools"
//               />
//             )}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Notification Title"
//             value={notificationTitle}
//             onChange={(e) => setNotificationTitle(e.target.value)}
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="Notification Message"
//             value={notificationMessage}
//             onChange={(e) => setNotificationMessage(e.target.value)}
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Send Notification
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );

//   const renderTemplates = () => (
//     <Box sx={{ width: "100%" }}>
//       {Object.entries(templatesByCategory).map(([category, templates]) => (
//         <Accordion key={category} sx={{ mb: 1 }}>
//           <AccordionSummary
//             expandIcon={<ExpandMore />}
//             sx={{ backgroundColor: "#f8f8f8" }}
//           >
//             <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//               {category} ({templates.length})
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             {templates.map((template) => (
//               <Box
//                 key={template.id}
//                 sx={{
//                   border: "1px solid #e0e0e0",
//                   borderRadius: 1,
//                   mb: 2,
//                   p: 2,
//                   backgroundColor: "white",
//                   "&:last-child": {
//                     mb: 0,
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "flex-start",
//                     mb: 1,
//                   }}
//                 >
//                   <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                     {template.title}
//                   </Typography>
//                   <IconButton
//                     size="small"
//                     onClick={() => handleCopyMessage(template.message)}
//                     title="Copy message"
//                   >
//                     <ContentCopy fontSize="small" />
//                   </IconButton>
//                 </Box>
//                 <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
//                   Recipients: {template.recipientTypes.join(", ")}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {template.message}
//                 </Typography>
//               </Box>
//             ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </Box>
//   );

//   return (
//     <>
//       <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 1 }}>
//         Go Back
//       </Button>
//       <Grid container justifyContent="center">
//         <Grid item xs={12} sm={8} md={6} lg={8}>
//           <Card sx={{ padding: "5px" }}>
//             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//               <Tabs value={currentTab} onChange={handleTabChange}>
//                 <Tab
//                   icon={<Send />}
//                   iconPosition="start"
//                   label="Bulk Notification"
//                 />
//                 <Tab
//                   icon={<EditNotifications />}
//                   iconPosition="start"
//                   label="Notification Templates"
//                 />
//               </Tabs>
//             </Box>
//             <CardContent>
//               <TabPanel value={currentTab} index={0}>
//                 {renderNotificationForm()}
//               </TabPanel>
//               <TabPanel value={currentTab} index={1}>
//                 {renderTemplates()}
//               </TabPanel>
//             </CardContent>
//           </Card>
//         </Grid>
//         <ToastContainer />
//       </Grid>
//     </>
//   );
// };

// export default SendNotification;

import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  Typography,
  Autocomplete,
  Tabs,
  Tab,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { EditNotifications, Send, ExpandMore } from "@mui/icons-material";

const recipientOptions = [
  { label: "Teachers", value: "Teachers" },
  { label: "Students", value: "Students" },
  { label: "Parents", value: "Parents" },
  { label: "Staff", value: "Staff" },
];

// Your existing notificationTemplates array remains the same
const notificationTemplates = [
  // Administrative Templates
  {
    id: 1,
    title: "School Holiday Announcement",
    message:
      "Dear all, this is to inform you that the school will remain closed on [DATE] due to [REASON]. Regular classes will resume on [DATE].",
    recipientTypes: ["Teachers", "Students", "Parents", "Staff"],
    category: "Administrative",
  },
  {
    id: 2,
    title: "Fee Payment Reminder",
    message:
      "This is a gentle reminder that the last date for payment of [TERM] term fees is approaching. Please ensure timely payment to avoid late fees.",
    recipientTypes: ["Parents"],
    category: "Administrative",
  },
  {
    id: 3,
    title: "Staff Meeting Notice",
    message:
      "All teaching and non-teaching staff are required to attend a general meeting on [DATE] at [TIME] in the conference room.",
    recipientTypes: ["Teachers", "Staff"],
    category: "Administrative",
  },
  {
    id: 4,
    title: "School Infrastructure Update",
    message:
      "We are pleased to inform you that the new computer lab will be operational from [DATE]. A proper schedule for each class will be shared soon.",
    recipientTypes: ["Teachers", "Students", "Parents"],
    category: "Administrative",
  },
  {
    id: 5,
    title: "Health and Safety Notice",
    message:
      "In light of recent health concerns, we are implementing additional safety measures. All students and staff must follow the updated guidelines attached.",
    recipientTypes: ["Teachers", "Students", "Parents", "Staff"],
    category: "Administrative",
  },
  {
    id: 6,
    title: "Transportation Schedule Change",
    message:
      "Please note that school bus timings will be modified from [DATE]. New pickup and drop-off schedule is attached.",
    recipientTypes: ["Parents", "Students", "Staff"],
    category: "Administrative",
  },

  // Academic Templates
  {
    id: 7,
    title: "Exam Schedule Update",
    message:
      "Dear students, the upcoming examination schedule has been updated. Please check the attached schedule for your respective classes. For any queries, contact your class teacher.",
    recipientTypes: ["Students", "Teachers"],
    category: "Academic",
  },
  {
    id: 8,
    title: "Academic Achievement Recognition",
    message:
      "We are proud to announce that our school has achieved [ACHIEVEMENT]. We thank all teachers, students, and parents for their continuous support.",
    recipientTypes: ["Teachers", "Students", "Parents", "Staff"],
    category: "Academic",
  },
  {
    id: 9,
    title: "Report Card Distribution",
    message:
      "Report cards for [TERM] will be distributed on [DATE]. Parents are requested to acknowledge receipt through the school portal.",
    recipientTypes: ["Parents", "Students"],
    category: "Academic",
  },
  {
    id: 10,
    title: "Academic Competition Announcement",
    message:
      "We are organizing [COMPETITION_NAME] on [DATE]. Interested students should register with their subject teachers by [DEADLINE].",
    recipientTypes: ["Students", "Teachers"],
    category: "Academic",
  },
  {
    id: 11,
    title: "Study Material Update",
    message:
      "New study materials for [SUBJECT] have been uploaded to the school portal. Students can access them using their login credentials.",
    recipientTypes: ["Students", "Parents"],
    category: "Academic",
  },

  // Events Templates
  {
    id: 12,
    title: "Parent-Teacher Meeting",
    message:
      "Dear parents, we are organizing a parent-teacher meeting on [DATE] at [TIME]. Your presence is highly appreciated. Please confirm your attendance.",
    recipientTypes: ["Parents"],
    category: "Events",
  },
  {
    id: 13,
    title: "Sports Day Announcement",
    message:
      "We are excited to announce our Annual Sports Day on [DATE]. All students are encouraged to participate. Registration for various events starts from [DATE].",
    recipientTypes: ["Students", "Teachers", "Parents"],
    category: "Events",
  },
  {
    id: 14,
    title: "Cultural Event Information",
    message:
      "Our school's annual cultural fest is scheduled for [DATE]. Students interested in participating should register with their class teachers by [DATE].",
    recipientTypes: ["Students", "Teachers", "Parents"],
    category: "Events",
  },
  {
    id: 15,
    title: "Annual Day Celebration",
    message:
      "Join us for our Annual Day celebration on [DATE] at [VENUE]. Details about performances and schedule are attached.",
    recipientTypes: ["Parents", "Students", "Teachers", "Staff"],
    category: "Events",
  },

  // Extra-Curricular Templates
  {
    id: 16,
    title: "Sports Team Selection",
    message:
      "Trials for school [SPORT] team will be held on [DATE]. Interested students from grades [GRADES] can participate.",
    recipientTypes: ["Students", "Teachers"],
    category: "Extra-Curricular",
  },
  {
    id: 17,
    title: "Club Activities Update",
    message:
      "New activities for [CLUB_NAME] have been scheduled. Members are requested to check the updated schedule on the notice board.",
    recipientTypes: ["Students", "Teachers"],
    category: "Extra-Curricular",
  },
  {
    id: 18,
    title: "Inter-School Competition",
    message:
      "Selected students will represent our school in [COMPETITION_NAME] at [VENUE] on [DATE]. Parent consent forms will be distributed shortly.",
    recipientTypes: ["Parents", "Students"],
    category: "Extra-Curricular",
  },

  // Emergency Notifications
  {
    id: 19,
    title: "Weather Emergency Alert",
    message:
      "Due to severe weather conditions, school will [ACTION] on [DATE]. Updates will be sent through SMS and email.",
    recipientTypes: ["Parents", "Students", "Teachers", "Staff"],
    category: "Emergency",
  },
  {
    id: 20,
    title: "Security Alert",
    message:
      "Important security update: [DETAILS]. Please follow the prescribed safety protocols until further notice.",
    recipientTypes: ["Teachers", "Staff"],
    category: "Emergency",
  },
  {
    id: 21,
    title: "Medical Emergency Protocol",
    message:
      "Updated medical emergency protocols are now in effect. All staff members must review the attached guidelines.",
    recipientTypes: ["Teachers", "Staff"],
    category: "Emergency",
  },

  // Facility Updates
  {
    id: 22,
    title: "Library Update",
    message:
      "The school library will be closed for inventory from [START_DATE] to [END_DATE]. Please return all books before [DEADLINE].",
    recipientTypes: ["Students", "Teachers"],
    category: "Facility",
  },
  {
    id: 23,
    title: "Maintenance Notice",
    message:
      "The [FACILITY_NAME] will be under maintenance on [DATE] from [START_TIME] to [END_TIME]. Please plan accordingly.",
    recipientTypes: ["Teachers", "Staff", "Students"],
    category: "Facility",
  },
  {
    id: 24,
    title: "New Facility Announcement",
    message:
      "We are pleased to announce the opening of our new [FACILITY_NAME]. Students can start using it from [DATE].",
    recipientTypes: ["Students", "Parents", "Teachers"],
    category: "Facility",
  },

  // Career Guidance
  {
    id: 25,
    title: "Career Counseling Session",
    message:
      "A career counseling session with [COUNSELOR_NAME] is scheduled for grade [GRADE] students on [DATE].",
    recipientTypes: ["Students", "Parents"],
    category: "Career Guidance",
  },
  {
    id: 26,
    title: "College Fair",
    message:
      "Annual college fair will be held on [DATE]. Representatives from [NUMBER] universities will be present to guide students.",
    recipientTypes: ["Students", "Parents"],
    category: "Career Guidance",
  },
  {
    id: 27,
    title: "Internship Opportunity",
    message:
      "New internship opportunity available for senior students at [COMPANY]. Interested students should submit applications by [DEADLINE].",
    recipientTypes: ["Students"],
    category: "Career Guidance",
  },
];

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} role="tabpanel" id={`tabpanel-${index}`}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const SendNotification = ({ onSendNotification, schools }) => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [recipientTypes, setRecipientTypes] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Group templates by category
  const templatesByCategory = notificationTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {});

  const handleTemplateSelect = (template) => {
    // Convert template recipient types to match Autocomplete format
    const selectedRecipients = template.recipientTypes
      .map((type) => recipientOptions.find((option) => option.value === type))
      .filter(Boolean);

    setNotificationTitle(template.title);
    setNotificationMessage(template.message);
    setRecipientTypes(selectedRecipients);
    setCurrentTab(0); // Switch to form tab
    toast.info(
      "Template loaded! You can now customize and send the notification."
    );
  };

  const handleSelectAllSchools = () => {
    setSelectedSchools(schools);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (recipientTypes.length === 0 || selectedSchools.length === 0) {
      toast.error("Please select at least one recipient type and one school!");
      return;
    }

    const newNotification = {
      id: Date.now(),
      recipientTypes: recipientTypes.map((r) => r.value),
      schools: selectedSchools.map((s) => s.name),
      notificationTitle,
      notificationMessage,
    };

    onSendNotification(newNotification);
    setNotificationTitle("");
    setNotificationMessage("");
    setRecipientTypes([]);
    setSelectedSchools([]);
    toast.success("Notification sent successfully!");
  };

  const renderNotificationForm = () => (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={recipientOptions}
            getOptionLabel={(option) => option.label}
            value={recipientTypes}
            onChange={(event, newValue) => setRecipientTypes(newValue)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Recipient Types"
                placeholder="Select recipients"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleSelectAllSchools}
            sx={{ mb: 1 }}
          >
            Select All Schools
          </Button>
          <Autocomplete
            multiple
            options={schools}
            getOptionLabel={(option) => option.name}
            value={selectedSchools}
            onChange={(event, newValue) => setSelectedSchools(newValue)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox style={{ marginRight: 8 }} checked={selected} />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Schools"
                placeholder="Choose schools"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notification Title"
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Notification Message"
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Notification
          </Button>
        </Grid>
      </Grid>
    </form>
  );

  const renderTemplates = () => (
    <Box sx={{ width: "100%" }}>
      {Object.entries(templatesByCategory).map(([category, templates]) => (
        <Accordion key={category} sx={{ mb: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{ backgroundColor: "#f8f8f8" }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {category} ({templates.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {templates.map((template) => (
              <Box
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  mb: 2,
                  p: 2,
                  backgroundColor: "white",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                  "&:last-child": {
                    mb: 0,
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {template.title}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  Recipients: {template.recipientTypes.join(", ")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {template.message}
                </Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );

  return (
    <>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 1 }}>
        Go Back
      </Button>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={8}>
          <Card sx={{ padding: "5px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab
                  icon={<Send />}
                  iconPosition="start"
                  label="Bulk Notification"
                />
                <Tab
                  icon={<EditNotifications />}
                  iconPosition="start"
                  label="Notification Templates"
                />
              </Tabs>
            </Box>
            <CardContent>
              <TabPanel value={currentTab} index={0}>
                {renderNotificationForm()}
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                {renderTemplates()}
              </TabPanel>
            </CardContent>
          </Card>
        </Grid>
        <ToastContainer />
      </Grid>
    </>
  );
};

export default SendNotification;
