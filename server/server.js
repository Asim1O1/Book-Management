import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
// Load environment variables from a .env file
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

// Database connection
const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

server.get("/", (req, res) => {
  res.json("Hello, this is the back-end");
});

// Fetch all books
server.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  database.query(q, (err, result) => {
    if (err) {
      console.error("Database query error:", err.message);
      return res.status(500).json({ error: "Database error" });
    } else {
      return res.status(200).json(result);
    }
  });
});

// Add a new book
server.post("/books", (req, res) => {
  const { book_title, book_desc, cover, price } = req.body;
  const q =
    "INSERT INTO books (book_title, book_desc, cover, price) VALUES (?, ?, ?, ?)";
  const values = [book_title, book_desc, cover, price];

  database.query(q, values, (err, result) => {
    if (err) {
      console.error("Error while inserting values:", err.message);
      return res.status(500).json({ error: "Error while inserting values" });
    } else {
      return res.status(201).json({
        message: "Book has been created successfully",
        bookId: result.insertId,
      });
    }
  });
});

// delete book
server.delete("/books/:id", (req, res) => {
  const book_id = req.params.id;
  const q = "DELETE FROM books WHERE book_id = ?";
  database.query(q, [book_id], (err, result) => {
    if (err) {
      console.error("Error while deleting the book:", err.message);
      return res.status(500).json({ error: "Error while deleting the book" });
    } else {
      return res
        .status(200)
        .json({ message: "Book has been deleted successfully" });
    }
  });
});

// update
server.put("/books/:id", (req, res) => {
  const book_id = req.params.id;
  const { book_title, book_desc, cover, price } = req.body;

  // Construct the UPDATE query
  const q =
    "UPDATE books SET book_title = ?, book_desc = ?, cover = ?, price = ? WHERE book_id = ?";
  const values = [book_title, book_desc, cover, price, book_id];

  // Execute the query
  database.query(q, values, (err, result) => {
    if (err) {
      console.error("Error while updating the book:", err.message);
      return res.status(500).json({ error: "Error while updating the book" });
    } else {
      return res
        .status(200)
        .json({ message: "Book has been updated successfully" });
    }
  });
});

server.listen(process.env.PORT || 8087, () => {
  console.log(`Server running on port ${process.env.PORT || 8087}...`);
});
