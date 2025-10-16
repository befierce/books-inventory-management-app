import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBook from "../components/AddBook";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [bookToBeEdited, setBookToBeEdited] = useState(null);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  const editBookDataHandler = (id) => {
    console.log("id of the book to be edited", id);
    const bookToEdit = books.find((book) => book.id === id);
    setBookToBeEdited(bookToEdit);
    setIsAddBookOpen(true);
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
    <div className="min-h-screen bg-slate-900 py-4 sm:py-8 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="bg-slate-800 rounded-lg shadow-lg p-5 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">
              Book Store
            </h1>
            <p className="text-sm sm:text-base text-slate-400">
              Manage your book collection
            </p>
          </div>
        </div>
        <div className="mb-6 sm:mb-8">
          <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
            <button
              onClick={() => setIsAddBookOpen(!isAddBookOpen)}
              className="w-full px-5 sm:px-6 py-4 flex items-center justify-between bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 transition-all duration-200"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                {bookToBeEdited ? "Edit Book" : "Add New Book"}
              </h2>
              <svg
                className={`w-5 h-5 text-white transform transition-transform duration-200 ${
                  isAddBookOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isAddBookOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-5 sm:p-6">
                <AddBook initialData={bookToBeEdited} onSubmit={formSubmitHandler} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
          <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-600 border-b border-slate-600">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              All Books
            </h2>
          </div>
          <div className="hidden md:block overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-slate-700 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Publisher
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Language
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {books.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      No books available. Start adding books to your collection.
                    </td>
                  </tr>
                ) : (
                  books.map((book) => (
                    <tr
                      key={book.id}
                      className="hover:bg-slate-700 cursor-pointer transition-colors duration-200"
                      onClick={() => {
                        console.log("table row is clicked");
                        navigate(`/book/${book.id}`);
                      }}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        {book.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {book.author}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {book.publisher}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {book.language}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              editBookDataHandler(book.id);
                            }}
                            className="px-5 py-2 bg-emerald-600 text-white text-sm font-semibold rounded hover:bg-emerald-500 transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteBookDataHandler(book.id);
                            }}
                            className="px-5 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-500 transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="md:hidden max-h-96 overflow-y-auto">
            {books.length === 0 ? (
              <div className="px-4 py-12 text-center text-slate-400">
                No books available. Start adding books.
              </div>
            ) : (
              <div className="divide-y divide-slate-700">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="p-4 hover:bg-slate-700 transition-colors duration-200"
                    onClick={() => {
                      console.log("card is clicked");
                      navigate(`/book/${book.id}`);
                    }}
                  >
                    <h3 className="font-semibold text-white mb-3 text-base">
                      {book.title}
                    </h3>
                    <div className="text-sm text-slate-300 space-y-1.5 mb-4">
                      <p>
                        <span className="font-medium text-slate-200">
                          Author:
                        </span>{" "}
                        {book.author}
                      </p>
                      <p>
                        <span className="font-medium text-slate-200">
                          Publisher:
                        </span>{" "}
                        {book.publisher}
                      </p>
                      <p>
                        <span className="font-medium text-slate-200">
                          Language:
                        </span>{" "}
                        {book.language}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editBookDataHandler(book.id);
                        }}
                        className="flex-1 px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded hover:bg-emerald-500 transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteBookDataHandler(book.id);
                        }}
                        className="flex-1 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-500 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;