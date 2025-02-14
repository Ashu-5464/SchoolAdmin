import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RegisterStudent from "./components/RegisterStudent";
import RegisterSchool from "./components/RegisterSchool";
import SchoolList from "./components/SchoolList";
import StudentsList from "./components/StudentsList";
import EnquiryForm from "./components/EnquiryForm";
import Dashboard from "./components/Dashboard";
import RegisterTeacher from "./components/RegisterTeacher";
import EventManagement from "./components/EventManagement";
import EventList from "./components/EventList";
import DisplayNotification from "./components/DisplayNotification";
import OfficeStaffRegistration from "./components/OfficeStaffRegistration";
import Reports from "./components/Reports";
import CalendarComponent from "./components/CalendarComponent";
import AttendanceComponent from "./components/AttendanceComponent";
import CommitteeRegistrationForm from "./components/CommitteeRegistrationForm";
import Examination from "./components/Examination";
import LibraryManagement from "./components/LibraryManagement";
import StudentsIDCard from "./components/StudentIDCard";
import FeeManagement from "./components/FeeManagement";
import StudentPromotion from "./components/StudentPromotion";
import StudentCertificate from "./components/certificatePages/StudentCertificate";
import TeacherCertificates from "./components/certificatePages/TeacherCertificates";
import SendNotification from "./components/SendNotification";
import HomeWork from "./components/HomeWork";
import ViewHomework from "./components/ViewHomework";
import SubscriptionPlan from "./components/SubscriptionCard";
import SoftwareAppEnquiry from "./components/SoftwareAppEnquiry";
import PreviousStudentsList from "./components/PreviousStudentsList";

const schools = [
  {
    id: 1,
    name: "ABC High School",
    city: "New York",
    schoolRegNo: "REG123456",
    address: "123 Main St, New York, NY 10001",
    contactNumber: "(212) 555-1234",
    totalStudents: 1250,
    totalTeachers: 50,
    plan: "Premium",
    amount: "12,480",
    fromDate: "2024-01-01",
    toDate: "2024-12-31",
  },
  {
    id: 2,
    name: "XYZ Public School",
    city: "Los Angeles",
    schoolRegNo: "REG456789",
    address: "456 Elm St, Los Angeles, CA 90001",
    contactNumber: "(310) 555-5678",
    totalStudents: 1050,
    totalTeachers: 45,
    plan: "Standard",
    amount: "7,160",
    fromDate: "2024-02-01",
    toDate: "2025-01-31",
  },
];

