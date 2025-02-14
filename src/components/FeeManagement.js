import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import { Print, Download } from "@mui/icons-material";
import FeeVoucher from "./FeeVoucher";
import FeeVoucherSample from "./FeeVoucherSample";

// Sample Data
const initialPayments = [
  {
    id: 1,
    studentName: "John Doe",
    class: "10A",
    amount: 500,
    status: "Paid",
    date: "2025-01-01",
    totalFees: 5000,
    pendingAmount: 0,
    paymentType: "Cash",
  },
  {
    id: 2,
    studentName: "Jane Smith",
    class: "9B",
    amount: 300,
    status: "Unpaid",
    date: "2025-01-02",
    totalFees: 5000,
    pendingAmount: 4700,
    paymentType: "Online Payment",
  },
];

const PaymentReceipt = React.forwardRef(({ payment }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          padding: "10px 0",
        }}
      >
        <h1
          style={{
            margin: "0 0 5px 0",
            fontSize: "24px",
            color: "#333",
          }}
        >
          School Fee Payment Receipt
        </h1>
      </div>
      <Divider style={{ margin: "20px 0" }} />

      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={6}>
          <div style={{ marginBottom: "5px" }}>
            <strong style={{ color: "#555" }}>Receipt No:</strong>
            <span style={{ marginLeft: "10px" }}>{payment.id}</span>
          </div>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <div style={{ marginBottom: "5px" }}>
            <strong style={{ color: "#555" }}>Date:</strong>
            <span style={{ marginLeft: "10px" }}>{payment.date}</span>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div style={{ marginBottom: "5px" }}>
            <strong style={{ color: "#555" }}>Student Name:</strong>
            <span style={{ marginLeft: "10px" }}>{payment.studentName}</span>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div style={{ marginBottom: "5px" }}>
            <strong style={{ color: "#555" }}>Class:</strong>
            <span style={{ marginLeft: "10px" }}>{payment.class}</span>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div style={{ marginBottom: "5px" }}>
            <strong style={{ color: "#555" }}>Amount Paid:</strong>
            <span style={{ marginLeft: "10px" }}>₹{payment.amount}</span>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div style={{ marginBottom: "5px" }}>
            <strong style={{ color: "#555" }}>Pending Amount:</strong>
            <span style={{ marginLeft: "10px" }}>₹{payment.pendingAmount}</span>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div style={{ marginBottom: "5px" }}>
            <strong style={{ color: "#555" }}>Payment Status:</strong>
            <span style={{ marginLeft: "10px" }}>{payment.status}</span>
          </div>
        </Grid>
      </Grid>

      <Divider style={{ margin: "30px 0" }} />

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          padding: "20px 0",
        }}
      >
        <p
          style={{
            margin: "0",
            fontSize: "16px",
            color: "#666",
          }}
        >
          🤗 Thank you for your payment 🤗
        </p>
      </div>
    </div>
  );
});

