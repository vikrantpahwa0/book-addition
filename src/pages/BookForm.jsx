import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addBook, updateBook } from "../redux/actions";
import { AppBar, Toolbar, Typography, Box, Button, TextField, Paper } from "@mui/material";

export default function BookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get book ID from URL if editing
  const token = useSelector((state) => state.login.token) || localStorage.getItem("token");
  const books = useSelector((state) => state.books.books);

  const [formData, setFormData] = useState({ title: "", author: "", year: "" });
  
  const isEditing = !!id; // True if updating, false if creating

  useEffect(() => {
    if (isEditing) {
      // Prefill form if editing
      const bookToEdit = books?.book?.find((b) => b.id.toString() === id);
      if (bookToEdit) {
        setFormData(bookToEdit);
      }
    }
  }, [id, books, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.year) {
      alert("Please fill all fields");
      return;
    }

    if (isEditing) {
      // Update existing book
      dispatch(updateBook(id, formData, token));
    } else {
      // Add new book
      dispatch(addBook(formData, token));
    }
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f4f4", p: 3 }}>
      <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "#1976D2" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" noWrap sx={{ fontWeight: "bold" }}>
            📚 {isEditing ? "Edit Book" : "Add a New Book"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Paper sx={{ p: 3, mt: 5, maxWidth: 500, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>Book Details</Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            margin="dense" 
            label={`Title ${!isEditing ? "*" : ""}`} 
            fullWidth 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required={!isEditing} 
          />
          <TextField 
            margin="dense" 
            label={`Author ${!isEditing ? "*" : ""}`} 
            fullWidth 
            name="author" 
            value={formData.author} 
            onChange={handleChange} 
            required={!isEditing} 
          />
          <TextField 
            margin="dense" 
            label={`Year ${!isEditing ? "*" : ""}`} 
            fullWidth 
            name="year" 
            value={formData.year} 
            onChange={handleChange} 
            required={!isEditing} 
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
