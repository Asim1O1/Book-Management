import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Books from "./pages/books";
import AddBooks from "./pages/addBook";
import UpdateBooks from "./pages/updateBook";
import "./style.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/addBooks" element={<AddBooks />} />
          <Route path="/updateBooks/:id" element={<UpdateBooks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
