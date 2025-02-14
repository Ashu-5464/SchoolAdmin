// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   Divider,
//   Stack,
//   Paper,
// } from "@mui/material";
// import {
//   Send,
//   History,
//   Close,
//   Email,
//   LocationOn,
//   Person,
//   Phone,
//   Description,
//   Schedule,
//   LineWeight,
//   Add,
// } from "@mui/icons-material";

// const SoftwareAppEnquiry = () => {
//   // State for enquiry form dialog
//   const [openEnquiryDialog, setOpenEnquiryDialog] = useState(false);
//   const [enquiryForm, setEnquiryForm] = useState({
//     schoolName: "",
//     schoolAddress: "",
//     contactPersonName: "",
//     emailId: "",
//     contactNumber: "",
//     enquiryDescription: "",
//   });

//   // State for message dialog
//   const [openMessageDialog, setOpenMessageDialog] = useState(false);
//   const [selectedEnquiry, setSelectedEnquiry] = useState(null);
//   const [messageForm, setMessageForm] = useState({
//     basicPackages: "",
//     projectDescription: "",
//   });

//   // State for history dialog
//   const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
//   const [selectedHistory, setSelectedHistory] = useState(null);

//   // Mock data for enquiries (replace with actual data management)
//   const [enquiries, setEnquiries] = useState([]);
//   const [enquiryHistory, setEnquiryHistory] = useState({});

//   // Handle enquiry form input changes
//   const handleEnquiryInputChange = (e) => {
//     const { name, value } = e.target;
//     setEnquiryForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle message form input changes
//   const handleMessageInputChange = (e) => {
//     const { name, value } = e.target;
//     setMessageForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Submit enquiry form
//   const handleEnquirySubmit = () => {
//     const newEnquiry = {
//       id: Date.now(),
//       ...enquiryForm,
//       date: new Date().toLocaleDateString(),
//       status: "Pending",
//     };
//     setEnquiries((prev) => [...prev, newEnquiry]);
//     setEnquiryHistory((prev) => ({
//       ...prev,
//       [newEnquiry.id]: [],
//     }));
//     setEnquiryForm({
//       schoolName: "",
//       schoolAddress: "",
//       contactPersonName: "",
//       emailId: "",
//       contactNumber: "",
//       enquiryDescription: "",
//     });
//     setOpenEnquiryDialog(false);
//   };

//   // Submit message form
//   const handleMessageSubmit = () => {
//     const newMessage = {
//       id: Date.now(),
//       ...messageForm,
//       date: new Date().toLocaleDateString(),
//     };
//     setEnquiryHistory((prev) => ({
//       ...prev,
//       [selectedEnquiry.id]: [...(prev[selectedEnquiry.id] || []), newMessage],
//     }));
//     setMessageForm({
//       basicPackages: "",
//       projectDescription: "",
//     });
//     setOpenMessageDialog(false);
//   };

//   // Open message dialog for specific enquiry
//   const handleOpenMessageDialog = (enquiry) => {
//     setSelectedEnquiry(enquiry);
//     setOpenMessageDialog(true);
//   };

//   // Open history dialog for specific enquiry
//   const handleOpenHistoryDialog = (enquiry) => {
//     setSelectedHistory(enquiry);
//     setOpenHistoryDialog(true);
//   };

