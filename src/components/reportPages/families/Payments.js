// import React, { useState } from "react";
// import {
//   Button,
//   Typography,
//   IconButton,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Box,
//   TextField,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

// const Payments = () => {
//   const navigate = useNavigate();

//   // State for filters
//   const [selectedSchool, setSelectedSchool] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [selectedDivision, setSelectedDivision] = useState("");

//   // Mock data for filters
//   const schools = [
//     { id: 1, name: "ABC School" },
//     { id: 2, name: "XYZ School" },
//   ];
//   const standards = ["1st", "2nd", "3rd"];
//   const divisions = ["A", "B", "C"];

//   return (
//     <div>
//       {/* Back Button */}
//       <Button
//         variant="outlined"
//         size="small"
//         sx={{ mb: 1 }}
//         onClick={() => navigate(0)}
//       >
//         Back
//       </Button>

//       {/* Title with Sorting Icon */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h6" fontWeight={"bold"}>
//           Guardians Payments
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//           <TextField
//             sx={{ width: 200 }}
//             label="Search by name / email"
//             size="small"
//             variant="outlined"
//             // value={searchTerm}
//             // onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <IconButton
//             sx={{
//               ml: 0,
//               backgroundColor: "white",
//               color: "black",
//             }}
//           >
//             <SortByAlphaIcon fontSize="medium" titleAccess="Sort List" />
//           </IconButton>
//         </Box>
//       </div>

//       {/* Filters Section */}
//       <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
//         <Grid item xs={12} sm={4}>
//           {/* School Filter */}
//           <FormControl fullWidth size="small">
//             <InputLabel>School</InputLabel>
//             <Select
//               value={selectedSchool}
//               label="School"
//               onChange={(e) => {
//                 setSelectedSchool(e.target.value);
//                 setSelectedStandard("");
//                 setSelectedDivision("");
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Select School
//               </MenuItem>
//               {schools.map((school) => (
//                 <MenuItem key={school.id} value={school.name}>
//                   {school.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={6} sm={4}>
//           {/* Standard Filter */}
//           <FormControl fullWidth size="small">
//             <InputLabel>Standard</InputLabel>
//             <Select
//               value={selectedStandard}
//               label="Standard"
//               onChange={(e) => {
//                 setSelectedStandard(e.target.value);
//                 setSelectedDivision("");
//               }}
//               disabled={!selectedSchool}
//             >
//               <MenuItem value="" disabled>
//                 Select Standard
//               </MenuItem>
//               {standards.map((standard) => (
//                 <MenuItem key={standard} value={standard}>
//                   {standard}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={6} sm={4}>
//           {/* Division Filter */}
//           <FormControl fullWidth size="small">
//             <InputLabel>Division</InputLabel>
//             <Select
//               value={selectedDivision}
//               label="Division"
//               onChange={(e) => setSelectedDivision(e.target.value)}
//               disabled={!selectedStandard}
//             >
//               <MenuItem value="" disabled>
//                 Select Division
//               </MenuItem>
//               {divisions.map((division) => (
//                 <MenuItem key={division} value={division}>
//                   {division}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* Content */}
//       <Typography variant="body1" sx={{ marginTop: 2 }}>
//         This page contains Payments information of Guardians.
//       </Typography>
//     </div>
//   );
// };

// export default Payments;

