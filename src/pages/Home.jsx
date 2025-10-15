import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBook from "../components/AddBook";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [bookToBeEdited, setBookToBeEdited] = useState(null);

  const editBookDataHandler = (id) => {
    console.log("id of the book to be edited", id);
    const bookToEdit = books.find((book) => book.id === id);
    setBookToBeEdited(bookToEdit);
  };

  const deleteBookDataHandler = async (id) => {
    console.log("id of the book to be deleted", id);
    const url = `https://firestore.googleapis.com/v1/projects/book-inventory-managemen-ebcf6/databases/(default)/documents/books/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      console.log("response after book deletion", response);
      if (response.ok) {
        setBooks((books) => {
          return books.filter((book) => book.id !== id);
        });
      }
    } catch (error) {
      console.log(error);
    }
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
      console.log("response from firebase url after recieving the data", data);
      if (data.documents) {
        const formattedBooks = data.documents.map((doc) => ({
          id: doc.name.split("/").pop(),
          title: doc.fields.title?.stringValue || "",
          author: doc.fields.author?.stringValue || "",
          year: doc.fields.year?.integerValue || "",
          pages: doc.fields.pages?.integerValue || "",
          publisher: doc.fields.publisher?.stringValue || "",
          language: doc.fields.language?.stringValue || "",
          overview: doc.fields.overview?.stringValue || "",
        }));
        setBooks(formattedBooks);
      }
    };
    fetchBooks();
  }, []);

  const formSubmitHandler = async (formInputData) => {
    console.log(formInputData);

    try {
      const dataInProperFormat = {
        fields: {
          title: { stringValue: formInputData.title || "" },
          author: { stringValue: formInputData.author || "" },
          year: {
            integerValue: formInputData.year ? parseInt(formInputData.year) : 0,
          },
          pages: {
            integerValue: formInputData.pages
              ? parseInt(formInputData.pages)
              : 0,
          },
          publisher: { stringValue: formInputData.publisher || "" },
          language: { stringValue: formInputData.language || "" },
          overview: { stringValue: formInputData.overview || "" },
        },
      };

      let url =
        "https://firestore.googleapis.com/v1/projects/book-inventory-managemen-ebcf6/databases/(default)/documents/books";
      let method = "POST";

      if (bookToBeEdited) {
        url = `https://firestore.googleapis.com/v1/projects/book-inventory-managemen-ebcf6/databases/(default)/documents/books/${bookToBeEdited.id}`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(dataInProperFormat),
      });
      console.log("response of data posting", response);
      const updatedResponse = await fetch(
        "https://firestore.googleapis.com/v1/projects/book-inventory-managemen-ebcf6/databases/(default)/documents/books"
      );
      const updatedData = await updatedResponse.json();
      if (updatedData.documents) {
        const formattedBooks = updatedData.documents.map((doc) => ({
          id: doc.name.split("/").pop(),
          title: doc.fields.title?.stringValue || "",
          author: doc.fields.author?.stringValue || "",
          year: doc.fields.year?.integerValue || "",
          pages: doc.fields.pages?.integerValue || "",
          publisher: doc.fields.publisher?.stringValue || "",
          language: doc.fields.language?.stringValue || "",
          overview: doc.fields.overview?.stringValue || "",
        }));
        console.log("data is updated succress");
        setBooks(formattedBooks);
      }

      setBookToBeEdited(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <AddBook initialData={bookToBeEdited} onSubmit={formSubmitHandler} />
      </div>
      <div>
        <div>
          {
            <table className="">
              <thead className="">
                <tr>
                  <th className="">title</th>
                  <th>author</th>
                  <th>publisher</th>
                  <th>language</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No books found</td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr
                      key={book.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        console.log("table row is clicked");
                        navigate(`/book/${book.id}`);
                      }}
                    >
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.publisher}</td>
                      <td>{book.language}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            editBookDataHandler(book.id);
                          }}
                        >
                          edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBookDataHandler(book.id);
                          }}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  );
};

export default Home;
