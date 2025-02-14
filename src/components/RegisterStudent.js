import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  InputAdornment,
  Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterStudent = ({ schools }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const initialStudentForm = {
    firstName: "",
    middleName: "",
    lastName: "",
    schoolName: "",
    standard: "",
    parentPhoneNumber: "",
    dateOfBirth: "",
    generalRegisterNumber: "",
    udiseNumber: "",
    gender: "",
    caste: "",
    religion: "",
    subcaste: "",
    category: "",
    photograph: null,
    aadhaarCard: null,
    birthCertificate: null,
    leavingCertificate: null,
    transferCertificate: null,
  };

  const initialParentForm = {
    fatherFirstName: "",
    fatherMiddleName: "",
    fatherLastName: "",
    motherFirstName: "",
    motherMiddleName: "",
    motherLastName: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    email: "",
    gender: "",
    occupation: "",
    address: "",
    permanentAddress: "",
    city: "",
    pinCode: "",
    district: "",
    state: "",
    photograph: null,
    panCard: null,
    aadhaarCard: null,
  };

  const [formData, setFormData] = useState(initialStudentForm);
  const [parentFormData, setParentFormData] = useState(initialParentForm);
  const [parentFormVisible, setParentFormVisible] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   // Updating state dynamically based on input field's name attribute
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   setParentFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleFileChange = (e, setState) => {
  //   const { name, files } = e.target;
  //   setState((prev) => ({ ...prev, [name]: files[0] }));
  // };
  const validateForm = (form) =>
    Object.values(form).every((value) => value.trim() !== "");

  const handleStudentSubmit = () => {
    if (validateForm(formData)) {
      const defaultMaleImage = "/images/MaleAvatar.jpg";
      const defaultFemaleImage = "/images/MaleAvatar.jpg";

      const finalFormData = {
        ...formData,
        photograph:
          formData.photograph ||
          (formData.gender === "Male" ? defaultMaleImage : defaultFemaleImage),
      };
      setFormData(initialStudentForm);
      setParentFormVisible(true);
      console.log("Final form Data : ", finalFormData);
      toast.success("Student Details submitted Successfully.");
    } else {
      alert("Please fill in all required fields.");
    }
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      schoolName: "",
      standard: "",
      parentPhoneNumber: "",
      dateOfBirth: "",
      generalRegisterNumber: "",
      udiseNumber: "",
      gender: "",
      caste: "",
      religion: "",
      subcaste: "",
      category: "",
      photograph: null,
      aadhaarCard: null,
      birthCertificate: null,
      leavingCertificate: null,
      transferCertificate: null,
    });
  };

  const handleParentSubmit = () => {
    if (validateForm(parentFormData) && otpVerified) {
      setParentFormData(initialParentForm);
      setParentFormVisible(false);
      setThankYouVisible(true);
      toast.success("Parent Details Submitted Successfully.");
    } else {
      alert(
        "Please fill in all required fields in the parent form and verify OTP."
      );
    }
    setParentFormData({
      fatherFirstName: "",
      fatherMiddleName: "",
      fatherLastName: "",
      motherFirstName: "",
      motherMiddleName: "",
      motherLastName: "",
      phoneNumber: "",
      alternatePhoneNumber: "",
      email: "",
      gender: "",
      occupation: "",
      address: "",
      permanentAddress: "",
      city: "",
      pinCode: "",
      district: "",
      state: "",
      photograph: "",
      panCard: "",
      aadhaarCard: "",
    });
  };

  const handleSendOtp = () => {
    alert("OTP has been sent to your email.");
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp === "123456") {
      setOtpVerified(true);
      alert("OTP verified successfully!");
      setOtpSent(false);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleRegisterAnother = () => {
    setThankYouVisible(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)} // Go one step back in history
      >
        Back to Students
      </Button>
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 3,
          mt: 1,
          border: "1px solid #ccc",
          borderRadius: 4,
          backgroundColor: "#f9f9f9",
        }}
      >
        {thankYouVisible ? (
          <>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              Thank you for submitting your details!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleRegisterAnother}
            >
              Register Another Student
            </Button>
          </>
        ) : parentFormVisible ? (
          <>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              Parent Registration Form
            </Typography>
            {/* <TextField
              label="Father Full Name"
              fullWidth
              margin="normal"
              name="fatherName"
              value={parentFormData.fatherName}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            /> */}
            <Grid container spacing={1} mb={1}>
              {/* Title and Full Name */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Father First Name"
                  name="fatherFirstName"
                  value={parentFormData.fatherFirstName}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setParentFormData)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="fatherMiddleName"
                  value={parentFormData.fatherMiddleName}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setParentFormData)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="fatherLastName"
                  value={parentFormData.fatherLastName}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setParentFormData)}
                  required
                />
              </Grid>
            </Grid>
            {/* <TextField
              label="Mother Full Name"
              fullWidth
              margin="normal"
              name="motherName"
              value={parentFormData.motherName}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            /> */}
            <Grid container spacing={1}>
              {/* Title and Full Name */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Mother First Name"
                  name="motherFirstName"
                  value={parentFormData.motherFirstName}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setParentFormData)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="motherMiddleName"
                  value={parentFormData.motherMiddleName}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setParentFormData)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="motherLastName"
                  value={parentFormData.motherLastName}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setParentFormData)}
                  required
                />
              </Grid>
            </Grid>
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              name="phoneNumber"
              value={parentFormData.phoneNumber}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <TextField
              label="Alternate Mobile Number"
              fullWidth
              margin="normal"
              name="alternatePhoneNumber"
              value={parentFormData.alternatePhoneNumber}
              onChange={(e) => handleChange(e, setParentFormData)}
            />
            <TextField
              label="Email ID"
              fullWidth
              margin="normal"
              name="email"
              value={parentFormData.email}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
              InputProps={{
                endAdornment: otpVerified ? (
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                ) : null,
              }}
            />
            {!otpVerified && (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: 1 }}
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            )}
            {otpSent && !otpVerified && (
              <>
                <TextField
                  label="Enter OTP"
                  fullWidth
                  margin="normal"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </Button>
              </>
            )}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                label="Gender"
                value={parentFormData.gender}
                onChange={(e) => handleChange(e, setParentFormData)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Occupation"
              fullWidth
              margin="normal"
              name="occupation"
              value={parentFormData.occupation}
              onChange={(e) => handleChange(e, setParentFormData)}
            />
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              name="address"
              value={parentFormData.address}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <TextField
              label="Permanent Address"
              fullWidth
              margin="normal"
              name="permanentAddress"
              value={parentFormData.permanentAddress}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <TextField
              label="City"
              fullWidth
              margin="normal"
              name="city"
              value={parentFormData.city}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <TextField
              label="Pincode"
              fullWidth
              margin="normal"
              name="pinCode"
              value={parentFormData.pinCode}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <TextField
              label="State"
              fullWidth
              margin="normal"
              name="state"
              value={parentFormData.state}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <TextField
              label="District"
              fullWidth
              margin="normal"
              name="district"
              value={parentFormData.district}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <TextField
              label="Photograph"
              fullWidth
              margin="normal"
              name="photograph"
              value={parentFormData.photograph}
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <TextField
              label="Aadhar Card"
              fullWidth
              margin="normal"
              name="aadhaarCard"
              value={parentFormData.aadhaarCard}
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <TextField
              label="PAN Card"
              fullWidth
              margin="normal"
              name="panCard"
              value={parentFormData.panCard}
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e, setParentFormData)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleParentSubmit}
            >
              Submit Parent Details
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              Register Student Here
            </Typography>
            <Grid container spacing={1}>
              {/* Title and Full Name */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setFormData)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  name="middleName"
                  value={formData.middleName}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setFormData)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setFormData)}
                  required
                />
              </Grid>
            </Grid>
            {/* <TextField
              label="Student Full Name"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e, setFormData)}
              required
            /> */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                label="Gender"
                value={formData.gender}
                onChange={(e) => handleChange(e, setFormData)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Date of Birth"
              fullWidth
              margin="normal"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange(e, setFormData)}
              required
              type="date"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                inputProps: { max: new Date().toISOString().split("T")[0] },
              }}
            />
            <Grid container spacing={1} mt={0}>
              {/* Title and Full Name */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Religion"
                  name="religion"
                  value={formData.religion}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setFormData)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Caste"
                  name="caste"
                  value={formData.caste}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setFormData)}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} mt={1}>
              {/* Title and Full Name */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Subcaste"
                  name="subcaste"
                  value={formData.subcaste}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setFormData)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={formData.category}
                  // onChange={handleChange}
                  onChange={(e) => handleChange(e, setFormData)}
                  required
                />
              </Grid>
            </Grid>

            <TextField
              label="General Register Number"
              fullWidth
              margin="normal"
              name="generalRegisterNumber"
              value={formData.generalRegisterNumber}
              onChange={(e) => handleChange(e, setFormData)}
              required
            />
            <TextField
              label="UDISE Number"
              fullWidth
              margin="normal"
              name="udiseNumber"
              value={formData.udiseNumber}
              onChange={(e) => handleChange(e, setFormData)}
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>School Name</InputLabel>
              <Select
                name="schoolName"
                label="School Name"
                value={formData.schoolName}
                onChange={(e) => handleChange(e, setFormData)}
              >
                {schools.map((school, index) => (
                  <MenuItem key={index} value={school.name}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Standard</InputLabel>
              <Select
                name="standard"
                label="Standard"
                value={formData.standard}
                onChange={(e) => handleChange(e, setFormData)}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <MenuItem key={i} value={`${i + 1} Std`}>
                    {`${i + 1} Std`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Parent Phone Number"
              fullWidth
              margin="normal"
              name="parentPhoneNumber"
              value={formData.parentPhoneNumber}
              onChange={(e) => handleChange(e, setFormData)}
              required
            />
            <TextField
              label="Photograph"
              fullWidth
              margin="normal"
              name="photograph"
              value={formData.photograph}
              type="file"
              accept="image/*"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e, setFormData)}
              required
            />
            <TextField
              label="Aadhar Card"
              fullWidth
              margin="normal"
              name="aadhaarCard"
              value={formData.aadhaarCard}
              type="file"
              accept="image/*"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e, setFormData)}
              required
            />
            <TextField
              label="Leaving Certificate"
              fullWidth
              margin="normal"
              name="leavingCertificate"
              value={formData.leavingCertificate}
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e, setFormData)}
              required
            />
            <TextField
              label="Transfer Certificate"
              fullWidth
              margin="normal"
              name="transferCertificate"
              value={formData.transferCertificate}
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e, setFormData)}
              required
            />
            <TextField
              label="Birth Certificate"
              fullWidth
              margin="normal"
              name="birthCertificate"
              value={formData.birthCertificate}
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e, setFormData)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleStudentSubmit}
            >
              Register Student
            </Button>
          </>
        )}
        <ToastContainer />
      </Box>
    </>
  );
};