const students = [
  {
    id: 1,
    name: "John Doe",
    standard: "10",
    dob: "08 June 2003",
    division: "A",
    school: "ABC High School",
    contactNo: "1234567890",
    subjects: [
      { subject: "Math", marks: 95, grade: "A" },
      { subject: "Science", marks: 89, grade: "B" },
      { subject: "English", marks: 75, grade: "C" },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    standard: "9",
    division: "B",
    dob: "12 July 2004",
    school: "XYZ Public School",
    contactNo: "9876543210",
    subjects: [
      { subject: "Math", marks: 85, grade: "B" },
      { subject: "Science", marks: 92, grade: "A" },
      { subject: "English", marks: 60, grade: "C" },
    ],
  },
  {
    id: 3,
    name: "Alice Brown",
    standard: "10",
    division: "A",
    dob: "15 MAy 2003",
    school: "ABC High School",
    contactNo: "1234567890",
    subjects: [
      { subject: "Math", marks: 78, grade: "C" },
      { subject: "Science", marks: 91, grade: "A" },
      { subject: "English", marks: 85, grade: "B" },
    ],
  },
  {
    id: 4,
    name: "Bob White",
    standard: "8",
    division: "C",
    dob: "25 August 2005",
    school: "XYZ Public School",
    contactNo: "9876543210",
    subjects: [
      { subject: "Math", marks: 65, grade: "C" },
      { subject: "Science", marks: 80, grade: "B" },
      { subject: "English", marks: 88, grade: "B" },
    ],
  },
  {
    id: 5,
    name: "Rushi Dudhane",
    standard: "4",
    division: "A",
    dob: "06 July 2009",
    school: "ABC High School",
    contactNo: "8446702331",
    subjects: [
      { subject: "Math", marks: 95, grade: "A" },
      { subject: "Science", marks: 85, grade: "B" },
      { subject: "English", marks: 92, grade: "A" },
    ],
  },
  {
    id: 6,
    name: "Ashu Dudhane",
    standard: "4",
    division: "A",
    dob: "06 July 2009",
    school: "ABC High School",
    contactNo: "8446702331",
    subjects: [
      { subject: "Math", marks: 95, grade: "A" },
      { subject: "Science", marks: 85, grade: "B" },
      { subject: "English", marks: 92, grade: "A" },
    ],
  },
];

const parents = [
  {
    studentId: 1,
    name: "Michael Doe",
    contact: "1234567890",
    address: "New York, NY",
  },
  {
    studentId: 1,
    name: "Sarah Doe",
    contact: "9876543210",
    address: "New York, NY",
  },
  {
    studentId: 2,
    name: "Robert Smith",
    contact: "1231231234",
    address: "Los Angeles, CA",
  },
  {
    studentId: 2,
    name: "Emma Smith",
    contact: "3213214321",
    address: "Los Angeles, CA",
  },
  {
    studentId: 3,
    name: "James Brown",
    contact: "4564564567",
    address: "New York, NY",
  },
  {
    studentId: 3,
    name: "Laura Brown",
    contact: "6546546543",
    address: "New York, NY",
  },
  {
    studentId: 4,
    name: "William White",
    contact: "7897897891",
    address: "Los Angeles, CA",
  },
  {
    studentId: 4,
    name: "Olivia White",
    contact: "9879879872",
    address: "Los Angeles, CA",
  },
];

const teachers = [
  {
    id: "1",
    employeeId: 1,
    schoolId: "1",
    name: "Alice Johnson",
    qualification: "M.Sc Physics",
    experience: 10,
    designation: "Teacher",
    type: "Teaching",
    dateOfJoining: "2015-08-10",
    standards: ["1st", "2nd", "3rd"],
    divisions: [["A", "B"], ["C"], ["A", "D"]],
    subjects: {
      "1st": ["Physics", "Maths"],
      "2nd": ["Science", "Maths"],
      "3rd": ["Maths", "Science"],
    },
    department: "Physics",
    accountNo: "1234567890",
    panNo: "ABCDE1234F",
    basicSalary: 50000,
    pf: 5000,
    da: 3000,
    hra: 8000,
    tds: 2000,
    professionalTax: 1500,
    otherAllowance: 2000,
    otherDeduction: 1000,
    netSalary: 57000,
  },
  {
    id: "2",
    employeeId: 2,
    schoolId: "1",
    name: "Bob Smith",
    qualification: "B.Ed",
    experience: 5,
    designation: "Clerk",
    type: "Non-Teaching",
    dateOfJoining: "2019-03-15",
    standards: ["5th", "6th", "7th"],
    divisions: [["A"], ["B", "C"], ["D"]],
    subjects: {
      "5th": ["Library Science"],
      "6th": ["Record Keeping"],
      "7th": ["Exam Supervision"],
    },
    department: "Administration",
    accountNo: "9876543210",
    panNo: "XYZAB6789P",
    basicSalary: 30000,
    pf: 3000,
    da: 2000,
    hra: 5000,
    tds: 1000,
    professionalTax: 1200,
    otherAllowance: 1500,
    otherDeduction: 500,
    netSalary: 60000,
  },
  {
    id: "3",
    employeeId: 3,
    schoolId: "2",
    name: "Rushi D",
    qualification: "BE",
    experience: 5,
    designation: "Sports coach",
    type: "Teaching",
    dateOfJoining: "2017-09-20",
    standards: ["8th", "9th", "10th"],
    divisions: [["A", "B"], ["C"], ["A"]],
    subjects: {
      "8th": ["Maths", "Science"],
      "9th": ["Maths", "Physics"],
      "10th": ["Chemistry", "Physics"],
    },
    department: "Sports",
    accountNo: "2345678901",
    panNo: "GHIKL3456R",
    basicSalary: 40000,
    pf: 4000,
    da: 2500,
    hra: 6000,
    tds: 1500,
    professionalTax: 1000,
    otherAllowance: 1800,
    otherDeduction: 600,
    netSalary: 42900,
  },
  {
    id: "4",
    employeeId: 4,
    schoolId: "1",
    name: "Ashu D",
    qualification: "B.Ed",
    experience: 6,
    designation: "Teaching assistant",
    type: "Teaching",
    dateOfJoining: "2018-03-15",
    standards: ["5th", "4th", "7th"],
    divisions: [["B", "C"], ["A"], ["D"]],
    subjects: {
      "5th": ["Maths", "Science"],
      "4th": ["Science", "Maths"],
      "7th": ["Maths", "Geography"],
    },
    department: "Mathematics",
    accountNo: "3456789012",
    panNo: "MNOPQ7890A",
    basicSalary: 35000,
    pf: 3500,
    da: 2200,
    hra: 5500,
    tds: 1300,
    professionalTax: 1100,
    otherAllowance: 1700,
    otherDeduction: 700,
    netSalary: 42900,
  },
  {
    id: "5",
    employeeId: 5,
    schoolId: "2",
    name: "Baby Johnson",
    qualification: "M.Sc",
    experience: 9,
    designation: "Academic coordinator",
    type: "Teaching",
    dateOfJoining: "2016-06-13",
    standards: ["3rd", "5th", "8th"],
    divisions: [["A"], ["B"], ["C"]],
    subjects: {
      "3rd": ["Marathi", "Hindi"],
      "5th": ["Science", "Maths"],
      "8th": ["Bio", "History"],
    },
    department: "Academics",
    accountNo: "4567890123",
    panNo: "RSTUV4567Z",
    basicSalary: 60000,
    pf: 6000,
    da: 4000,
    hra: 10000,
    tds: 2500,
    professionalTax: 2000,
    otherAllowance: 3000,
    otherDeduction: 1500,
    netSalary: 55000,
  },
  {
    id: "6",
    employeeId: 6,
    schoolId: "2",
    name: "Bob Marley",
    qualification: "BCom",
    experience: 3,
    designation: "Food service worker",
    type: "Non-Teaching",
    dateOfJoining: "2020-03-15",
    standards: ["1st", "9th", "5th"],
    divisions: [["C"], ["A", "B"], ["D"]],
    subjects: {
      "1st": ["Library Science"],
      "9th": ["Record Keeping"],
      "5th": ["Exam Supervision"],
    },
    department: "Support Staff",
    accountNo: "5678901234",
    panNo: "UVWXY6789Q",
    basicSalary: 25000,
    pf: 2500,
    da: 1500,
    hra: 4000,
    tds: 800,
    professionalTax: 900,
    otherAllowance: 1200,
    otherDeduction: 400,
    netSalary: 35000,
  },
];

const officeStaff = [
  {
    id: "1",
    employeeId: 1,
    schoolId: "1",
    fullName: "Michael Green",
    dateOfBirth: "1980-05-14",
    gender: "Male",
    schoolName: "ABC High School",
    maritalStatus: "Married",
    contactNumber: "1234567890",
    emailAddress: "michael.green@abc.com",
    joiningDate: "2015-01-20",
    designation: "Clerk",
    workExperience: "10 years",
    highestQualification: "Bachelor's Degree",
  },
  {
    id: "2",
    employeeId: 2,
    schoolId: "1",
    fullName: "Sarah Brown",
    dateOfBirth: "1992-09-25",
    gender: "Female",
    schoolName: "XYZ Public School",
    maritalStatus: "Single",
    contactNumber: "9876543210",
    emailAddress: "sarah.brown@xyz.com",
    joiningDate: "2018-07-15",
    designation: "Administrative Assistant",
    workExperience: "5 years",
    highestQualification: "Master's Degree",
  },
  {
    id: "3",
    employeeId: 3,
    schoolId: "2",
    fullName: "John Doe",
    dateOfBirth: "1985-03-10",
    gender: "Male",
    schoolName: "ABC High School",
    maritalStatus: "Single",
    contactNumber: "5551234567",
    emailAddress: "john.doe@abc.com",
    joiningDate: "2012-11-03",
    designation: "Principal",
    workExperience: "15 years",
    highestQualification: "Ph.D. in Education",
  },
  {
    id: "4",
    employeeId: 4,
    schoolId: "2",
    fullName: "Emma Wilson",
    dateOfBirth: "1988-11-22",
    gender: "Female",
    schoolName: "Greenwood International School",
    maritalStatus: "Married",
    contactNumber: "5559876543",
    emailAddress: "emma.wilson@greenwood.com",
    joiningDate: "2017-05-25",
    designation: "Teacher",
    workExperience: "8 years",
    highestQualification: "Master's Degree in Science",
  },
  {
    id: "5",
    employeeId: 5,
    schoolId: "1",
    fullName: "David Lee",
    dateOfBirth: "1990-07-30",
    gender: "Male",
    schoolName: "XYZ Public School",
    maritalStatus: "Single",
    contactNumber: "5555432109",
    emailAddress: "david.lee@xyz.com",
    joiningDate: "2019-04-18",
    designation: "School Counselor",
    workExperience: "6 years",
    highestQualification: "Master's Degree in Psychology",
  },
  {
    id: "6",
    employeeId: 6,
    schoolId: "1",
    fullName: "Olivia Martinez",
    dateOfBirth: "1993-12-02",
    gender: "Female",
    schoolName: "Pinehill High School",
    maritalStatus: "Single",
    contactNumber: "5558765432",
    emailAddress: "olivia.martinez@pinehill.com",
    joiningDate: "2020-08-14",
    designation: "Librarian",
    workExperience: "3 years",
    highestQualification: "Bachelor's in Library Science",
  },
  {
    id: "7",
    employeeId: 7,
    schoolId: "2",
    fullName: "James Smith",
    dateOfBirth: "1982-04-05",
    gender: "Male",
    schoolName: "Greenwood International School",
    maritalStatus: "Married",
    contactNumber: "5554321987",
    emailAddress: "james.smith@greenwood.com",
    joiningDate: "2010-02-22",
    designation: "IT Administrator",
    workExperience: "12 years",
    highestQualification: "Bachelor's in Computer Science",
  },
  {
    id: "8",
    employeeId: 8,
    schoolId: "2",
    fullName: "Sophia Taylor",
    dateOfBirth: "1995-06-18",
    gender: "Female",
    schoolName: "Pinehill High School",
    maritalStatus: "Single",
    contactNumber: "5556543210",
    emailAddress: "sophia.taylor@pinehill.com",
    joiningDate: "2021-01-10",
    designation: "Receptionist",
    workExperience: "2 years",
    highestQualification: "Degree in Office Administration",
  },
  {
    id: "9",
    employeeId: 9,
    schoolId: "1",
    fullName: "Lucas Johnson",
    dateOfBirth: "1987-09-08",
    gender: "Male",
    schoolName: "Riverbend Academy",
    maritalStatus: "Married",
    contactNumber: "5553219876",
    emailAddress: "lucas.johnson@riverbend.com",
    joiningDate: "2014-03-14",
    designation: "Vice Principal",
    workExperience: "11 years",
    highestQualification: "Educational Leadership",
  },
  {
    id: "10",
    employeeId: 10,
    schoolId: "1",
    fullName: "Isabella Davis",
    dateOfBirth: "1994-11-30",
    gender: "Female",
    schoolName: "Riverbend Academy",
    maritalStatus: "Single",
    contactNumber: "5557654321",
    emailAddress: "isabella.davis@riverbend.com",
    joiningDate: "2021-05-30",
    designation: "Guidance Counselor",
    workExperience: "4 years",
    highestQualification: "Master's Degree in Counseling",
  },
];

const committeeMembers = [
  {
    id: 1,
    schoolId: "1",
    fullName: "John Smith",
    email: "john.smith@example.com",
    dob: "1980-03-15",
    phone: "(212) 555-6789",
    gender: "Male",
    schoolName: "ABC High School",
    education: "Master's in Education",
    designation: "Chairperson",
    tenure: "5",
  },
  {
    id: 2,
    schoolId: "2",
    fullName: "Mary Johnson",
    email: "mary.johnson@example.com",
    dob: "1975-07-22",
    phone: "(310) 555-9876",
    gender: "Female",
    schoolName: "XYZ Public School",
    education: "PhD in Educational Leadership",
    designation: "Vice Chairperson",
    tenure: "4",
  },
  {
    id: 3,
    fullName: "James Brown",
    schoolId: "1",
    email: "james.brown@example.com",
    dob: "1985-11-10",
    phone: "(415) 555-1234",
    gender: "Male",
    schoolName: "ABC High School",
    education: "Bachelor's in Administration",
    designation: "Treasurer",
    tenure: "5",
  },
  {
    id: 4,
    schoolId: "2",
    fullName: "Patricia Davis",
    email: "patricia.davis@example.com",
    dob: "1982-02-05",
    phone: "(718) 555-5678",
    gender: "Female",
    schoolName: "XYZ Public School",
    education: "Master's in Public Administration",
    designation: "Secretary",
    tenure: "10",
  },
  {
    id: 5,
    schoolId: "1",
    fullName: "Michael Wilson",
    email: "michael.wilson@example.com",
    dob: "1978-09-30",
    phone: "(617) 555-4321",
    gender: "Male",
    schoolName: "ABC High School",
    education: "Master's in Education",
    designation: "Board Member",
    tenure: "5",
  },
  {
    id: 6,
    schoolId: "2",
    fullName: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    dob: "1990-04-18",
    phone: "(702) 555-8765",
    gender: "Female",
    schoolName: "XYZ Public School",
    education: "Bachelor's in Psychology",
    designation: "Board Member",
    tenure: "3",
  },
];

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [events, setEvents] = useState([]);
  const [notification, setNotification] = useState([]);
  const [homeworks, setHomeworks] = useState([]);

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleSendNotification = (newNotification) => {
    setNotification((prevNotification) => [
      newNotification,
      ...prevNotification,
    ]);
  };

  const handleAssignHomework = (newHomework) => {
    setHomeworks((prevHomeworks) => [newHomework, ...prevHomeworks]);
  };

  return (
    <Router>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
      <main style={{ marginTop: "64px", padding: "20px" }}>
        <Routes>
          <Route path="/schools" element={<SchoolList schools={schools} />} />
          <Route path="/register-school" element={<RegisterSchool />} />
          <Route
            path="/register-student"
            element={<RegisterStudent schools={schools} />}
          />
          <Route path="*" element={<Dashboard schools={schools} />} />
          <Route
            path="/schools-list"
            element={
              <SchoolList
                // students={students}
                schools={schools}
                teachers={teachers}
                officeStaff={officeStaff}
                committeeMembers={committeeMembers}
              />
            }
          />
          <Route
            path="/students-list"
            element={
              <StudentsList
                students={students}
                schools={schools}
                parents={parents}
              />
            }
          />
          <Route path="/enquiry" element={<EnquiryForm />} />
          <Route path="/register-teacher" element={<RegisterTeacher />} />
          <Route
            path="/register-committee"
            element={<CommitteeRegistrationForm schools={schools} />}
          />
          <Route
            path="/post-events"
            element={
              <EventManagement schools={schools} addEvent={handleAddEvent} />
            }
          />
          <Route path="/view-events" element={<EventList events={events} />} />
          <Route
            path="/send-notification"
            element={
              <SendNotification
                schools={schools}
                onSendNotification={handleSendNotification}
              />
            }
          />
          <Route
            path="/view-notification"
            element={
              <DisplayNotification
                schools={schools}
                notifications={notification}
              />
            }
          />
          <Route
            path="/office-staff"
            element={<OfficeStaffRegistration schools={schools} />}
          />
          <Route path="/reports" element={<Reports />} />
          <Route path="/calendar" element={<CalendarComponent />} />
          <Route path="/attendance" element={<AttendanceComponent />} />
          <Route
            path="/examination"
            element={<Examination schools={schools} />}
          />
          <Route
            path="/library"
            element={<LibraryManagement schools={schools} />}
          />
          <Route
            path="/generate-id-card"
            element={<StudentsIDCard students={students} schools={schools} />}
          />
          <Route
            path="/fees"
            element={<FeeManagement students={students} schools={schools} />}
          />
          <Route
            path="/student-promotion"
            element={<StudentPromotion students={students} schools={schools} />}
          />
          <Route
            path="/students-certificates"
            element={
              <StudentCertificate students={students} schools={schools} />
            }
          />
          <Route
            path="/teachers-certificates"
            element={
              <TeacherCertificates teachers={teachers} schools={schools} />
            }
          />
          <Route
            path="/homework"
            element={
              <HomeWork
                onAssignHomework={handleAssignHomework}
                schools={schools}
              />
            }
          />
          <Route
            path="/view-homework"
            element={<ViewHomework schools={schools} homeworks={homeworks} />}
          />
          <Route
            path="/subscription-plan"
            element={<SubscriptionPlan schools={schools} />}
          />
          <Route path="/softWare-enquiry" element={<SoftwareAppEnquiry />} />
          <Route path="/previous-students" element={<PreviousStudentsList />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