import React, { useState, useRef } from "react";
import {
  Button,
  Typography,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { QRCodeSVG } from "qrcode.react";
import { Print } from "@mui/icons-material";

// Mock data for students
const mockStudents = [
  {
    id: 1,
    name: "John Smith",
    school: "ABC School",
    standard: "1st",
    division: "A",
    guardianName: "Mike Smith",
    guardianEmail: "mike@example.com",
    totalFees: 5000,
    pendingFees: 3000,
  },
  {
    id: 2,
    name: "Jane Smith",
    school: "ABC School",
    standard: "3rd",
    division: "B",
    guardianName: "Mike Smith",
    guardianEmail: "mike@example.com",
    totalFees: 5500,
    pendingFees: 4000,
  },
];

// Receipt Component
const FeeReceipt = React.forwardRef(({ paymentData }, ref) => {
  return (
    <div ref={ref} style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <Typography variant="h4" align="center" fontWeight={"bold"} gutterBottom>
        Fee Payment Receipt
      </Typography>
      <Divider sx={{ my: 1 }} />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>
            <strong>Receipt No:</strong> {paymentData.receiptNo}
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <Typography>
            <strong>Date:</strong> {paymentData.date}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>Guardian Name:</strong> {paymentData.guardianName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <strong>School:</strong> {paymentData.school}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={"bold"} gutterBottom>
            Payment Details
          </Typography>
          {paymentData.students.map((student) => (
            <Box key={student.id} sx={{ mb: 2 }}>
              <Typography>
                <strong>Student Name:</strong> {student.name}
              </Typography>
              <Typography>
                <strong>Class:</strong> {student.standard} - {student.division}
              </Typography>
              <Typography>
                <strong>Amount Paid:</strong> ₹{student.amountPaid}
              </Typography>
              <Typography>
                <strong>Remaining Fees:</strong> ₹{student.remainingFees}
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography textAlign={"right"}>
            <strong>Total Amount Paid:</strong> ₹{paymentData.totalAmount}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography sx={{ color: "#666", fontWeight: "bold" }}>
          🤗 Thank you for your payment 🤗
        </Typography>
      </Box>
    </div>
  );
});

const Payments = () => {
  const navigate = useNavigate();
  const receiptRef = useRef();

  // State
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [receiptData, setReceiptData] = useState(null);
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false);

  // Mock data for filters
  const schools = [
    { id: 1, name: "ABC School" },
    { id: 2, name: "XYZ School" },
  ];
  const standards = ["1st", "2nd", "3rd"];
  const divisions = ["A", "B", "C"];

  // Filter students based on guardian
  const filterStudentsByGuardian = (guardianEmail) => {
    return mockStudents.filter(
      (student) =>
        student.guardianEmail === guardianEmail &&
        (!selectedSchool || student.school === selectedSchool) &&
        (!selectedStandard || student.standard === selectedStandard) &&
        (!selectedDivision || student.division === selectedDivision)
    );
  };

  // Handle student selection for payment
  const handleStudentSelection = (student) => {
    const isSelected = selectedStudents.find((s) => s.id === student.id);
    if (isSelected) {
      setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  // Generate QR code data
  const generateQRData = () => {
    const totalAmount = selectedStudents.reduce(
      (sum, student) => sum + student.pendingFees,
      0
    );
    return JSON.stringify({
      amount: totalAmount,
      students: selectedStudents.map((student) => ({
        id: student.id,
        name: student.name,
        amount: student.pendingFees,
      })),
    });
  };

  // Handle payment completion
  const handlePaymentComplete = () => {
    const receiptData = {
      receiptNo: `RCP${Date.now()}`,
      date: new Date().toLocaleDateString(),
      guardianName: selectedStudents[0].guardianName,
      school: selectedStudents[0].school,
      totalAmount: selectedStudents.reduce(
        (sum, student) => sum + student.pendingFees,
        0
      ),
      students: selectedStudents.map((student) => ({
        ...student,
        amountPaid: student.pendingFees,
        remainingFees: 0,
      })),
    };
    setReceiptData(receiptData);
    setOpenPaymentDialog(false);
    setOpenReceiptDialog(true);
  };

  // Handle download receipt
  const handleDownloadReceipt = () => {
    const receiptWindow = window.open("", "", "width=800,height=600");
    const receiptContent = receiptRef.current.innerHTML;

    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Fee Payment Receipt</title>
          <style>
            @media print {
              body { padding: 40px; }
              .receipt-container { max-width: 800px; margin: 0 auto; }
              @page { size: A4; margin: 20mm; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">${receiptContent}</div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            }
          </script>
        </body>
      </html>
    `);

    receiptWindow.document.close();
  };

  return (
    <div>
      {/* Back Button */}
      <Button
        variant="outlined"
        size="small"
        sx={{ mb: 1 }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      {/* Title with Search and Sort */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          Guardians Payments
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            sx={{ width: 200 }}
            label="Search by name / email"
            size="small"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton sx={{ backgroundColor: "white", color: "black" }}>
            <SortByAlphaIcon fontSize="medium" titleAccess="Sort List" />
          </IconButton>
        </Box>
      </div>

      {/* Filters */}
      <Grid container spacing={1} sx={{ mb: 2, mt: 1 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>School</InputLabel>
            <Select
              value={selectedSchool}
              label="School"
              onChange={(e) => {
                setSelectedSchool(e.target.value);
                setSelectedStandard("");
                setSelectedDivision("");
              }}
            >
              <MenuItem value="" disabled>
                Select School
              </MenuItem>
              {schools.map((school) => (
                <MenuItem key={school.id} value={school.name}>
                  {school.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Standard</InputLabel>
            <Select
              value={selectedStandard}
              label="Standard"
              onChange={(e) => {
                setSelectedStandard(e.target.value);
                setSelectedDivision("");
              }}
              disabled={!selectedSchool}
            >
              <MenuItem value="" disabled>
                Select Standard
              </MenuItem>
              {standards.map((standard) => (
                <MenuItem key={standard} value={standard}>
                  {standard}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Division</InputLabel>
            <Select
              value={selectedDivision}
              label="Division"
              onChange={(e) => setSelectedDivision(e.target.value)}
              disabled={!selectedStandard}
            >
              <MenuItem value="" disabled>
                Select Division
              </MenuItem>
              {divisions.map((division) => (
                <MenuItem key={division} value={division}>
                  {division}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Students List Grouped by Guardian */}
      {Array.from(new Set(mockStudents.map((s) => s.guardianEmail))).map(
        (guardianEmail) => {
          const guardianStudents = filterStudentsByGuardian(guardianEmail);
          if (guardianStudents.length === 0) return null;

          return (
            <Card key={guardianEmail} sx={{ mb: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">
                    <strong>Guardian Name : </strong>
                    {guardianStudents[0].guardianName}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedStudents(guardianStudents);
                      setOpenPaymentDialog(true);
                    }}
                  >
                    Pay Fees
                  </Button>
                </Box>

                <Grid container spacing={2}>
                  {guardianStudents.map((student) => (
                    <Grid item xs={12} sm={6} key={student.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography>
                            <strong>Student:</strong> {student.name}
                          </Typography>
                          <Typography>
                            <strong>Class:</strong> {student.standard} -{" "}
                            {student.division}
                          </Typography>
                          <Typography>
                            <strong>Pending Fees:</strong> ₹
                            {student.pendingFees}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          );
        }
      )}

      {/* Payment Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Fee Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Select Students for Payment
            </Typography>
            {selectedStudents.map((student) => (
              <FormControlLabel
                key={student.id}
                control={
                  <Checkbox
                    checked={selectedStudents.some((s) => s.id === student.id)}
                    onChange={() => handleStudentSelection(student)}
                  />
                }
                label={`${student.name} - ₹${student.pendingFees}`}
              />
            ))}
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Scan QR Code to Pay
            </Typography>
            <QRCodeSVG value={generateQRData()} size={256} />
            <Typography sx={{ mt: 2 }}>
              Total Amount: ₹
              {selectedStudents.reduce(
                (sum, student) => sum + student.pendingFees,
                0
              )}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePaymentComplete}
          >
            Complete Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog
        open={openReceiptDialog}
        onClose={() => setOpenReceiptDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Payment Receipt</DialogTitle>
        <DialogContent>
          {receiptData && (
            <FeeReceipt ref={receiptRef} paymentData={receiptData} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReceiptDialog(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={handleDownloadReceipt}
            startIcon={<Print />}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Payments;
