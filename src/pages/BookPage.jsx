import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BookPage = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  console.log("id", id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/book-inventory-managemen-ebcf6/databases/(default)/documents/books/${id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log("response from the server", data);
      console.log("data fields", data.fields);
      if (data.fields) {
        const book = {
          title: data.fields.title?.stringValue,
          author: data.fields.author.stringValue,
          language: data.fields.language.stringValue,
          overview: data.fields.overview.stringValue,
          pages: data.fields.pages.integerValue,
          publisher: data.fields.publisher.stringValue,
          year: data.fields.year.integerValue,
        };
        console.log(book);
        setBook(book);
      }
    };
    fetchData();
  }, [id]);

  if (!book) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Language: {book.language}</p>
      <p>Pages: {book.pages}</p>
      <p>Year: {book.year}</p>
      <p>Overview: {book.overview}</p>
    </div>
  );
};

export default BookPage;
