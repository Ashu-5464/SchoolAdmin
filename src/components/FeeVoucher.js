// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Grid,
//   Box,
//   Card,
//   CardContent,
//   Divider,
//   IconButton,
//   Stack,
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import { QRCodeSVG } from "qrcode.react";

// const FeeVoucher = ({ students, open, onClose }) => {
//   const [voucherData] = useState({
//     voucherNo: `FV-${new Date().getFullYear()}-${Math.floor(
//       Math.random() * 10000
//     )}`,
//     issueDate: new Date().toLocaleDateString(),
//     dueDate: new Date(
//       new Date().setDate(new Date().getDate() + 14)
//     ).toLocaleDateString(),
//     bankDetails: {
//       name: "State Bank of India",
//       account: "XXXX XXXX XXXX 1234",
//       ifsc: "SBIN0123456",
//       branch: "Main Branch",
//     },
//     fees: [
//       { type: "Tuition Fee", amount: 15000 },
//       { type: "Development Fee", amount: 2000 },
//       { type: "Library Fee", amount: 1000 },
//       { type: "Computer Lab Fee", amount: 1500 },
//       { type: "Sports Fee", amount: 1000 },
//     ],
//   });

//   const totalAmount = voucherData.fees.reduce(
//     (sum, fee) => sum + fee.amount,
//     0
//   );

//   const handleDownload = () => {
//     const iframe = document.createElement("iframe");
//     iframe.style.display = "none";
//     document.body.appendChild(iframe);

//     const voucherElement = document.getElementById("fee-voucher-content");
//     const printStyles = `
//       @page {
//         size: A4;
//         margin: 15mm;
//       }
//       body {
//         -webkit-print-color-adjust: exact !important;
//         print-color-adjust: exact !important;
//       }
//       .MuiPaper-root {
//         box-shadow: none !important;
//         border: 1px solid #ccc !important;
//       }
//     `;

//     const iframeDoc = iframe.contentWindow.document;
//     iframeDoc.open();
//     iframeDoc.write(`
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Fee Voucher - ${students.name}</title>
//           <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
//           <style>${printStyles}</style>
//         </head>
//         <body>
//           <div>${voucherElement.outerHTML}</div>
//           <script>
//             window.onload = function() {
//               window.print();
//               window.onafterprint = function() {
//                 window.frameElement.remove();
//               };
//             }
//           </script>
//         </body>
//       </html>
//     `);
//     iframeDoc.close();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           width: "100%",
//           m: { xs: 1, sm: 2, md: 3 },
//         },
//       }}
//     >
//       <DialogTitle>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant={{ xs: "h5", sm: "h4" }}>Fee Voucher</Typography>
//           <IconButton onClick={handleDownload} color="primary">
//             <DownloadIcon />
//           </IconButton>
//         </Box>
//       </DialogTitle>
//       <DialogContent>
//         <div id="fee-voucher-content">
//           <Card variant="outlined" sx={{ mb: 2 }}>
//             <CardContent>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Stack spacing={1}>
//                     <Typography variant="h6" gutterBottom>
//                       School Details
//                     </Typography>
//                     <Typography variant="body1">
//                       ABC International School
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       123 Education Street, Knowledge City
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Phone: (123) 456-7890
//                     </Typography>
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Stack spacing={1}>
//                     <Typography variant="body2">
//                       <strong>Voucher No:</strong> {voucherData.voucherNo}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Issue Date:</strong> {voucherData.issueDate}
//                     </Typography>
//                     <Typography variant="body2" color="error">
//                       <strong>Due Date:</strong> {voucherData.dueDate}
//                     </Typography>
//                   </Stack>
//                 </Grid>
//               </Grid>

//               <Divider sx={{ my: 2 }} />

//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Stack spacing={1}>
//                     <Typography variant="subtitle1">
//                       <strong>students Details</strong>
//                     </Typography>
//                     <Typography variant="body2">
//                       Name: {students.name}
//                     </Typography>
//                     <Typography variant="body2">
//                       Class: {students.standard} - {students.division}
//                     </Typography>
//                     <Typography variant="body2">
//                       Roll No: {students.id}
//                     </Typography>
//                   </Stack>
//                 </Grid>
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   display="flex"
//                   justifyContent="center"
//                   alignItems="center"
//                 >
//                   <QRCodeSVG
//                     value={`${voucherData.voucherNo}-${students.id}-${totalAmount}`}
//                     size={100}
//                     level="H"
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>

//           <Paper sx={{ mb: 2 }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableCell>
//                     <strong>Fee Type</strong>
//                   </TableCell>
//                   <TableCell align="right">
//                     <strong>Amount (₹)</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {voucherData.fees.map((fee, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{fee.type}</TableCell>
//                     <TableCell align="right">
//                       ₹{fee.amount.toLocaleString()}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 <TableRow>
//                   <TableCell>
//                     <strong>Total Amount</strong>
//                   </TableCell>
//                   <TableCell align="right">
//                     <Typography variant="h6" color="primary">
//                       ₹{totalAmount.toLocaleString()}
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </Paper>

