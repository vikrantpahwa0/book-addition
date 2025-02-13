const bookService = require("../services/book-service");

const editBook = async (req, res) => {
  try {
    const book = await bookService.editBook(req.body,req.user.id,req.params.id);
    res.status(201).json({ message: "Book Updated Successfully", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
    try {
      const { title, author, year } = req.body;
      const book = await bookService.addBook(title, author, year, req.user.id);
      res.status(201).json({ message: "Book Added Successfully", book });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await bookService.deleteBook(id,req.user.id);
      res.status(201).json({ message: "Book Deleted Successfully", book });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const getBook = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await bookService.getBook(id,req.user.id);
      res.status(201).json({ message: "Book fetched Successfully", book });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  const getBooks = async (req, res) => {
    try {
      const book = await bookService.getBooks(req.user.id);
      res.status(201).json({ message: "Books Fetched Successfully", book });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

module.exports = { addBook,editBook,deleteBook,getBooks,getBook };