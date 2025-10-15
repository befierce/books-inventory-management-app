import { use } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const editBookDataHandler = (id) => {
    console.log("id of the book to be edited", id);
  };
  const deleteBookDataHandler = (id) => {
    console.log("id of the book to be deleted", id);
  };
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/book-inventory-managemen-ebcf6/databases/(default)/documents/books",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("response from firebase url", data);
    fetchBooks();
  }, []);
  return (
    <>
     
    </>
  );
};

export default Home;