//   // Render enquiry form dialog
//   const renderEnquiryDialog = () => (
//     <Dialog
//       open={openEnquiryDialog}
//       onClose={() => setOpenEnquiryDialog(false)}
//       maxWidth="sm"
//       fullWidth
//     >
//       <DialogTitle>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">New Software Enquiry</Typography>
//           <IconButton onClick={() => setOpenEnquiryDialog(false)}>
//             <Close />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers>
//         <Stack spacing={2}>
//           <TextField
//             fullWidth
//             label="School Name"
//             name="schoolName"
//             value={enquiryForm.schoolName}
//             onChange={handleEnquiryInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="School Address"
//             name="schoolAddress"
//             value={enquiryForm.schoolAddress}
//             onChange={handleEnquiryInputChange}
//             multiline
//             rows={2}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Contact Person Name"
//             name="contactPersonName"
//             value={enquiryForm.contactPersonName}
//             onChange={handleEnquiryInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Email ID"
//             name="emailId"
//             type="email"
//             value={enquiryForm.emailId}
//             onChange={handleEnquiryInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Contact Number"
//             name="contactNumber"
//             value={enquiryForm.contactNumber}
//             onChange={handleEnquiryInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Enquiry Description"
//             name="enquiryDescription"
//             value={enquiryForm.enquiryDescription}
//             onChange={handleEnquiryInputChange}
//             multiline
//             rows={3}
//             required
//           />
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpenEnquiryDialog(false)}>Cancel</Button>
//         <Button
//           onClick={handleEnquirySubmit}
//           variant="contained"
//           color="primary"
//         >
//           Submit Enquiry
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   // Render message dialog
//   const renderMessageDialog = () => (
//     <Dialog
//       open={openMessageDialog}
//       onClose={() => setOpenMessageDialog(false)}
//       maxWidth="sm"
//       fullWidth
//     >
//       <DialogTitle>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">Send Message</Typography>
//           <IconButton onClick={() => setOpenMessageDialog(false)}>
//             <Close />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers>
//         <Stack spacing={2}>
//           <TextField
//             fullWidth
//             label="Basic Packages"
//             name="basicPackages"
//             value={messageForm.basicPackages}
//             onChange={handleMessageInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Project Description"
//             name="projectDescription"
//             value={messageForm.projectDescription}
//             onChange={handleMessageInputChange}
//             multiline
//             rows={3}
//             required
//           />
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpenMessageDialog(false)}>Cancel</Button>
//         <Button
//           onClick={handleMessageSubmit}
//           variant="contained"
//           color="primary"
//         >
//           Send Message
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   // Render history dialog
//   const renderHistoryDialog = () => (
//     <Dialog
//       open={openHistoryDialog}
//       onClose={() => setOpenHistoryDialog(false)}
//       maxWidth="md"
//       fullWidth
//     >
//       <DialogTitle>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">Enquiry History</Typography>
//           <IconButton onClick={() => setOpenHistoryDialog(false)}>
//             <Close />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers>
//         {selectedHistory && (
//           <>
//             <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: "#f5f5f5" }}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Original Enquiry
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography>
//                     <Person sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                     {selectedHistory.contactPerson}
//                   </Typography>
//                   <Typography>
//                     <Email sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                     {selectedHistory.emailId}
//                   </Typography>
//                   <Typography>
//                     <Phone sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                     {selectedHistory.contactNumber}
//                   </Typography>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography>
//                     <LocationOn sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                     {selectedHistory.schoolAddress}
//                   </Typography>
//                   <Typography>
//                     <Description sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                     {selectedHistory.enquiryDescription}
//                   </Typography>
//                   <Typography>
//                     <Schedule sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                     {selectedHistory.date}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Paper>
//             <Typography variant="subtitle1" gutterBottom>
//               Message History
//             </Typography>
//             <List>
//               {enquiryHistory[selectedHistory.id]?.map((message, index) => (
//                 <React.Fragment key={message.id}>
//                   <ListItem>
//                     <ListItemText
//                       primary={
//                         <Typography variant="subtitle2">
//                           Basic Packages: {message.basicPackages}
//                         </Typography>
//                       }
//                       secondary={
//                         <>
//                           <Typography variant="body2" color="text.secondary">
//                             {message.projectDescription}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             Sent on: {message.date}
//                           </Typography>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                   {index < enquiryHistory[selectedHistory.id].length - 1 && (
//                     <Divider />
//                   )}
//                 </React.Fragment>
//               ))}
//             </List>
//           </>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpenHistoryDialog(false)}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );

//   return (
//     <Box sx={{ p: 0 }}>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
//         Software Application Enquiry
//       </Typography>
//       <Divider sx={{ my: 2, backgroundColor: "#333" }} />
//       <Button
//         variant="contained"
//         startIcon={<Add />}
//         color="primary"
//         onClick={() => setOpenEnquiryDialog(true)}
//         sx={{ mb: 3 }}
//       >
//         New Enquiry
//       </Button>

//       <Grid container spacing={2}>
//         {enquiries.map((enquiry) => (
//           <Grid item xs={12} md={12} key={enquiry.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {enquiry.schoolName}
//                 </Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <Typography>
//                       <Person sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                       {enquiry.contactPersonName}
//                     </Typography>
//                     <Typography>
//                       <Email sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                       {enquiry.emailId}
//                     </Typography>
//                     <Typography>
//                       <Phone sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                       {enquiry.contactNumber}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography>
//                       <LocationOn sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                       {enquiry.schoolAddress}
//                     </Typography>
//                     <Typography>
//                       <Description sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                       {enquiry.enquiryDescription}
//                     </Typography>
//                     <Typography>
//                       <Schedule sx={{ mr: 1, verticalAlign: "middle" }} />{" "}
//                       {enquiry.date}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//                 <Box
//                   sx={{
//                     mt: 2,
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     gap: 1,
//                   }}
//                 >
//                   <Button
//                     variant="outlined"
//                     startIcon={<History />}
//                     onClick={() => handleOpenHistoryDialog(enquiry)}
//                   >
//                     History
//                   </Button>
//                   <Button
//                     variant="contained"
//                     startIcon={<Send />}
//                     onClick={() => handleOpenMessageDialog(enquiry)}
//                   >
//                     Send Message
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {renderEnquiryDialog()}
//       {renderMessageDialog()}
//       {renderHistoryDialog()}
//     </Box>
//   );
// };

