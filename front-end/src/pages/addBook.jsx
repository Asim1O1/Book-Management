import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddBooks = () => {
  const [books, setBooks] = useState({
    book_title: "",
    book_desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBooks((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8087/books", books);
       console.log("successfuly added the book")
      navigate("/");
    } catch (error) {
      console.log("error posting data", error);
    }
  };
  return (
    <div>
      <h1>Add Books</h1>
      <form className="book_form">
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="book_title"
        ></input>
        <input
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="book_desc"
        ></input>
        <input
          type="number"
          placeholder="Price"
          onChange={handleChange}
          name="price"
        ></input>
        <input
          type="text"
          placeholder="Cover"
          onChange={handleChange}
          name="cover"
        ></input>
      </form>
      <button onClick={handleClick} className="formButton">Add</button>
    </div>
  );
};

export default AddBooks;
