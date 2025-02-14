import React, { useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  List,
  Menu,
  Modal,
  Paper,
  IconButton,
} from "@mui/material";
import {
  ExpandMore,
  Close,
  Download,
  SchoolOutlined,
  TransferWithinAStationOutlined,
  VerifiedUserOutlined,
  Print,
} from "@mui/icons-material";
import { format, isValid } from "date-fns";
import Marksheet from "./Marksheet";
import MarksheetPreview from "./MarksheetPreview";

// Helper function to safely format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isValid(date) ? format(date, "dd MMMM yyyy") : "N/A";
};

// Certificate Modal Style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "700px",
  width: "100%",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const LeavingCertificate = ({ student, school }) => (
  <Box
    className="certificate-container leaving-certificate"
    sx={{ border: "5px solid #333", padding: 3, borderRadius: 3 }}
  >
    {/* Header Section */}
    <Grid container spacing={2} alignItems="center" className="mb-6">
      <Grid item xs={3}>
        <img
          src={student?.schoolLogo || "/images/Sanshraya.png"}
          alt="School Logo"
          width={"130px"}
          height={"100px"}
          //   className="w-20 h-20 object-contain"
        />
      </Grid>
      <Grid item xs={9}>
        <Typography
          variant="h4"
          textAlign={"center"}
          color="#333"
          fontWeight={"bold"}
        >
          {student?.school || "School Name"}
        </Typography>
        <Typography variant="subtitle1" textAlign={"center"}>
          {school?.address || "123 Main St, New York, NY 10001"}
        </Typography>
      </Grid>
    </Grid>

    <Divider sx={{ my: 2, backgroundColor: "black" }} />

    {/* School Details */}
    <Grid container justifyContent="space-between" mb={2}>
      <Grid item>
        <Typography>
          <strong>School Register No:</strong>{" "}
          {school?.schoolRegNo || "REG123456"}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          <strong>Contact:</strong> {school?.contactNumber || "1234567890"}
        </Typography>
      </Grid>
    </Grid>

    <Divider sx={{ my: 2, backgroundColor: "black" }} />

    <Grid container spacing={2} mt={2}>
      <Grid item xs={6}>
        <Typography fontSize={18} mb={2}>
          <strong>Student Full Name:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Father's Name:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Date of Birth:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Nationality:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Religion:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Date of Admission:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Class Admitted:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Current Class:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Date of Leaving:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Reason for Leaving:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Progress:</strong>
        </Typography>
        <Typography fontSize={18} mb={2}>
          <strong>Remarks:</strong>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography fontSize={18} mb={2}>
          {student?.name || "N/A"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {student?.fatherName || "N/A"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {formatDate(student?.dob) || "N/A"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {student?.nationality || "Indian"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {student?.religion || "Hindu"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {formatDate(student?.admissionDate) || "N/A"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {student?.standard || "N/A"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {student?.standard || "N/A"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {formatDate(new Date().toISOString())}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {student?.leavingReason || "Passed And Going elsewhere"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {student?.progress || "Satisfactory"}
        </Typography>
        <Typography fontSize={18} mb={2}>
          {"Good"}
        </Typography>
      </Grid>
    </Grid>

    <Divider sx={{ mt: 2, backgroundColor: "black" }} />

    {/* Signature Section */}
    <Grid
      container
      justifyContent="space-between"
      alignItems="flex-end"
      sx={{ mt: 8 }}
    >
      <Grid item xs={4} className="text-center">
        <Divider sx={{ mt: 8, mb: 2, backgroundColor: "black" }} />
        <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
          Clerk's Signature
        </Typography>
      </Grid>

      <Grid item xs={4} className="text-center">
        <Divider sx={{ mt: 8, mb: 2, backgroundColor: "black" }} />
        <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
          Principal's Signature
        </Typography>
      </Grid>
    </Grid>

    <Grid
      container
      justifyContent="space-between"
      alignItems="flex-end"
      sx={{ mt: 1 }}
    >
      <Grid item xs={5} mt={1}>
        <Typography>
          <strong>Place:</strong> {""}
          <br />
          <strong>Date of Issue:</strong> {formatDate(new Date().toISOString())}
        </Typography>
      </Grid>
      <Grid item xs={4} mt={5}>
        <Typography textAlign={"center"}>School Seal</Typography>
      </Grid>
    </Grid>
  </Box>
);

const TransferCertificate = ({ student, school }) => (
  <Box
    className="certificate-container transfer-certificate"
    sx={{
      border: "6px solid #4CAF50",
      padding: 4,
      borderRadius: 4,
      backgroundColor: "#fff",
    }}
  >
    {/* Header Section */}
    <Box textAlign="center" mb={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#2E7D32", marginBottom: 1 }}
      >
        Transfer Certificate
      </Typography>
      <Typography variant="h5" sx={{ color: "#455A64" }}>
        {student?.school || "School Name"}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "#607D8B" }}>
        {school?.address || "123 Main St, New York, NY 10001"}
      </Typography>
    </Box>

    <Divider sx={{ backgroundColor: "#2E7D32", marginBottom: 3 }} />

    {/* Certificate Details */}
    <Box sx={{ marginBottom: 6 }}>
      <Typography variant="body1" sx={{ marginBottom: 2, fontSize: 16 }}>
        This is to certify that{" "}
        <strong>{student?.name || "Student Name"}</strong>, son/daughter of{" "}
        <strong>{student?.fatherName || "..."}</strong>, has been a student of
        this institution from{" "}
        <strong>{formatDate(student?.admissionDate || "2023-06-01")}</strong> to{" "}
        <strong>
          {formatDate(student?.leavingDate || new Date().toISOString())}
        </strong>
        .
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: 2, fontSize: 18 }}>
        During this period, the student was in{" "}
        <strong>{student?.standard || "N/A"}</strong>, division{" "}
        <strong>{student?.division || "A"}</strong>.
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: 2, fontSize: 18 }}>
        All dues and fees have been cleared. This certificate is issued upon
        their request.
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: 2, fontSize: 18 }}>
        The student's conduct and progress were reported as{" "}
        <strong>{student?.progress || "Satisfactory"}</strong>.
      </Typography>
    </Box>

    <Divider sx={{ backgroundColor: "#2E7D32", marginBottom: 10 }} />

    {/* Signature Section */}
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item xs={6}>
        <Typography>
          <strong>Place:</strong> {school?.city || "City"}
        </Typography>
        <Typography>
          <strong>Date of Issue:</strong>{" "}
          <span>{formatDate(new Date().toISOString())}</span>
        </Typography>
      </Grid>
      <Grid item xs={5} textAlign="center">
        <Divider sx={{ backgroundColor: "#2E7D32", marginBottom: 2 }} />
        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
          Principal's Signature
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

const BonafideCertificate = ({ student }) => (
  <Box
    className="certificate-container bonafide-certificate"
    sx={{
      maxWidth: 800,
      margin: "auto",
      backgroundColor: "#fff",
      border: "8px solid #D1C4E9",
      borderRadius: "16px",
      padding: 4,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    }}
  >
    {/* Header Section */}
    <Box className="text-center mb-6" textAlign="center" mb={6}>
      <Typography
        variant="h4"
        className="font-bold text-purple-800 mb-2"
        sx={{ color: "#6A1B9A", fontWeight: "bold", marginBottom: 2 }}
      >
        Bonafide Certificate
      </Typography>
      <Typography
        variant="h5"
        className="text-gray-700"
        sx={{ color: "#4E4E4E" }}
      >
        {student?.school || "[School Name]"}
      </Typography>
    </Box>

    <Divider sx={{ backgroundColor: "black" }} />

    {/* Certificate Content */}
    <Box sx={{ marginTop: 5, lineHeight: 1.8 }}>
      <Typography>
        This is to certify that{" "}
        <strong>{student?.name || "[Student Name]"}</strong>, son/daughter of{" "}
        <strong>{student?.fatherName || "[Father's Name]"}</strong>, is a
        bonafide student of this institution. He/She is currently studying in{" "}
        <strong>Standard {student?.standard || "N/A"}</strong>, Division{" "}
        <strong>{student?.division || "N/A"}</strong>.
      </Typography>
      <Typography>
        Date of Birth: <strong>{formatDate(student?.dob)}</strong>
      </Typography>
      <Typography>
        This certificate is issued upon request for{" "}
        {student?.gender === "M" ? "his" : "her"} reference.
      </Typography>
    </Box>

    {/* Footer Section */}
    <Box
      className="mt-12 flex justify-between items-end"
      sx={{
        marginTop: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Typography sx={{ fontSize: 16 }}>
        <strong>Place:</strong> <br />
        <strong>Date:</strong> {format(new Date(), "dd/MM/yyyy")}
      </Typography>
      <Box className="text-center" textAlign="center">
        <Divider
          sx={{
            backgroundColor: "#6A1B9A",
            marginBottom: 1,
            width: 120,
            height: 2,
            marginX: "auto",
          }}
        />
        <Typography
          className="mt-8"
          sx={{ fontSize: 16, fontWeight: "bold", color: "#6A1B9A" }}
        >
          Principal's Signature
        </Typography>
      </Box>
    </Box>
  </Box>
);

const StudentCertificate = ({ schools, students }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

  // Menu state
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Modal states
  const [leavingCertOpen, setLeavingCertOpen] = useState(false);
  const [transferCertOpen, setTransferCertOpen] = useState(false);
  const [bonafideCertOpen, setBonafideCertOpen] = useState(false);
  const [isMarksheetOpen, setIsMarksheetOpen] = useState(false);
  const [isMarksheetPreviewOpen, setIsMarksheetPreviewOpen] = useState(false);

  // Get unique standards and divisions
  const standards = Array.from(
    new Set(
      students
        .filter((student) => student.school === selectedSchool)
        .map((student) => student.standard)
    )
  );

  const divisions = Array.from(
    new Set(
      students
        .filter(
          (student) =>
            student.school === selectedSchool &&
            student.standard === selectedStandard
        )
        .map((student) => student.division)
    )
  );

  // Filtered students based on selected filters and search term
  const filteredStudents = students.filter(
    (student) =>
      student.school === selectedSchool &&
      student.standard === selectedStandard &&
      student.division === selectedDivision &&
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarksheetClick = (student) => {
    setSelectedStudent(student);
    setIsMarksheetOpen(true);
  };

  const handleAllMarksheetsPrint = () => {
    setIsMarksheetPreviewOpen(true);
  };

  const handleCertificateClick = (event, student) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedStudent(student);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleDownload = (type) => {
    // Create a new iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // Get the appropriate certificate content and styles
    let certificateElement;
    if (type === "leaving") {
      certificateElement = document.getElementById("leaving-certificate");
    } else if (type === "transfer") {
      certificateElement = document.getElementById("transfer-certificate");
    } else if (type === "bonafide") {
      certificateElement = document.getElementById("bonafide-certificate");
    }

    // Get all stylesheets from the main document
    const styleSheets = Array.from(document.styleSheets);
    let styles = "";

    // Extract styles from all stylesheets
    styleSheets.forEach((styleSheet) => {
      try {
        const rules = Array.from(styleSheet.cssRules || styleSheet.rules);
        rules.forEach((rule) => {
          styles += rule.cssText;
        });
      } catch (e) {
        // Handle cross-origin stylesheet errors
        console.warn("Could not load stylesheet rules");
      }
    });

    // Additional print-specific styles
    const printStyles = `
      @page {
        size: A4;
        margin: 20mm;
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
      .certificate-content {
        width: 100% !important;
        padding: 20px !important;
        box-sizing: border-box !important;
      }
    `;

    // Get computed styles of the certificate
    const computedStyles = window.getComputedStyle(certificateElement);
    let elementStyles = "";
    for (let i = 0; i < computedStyles.length; i++) {
      const style = computedStyles[i];
      elementStyles += `${style}: ${computedStyles.getPropertyValue(style)};\n`;
    }

    // Create the print document
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Certificate</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <style>
            ${styles}
            ${printStyles}
            .certificate-to-print {
              ${elementStyles}
            }
          </style>
        </head>
        <body>
          <div class="certificate-content certificate-to-print">
            ${certificateElement.outerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.frameElement.remove();
              };
            }
          </script>
        </body>
      </html>
    `);
    iframeDoc.close();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Student Certificates
        </Typography>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <TextField
            sx={{ width: 200 }}
            label="Search by Name"
            size="small"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />

      <Grid container spacing={1} sx={{ mb: 1, mt: 1 }}>
        <Grid item xs={6} sm={4}>
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

      {/* Students List */}
      {filteredStudents.length > 0 ? (
        <>
          <Grid
            item
            xs={6}
            sm={3}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={handleAllMarksheetsPrint}
              startIcon={<Print />}
            >
              All Students Marksheet
            </Button>
          </Grid>
          <List>
            {filteredStudents.map((student) => (
              <ListItem
                key={student.id}
                sx={{
                  borderBottom: "1px solid #ccc",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { background: "#f5f5f5" },
                  backgroundColor: "white",
                }}
              >
                <ListItemText
                  primary={student.name}
                  secondary={`Standard: ${student.standard}, Division: ${student.division}`}
                />

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => handleMarksheetClick(student)}
                >
                  Marksheet
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={(e) => handleCertificateClick(e, student)}
                  endIcon={<ExpandMore />}
                >
                  Certificates
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography align="center" sx={{ color: "#757575" }}>
          No students found for the selected criteria.
        </Typography>
      )}

      {/* Certificate Options Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setLeavingCertOpen(true);
            handleMenuClose();
          }}
        >
          <SchoolOutlined sx={{ mr: 1 }} /> Leaving Certificate
        </MenuItem>
        <MenuItem
          onClick={() => {
            setTransferCertOpen(true);
            handleMenuClose();
          }}
        >
          <TransferWithinAStationOutlined sx={{ mr: 1 }} /> Transfer Certificate
        </MenuItem>
        <MenuItem
          onClick={() => {
            setBonafideCertOpen(true);
            handleMenuClose();
          }}
        >
          <VerifiedUserOutlined sx={{ mr: 1 }} /> Bonafide Certificate
        </MenuItem>
      </Menu>

      {/* Certificate Modals */}
      {/* Leaving Certificate Modal */}
      <Modal open={leavingCertOpen} onClose={() => setLeavingCertOpen(false)}>
        <Paper sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            {/* <Typography variant="h6">Leaving Certificate Preview</Typography> */}
            <Box>
              <IconButton
                onClick={() => handleDownload("leaving")}
                title="Download"
              >
                <Download />
              </IconButton>
              <IconButton
                onClick={() => setLeavingCertOpen(false)}
                title="Close"
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
          <div id="leaving-certificate">
            <LeavingCertificate
              student={selectedStudent}
              school={selectedSchool}
            />
          </div>
        </Paper>
      </Modal>

      {/* Transfer Certificate Modal */}
      <Modal open={transferCertOpen} onClose={() => setTransferCertOpen(false)}>
        <Paper sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            {/* <Typography variant="h6">Transfer Certificate Preview</Typography> */}
            <Box>
              <IconButton
                onClick={() => handleDownload("transfer")}
                title="Download"
              >
                <Download />
              </IconButton>
              <IconButton
                onClick={() => setTransferCertOpen(false)}
                title="Close"
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
          <div id="transfer-certificate">
            <TransferCertificate student={selectedStudent} />
          </div>
        </Paper>
      </Modal>

      {/* Bonafide Certificate Modal */}
      <Modal open={bonafideCertOpen} onClose={() => setBonafideCertOpen(false)}>
        <Paper sx={modalStyle}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            {/* <Typography variant="h6">Bonafide Certificate Preview</Typography> */}
            <Box>
              <IconButton
                onClick={() => handleDownload("bonafide")}
                title="Download"
              >
                <Download />
              </IconButton>
              <IconButton
                onClick={() => setBonafideCertOpen(false)}
                title="Close"
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
          <div id="bonafide-certificate">
            <BonafideCertificate student={selectedStudent} />
          </div>
        </Paper>
      </Modal>

      {selectedStudent && (
        <Marksheet
          student={selectedStudent}
          open={isMarksheetOpen}
          onClose={() => setIsMarksheetOpen(false)}
        />
      )}

      <MarksheetPreview
        students={[
          {
            id: "1",
            name: "Alice",
            standard: 5,
            division: "A",
            school: "XYZ School",
          },
          {
            id: "2",
            name: "Bob",
            standard: 6,
            division: "B",
            school: "XYZ School",
          },
        ]}
        open={isMarksheetPreviewOpen}
        onClose={() => setIsMarksheetPreviewOpen(false)}
      />
    </>
  );
};

export default StudentCertificate;
