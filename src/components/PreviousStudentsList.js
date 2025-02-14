// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/card";

// const PreviousStudentsList = () => {
//   // State for filters
//   const [selectedSchool, setSelectedSchool] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");

//   // Mock data - replace with your actual data
//   const schools = [
//     { id: 1, name: "Springfield Elementary" },
//     { id: 2, name: "Central High School" },
//     { id: 3, name: "Lincoln Academy" },
//   ];

//   const statuses = [
//     { value: "inactive", label: "Inactive" },
//     { value: "passout", label: "Passed Out" },
//   ];

//   const students = [
//     {
//       id: 1,
//       name: "John Doe",
//       school: "Springfield Elementary",
//       status: "inactive",
//       grade: "10th",
//       year: "2023",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       school: "Central High School",
//       status: "passout",
//       grade: "12th",
//       year: "2022",
//     },
//     // Add more student data as needed
//   ];

//   // Filter students based on selected filters
//   const filteredStudents = students.filter((student) => {
//     const schoolMatch = !selectedSchool || student.school === selectedSchool;
//     const statusMatch = !selectedStatus || student.status === selectedStatus;
//     return schoolMatch && statusMatch;
//   });

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <Card>
//         <CardHeader>
//           <h2 className="text-2xl font-bold">Previous Students</h2>
//           <div className="flex gap-4 mt-4">
//             <Select value={selectedSchool} onValueChange={setSelectedSchool}>
//               <SelectTrigger className="w-64">
//                 <SelectValue placeholder="Select School" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="">All Schools</SelectItem>
//                 {schools.map((school) => (
//                   <SelectItem key={school.id} value={school.name}>
//                     {school.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select value={selectedStatus} onValueChange={setSelectedStatus}>
//               <SelectTrigger className="w-48">
//                 <SelectValue placeholder="Select Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="">All Statuses</SelectItem>
//                 {statuses.map((status) => (
//                   <SelectItem key={status.value} value={status.value}>
//                     {status.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-4 text-left">Name</th>
//                   <th className="p-4 text-left">School</th>
//                   <th className="p-4 text-left">Status</th>
//                   <th className="p-4 text-left">Grade</th>
//                   <th className="p-4 text-left">Year</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map((student) => (
//                   <tr key={student.id} className="border-b hover:bg-gray-50">
//                     <td className="p-4">{student.name}</td>
//                     <td className="p-4">{student.school}</td>
//                     <td className="p-4">
//                       <span
//                         className={`px-2 py-1 rounded-full text-sm ${
//                           student.status === "inactive"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-green-100 text-green-800"
//                         }`}
//                       >
//                         {student.status === "inactive"
//                           ? "Inactive"
//                           : "Passed Out"}
//                       </span>
//                     </td>
//                     <td className="p-4">{student.grade}</td>
//                     <td className="p-4">{student.year}</td>
//                   </tr>
//                 ))}
//                 {filteredStudents.length === 0 && (
//                   <tr>
//                     <td colSpan={5} className="p-4 text-center text-gray-500">
//                       No students found matching the selected filters
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PreviousStudentsList;

// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Box,
//   Chip
// } from '@mui/material';

// const PreviousStudentsList = () => {
//   const [selectedSchool, setSelectedSchool] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');

//   const schools = [
//     { id: 1, name: 'Springfield Elementary' },
//     { id: 2, name: 'Central High School' },
//     { id: 3, name: 'Lincoln Academy' },
//     { id: 4, name: 'Washington Middle School' },
//     { id: 5, name: 'St. Mary\'s International' }
//   ];

//   const statuses = [
//     { value: 'inactive', label: 'Inactive' },
//     { value: 'passout', label: 'Passed Out' }
//   ];

//   const students = [
//     {
//       id: 1,
//       name: 'John Doe',
//       school: 'Springfield Elementary',
//       status: 'inactive',
//       grade: '5th',
//       year: '2023',
//       admissionNo: 'SE2018001'
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       school: 'Central High School',
//       status: 'passout',
//       grade: '12th',
//       year: '2022',
//       admissionNo: 'CHS2019045'
//     },
//     // ... (previous student data remains the same)
//     {
//       id: 15,
//       name: 'David Clark',
//       school: 'Washington Middle School',
//       status: 'inactive',
//       grade: '7th',
//       year: '2024',
//       admissionNo: 'WMS2022091'
//     }
//   ];

