import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BookPage = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/book-inventory-managemen-ebcf6/databases/(default)/documents/books/${id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
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
        setBook(book);
      }
    };
    fetchData();
  }, [id]);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Store
        </button>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600">by {book.author}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Publisher</h3>
            <p className="text-lg text-gray-800">{book.publisher}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Language</h3>
            <p className="text-lg text-gray-800">{book.language}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Pages</h3>
            <p className="text-lg text-gray-800">{book.pages}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">Year</h3>
            <p className="text-lg text-gray-800">{book.year}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">{book.overview}</p>
        </div>

      </div>
    </div>
  );
};

export default BookPage;