// export default SoftwareAppEnquiry;

// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Stack,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import {
//   Send,
//   Close,
//   Email,
//   LocationOn,
//   Person,
//   Phone,
//   Description,
//   Schedule,
//   Add,
//   Visibility,
//   Message,
//   History,
// } from "@mui/icons-material";

// const SoftwareAppEnquiry = () => {
//   // State for tab selection
//   const [activeTab, setActiveTab] = useState(0);

//   // State for dialogs
//   const [openEnquiryDialog, setOpenEnquiryDialog] = useState(false);
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [openMessageDialog, setOpenMessageDialog] = useState(false);
//   const [openHistoryDialog, setOpenHistoryDialog] = useState(false);

//   // State for selected items
//   const [selectedEnquiry, setSelectedEnquiry] = useState(null);
//   const [selectedHistory, setSelectedHistory] = useState(null);

//   // State for forms
//   const [enquiryForm, setEnquiryForm] = useState({
//     schoolName: "",
//     schoolAddress: "",
//     contactPersonName: "",
//     emailId: "",
//     contactNumber: "",
//     enquiryDescription: "",
//   });

//   const [messageForm, setMessageForm] = useState({
//     basicPackages: "",
//     projectDescription: "",
//   });

//   // State for enquiries and history
//   const [enquiries, setEnquiries] = useState([]);
//   const [historyEnquiries, setHistoryEnquiries] = useState([]);

//   // Handle form input changes
//   const handleEnquiryInputChange = (e) => {
//     const { name, value } = e.target;
//     setEnquiryForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMessageInputChange = (e) => {
//     const { name, value } = e.target;
//     setMessageForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle enquiry submission
//   const handleEnquirySubmit = () => {
//     const newEnquiry = {
//       id: Date.now(),
//       ...enquiryForm,
//       date: new Date().toLocaleDateString(),
//       status: "Pending",
//       replies: [],
//     };
//     setEnquiries((prev) => [...prev, newEnquiry]);
//     setEnquiryForm({
//       schoolName: "",
//       schoolAddress: "",
//       contactPersonName: "",
//       emailId: "",
//       contactNumber: "",
//       enquiryDescription: "",
//     });
//     setOpenEnquiryDialog(false);
//   };

//   // Handle message submission
//   const handleMessageSubmit = () => {
//     const newMessage = {
//       id: Date.now(),
//       ...messageForm,
//       date: new Date().toLocaleDateString(),
//     };

//     // Move enquiry to history
//     const updatedEnquiry = {
//       ...selectedEnquiry,
//       replies: [...(selectedEnquiry.replies || []), newMessage],
//       status: "Responded",
//     };

//     setHistoryEnquiries((prev) => [...prev, updatedEnquiry]);
//     setEnquiries((prev) => prev.filter((e) => e.id !== selectedEnquiry.id));

//     setMessageForm({
//       basicPackages: "",
//       projectDescription: "",
//     });
//     setOpenMessageDialog(false);
//   };

//   // Dialog handlers
//   const handleViewDetails = (enquiry) => {
//     setSelectedEnquiry(enquiry);
//     setOpenDetailsDialog(true);
//   };

//   const handleOpenMessageDialog = (enquiry) => {
//     setSelectedEnquiry(enquiry);
//     setOpenMessageDialog(true);
//   };

//   // Render enquiry cards
//   const renderEnquiryCard = (enquiry) => (
//     <Card sx={{ mb: 1 }}>
//       <CardContent>
//         <Grid container spacing={1} alignItems="center">
//           <Grid item xs={12} sm={3}>
//             <Typography variant="subtitle1">
//               <Person sx={{ mr: 1, verticalAlign: "middle" }} />
//               {enquiry.contactPersonName}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <Typography>
//               <Email sx={{ mr: 1, verticalAlign: "middle" }} />
//               {enquiry.emailId}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Typography noWrap>
//               <Description sx={{ mr: 1, verticalAlign: "middle" }} />
//               {enquiry.enquiryDescription}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={2}>
//             <Button
//               variant="outlined"
//               startIcon={<Visibility />}
//               onClick={() => handleViewDetails(enquiry)}
//               fullWidth
//             >
//               View Details
//             </Button>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );

//   // Render history cards
//   const renderHistoryCard = (enquiry) => (
//     <Card sx={{ mb: 2 }}>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           {enquiry.schoolName}
//         </Typography>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography>
//               <Person sx={{ mr: 1, verticalAlign: "middle" }} />
//               {enquiry.contactPersonName}
//             </Typography>
//             <Typography>
//               <Email sx={{ mr: 1, verticalAlign: "middle" }} />
//               {enquiry.emailId}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography>
//               <Schedule sx={{ mr: 1, verticalAlign: "middle" }} />
//               {enquiry.date}
//             </Typography>
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={() => {
//                 setSelectedHistory(enquiry);
//                 setOpenHistoryDialog(true);
//               }}
//             >
//               View Replies
//             </Button>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );

//   // Render dialogs
//   const renderEnquiryDialog = () => (
//     <Dialog
//       open={openEnquiryDialog}
//       onClose={() => setOpenEnquiryDialog(false)}
//       maxWidth="sm"
//       fullWidth
//     >
//       <DialogTitle>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">New Software Enquiry</Typography>
//           <IconButton onClick={() => setOpenEnquiryDialog(false)}>
//             <Close />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers>
//         <Stack spacing={2}>
//           <TextField
//             fullWidth
//             label="School Name"
//             name="schoolName"
//             value={enquiryForm.schoolName}
//             onChange={handleEnquiryInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="School Address"
//             name="schoolAddress"
//             value={enquiryForm.schoolAddress}
//             onChange={handleEnquiryInputChange}
//             multiline
//             rows={2}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Contact Person Name"
//             name="contactPersonName"
//             value={enquiryForm.contactPersonName}
//             onChange={handleEnquiryInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Email ID"
//             name="emailId"
//             type="email"
//             value={enquiryForm.emailId}
//             onChange={handleEnquiryInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Contact Number"
//             name="contactNumber"
//             value={enquiryForm.contactNumber}
//             onChange={handleEnquiryInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Enquiry Description"
//             name="enquiryDescription"
//             value={enquiryForm.enquiryDescription}
//             onChange={handleEnquiryInputChange}
//             multiline
//             rows={3}
//             required
//           />
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpenEnquiryDialog(false)}>Cancel</Button>
//         <Button
//           onClick={handleEnquirySubmit}
//           variant="contained"
//           color="primary"
//         >
//           Submit Enquiry
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   const renderDetailsDialog = () => (
//     <Dialog
//       open={openDetailsDialog}
//       onClose={() => setOpenDetailsDialog(false)}
//       maxWidth="md"
//       fullWidth
//     >
//       <DialogTitle>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">Enquiry Details</Typography>
//           <IconButton onClick={() => setOpenDetailsDialog(false)}>
//             <Close />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers>
//         {selectedEnquiry && (
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Typography variant="h6" gutterBottom>
//                 {selectedEnquiry.schoolName}
//               </Typography>
//               <Typography>
//                 <Person sx={{ mr: 1, verticalAlign: "middle" }} />
//                 {selectedEnquiry.contactPersonName}
//               </Typography>
//               <Typography>
//                 <Email sx={{ mr: 1, verticalAlign: "middle" }} />
//                 {selectedEnquiry.emailId}
//               </Typography>
//               <Typography>
//                 <Phone sx={{ mr: 1, verticalAlign: "middle" }} />
//                 {selectedEnquiry.contactNumber}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography>
//                 <LocationOn sx={{ mr: 1, verticalAlign: "middle" }} />
//                 {selectedEnquiry.schoolAddress}
//               </Typography>
//               <Typography>
//                 <Description sx={{ mr: 1, verticalAlign: "middle" }} />
//                 {selectedEnquiry.enquiryDescription}
//               </Typography>
//               <Typography>
//                 <Schedule sx={{ mr: 1, verticalAlign: "middle" }} />
//                 {selectedEnquiry.date}
//               </Typography>
//             </Grid>
//           </Grid>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
//         <Button
//           variant="contained"
//           startIcon={<Send />}
//           onClick={() => {
//             setOpenDetailsDialog(false);
//             handleOpenMessageDialog(selectedEnquiry);
//           }}
//         >
//           Send Message
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   const renderMessageDialog = () => (
//     <Dialog
//       open={openMessageDialog}
//       onClose={() => setOpenMessageDialog(false)}
//       maxWidth="sm"
//       fullWidth
//     >
//       <DialogTitle>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">Send Message</Typography>
//           <IconButton onClick={() => setOpenMessageDialog(false)}>
//             <Close />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers>
//         <Stack spacing={2}>
//           <TextField
//             fullWidth
//             label="Basic Packages"
//             name="basicPackages"
//             value={messageForm.basicPackages}
//             onChange={handleMessageInputChange}
//             required
//           />
//           <TextField
//             fullWidth
//             label="Project Description"
//             name="projectDescription"
//             value={messageForm.projectDescription}
//             onChange={handleMessageInputChange}
//             multiline
//             rows={3}
//             required
//           />
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpenMessageDialog(false)}>Cancel</Button>
//         <Button
//           onClick={handleMessageSubmit}
//           variant="contained"
//           color="primary"
//         >
//           Send Message
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   const renderHistoryDialog = () => (
//     <Dialog
//       open={openHistoryDialog}
//       onClose={() => setOpenHistoryDialog(false)}
//       maxWidth="md"
//       fullWidth
//     >
//       <DialogTitle>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6">Reply History</Typography>
//           <IconButton onClick={() => setOpenHistoryDialog(false)}>
//             <Close />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent dividers>
//         {selectedHistory && (
//           <List>
//             {selectedHistory.replies.map((reply, index) => (
//               <React.Fragment key={reply.id}>
//                 <ListItem>
//                   <ListItemText
//                     primary={
//                       <Typography variant="subtitle2">
//                         Basic Packages: {reply.basicPackages}
//                       </Typography>
//                     }
//                     secondary={
//                       <>
//                         <Typography variant="body2" color="text.secondary">
//                           {reply.projectDescription}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           Sent on: {reply.date}
//                         </Typography>
//                       </>
//                     }
//                   />
//                 </ListItem>
//                 {index < selectedHistory.replies.length - 1 && <Divider />}
//               </React.Fragment>
//             ))}
//           </List>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpenHistoryDialog(false)}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );

//   return (
//     <Box>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
//         Software Application Enquiry
//       </Typography>
//       <Divider sx={{ my: 2, backgroundColor: "#333" }} />
//       <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
//         <Tabs
//           value={activeTab}
//           onChange={(e, newValue) => setActiveTab(newValue)}
//         >
//           <Tab label="Enquiries" startIcon={<Message />} />
//           <Tab label="History" startIcon={<History />} />
//         </Tabs>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => setOpenEnquiryDialog(true)}
//         >
//           New Enquiry
//         </Button>
//       </Box>

//       {activeTab === 0 && (
//         <Box>
//           {enquiries.map((enquiry) => renderEnquiryCard(enquiry))}
//           {enquiries.length === 0 && (
//             <Typography color="text.secondary" align="center">
//               No pending enquiries
//             </Typography>
//           )}
//         </Box>
//       )}

//       {activeTab === 1 && (
//         <Box>
//           {historyEnquiries.map((enquiry) => renderHistoryCard(enquiry))}
//           {historyEnquiries.length === 0 && (
//             <Typography color="text.secondary" align="center">
//               No enquiry history
//             </Typography>
//           )}
//         </Box>
//       )}

//       {renderEnquiryDialog()}
//       {renderMessageDialog()}
//       {renderHistoryDialog()}
//       {renderDetailsDialog()}
//     </Box>
//   );
// };

// export default SoftwareAppEnquiry;

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Checkbox,
} from "@mui/material";
import {
  Send,
  Close,
  Email,
  LocationOn,
  Person,
  Phone,
  Description,
  Schedule,
  Add,
  Visibility,
  Sms,
  AttachFile,
} from "@mui/icons-material";

const SoftwareAppEnquiry = () => {
  // State for tab selection
  const [activeTab, setActiveTab] = useState(0);

  // State for dialogs
  const [openEnquiryDialog, setOpenEnquiryDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);

  // State for message type menu
  const [messageAnchorEl, setMessageAnchorEl] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // State for selected items
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);

  // State for forms
  const [enquiryForm, setEnquiryForm] = useState({
    schoolName: "",
    schoolAddress: "",
    contactPersonName: "",
    emailId: "",
    contactNumber: "",
    enquiryDescription: "",
  });

  // Update message form state
  const [messageForm, setMessageForm] = useState({
    basicPackages: "",
    projectDescription: "",
    attachments: null,
    selectedFeatures: [],
  });

  // State for enquiries and history
  const [enquiries, setEnquiries] = useState([]);
  const [historyEnquiries, setHistoryEnquiries] = useState([]);

  // Handle form input changes
  const handleEnquiryInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMessageInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachments") {
      setMessageForm((prev) => ({ ...prev, attachments: files[0] }));
    } else {
      setMessageForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle enquiry submission
  const handleEnquirySubmit = () => {
    const newEnquiry = {
      id: Date.now(),
      ...enquiryForm,
      date: new Date().toLocaleDateString(),
      status: "Pending",
      replies: [],
    };
    setEnquiries((prev) => [...prev, newEnquiry]);
    setEnquiryForm({
      schoolName: "",
      schoolAddress: "",
      contactPersonName: "",
      emailId: "",
      contactNumber: "",
      enquiryDescription: "",
    });
    setOpenEnquiryDialog(false);
  };

  // Handle message submission
  const handleMessageSubmit = () => {
    const newMessage = {
      id: Date.now(),
      ...messageForm,
      type: messageType,
      date: new Date().toLocaleDateString(),
    };

    // Move enquiry to history
    const updatedEnquiry = {
      ...selectedEnquiry,
      replies: [...(selectedEnquiry.replies || []), newMessage],
      status: "Responded",
    };

    if (activeTab === 0) {
      setHistoryEnquiries((prev) => [...prev, updatedEnquiry]);
      setEnquiries((prev) => prev.filter((e) => e.id !== selectedEnquiry.id));
    } else {
      setHistoryEnquiries((prev) =>
        prev.map((e) => (e.id === selectedEnquiry.id ? updatedEnquiry : e))
      );
    }

    setMessageForm({
      basicPackages: "",
      projectDescription: "",
      attachments: null,
    });
    setOpenMessageDialog(false);
    setMessageType(null);
  };

  // Dialog handlers
  const handleViewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setOpenDetailsDialog(true);
  };

  const handleOpenMessageMenu = (event) => {
    setMessageAnchorEl(event.currentTarget);
  };

  const handleCloseMessageMenu = () => {
    setMessageAnchorEl(null);
  };

  const handleMessageTypeSelect = (type) => {
    setMessageType(type);
    setMessageAnchorEl(null);
    setOpenMessageDialog(true);
  };

  // Render enquiry/history cards
  const renderCard = (enquiry) => (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1">
              <Person sx={{ mr: 1, verticalAlign: "middle" }} />
              {enquiry.contactPersonName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>
              <Email sx={{ mr: 1, verticalAlign: "middle" }} />
              {enquiry.emailId}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography noWrap>
              <Description sx={{ mr: 1, verticalAlign: "middle" }} />
              {enquiry.enquiryDescription}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              startIcon={<Visibility />}
              onClick={() => handleViewDetails(enquiry)}
              fullWidth
            >
              View Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // Render dialogs
  const renderEnquiryDialog = () => (
    <Dialog
      open={openEnquiryDialog}
      onClose={() => setOpenEnquiryDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">New Software Enquiry</Typography>
          <IconButton onClick={() => setOpenEnquiryDialog(false)}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="School Name"
            name="schoolName"
            value={enquiryForm.schoolName}
            onChange={handleEnquiryInputChange}
            required
          />
          <TextField
            fullWidth
            label="School Address"
            name="schoolAddress"
            value={enquiryForm.schoolAddress}
            onChange={handleEnquiryInputChange}
            multiline
            rows={2}
            required
          />
          <TextField
            fullWidth
            label="Contact Person Name"
            name="contactPersonName"
            value={enquiryForm.contactPersonName}
            onChange={handleEnquiryInputChange}
            required
          />
          <TextField
            fullWidth
            label="Email ID"
            name="emailId"
            type="email"
            value={enquiryForm.emailId}
            onChange={handleEnquiryInputChange}
            required
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            value={enquiryForm.contactNumber}
            onChange={handleEnquiryInputChange}
            required
          />
          <TextField
            fullWidth
            label="Enquiry Description"
            name="enquiryDescription"
            value={enquiryForm.enquiryDescription}
            onChange={handleEnquiryInputChange}
            multiline
            rows={3}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEnquiryDialog(false)}>Cancel</Button>
        <Button
          onClick={handleEnquirySubmit}
          variant="contained"
          color="primary"
        >
          Submit Enquiry
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderDetailsDialog = () => (
    <Dialog
      open={openDetailsDialog}
      onClose={() => setOpenDetailsDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Enquiry Details</Typography>
          <IconButton onClick={() => setOpenDetailsDialog(false)}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {selectedEnquiry && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                {selectedEnquiry.schoolName}
              </Typography>
              <Typography>
                <Person sx={{ mr: 1, verticalAlign: "middle" }} />
                {selectedEnquiry.contactPersonName}
              </Typography>
              <Typography>
                <Email sx={{ mr: 1, verticalAlign: "middle" }} />
                {selectedEnquiry.emailId}
              </Typography>
              <Typography>
                <Phone sx={{ mr: 1, verticalAlign: "middle" }} />
                {selectedEnquiry.contactNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <LocationOn sx={{ mr: 1, verticalAlign: "middle" }} />
                {selectedEnquiry.schoolAddress}
              </Typography>
              <Typography>
                <Description sx={{ mr: 1, verticalAlign: "middle" }} />
                {selectedEnquiry.enquiryDescription}
              </Typography>
              <Typography>
                <Schedule sx={{ mr: 1, verticalAlign: "middle" }} />
                {selectedEnquiry.date}
              </Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button> */}
        {selectedEnquiry?.replies?.length > 0 ? (
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedHistory(selectedEnquiry);
              setOpenHistoryDialog(true);
            }}
          >
            View Replies
          </Button>
        ) : null}
        {/* Only show Send Message button if we're in the Enquiries tab */}
        {activeTab === 0 && (
          <Button
            variant="contained"
            startIcon={<Send />}
            onClick={handleOpenMessageMenu}
          >
            Send Message
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  //   const renderMessageDialog = () => (
  //     <Dialog
  //       open={openMessageDialog}
  //       onClose={() => setOpenMessageDialog(false)}
  //       maxWidth="sm"
  //       fullWidth
  //     >
  //       <DialogTitle>
  //         <Box display="flex" justifyContent="space-between" alignItems="center">
  //           <Typography variant="h6">
  //             Send {messageType === "email" ? "Email" : "SMS"}
  //           </Typography>
  //           <IconButton onClick={() => setOpenMessageDialog(false)}>
  //             <Close />
  //           </IconButton>
  //         </Box>
  //       </DialogTitle>
  //       <DialogContent dividers>
  //         <Stack spacing={2}>
  //           <TextField
  //             fullWidth
  //             label="Basic Packages"
  //             name="basicPackages"
  //             value={messageForm.basicPackages}
  //             onChange={handleMessageInputChange}
  //             required
  //           />
  //           <TextField
  //             fullWidth
  //             label="Project Description"
  //             name="projectDescription"
  //             value={messageForm.projectDescription}
  //             onChange={handleMessageInputChange}
  //             multiline
  //             rows={3}
  //             required
  //           />
  //           {messageType === "email" && (
  //             <Box>
  //               <input
  //                 accept="*/*"
  //                 style={{ display: "none" }}
  //                 id="attachment-file"
  //                 type="file"
  //                 name="attachments"
  //                 onChange={handleMessageInputChange}
  //               />
  //               <label htmlFor="attachment-file">
  //                 <Button
  //                   variant="outlined"
  //                   component="span"
  //                   startIcon={<AttachFile />}
  //                 >
  //                   Attach File
  //                 </Button>
  //               </label>
  //               {messageForm.attachments && (
  //                 <Typography variant="caption" display="block" sx={{ mt: 1 }}>
  //                   Selected file: {messageForm.attachments.name}
  //                 </Typography>
  //               )}
  //             </Box>
  //           )}
  //         </Stack>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => setOpenMessageDialog(false)}>Cancel</Button>
  //         <Button
  //           onClick={handleMessageSubmit}
  //           variant="contained"
  //           color="primary"
  //         >
  //           Send {messageType === "email" ? "Email" : "SMS"}
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   );

  // First, add these new states at the beginning of your component
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  // Add this constant for package options
  const packageOptions = [
    {
      id: 1,
      name: "Basic Package",
      price: "$499/year",
      features: ["Student Management", "Staff Management", "Basic Reports"],
    },
    {
      id: 2,
      name: "Standard Package",
      price: "$999/year",
      features: [
        "All Basic Features",
        "Attendance Management",
        "Exam Management",
        "Advanced Reports",
      ],
    },
    {
      id: 3,
      name: "Premium Package",
      price: "$1499/year",
      features: [
        "All Standard Features",
        "Library Management",
        "Transport Management",
        "Mobile App",
      ],
    },
  ];

  // Add this function to generate sample message
  const generateSampleMessage = (packageName, features) => {
    if (!packageName) return "";

    const selectedPkg = packageOptions.find((pkg) => pkg.name === packageName);
    return `Thank you for your interest in our school management software. Based on your requirements, we recommend our ${packageName} at ${
      selectedPkg.price
    } which includes:\n\n${features.join(
      "\n"
    )}\n\nThis package will help streamline your school's operations effectively.`;
  };

  // Add handler for package selection
  const handlePackageChange = (event) => {
    const selectedPkg = event.target.value;
    setSelectedPackage(selectedPkg);

    const pkg = packageOptions.find((p) => p.name === selectedPkg);
    if (pkg) {
      setSelectedFeatures(pkg.features);
      setMessageForm((prev) => ({
        ...prev,
        basicPackages: selectedPkg,
        projectDescription: generateSampleMessage(selectedPkg, pkg.features),
      }));
    }
  };

  // Add handler for feature selection
  const handleFeatureChange = (feature) => {
    const newFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((f) => f !== feature)
      : [...selectedFeatures, feature];

    setSelectedFeatures(newFeatures);
    setMessageForm((prev) => ({
      ...prev,
      projectDescription: generateSampleMessage(selectedPackage, newFeatures),
    }));
  };

  const renderMessageDialog = () => (
    <Dialog
      open={openMessageDialog}
      onClose={() => setOpenMessageDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Send {messageType === "email" ? "Email" : "SMS"}
          </Typography>
          <IconButton onClick={() => setOpenMessageDialog(false)}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            select
            fullWidth
            label="Select Package"
            value={selectedPackage}
            onChange={handlePackageChange}
            required
          >
            {packageOptions.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name} - {option.price}
              </MenuItem>
            ))}
          </TextField>

          {selectedPackage && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Package Features:
              </Typography>
              <Grid container spacing={2}>
                {packageOptions
                  .find((pkg) => pkg.name === selectedPackage)
                  ?.features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                          checked={selectedFeatures.includes(feature)}
                          onChange={() => handleFeatureChange(feature)}
                        />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}

          <TextField
            fullWidth
            label="Project Description"
            name="projectDescription"
            value={messageForm.projectDescription}
            onChange={handleMessageInputChange}
            multiline
            rows={4}
            required
            InputProps={{
              readOnly: true,
            }}
            helperText="This is an auto-generated message based on selected package and features"
          />

          {messageType === "email" && (
            <Box>
              <input
                accept="*/*"
                style={{ display: "none" }}
                id="attachment-file"
                type="file"
                name="attachments"
                onChange={handleMessageInputChange}
              />
              <label htmlFor="attachment-file">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<AttachFile />}
                >
                  Attach File
                </Button>
              </label>
              {messageForm.attachments && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Selected file: {messageForm.attachments.name}
                </Typography>
              )}
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenMessageDialog(false)}>Cancel</Button>
        <Button
          onClick={handleMessageSubmit}
          variant="contained"
          color="primary"
          disabled={!selectedPackage}
        >
          Send {messageType === "email" ? "Email" : "SMS"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderHistoryDialog = () => (
    <Dialog
      open={openHistoryDialog}
      onClose={() => setOpenHistoryDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Reply History</Typography>
          <IconButton onClick={() => setOpenHistoryDialog(false)}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {selectedHistory && (
          <List>
            {selectedHistory.replies.map((reply, index) => (
              <React.Fragment key={reply.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        {reply.type === "email" ? (
                          <Email fontSize="small" />
                        ) : (
                          <Sms fontSize="small" />
                        )}
                        <Typography variant="subtitle2">
                          Basic Packages: {reply.basicPackages}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {reply.projectDescription}
                        </Typography>
                        {reply.attachments && (
                          <Typography variant="body2" color="text.secondary">
                            Attachment: {reply.attachments.name}
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary">
                          Sent on: {reply.date}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < selectedHistory.replies.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={() => setOpenHistoryDialog(false)}>Close</Button>
      </DialogActions> */}
    </Dialog>
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Software Application Enquiry
      </Typography>
      <Divider sx={{ my: 2, backgroundColor: "#333" }} />
      <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Enquiries" />
          <Tab label="History" />
        </Tabs>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenEnquiryDialog(true)}
        >
          New Enquiry
        </Button>
      </Box>

      {activeTab === 0 && (
        <Box>
          {enquiries.map((enquiry) => renderCard(enquiry))}
          {enquiries.length === 0 && (
            <Typography color="text.secondary" align="center">
              No pending enquiries
            </Typography>
          )}
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          {historyEnquiries.map((enquiry) => renderCard(enquiry))}
          {historyEnquiries.length === 0 && (
            <Typography color="text.secondary" align="center">
              No enquiry history
            </Typography>
          )}
        </Box>
      )}

      {renderEnquiryDialog()}
      {renderDetailsDialog()}
      {renderMessageDialog()}
      {renderHistoryDialog()}

      <Menu
        anchorEl={messageAnchorEl}
        open={Boolean(messageAnchorEl)}
        onClose={handleCloseMessageMenu}
      >
        <MenuItem onClick={() => handleMessageTypeSelect("sms")}>
          <Sms sx={{ mr: 1 }} /> Send SMS
        </MenuItem>
        <MenuItem onClick={() => handleMessageTypeSelect("email")}>
          <Email sx={{ mr: 1 }} /> Send Email
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SoftwareAppEnquiry;