//   const filteredStudents = students.filter(student => {
//     const schoolMatch = !selectedSchool || student.school === selectedSchool;
//     const statusMatch = !selectedStatus || student.status === selectedStatus;
//     return schoolMatch && statusMatch;
//   });

//   return (
//     <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
//       <Card>
//         <CardHeader
//           title={
//             <Typography variant="h5" component="h2">
//               Previous Students
//             </Typography>
//           }
//         />
//         <CardContent>
//           <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
//             <FormControl sx={{ minWidth: 200 }}>
//               <InputLabel>School</InputLabel>
//               <Select
//                 value={selectedSchool}
//                 label="School"
//                 onChange={(e) => setSelectedSchool(e.target.value)}
//               >
//                 <MenuItem value="">All Schools</MenuItem>
//                 {schools.map(school => (
//                   <MenuItem key={school.id} value={school.name}>
//                     {school.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl sx={{ minWidth: 150 }}>
//               <InputLabel>Status</InputLabel>
//               <Select
//                 value={selectedStatus}
//                 label="Status"
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//               >
//                 <MenuItem value="">All Statuses</MenuItem>
//                 {statuses.map(status => (
//                   <MenuItem key={status.value} value={status.value}>
//                     {status.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>

//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Admission No.</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>School</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Grade</TableCell>
//                   <TableCell>Year</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredStudents.map(student => (
//                   <TableRow
//                     key={student.id}
//                     sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
//                   >
//                     <TableCell>{student.admissionNo}</TableCell>
//                     <TableCell>{student.name}</TableCell>
//                     <TableCell>{student.school}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={student.status === 'inactive' ? 'Inactive' : 'Passed Out'}
//                         color={student.status === 'inactive' ? 'warning' : 'success'}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>{student.grade}</TableCell>
//                     <TableCell>{student.year}</TableCell>
//                   </TableRow>
//                 ))}
//                 {filteredStudents.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
//                       <Typography color="text.secondary">
//                         No students found matching the selected filters
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default PreviousStudentsList;

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";

