import React, { useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Dialog,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { Download } from "@mui/icons-material";

const FeeVoucherSample = ({ student, open, onClose }) => {
  const voucherRef = useRef(null);
  const dialogRef = useRef(null);
  const currentDate = new Date().toLocaleDateString("en-GB");

  //   const handleDownload = () => {
  //     const iframe = document.createElement("iframe");
  //     iframe.style.display = "none";
  //     document.body.appendChild(iframe);

  //     // Get the complete dialog content
  //     // const dialogElement = dialogRef.current;
  //     const voucherElement = voucherRef.current;

  //     const marksheetElement = document.getElementById("voucher-content");

  //     // Get all stylesheets
  //     const styleSheets = Array.from(document.styleSheets);
  //     let styles = "";

  //     styleSheets.forEach((styleSheet) => {
  //       try {
  //         const rules = Array.from(styleSheet.cssRules || styleSheet.rules);
  //         rules.forEach((rule) => {
  //           styles += rule.cssText;
  //         });
  //       } catch (e) {
  //         console.warn("Could not load stylesheet rules");
  //       }
  //     });

  //     // Enhanced print styles
  //     const printStyles = `
  //       @page {
  //         size: A4;
  //         margin: 15mm;
  //       }
  //       @media print {
  //         html, body {
  //           height: 100%;
  //           margin: 0 !important;
  //           padding: 0 !important;
  //           overflow: hidden;
  //         }
  //         body {
  //           -webkit-print-color-adjust: exact !important;
  //           print-color-adjust: exact !important;
  //           background-color: white !important;
  //         }
  //         * {
  //           print-color-adjust: exact !important;
  //           -webkit-print-color-adjust: exact !important;
  //           color-adjust: exact !important;
  //         }
  //         .MuiDialog-paper {
  //           margin: 0 !important;
  //           max-height: none !important;
  //           box-shadow: none !important;
  //           overflow: visible !important;
  //         }
  //         .voucher-content {
  //           padding: 20px !important;
  //           background-color: white !important;
  //           border: 2px solid #1976d2 !important;
  //           page-break-inside: avoid;
  //           break-inside: avoid;
  //         }
  //         .no-print {
  //           display: none !important;
  //         }
  //       }
  //     `;

  //     // Get computed styles
  //     const computedStyles = window.getComputedStyle(voucherElement);
  //     let elementStyles = "";
  //     for (let i = 0; i < computedStyles.length; i++) {
  //       const style = computedStyles[i];
  //       elementStyles += `${style}: ${computedStyles.getPropertyValue(style)};\n`;
  //     }

  //     // Create the print document with complete content
  //     const iframeDoc = iframe.contentWindow.document;
  //     iframeDoc.open();
  //     iframeDoc.write(`
  //       <!DOCTYPE html>
  //       <html>
  //         <head>
  //           <title>Fee Voucher - ${student?.name || "Student"}</title>
  //           <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  //           <style>
  //             ${styles}
  //             ${printStyles}
  //             .voucher-to-print {
  //               ${elementStyles}
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <div class="voucher-content voucher-to-print">
  //             ${voucherElement.outerHTML}
  //           </div>
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

  const handleDownload = () => {
    // Create a hidden iframe for printing
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Get the voucher content
    const voucherElement = document.getElementById("voucher-content");

    // Collect all stylesheets from the main document
    const styleSheets = Array.from(document.styleSheets);
    let styles = "";

    styleSheets.forEach((styleSheet) => {
      try {
        const rules = Array.from(styleSheet.cssRules || styleSheet.rules);
        rules.forEach((rule) => {
          styles += rule.cssText;
        });
      } catch (e) {
        console.warn("Could not load stylesheet rules:", e);
      }
    });

    // Enhanced print styles
    const printStyles = `
      @page {
        size: A4;
        margin: 15mm;
      }
      @media print {
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden;
        }
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          background-color: white !important;
        }
        * {
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        .voucher-content {
          padding: 20px !important;
          background-color: white !important;
          border: 2px solid #1976d2 !important;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .no-print {
          display: none !important;
        }
      }
    `;

    // Create the iframe document for printing
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Fee Voucher - ${student?.name || "Student"}</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <style>
            ${styles}
            ${printStyles}
          </style>
        </head>
        <body>
          <div class="voucher-content">
            ${voucherElement.outerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.frameElement.remove();
              };
            };
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      //   maxWidth={false}
      maxWidth="md"
      fullWidth
      ref={dialogRef}
      PaperProps={{
        sx: {
          //   width: "600px",
          //   minHeight: "90vh", // Added fixed height
          p: 3,
          margin: 2,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Stack
        direction="row"
        display={"flex"}
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mb: 2 }}
        className="no-print"
      >
        <Button onClick={handleDownload}>
          <Download />
        </Button>
      </Stack>

      <div id="voucher-content">
        <Paper
          ref={voucherRef}
          elevation={3}
          sx={{
            flex: 1,
            padding: "20px",
            border: "2px solid #1976d2",
            backgroundColor: "#fff",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {/* Header Section */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
                mb: 3,
              }}
            >
              {student?.school || "School Name"}
            </Typography>
            <Divider sx={{ my: 1, backgroundColor: "#333" }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
                    A/c Code No.:
                  </Typography>
                  <Typography variant="subtitle1">
                    {student?.accountCode || "0915000123456"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
                >
                  <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
                    Voucher No.:
                  </Typography>
                  <Typography variant="subtitle1">
                    {student?.id || "_____________"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Debit and Date Section */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={8}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
                  DEBITED TO:
                </Typography>
                <Typography variant="subtitle1">
                  {student?.name || "_________________________"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
                  Date:
                </Typography>
                <Typography variant="subtitle1">{currentDate}</Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Description Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: "#1976d2", mb: 1 }}>
              Description
            </Typography>
            <Box
              sx={{
                border: "1px solid #1976d2",
                borderRadius: "4px",
                p: 2,
                minHeight: "60px",
              }}
            >
              <Typography variant="body1">
                School fees payment for Academic Year 2024-25
                {student?.standard && student?.division
                  ? ` - Standard ${student.standard}${student.division}`
                  : ""}
              </Typography>
            </Box>
          </Box>

          {/* Payment Details */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#1976d2", width: "150px" }}
              >
                Paid to:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ borderBottom: "1px dotted #1976d2", flex: 1 }}
              >
                {student?.school || "_________________________"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#1976d2", width: "150px" }}
              >
                By Cash / Cheque No.:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ borderBottom: "1px dotted #1976d2", flex: 1 }}
              >
                121421
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#1976d2", width: "150px" }}
              >
                On account of:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ borderBottom: "1px dotted #1976d2", flex: 1 }}
              >
                {student?.standard && student?.division
                  ? `Standard ${student.standard}${student.division} Fees`
                  : "_________________________"}
              </Typography>
            </Box>
          </Box>

          {/* Amount Section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#1976d2", width: "150px" }}
              >
                Rs., in Words:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ borderBottom: "1px dotted #1976d2", flex: 1 }}
              >
                One Hundred and Fifty
              </Typography>
            </Box>

            <Grid container sx={{ mt: 3 }}>
              <Grid item xs={9}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Total Amount
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "right" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ borderBottom: "1px solid #000" }}
                >
                  150/-
                </Typography>
              </Grid>
              <Grid item xs={1} sx={{ textAlign: "right" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ borderBottom: "1px solid #000" }}
                >
                  00
                </Typography>
              </Grid>
            </Grid>

            {/* Signature Section */}
            <Box
              sx={{
                mt: 10,
                pt: 4,
                width: "calc(100% - 40px)",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#1976d2",
                      borderTop: "1px solid #1976d2",
                      pt: 1,
                      textAlign: "center",
                    }}
                  >
                    Sanctioned by
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#1976d2",
                      borderTop: "1px solid #1976d2",
                      pt: 1,
                      textAlign: "center",
                    }}
                  >
                    Accountant
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#1976d2",
                      borderTop: "1px solid #1976d2",
                      pt: 1,
                      textAlign: "center",
                    }}
                  >
                    Receiver's Signature
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </div>
    </Dialog>
  );
};