const FeeManagement = ({ schools, students }) => {
  const [payments, setPayments] = useState(initialPayments);
  const [newPayment, setNewPayment] = useState({
    studentName: "",
    class: "",
    amount: "",
    status: "Paid",
    date: "",
    totalFees: 5000, // Default total fees
    pendingAmount: 5000,
    paymentType: "",
    chequeNumber: "",
    paymentResource: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const componentRef = useRef();
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [isSampleVoucherOpen, setIsSampleVoucherOpen] = useState(false);

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

  // Handle Input Change for Add Payment Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment((prev) => {
      const updated = { ...prev, [name]: value };

      // Calculate pending amount when amount changes
      if (name === "amount") {
        const amountPaid = parseFloat(value) || 0;
        const pendingAmount = Math.max(0, prev.totalFees - amountPaid);
        return { ...updated, pendingAmount };
      }

      return updated;
    });
  };

  // Handle Add Payment
  const handleAddPayment = () => {
    const payment = {
      ...newPayment,
      id: payments.length + 1,
      amount: parseFloat(newPayment.amount),
      studentName: selectedStudent.name,
      class: `${selectedStudent.standard}-${selectedStudent.division}`,
    };

    setPayments([...payments, payment]);
    setOpenPaymentDialog(false);
    setNewPayment({
      studentName: "",
      class: "",
      amount: "",
      status: "Paid",
      date: "",
      totalFees: 5000,
      pendingAmount: 5000,
      paymentType: "",
      chequeNumber: "",
      paymentResource: "",
    });
  };

  const handleVoucherClick = (student) => {
    setSelectedStudent(student);
    setIsVoucherOpen(true);
  };

  const handleSampleVoucherClick = (student) => {
    setSelectedStudent(student);
    setIsSampleVoucherOpen(true);
  };

  // Open Payment Dialog
  const handleOpenPaymentDialog = (student) => {
    setSelectedStudent(student);
    const existingPayments = payments.filter(
      (p) =>
        p.studentName === student.name &&
        p.class === `${student.standard}-${student.division}`
    );

    const totalPaid = existingPayments.reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = Math.max(0, 5000 - totalPaid); // 5000 is default total fees

    setNewPayment({
      studentName: student.name,
      class: `${student.standard}-${student.division}`,
      amount: "",
      status: "Paid",
      date: "",
      totalFees: 5000,
      pendingAmount,
      paymentType: "",
      chequeNumber: "",
      paymentResource: "",
    });
    setOpenPaymentDialog(true);
  };

  // Open Receipt Dialog
  const openReceipt = (payment) => {
    setSelectedPayment(payment);
    setOpenReceiptDialog(true);
  };

  //Updated  download receipt function
  const downloadReceipt = () => {
    const receiptWindow = window.open("", "", "width=800,height=600");
    const receiptContent = componentRef.current.innerHTML;

    receiptWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          @media print {
            body {
              padding: 40px;
              font-family: Arial, sans-serif;
            }
            .receipt-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            @page {
              size: A4;
              margin: 20mm;
            }
            h1 {
              margin: 0 0 10px 0;
              font-size: 24px;
              color: #333;
            }
            .divider {
              border-top: 1px solid #ddd;
              margin: 20px 0;
            }
            .grid-container {
              margin-top: 20px;
            }
            .grid-item {
              margin-bottom: 15px;
            }
            .label {
              color: #555;
              font-weight: bold;
            }
            .value {
              margin-left: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding: 20px 0;
              font-size: 16px;
              color: #666;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          ${receiptContent}
        </div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          }
        </script>
      </body>
    </html>
  `);

    receiptWindow.document.close();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Student Fees Report
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
                onClick={() => handleSampleVoucherClick(student)}
              >
                Sample Voucher
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ mr: 1 }}
                onClick={() => handleVoucherClick(student)}
              >
                Voucher
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleOpenPaymentDialog(student)}
              >
                Add Payment
              </Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography align="center" sx={{ color: "#757575" }}>
          No students found for the selected criteria.
        </Typography>
      )}
      {/* Fee Payment History */}
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={"bold"} gutterBottom>
            Fee Payment History
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Student Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Class</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Pending Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Payment Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.studentName}</TableCell>
                    <TableCell>{payment.class}</TableCell>
                    <TableCell>₹{payment.amount}</TableCell>
                    <TableCell>₹{payment.pendingAmount}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.paymentType}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => openReceipt(payment)}
                      >
                        <Print sx={{ mr: 1 }} /> Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {/* Payment Dialog */}
      {/* <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle fontWeight={"bold"}>Add Fee Payment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student Name"
                value={selectedStudent?.name || ""}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Class"
                value={
                  selectedStudent
                    ? `${selectedStudent.standard}-${selectedStudent.division}`
                    : ""
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Amount"
                name="amount"
                required
                value={newPayment.amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 0) {
                    handleInputChange(e);
                  }
                }}
                // onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pending Amount"
                value={`₹${newPayment.pendingAmount}`}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={newPayment.status}
                onChange={handleInputChange}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                name="date"
                required
                value={newPayment.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { max: new Date().toISOString().split("T")[0] },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPayment}
          >
            Add Payment
          </Button>
        </DialogActions>
      </Dialog> */}
      {/* Payment Dialog */}
      <Dialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle fontWeight={"bold"}>Add Fee Payment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student Name"
                value={selectedStudent?.name || ""}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Class"
                value={
                  selectedStudent
                    ? `${selectedStudent.standard}-${selectedStudent.division}`
                    : ""
                }
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Amount"
                name="amount"
                required
                value={newPayment.amount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) >= 0) {
                    handleInputChange(e);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Pending Amount"
                value={`₹${newPayment.pendingAmount}`}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={newPayment.status}
                onChange={handleInputChange}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                name="date"
                required
                value={newPayment.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputProps: { max: new Date().toISOString().split("T")[0] },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Payment Type"
                name="paymentType"
                value={newPayment.paymentType}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </TextField>
            </Grid>

            {/* Conditionally Render Fields */}
            {newPayment.paymentType === "Cheque" && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Cheque Number"
                  name="chequeNumber"
                  value={newPayment.chequeNumber || ""}
                  onChange={handleInputChange}
                />
              </Grid>
            )}
            {newPayment.paymentType === "Online" && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Payment Resource"
                  name="paymentResource"
                  placeholder="e.g., GPay, PhonePe"
                  value={newPayment.paymentResource || ""}
                  onChange={handleInputChange}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPaymentDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPayment}
          >
            Add Payment
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
        <DialogTitle fontWeight={"bold"}>Payment Receipt</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <PaymentReceipt ref={componentRef} payment={selectedPayment} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReceiptDialog(false)} color="secondary">
            Close
          </Button>
          <Button
            onClick={downloadReceipt}
            color="primary"
            startIcon={<Download />}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
      {selectedStudent && (
        <FeeVoucher
          student={selectedStudent}
          school={selectedSchool}
          open={isVoucherOpen}
          onClose={() => setIsVoucherOpen(false)}
        />
      )}
      {selectedStudent && (
        <FeeVoucherSample
          student={selectedStudent}
          school={selectedSchool}
          open={isSampleVoucherOpen}
          onClose={() => setIsSampleVoucherOpen(false)}
        />
      )}
    </>
  );
};

export default FeeManagement;
