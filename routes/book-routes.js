const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book-controller");
const {validateBookAddition} = require("../middlewares/validate-book");
const authenticateUser = require('../middlewares/auth-middleware');


router.post("/add-book",authenticateUser,validateBookAddition, bookController.addBook);
router.put("/edit-book/:id",authenticateUser, bookController.editBook);
router.delete("/delete-book/:id",authenticateUser, bookController.deleteBook);
router.delete("/get-book/:id",authenticateUser, bookController.getBook);
router.get("/get-books",authenticateUser, bookController.getBooks);

module.exports = router;