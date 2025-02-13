import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBooks, deleteBook } from "../redux/actions"; // Import delete action
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, loading, error } = useSelector((state) => state.books);
  const token = useSelector((state) => state.login.token) || localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchBooks(token));
    }
  }, [dispatch, token]);

  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`); // Navigate to edit page
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id, token));
      setTimeout(() => {
        window.location.reload();
      }, 500); // Small delay to ensure deletion completes before refresh
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f4f4", p: 3 }}>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "#1976D2" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>📚 Book Dashboard</Typography>
          <IconButton color="inherit" onClick={() => navigate("/book-form")}>
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {loading && <CircularProgress sx={{ mt: 3 }} />}
      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}

      {/* Book Table */}
      {!loading && !error && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, width: "100%" }}>
          <TableContainer component={Paper} sx={{ maxWidth: 900, borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#2196F3" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Author</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Year</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books?.book?.map((book) => (
                  <TableRow key={book.id} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" } }}>
                    <TableCell>{book.id}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.year}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton color="primary" onClick={() => handleEdit(book.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(book.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