export default FeeVoucherSample;

// import React from "react";
// import { Box, Grid, Typography, Paper, Dialog, Divider } from "@mui/material";

// const FeeVoucherSample = ({ student, open, onClose }) => {
//   const currentDate = new Date().toLocaleDateString("en-GB");

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth={false}
//       PaperProps={{
//         sx: {
//           width: "900px",
//           height: "60vh",
//           p: 3,
//         },
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           height: "100%",
//           padding: "20px",
//           border: "2px solid #1976d2",
//           backgroundColor: "#fff",
//           boxSizing: "border-box",
//           overflow: "auto",
//         }}
//       >
//         {/* Header Section */}
//         <Box sx={{ mb: 3 }}>
//           <Typography
//             variant="h4"
//             textAlign="center"
//             sx={{
//               color: "#1976d2",
//               fontWeight: "bold",
//               mb: 3,
//             }}
//           >
//             {student?.school || "School Name"}
//           </Typography>
//           <Divider sx={{ my: 1, backgroundColor: "#333" }} />

//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
//                   A/c Code No.:
//                 </Typography>
//                 <Typography variant="subtitle1">
//                   {student?.accountCode || "मी का सांगू"}
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={6}>
//               <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
//                 <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
//                   Voucher No.:
//                 </Typography>
//                 <Typography variant="subtitle1">
//                   {student?.id || "_____________"}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Debit and Date Section */}
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={8}>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
//                 DEBITED TO:
//               </Typography>
//               <Typography variant="subtitle1">
//                 {student?.name || "_________________________"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={4}>
//             <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
//               <Typography variant="subtitle1" sx={{ color: "#1976d2" }}>
//                 Date:
//               </Typography>
//               <Typography variant="subtitle1">{currentDate}</Typography>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Description Section */}
//         <Box sx={{ mb: 3 }}>
//           <Typography variant="subtitle1" sx={{ color: "#1976d2", mb: 1 }}>
//             Description
//           </Typography>
//           <Box
//             sx={{
//               border: "1px solid #1976d2",
//               borderRadius: "4px",
//               p: 2,
//               minHeight: "60px",
//             }}
//           >
//             <Typography variant="body1">
//               School fees payment for Academic Year 2024-25
//               {student?.standard && student?.division
//                 ? ` - Standard ${student.standard}${student.division}`
//                 : ""}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Payment Details */}
//         <Box sx={{ mb: 2 }}>
//           <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//             <Typography
//               variant="subtitle1"
//               sx={{ color: "#1976d2", width: "150px" }}
//             >
//               Paid to:
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{ borderBottom: "1px dotted #1976d2", flex: 1 }}
//             >
//               {student?.school || "_________________________"}
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//             <Typography
//               variant="subtitle1"
//               sx={{ color: "#1976d2", width: "150px" }}
//             >
//               By Cash / Cheque No.:
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{ borderBottom: "1px dotted #1976d2", flex: 1 }}
//             >
//               {/* ______________________ */}121421
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//             <Typography
//               variant="subtitle1"
//               sx={{ color: "#1976d2", width: "150px" }}
//             >
//               On account of:
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{ borderBottom: "1px dotted #1976d2", flex: 1 }}
//             >
//               {student?.standard && student?.division
//                 ? `Standard ${student.standard}${student.division} Fees`
//                 : "_________________________"}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Amount Section */}
//         <Box sx={{ mb: 3 }}>
//           <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//             <Typography
//               variant="subtitle1"
//               sx={{ color: "#1976d2", width: "150px" }}
//             >
//               Rs., in Words:
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{ borderBottom: "1px dotted #1976d2", flex: 1 }}
//             >
//               {/* _________________________________________________ */}
//               देडसो रुपया देगा.
//             </Typography>
//           </Box>

