import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8087/books"); // Await the axios request
        setBooks(res.data);
      } catch (error) {
        console.log("Error fetching books", error);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8087/books/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Asim Books</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.book_id}>
            {book.cover && <img src={book.cover} alt={book.book_title} />}
            <h2>{book.book_title}</h2>
            <p>{book.book_desc}</p>
            <p>{book.price}</p>
            <button
              className="delete"
              onClick={() => {
                handleDelete(book.book_id);
              }}
            >
              {" "}
              Delete
            </button>
            <button className="update">
              <Link to={"/updateBooks/" + book.book_id}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/addBooks">Add new Book</Link>
      </button>
    </div>
  );
};

export default Books;
