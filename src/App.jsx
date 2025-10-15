import { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookPage from "./pages/BookPage";
import AddBook from "./components/AddBook";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/addbookform" element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;