//           <Card variant="outlined">
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Payment Details
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Stack spacing={1}>
//                     <Typography variant="body2">
//                       <strong>Bank Name:</strong> {voucherData.bankDetails.name}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Account No:</strong>{" "}
//                       {voucherData.bankDetails.account}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>IFSC Code:</strong> {voucherData.bankDetails.ifsc}
//                     </Typography>
//                     <Typography variant="body2">
//                       <strong>Branch:</strong> {voucherData.bankDetails.branch}
//                     </Typography>
//                   </Stack>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Stack spacing={1}>
//                     <Typography variant="body2" color="error">
//                       Note: Please pay before the due date to avoid late fees.
//                     </Typography>
//                     <Typography variant="body2">
//                       - Online payment is preferred
//                     </Typography>
//                     <Typography variant="body2">
//                       - Keep the payment receipt safe
//                     </Typography>
//                   </Stack>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default FeeVoucher;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { QRCodeSVG } from "qrcode.react";

const FeeVoucher = ({ student, open, onClose }) => {
  const [voucherData] = useState({
    voucherNo: `FV-${new Date().getFullYear()}-${Math.floor(
      Math.random() * 10000
    )}`,
    issueDate: new Date().toLocaleDateString(),
    dueDate: new Date(
      new Date().setDate(new Date().getDate() + 14)
    ).toLocaleDateString(),
    bankDetails: {
      name: "State Bank of India",
      account: "XXXX XXXX XXXX 1234",
      ifsc: "SBIN0123456",
      branch: "Main Branch",
    },
    fees: [
      { type: "Tuition Fee", amount: 15000 },
      { type: "Development Fee", amount: 2000 },
      { type: "Library Fee", amount: 1000 },
      { type: "Computer Lab Fee", amount: 1500 },
      { type: "Sports Fee", amount: 1000 },
    ],
  });

  const totalAmount = voucherData.fees.reduce(
    (sum, fee) => sum + fee.amount,
    0
  );

  const handleDownload = () => {
    window.print();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: "100%",
          margin: { xs: 1, sm: 2, md: 3 },
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Fee Voucher</Typography>
          <IconButton onClick={handleDownload} color="primary">
            <DownloadIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <div id="fee-voucher-content">
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" gutterBottom>
                      School Details
                    </Typography>
                    <Typography variant="body1" fontWeight={"bold"}>
                      {student?.school}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      123 Education Street, Knowledge City
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: (123) 456-7890
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      <Box component="span" fontWeight="bold">
                        Voucher No:
                      </Box>{" "}
                      {voucherData.voucherNo}
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight="bold">
                        Issue Date:
                      </Box>{" "}
                      {voucherData.issueDate}
                    </Typography>
                    <Typography variant="body2" color="error">
                      <Box component="span" fontWeight="bold">
                        Due Date:
                      </Box>{" "}
                      {voucherData.dueDate}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Student Details
                    </Typography>
                    <Typography variant="body2">
                      Name: {student?.name || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      Class: {student?.standard || "N/A"} -{" "}
                      {student?.division || "N/A"}
                    </Typography>
                    <Typography variant="body2">
                      Roll No: {student?.id || "N/A"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        border: "2px dashed",
                        borderColor: "grey.300",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                      }}
                    >
                      {/* <Typography variant="caption" color="text.secondary">
                        QR Code
                      </Typography> */}
                      <QRCodeSVG
                        value={`${voucherData.voucherNo}-${student.id}-${totalAmount}`}
                        size={100}
                        level="H"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Paper sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "grey.100" }}>
                  <TableCell>
                    <Typography fontWeight="bold">Fee Type</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold">Amount (₹)</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {voucherData.fees.map((fee, index) => (
                  <TableRow key={index}>
                    <TableCell>{fee.type}</TableCell>
                    <TableCell align="right">
                      ₹{fee.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Total Amount</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" color="primary">
                      ₹{totalAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      <Box component="span" fontWeight="bold">
                        Bank Name:
                      </Box>{" "}
                      {voucherData.bankDetails.name}
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight="bold">
                        Account No:
                      </Box>{" "}
                      {voucherData.bankDetails.account}
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight="bold">
                        IFSC Code:
                      </Box>{" "}
                      {voucherData.bankDetails.ifsc}
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight="bold">
                        Branch:
                      </Box>{" "}
                      {voucherData.bankDetails.branch}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="error">
                      Note: Please pay before the due date to avoid late fees.
                    </Typography>
                    <Typography variant="body2">
                      - Online payment is preferred
                    </Typography>
                    <Typography variant="body2">
                      - Keep the payment receipt safe
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeeVoucher;
