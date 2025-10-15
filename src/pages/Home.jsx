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
  return (
    <>
      <div>
        <div>
          {
            <table>
              <thead>
                <tr>
                  <th>title</th>
                  <th>author</th>
                  <th>publisher</th>
                  <th>language</th>
                  <th>actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length === 0 ? (
                  <tr>
                    <td colSpan={4}>No books found</td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr
                      key={book.id}
                      style={{ cursor: "click" }}
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