const PreviousStudentsList = () => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [availableGrades, setAvailableGrades] = useState([]);

  //   const schools = [
  //     { id: 1, name: "Springfield Elementary" },
  //     { id: 2, name: "Central High School" },
  //     { id: 3, name: "Lincoln Academy" },
  //     { id: 4, name: "Washington Middle School" },
  //     { id: 5, name: "St. Mary's International" },
  //   ];

  const schools = [
    {
      id: 1,
      name: "Springfield Elementary",
      grades: ["1st", "2nd", "3rd", "4th", "5th", "6th"],
    },
    {
      id: 2,
      name: "Central High School",
      grades: ["9th", "10th", "11th", "12th"],
    },
    {
      id: 3,
      name: "Lincoln Academy",
      grades: ["6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    },
    {
      id: 4,
      name: "Washington Middle School",
      grades: ["6th", "7th", "8th"],
    },
    {
      id: 5,
      name: "St. Marys International",
      grades: [
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
      ],
    },
  ];

  const statuses = [
    { value: "inactive", label: "Inactive" },
    { value: "passout", label: "Passed Out" },
  ];

  const students = [
    {
      id: 1,
      name: "John Doe",
      school: "Springfield Elementary",
      status: "inactive",
      grade: "5th",
      year: "2023",
      admissionNo: "SE2018001",
    },
    {
      id: 2,
      name: "Jane Smith",
      school: "Central High School",
      status: "passout",
      grade: "12th",
      year: "2022",
      admissionNo: "CHS2019045",
    },
    {
      id: 3,
      name: "Michael Johnson",
      school: "Lincoln Academy",
      status: "inactive",
      grade: "8th",
      year: "2023",
      admissionNo: "LA2020078",
    },
    {
      id: 4,
      name: "Sarah Williams",
      school: "Springfield Elementary",
      status: "passout",
      grade: "6th",
      year: "2023",
      admissionNo: "SE2017089",
    },
    {
      id: 5,
      name: "Robert Brown",
      school: "Central High School",
      status: "inactive",
      grade: "11th",
      year: "2024",
      admissionNo: "CHS2020023",
    },
    {
      id: 6,
      name: "Emily Davis",
      school: "Lincoln Academy",
      status: "passout",
      grade: "12th",
      year: "2022",
      admissionNo: "LA2018056",
    },
    {
      id: 7,
      name: "James Wilson",
      school: "Washington Middle School",
      status: "inactive",
      grade: "7th",
      year: "2024",
      admissionNo: "WMS2021034",
    },
    {
      id: 8,
      name: "Emma Taylor",
      school: "St. Marys International",
      status: "passout",
      grade: "10th",
      year: "2023",
      admissionNo: "SMI2019012",
    },
    {
      id: 9,
      name: "Daniel Martinez",
      school: "Central High School",
      status: "inactive",
      grade: "9th",
      year: "2024",
      admissionNo: "CHS2022067",
    },
    {
      id: 10,
      name: "Sophia Anderson",
      school: "Springfield Elementary",
      status: "passout",
      grade: "5th",
      year: "2023",
      admissionNo: "SE2018099",
    },
    {
      id: 11,
      name: "William Thomas",
      school: "Washington Middle School",
      status: "inactive",
      grade: "8th",
      year: "2024",
      admissionNo: "WMS2021087",
    },
    {
      id: 12,
      name: "Olivia Garcia",
      school: "St. Marys International",
      status: "passout",
      grade: "12th",
      year: "2022",
      admissionNo: "SMI2018043",
    },
    {
      id: 13,
      name: "Alexander Lee",
      school: "Lincoln Academy",
      status: "inactive",
      grade: "10th",
      year: "2024",
      admissionNo: "LA2021055",
    },
    {
      id: 14,
      name: "Isabella Moore",
      school: "Central High School",
      status: "passout",
      grade: "12th",
      year: "2023",
      admissionNo: "CHS2019078",
    },
    {
      id: 15,
      name: "David Clark",
      school: "Washington Middle School",
      status: "inactive",
      grade: "7th",
      year: "2024",
      admissionNo: "WMS2022091",
    },
  ];

  // Update available grades when school selection changes
  useEffect(() => {
    if (selectedSchool) {
      const schoolData = schools.find(
        (school) => school.name === selectedSchool
      );
      setAvailableGrades(schoolData ? schoolData.grades : []);
    } else {
      // If no school is selected, show all unique grades
      const allGrades = [
        ...new Set(schools.flatMap((school) => school.grades)),
      ].sort();
      setAvailableGrades(allGrades);
    }
    // Reset grade selection when school changes
    setSelectedGrade("");
  }, [selectedSchool]);

  // Handle school selection change
  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const schoolMatch = !selectedSchool || student.school === selectedSchool;
    const statusMatch = !selectedStatus || student.status === selectedStatus;
    const gradeMatch = !selectedGrade || student.grade === selectedGrade;
    return schoolMatch && statusMatch && gradeMatch;
  });

  return (
    <Box sx={{ width: "100%", margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Previous Students
      </Typography>

      <Divider sx={{ backgroundColor: "#333", mb: 2 }} />
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>School</InputLabel>
              <Select
                value={selectedSchool}
                label="School"
                onChange={handleSchoolChange}
              >
                <MenuItem value="">All Schools</MenuItem>
                {schools.map((school) => (
                  <MenuItem key={school.id} value={school.name}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Standard</InputLabel>
              <Select
                value={selectedGrade}
                label="Standard"
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <MenuItem value="">All Standards</MenuItem>
                {availableGrades.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="">All Statuses</MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "lightgray" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Admission No.
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>School</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Standard</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                    }}
                  >
                    <TableCell>{student.admissionNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.school}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          student.status === "inactive"
                            ? "Inactive"
                            : "Passed Out"
                        }
                        color={
                          student.status === "inactive" ? "warning" : "success"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.year}</TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography color="text.secondary">
                        No students found matching the selected filters
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PreviousStudentsList;
