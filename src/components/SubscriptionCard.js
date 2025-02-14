import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Modal,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const plans = [
  {
    title: "Free",
    price: "0",
    priceInfo: "Free forever for 10 users",
    features: [
      "Unlimited goals, projects, tasks, and forms",
      "Backlog, list, board, timeline, calendar, and summary views",
      "Reports and dashboards",
      "100 automations per site per month",
      "2 GB of storage",
      "Support from Atlassian Community",
      "Up to 10 users",
    ],
    buttonText: "Get it now",
    backgroundColor: "#f4f5f7",
    buttonColor: "primary",
    recommended: false,
  },
  {
    title: "Standard",
    price: "7.16",
    priceInfo: "per user / month",
    features: [
      "Everything from Free plus:",
      "User roles and permissions",
      "External collaboration",
      "Multi-region data residency",
      "1,700 automations per site per month",
      "250 GB of storage",
      "9/5 regional support",
      "Unlimited users",
    ],
    buttonText: "Start free trial",
    backgroundColor: "#ffffff",
    buttonColor: "primary",
    recommended: false,
  },
  {
    title: "Premium",
    price: "12.48",
    priceInfo: "per user / month",
    features: [
      "Everything from Standard plus:",
      "Generate, summarize, and search content with AI",
      "Cross-team planning and dependency management",
      "Customizable approval processes",
      "1,000 per user automation limits",
      "Unlimited storage",
      "24/7 support for critical issues",
      "99.9% uptime SLA",
    ],
    buttonText: "Start free trial",
    backgroundColor: "#f0f4ff",
    buttonColor: "primary",
    recommended: true,
  },
  {
    title: "Enterprise",
    price: "Contact Us",
    priceInfo: "",
    features: [
      "Everything from Premium plus:",
      "Cross-product insights with Atlassian Analytics",
      "Advanced admin controls and security",
      "Enterprise-grade identity and access management",
      "Unlimited automations",
      "Multiple instances (up to 150)",
      "24/7 support for all issues",
      "99.95% uptime SLA",
    ],
    buttonText: "Contact sales",
    backgroundColor: "#f4f5f7",
    buttonColor: "secondary",
    recommended: false,
  },
];