//           <Grid container sx={{ mt: 3 }}>
//             <Grid item xs={9}>
//               <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                 Total Amount
//               </Typography>
//             </Grid>
//             <Grid item xs={2} sx={{ textAlign: "right" }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{ borderBottom: "1px solid #000" }}
//               >
//                 150/-
//               </Typography>
//             </Grid>
//             <Grid item xs={1} sx={{ textAlign: "right" }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{ borderBottom: "1px solid #000" }}
//               >
//                 00
//               </Typography>
//             </Grid>
//           </Grid>

//           {/* Signature Section */}
//           <Box
//             sx={{
//               mt: 10,
//               pt: 4,
//               //   position: "absolute",
//               bottom: "20px",
//               width: "calc(100% - 40px)",
//             }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={4}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     color: "#1976d2",
//                     borderTop: "1px solid #1976d2",
//                     pt: 1,
//                     textAlign: "center",
//                   }}
//                 >
//                   Sanctioned by
//                 </Typography>
//               </Grid>
//               <Grid item xs={4}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     color: "#1976d2",
//                     borderTop: "1px solid #1976d2",
//                     pt: 1,
//                     textAlign: "center",
//                   }}
//                 >
//                   Accountant
//                 </Typography>
//               </Grid>
//               <Grid item xs={4}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     color: "#1976d2",
//                     borderTop: "1px solid #1976d2",
//                     pt: 1,
//                     textAlign: "center",
//                   }}
//                 >
//                   Receiver's Signature
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Paper>
//     </Dialog>
//   );
// };

// export default FeeVoucherSample;
