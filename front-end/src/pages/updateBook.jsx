import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const UpdateBooks = () => {
  const [books, setBooks] = useState({
    book_title: "",
    book_desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const handleChange = (e) => {
    setBooks((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8087/books/" + id, books);
      console.log("successfuly added the book");
      navigate("/");
    } catch (error) {
      console.log("error posting data", error);
    }
  };
  return (
    <div>
      <h1>Update Books</h1>
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
      <button onClick={handleClick} className="formButton">
        Update
      </button>
    </div>
  );
};

export default UpdateBooks;