export default RegisterStudent;

// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
//   InputAdornment,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// const RegisterStudent = ({ schools }) => {
//   const initialStudentForm = {
//     name: "",
//     schoolName: "",
//     standard: "",
//     parentPhoneNumber: "",
//     dateOfBirth: "",
//     gender: "",
//   };

//   const initialParentForm = {
//     parentName: "",
//     phoneNumber: "",
//     alternatePhoneNumber: "",
//     email: "",
//     gender: "",
//     occupation: "",
//     address: "",
//     permanentAddress: "",
//     city: "",
//     pinCode: "",
//     district: "",
//     state: "",
//   };

//   const [formData, setFormData] = useState(initialStudentForm);
//   const [parentFormData, setParentFormData] = useState(initialParentForm);
//   const [parentFormVisible, setParentFormVisible] = useState(false);
//   const [thankYouVisible, setThankYouVisible] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [otp, setOtp] = useState("");

//   const handleChange = (e, setState) => {
//     const { name, value } = e.target;
//     setState((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = (form) =>
//     Object.values(form).every((value) => value.trim() !== "");

//   const handleStudentSubmit = () => {
//     if (validateForm(formData)) {
//       setFormData(initialStudentForm);
//       setParentFormVisible(true);
//     } else {
//       alert("Please fill in all required fields.");
//     }
//   };