const SubscriptionCard = ({ plan, isAnnually }) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 2,
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.2)",
      },
      backgroundColor: plan.backgroundColor,
      border: plan.recommended ? "2px solid #0070f3" : "none",
    }}
  >
    {plan.recommended && (
      <Box
        sx={{
          backgroundColor: "#0070f3",
          padding: "0.5em",
          textAlign: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "12px",
          }}
        >
          RECOMMENDED
        </Typography>
      </Box>
    )}
    <CardContent sx={{ p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        {plan.title}
      </Typography>
      <Typography
        variant="h4"
        color="textPrimary"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        {plan.price === "Contact Us"
          ? plan.price
          : isAnnually
          ? `₹${(plan.price * 12 * 0.83).toFixed(2)}`
          : `₹${plan.price}`}
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        gutterBottom
        sx={{ fontWeight: 400 }}
      >
        {plan.priceInfo}
      </Typography>

      <Box textAlign="center" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color={plan.buttonColor}
          sx={{
            width: "80%",
            fontWeight: "bold",
            marginTop: 1,
          }}
        >
          {plan.buttonText}
        </Button>
      </Box>

      <Box component="ul" sx={{ paddingLeft: "1.2em", marginBottom: "1em" }}>
        {plan.features.map((feature, index) => (
          <Typography
            component="li"
            variant="body2"
            key={index}
            sx={{ marginBottom: 0.5 }}
          >
            {feature}
          </Typography>
        ))}
      </Box>
    </CardContent>
  </Card>
);

const SubscriptionPlan = ({ schools }) => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openReport, setOpenReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBillingChange = (event) => {
    setBillingCycle(event.target.value);
  };

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Schools : ", filteredSchools);
  const isAnnually = billingCycle === "annually";

  const handleDownload = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const voucherElement = document.getElementById("subscription-content");
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

    const printStyles = `
      @page { size: A4; margin: 15mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .subscription-content { padding: 20px; background-color: white; hright }
        .no-print { display: none; }
      }
    `;

    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Subscription Plans</title>
          <style>${styles}${printStyles}</style>
        </head>
        <body>
          <div class="subscription-content">
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

  //   const handleDownloadSchoolReport = (school) => {
  //     const doc = new jsPDF();

  //     doc.setFontSize(18);
  //     doc.text("School Report", 14, 20);

  //     doc.setFontSize(12);
  //     doc.text(`School Name: ${school.name}`, 14, 40);
  //     doc.text(`City: ${school.city}`, 14, 50);
  //     doc.text(`School Reg No: ${school.schoolRegNo}`, 14, 60);
  //     doc.text(`Address: ${school.address}`, 14, 70);
  //     doc.text(`Contact: ${school.contactNumber}`, 14, 80);
  //     doc.text(`Total Students: ${school.totalStudents}`, 14, 120);
  //     doc.text(`Total Teachers: ${school.totalTeachers}`, 14, 130);
  //     doc.text(`Plan: ${school.plan}`, 14, 90);
  //     doc.text(`Amount: ${school.amount}`, 14, 100);
  //     doc.text(
  //       `Subscription Period: ${school.fromDate} - ${school.toDate}`,
  //       14,
  //       110
  //     );

  //     doc.save(`${school.name}_Report.pdf`);
  //   };

  const handleDownloadSchoolReport = (school) => {
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Subscription Report", 80, 20);

    // School Details Section
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Draw a line under title
    doc.line(10, 25, 200, 25);

    // School Info Table Layout
    const schoolData = [
      ["School Name:", `${school.name}`],
      ["City:", `${school.city}`],
      ["School Reg No:", `${school.schoolRegNo}`],
      ["Address:", `${school.address}`],
      ["Contact:", `${school.contactNumber}`],
      ["Plan:", `${school.plan}`],
      ["Amount:", `${school.amount}`],
      ["Subscription Period:", `${school.fromDate} - ${school.toDate}`],
      ["Total Students:", `${school.totalStudents}`],
      ["Total Teachers:", `${school.totalTeachers}`],
    ];

    let startY = 35;
    schoolData.forEach(([key, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(key, 14, startY);
      doc.setFont("helvetica", "normal");
      doc.text(value.toString(), 70, startY);
      startY += 10;
    });

    // Draw a final line at the bottom
    doc.line(10, startY + 5, 200, startY + 5);

    // Save the PDF
    doc.save(`${school.name}_Report.pdf`);
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Simple, Transparent Pricing for Every Team
        </Typography>

        {/* Radio Button Group */}
        <RadioGroup
          row
          value={billingCycle}
          onChange={handleBillingChange}
          //   sx={{ marginRight: 2 }} // Align to the right of the header
        >
          <FormControlLabel
            value="monthly"
            control={<Radio />}
            label="Monthly"
          />
          <FormControlLabel
            value="annually"
            control={<Radio />}
            label="Annually (Save up to 17%)"
          />
        </RadioGroup>
      </Box>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setOpenReport(true)}
      >
        View Subscription Report
      </Button>

      <Grid container spacing={2} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <SubscriptionCard plan={plan} isAnnually={isAnnually} />
          </Grid>
        ))}
      </Grid>

      {/* Subscription Report Modal */}
      <Modal open={openReport} onClose={() => setOpenReport(false)}>
        <Box
          id="subscription-content"
          sx={{
            p: 2,
            width: "80%",
            margin: "auto",
            mt: 5,
            bgcolor: "white",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={"bold"} sx={{ mb: 2 }}>
              Subscription Report
            </Typography>
            <TextField
              className="no-print"
              sx={{ width: 200 }}
              label="Search by Name"
              size="small"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          {filteredSchools.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "lightgray" }}>
                    <TableCell>
                      <strong>School Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Subscription Plan</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Amount</strong>
                    </TableCell>
                    <TableCell>
                      <strong>From Date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>To Date</strong>
                    </TableCell>
                    <TableCell className="no-print">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSchools.map((school, index) => (
                    <TableRow key={index}>
                      <TableCell>{school.name}</TableCell>
                      <TableCell>{school.plan}</TableCell>
                      <TableCell>₹{school.amount}</TableCell>
                      <TableCell>{school.fromDate}</TableCell>
                      <TableCell>{school.toDate}</TableCell>
                      <TableCell className="no-print">
                        <Download
                          color="primary"
                          titleAccess="Download Report"
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleDownloadSchoolReport(school)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Total Row */}
                  <TableRow
                    sx={{ backgroundColor: "lightgray", fontWeight: "bold" }}
                    className="print-total"
                  >
                    <TableCell colSpan={2} align="right">
                      <strong>Total Amount:</strong>
                    </TableCell>
                    <TableCell>
                      <strong>
                        ₹
                        {filteredSchools
                          .reduce(
                            (acc, school) =>
                              acc +
                              parseFloat(school.amount.replace(/,/g, "") || 0),
                            0
                          )
                          .toLocaleString()}{" "}
                        {/* Converts number back to comma-separated format */}
                      </strong>
                    </TableCell>
                    <TableCell colSpan={3}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography align="center" sx={{ color: "#757575" }}>
              No students found for the selected criteria.
            </Typography>
          )}

          <Grid
            className="no-print"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              color="primary"
              size="small"
              onClick={handleDownload}
              sx={{ mt: 2 }}
            >
              <Download titleAccess="Download All Reports" />
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setOpenReport(false)}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Container>
  );
};

export default SubscriptionPlan;
