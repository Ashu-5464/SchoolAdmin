import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const LibraryManagement = ({ schools }) => {
  const standards = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"];
  const bookTypes = ["Comic Books", "Subject Books", "Horror", "Biography"];

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [filter, setFilter] = useState({ standard: "", type: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [viewBook, setViewBook] = useState(null);
  const [currentBook, setCurrentBook] = useState({
    title: "",
    author: "",
    year: "",
    type: "",
    standard: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (order) => {
    if (order) {
      setSortOrder(order); // Set the selected sorting order
    }
    setAnchorEl(null); // Close the dropdown menu
  };

  const [books, setBooks] = useState({
    1: [
      {
        title: "Mathematics",
        author: "John Doe",
        year: 2020,
        type: "Subject Books",
        standard: "Grade 1",
      },
      {
        title: "Ghost Stories",
        author: "Jane Doe",
        year: 2019,
        type: "Horror",
        standard: "Grade 2",
      },
    ],
    2: [
      {
        title: "Science",
        author: "Alice Smith",
        year: 2021,
        type: "Subject Books",
        standard: "Grade 3",
      },
      {
        title: "Comic Adventures",
        author: "Bob Brown",
        year: 2018,
        type: "Comic Books",
        standard: "Grade 4",
      },
    ],
  });

  const handleOpenDialog = (
    book = { title: "", author: "", year: "", type: "", standard: "" },
    index = null
  ) => {
    setCurrentBook(book);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setCurrentBook({ title: "", author: "", year: "", type: "", standard: "" });
    setEditingIndex(null);
    setOpenDialog(false);
  };

  const handleSaveBook = () => {
    if (!currentBook.title) {
      alert("Book title is required!");
      return;
    }

    const updatedBooks = { ...books };
    if (editingIndex !== null) {
      updatedBooks[selectedSchool][editingIndex] = currentBook;
    } else {
      if (!updatedBooks[selectedSchool]) {
        updatedBooks[selectedSchool] = [];
      }
      updatedBooks[selectedSchool].push(currentBook);
    }
    setBooks(updatedBooks);
    handleCloseDialog();
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = { ...books };
    updatedBooks[selectedSchool] = updatedBooks[selectedSchool].filter(
      (_, i) => i !== index
    );
    setBooks(updatedBooks);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredBooks =
    selectedSchool &&
    books[selectedSchool]
      ?.filter(
        (book) =>
          (filter.standard ? book.standard === filter.standard : true) &&
          (filter.type ? book.type === filter.type : true)
      )
      .filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );

  const filteredSchools = schools
    .filter((school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <Box>
      {/* <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Library Management
      </Typography> */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Library Management
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            sx={{ width: 200 }}
            label="Search by Name"
            size="small"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            onClick={handleMenuClick}
            sx={{ backgroundColor: "white" }}
          >
            <SortByAlphaIcon fontSize="medium" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose(null)}
          >
            <MenuItem onClick={() => handleMenuClose("asc")}>
              Ascending
            </MenuItem>
            <MenuItem onClick={() => handleMenuClose("desc")}>
              Descending
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />

      {!selectedSchool && (
        <Grid container spacing={1}>
          {filteredSchools.map((school) => (
            <Grid item xs={12} sm={4} key={school.id}>
              <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <Typography sx={{ flex: 1 }} variant="h6">
                  {school.name}
                </Typography>
                <Button
                  color="primary"
                  onClick={() => setSelectedSchool(school.id)}
                >
                  View Books
                  <DoubleArrowIcon titleAccess="View Library Books" />
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedSchool && (
        <>
          <Button
            variant="outlined"
            sx={{ mb: 1, mr: 1 }}
            onClick={() => setSelectedSchool(null)}
          >
            Back to Schools
          </Button>
          <Button
            variant="contained"
            sx={{ mb: 1 }}
            onClick={() => handleOpenDialog()}
          >
            Add Book
          </Button>

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Select
              name="standard"
              value={filter.standard}
              onChange={handleFilterChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Standards</MenuItem>
              {standards.map((standard) => (
                <MenuItem key={standard} value={standard}>
                  {standard}
                </MenuItem>
              ))}
            </Select>

            <Select
              name="type"
              value={filter.type}
              onChange={handleFilterChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Types</MenuItem>
              {bookTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Grid container spacing={1}>
            {filteredBooks?.map((book, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {book.type || "No Type"} |{" "}
                      {book.standard || "No Standard"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      color="primary"
                      onClick={() => setViewBook(book)}
                    >
                      <DoubleArrowIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(book, index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteBook(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle fontWeight={"bold"}>
          {editingIndex !== null ? "Edit Book" : "Add New Book"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            sx={{ mb: 1 }}
            label="Title"
            fullWidth
            value={currentBook.title}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, title: e.target.value })
            }
          />
          <TextField
            sx={{ mb: 1 }}
            label="Author"
            fullWidth
            value={currentBook.author}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, author: e.target.value })
            }
          />
          <TextField
            sx={{ mb: 1 }}
            label="Year"
            fullWidth
            type="number"
            value={currentBook.year}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, year: e.target.value })
            }
          />
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel>Book Type</InputLabel>
            <Select
              fullWidth
              label="Book Type"
              value={currentBook.type}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, type: e.target.value })
              }
              // displayEmpty
            >
              <MenuItem value="">No Type</MenuItem>
              {bookTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel>Standard</InputLabel>
            <Select
              fullWidth
              label="Standard"
              value={currentBook.standard}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, standard: e.target.value })
              }
              // displayEmpty
            >
              <MenuItem value="">No Standard</MenuItem>
              {standards.map((standard) => (
                <MenuItem key={standard} value={standard}>
                  {standard}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="warning"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveBook} color="primary" variant="outlined">
            {editingIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* {viewBook && (
        <Dialog open={!!viewBook} onClose={() => setViewBook(null)}>
          <DialogTitle>{viewBook.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Author: {viewBook.author}</Typography>
            <Typography variant="body1">Year: {viewBook.year}</Typography>
            <Typography variant="body1">
              Type: {viewBook.type || "None"}
            </Typography>
            <Typography variant="body1">
              Standard: {viewBook.standard || "None"}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewBook(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )} */}
      {viewBook && (
        <Dialog
          open={!!viewBook}
          onClose={() => setViewBook(null)}
          maxWidth="sm"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: 3,
              padding: 2,
            },
          }}
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AutoStoriesIcon />
            <span style={{ fontWeight: "bold" }}>{viewBook.title}</span>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Author:
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                {viewBook.author}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Year:
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                {viewBook.year}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Type:
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                {viewBook.type || "None"}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Standard:
              </Typography>
              <Typography variant="body1">
                {viewBook.standard || "None"}
              </Typography>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ justifyContent: "flex-end" }}>
            <Button
              onClick={() => setViewBook(null)}
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                // paddingX: 2,
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default LibraryManagement;

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Menu,
//   MenuItem,
//   Divider,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

// const LibraryManagement = () => {
//   const [books, setBooks] = useState([
//     { title: "1984", author: "George Orwell", year: "1949" },
//     { title: "To Kill a Mockingbird", author: "Harper Lee", year: "1960" },
//     { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: "1925" },
//   ]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentBook, setCurrentBook] = useState({
//     title: "",
//     author: "",
//     year: "",
//   });
//   const [editingIndex, setEditingIndex] = useState(null);

//   const handleOpenDialog = (
//     book = { title: "", author: "", year: "" },
//     index = null
//   ) => {
//     setCurrentBook(book);
//     setEditingIndex(index);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setCurrentBook({ title: "", author: "", year: "" });
//     setEditingIndex(null);
//     setOpenDialog(false);
//   };

//   const handleSaveBook = () => {
//     if (!currentBook.title || !currentBook.author || !currentBook.year) {
//       alert("All fields are required!");
//       return;
//     }
//     if (editingIndex !== null) {
//       const updatedBooks = [...books];
//       updatedBooks[editingIndex] = currentBook;
//       setBooks(updatedBooks);
//     } else {
//       setBooks([...books, currentBook]);
//     }
//     handleCloseDialog();
//   };

//   const handleDeleteBook = (index) => {
//     const updatedBooks = books.filter((_, i) => i !== index);
//     setBooks(updatedBooks);
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = (order) => {
//     if (order) {
//       const sortedBooks = [...books].sort((a, b) => {
//         const comparison = a.title.localeCompare(b.title);
//         return order === "asc" ? comparison : -comparison;
//       });
//       setBooks(sortedBooks);
//       setSortOrder(order);
//     }
//     setAnchorEl(null);
//   };

//   const filteredBooks = books.filter((book) =>
//     book.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box sx={{ p: 1 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           Library Management
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//           <TextField
//             sx={{ width: 250 }}
//             label="Search by Title"
//             size="small"
//             variant="outlined"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <IconButton onClick={handleMenuClick}>
//             <SortByAlphaIcon fontSize="medium" />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={() => handleMenuClose(null)}
//           >
//             <MenuItem onClick={() => handleMenuClose("asc")}>
//               Sort Ascending
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("desc")}>
//               Sort Descending
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Box>
//       <Divider sx={{ mb: 2 }} />
//       <Box display="flex" justifyContent="flex-start" mb={2}>
//         <Button
//           variant="contained"
//           startIcon={<AddCircleOutlineIcon />}
//           onClick={() => handleOpenDialog()}
//         >
//           Add New Book
//         </Button>
//       </Box>
//       {filteredBooks.length > 0 ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "lightgray" }}>
//                 <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
//                   Title
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
//                   Author
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
//                   Year
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredBooks.map((book, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{book.title}</TableCell>
//                   <TableCell>{book.author}</TableCell>
//                   <TableCell>{book.year}</TableCell>
//                   <TableCell>
//                     <IconButton
//                       color="primary"
//                       onClick={() => handleOpenDialog(book, index)}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDeleteBook(index)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Card>
//           <CardContent>
//             <Typography variant="h6" color="textSecondary" align="center">
//               No books found. Try adding a new book or adjusting your search!
//             </Typography>
//           </CardContent>
//         </Card>
//       )}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>
//           {editingIndex !== null ? "Edit Book" : "Add New Book"}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Title"
//             fullWidth
//             value={currentBook.title}
//             onChange={(e) =>
//               setCurrentBook({ ...currentBook, title: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Author"
//             fullWidth
//             value={currentBook.author}
//             onChange={(e) =>
//               setCurrentBook({ ...currentBook, author: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Year"
//             fullWidth
//             type="number"
//             value={currentBook.year}
//             onChange={(e) =>
//               setCurrentBook({ ...currentBook, year: e.target.value })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveBook} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default LibraryManagement;