//   const handleParentSubmit = () => {
//     if (validateForm(parentFormData) && otpVerified) {
//       setParentFormData(initialParentForm);
//       setParentFormVisible(false);
//       setThankYouVisible(true);
//     } else {
//       alert(
//         "Please fill in all required fields in the parent form and verify OTP."
//       );
//     }
//   };

//   const handleSendOtp = () => {
//     // Simulate sending OTP
//     alert("OTP has been sent to your email.");
//     setOtpSent(true);
//   };

//   const handleVerifyOtp = () => {
//     if (otp === "123456") {
//       setOtpVerified(true);
//       alert("OTP verified successfully!");
//       setOtpSent(false); // Hide OTP field after verification
//     } else {
//       alert("Invalid OTP. Please try again.");
//     }
//   };

//   const handleRegisterAnother = () => {
//     setThankYouVisible(false);
//   };

//   const renderTextField = (
//     label,
//     name,
//     value,
//     onChange,
//     type = "text",
//     required = true,
//     endAdornment = null
//   ) => (
//     <TextField
//       label={label}
//       fullWidth
//       margin="normal"
//       name={name}
//       value={value}
//       required={required}
//       type={type}
//       onChange={onChange}
//       InputProps={{ endAdornment }}
//     />
//   );

//   const renderSelect = (
//     label,
//     name,
//     value,
//     onChange,
//     options,
//     required = true
//   ) => (
//     <FormControl fullWidth margin="normal" required={required}>
//       <InputLabel>{label}</InputLabel>
//       <Select name={name} value={value} onChange={onChange}>
//         {options.map((option, index) => (
//           <MenuItem key={index} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );

//   return (
//     <Box sx={{ maxWidth: 600, margin: "0 auto", p: 3 }}>
//       {thankYouVisible ? (
//         <>
//           <Typography
//             variant="h5"
//             gutterBottom
//             align="center"
//             style={{ fontWeight: "bold" }}
//           >
//             Thank you for submitting your details!
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={handleRegisterAnother}
//           >
//             Register Another Student
//           </Button>
//         </>
//       ) : parentFormVisible ? (
//         <>
//           <Typography
//             variant="h5"
//             gutterBottom
//             align="center"
//             style={{ fontWeight: "bold" }}
//           >
//             Parent Registration Form
//           </Typography>
//           {renderTextField(
//             "Parent Full Name",
//             "parentName",
//             parentFormData.parentName,
//             (e) => handleChange(e, setParentFormData)
//           )}
//           {renderTextField(
//             "Phone Number",
//             "phoneNumber",
//             parentFormData.phoneNumber,
//             (e) => handleChange(e, setParentFormData)
//           )}
//           {renderTextField(
//             "Alternate Mobile Number",
//             "alternatePhoneNumber",
//             parentFormData.alternatePhoneNumber,
//             (e) => handleChange(e, setParentFormData),
//             "text",
//             false
//           )}
//           {renderTextField(
//             "Email ID",
//             "email",
//             parentFormData.email,
//             (e) => handleChange(e, setParentFormData),
//             "email",
//             true,
//             otpVerified && (
//               <InputAdornment position="end">
//                 <CheckCircleIcon color="success" />
//               </InputAdornment>
//             )
//           )}
//           {!otpVerified && (
//             <Button
//               variant="outlined"
//               color="primary"
//               fullWidth
//               sx={{ mt: 1 }}
//               onClick={handleSendOtp}
//             >
//               Send OTP
//             </Button>
//           )}
//           {otpSent && !otpVerified && (
//             <>
//               {renderTextField(
//                 "Enter OTP",
//                 "otp",
//                 otp,
//                 (e) => setOtp(e.target.value),
//                 "text",
//                 true
//               )}
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 sx={{ mt: 1 }}
//                 onClick={handleVerifyOtp}
//               >
//                 Verify OTP
//               </Button>
//             </>
//           )}
//           {renderSelect(
//             "Gender",
//             "gender",
//             parentFormData.gender,
//             (e) => handleChange(e, setParentFormData),
//             ["Male", "Female"]
//           )}
//           {renderTextField(
//             "Occupation",
//             "occupation",
//             parentFormData.occupation,
//             (e) => handleChange(e, setParentFormData)
//           )}
//           {renderTextField("Address", "address", parentFormData.address, (e) =>
//             handleChange(e, setParentFormData)
//           )}
//           {renderTextField(
//             "Permanent Address",
//             "permanentAddress",
//             parentFormData.permanentAddress,
//             (e) => handleChange(e, setParentFormData)
//           )}
//           {renderTextField("City", "city", parentFormData.city, (e) =>
//             handleChange(e, setParentFormData)
//           )}
//           {renderTextField("Pin Code", "pinCode", parentFormData.pinCode, (e) =>
//             handleChange(e, setParentFormData)
//           )}
//           {renderTextField(
//             "District",
//             "district",
//             parentFormData.district,
//             (e) => handleChange(e, setParentFormData)
//           )}
//           {renderTextField("State", "state", parentFormData.state, (e) =>
//             handleChange(e, setParentFormData)
//           )}
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={handleParentSubmit}
//           >
//             Submit Parent Details
//           </Button>
//         </>
//       ) : (
//         <>
//           <Typography
//             variant="h4"
//             gutterBottom
//             align="center"
//             style={{ fontWeight: "bold" }}
//           >
//             Register Student Here
//           </Typography>
//           {renderTextField("Student Full Name", "name", formData.name, (e) =>
//             handleChange(e, setFormData)
//           )}
//           {renderSelect(
//             "Gender",
//             "gender",
//             formData.gender,
//             (e) => handleChange(e, setFormData),
//             ["Male", "Female"]
//           )}
//           {renderTextField(
//             "Date of Birth",
//             "dateOfBirth",
//             formData.dateOfBirth,
//             (e) => handleChange(e, setFormData),
//             "date"
//           )}
//           {renderSelect(
//             "School Name",
//             "schoolName",
//             formData.schoolName,
//             (e) => handleChange(e, setFormData),
//             schools.map((school) => school.name)
//           )}
//           {renderSelect(
//             "Standard",
//             "standard",
//             formData.standard,
//             (e) => handleChange(e, setFormData),
//             Array.from({ length: 10 }, (_, i) => `${i + 1} Std`)
//           )}
//           {renderTextField(
//             "Parent Phone Number",
//             "parentPhoneNumber",
//             formData.parentPhoneNumber,
//             (e) => handleChange(e, setFormData)
//           )}
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={handleStudentSubmit}
//           >
//             Register Student
//           </Button>
//         </>
//       )}
//     </Box>
//   );
// };

// export default RegisterStudent;
