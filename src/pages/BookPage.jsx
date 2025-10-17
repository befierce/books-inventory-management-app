import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BookPage = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://firestore.googleapis.com/v1/projects/book-inventory-managemen-ebcf6/databases/(default)/documents/books/${id}`
        );

        if (!response.ok) {
          throw new Error("network response was not ok");
        }

        const data = await response.json();

        
        if (data.fields) {
          const book = {
            title: data.fields.title?.stringValue,
            author: data.fields.author?.stringValue,
            language: data.fields.language?.stringValue,
            overview: data.fields.overview?.stringValue,
            pages: data.fields.pages?.integerValue,
            publisher: data.fields.publisher?.stringValue,
            year: data.fields.year?.integerValue,
          };
          setBook(book);
        } else {
          throw new Error("Book not found");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <div className="text-xl text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-6 sm:py-8 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-5 py-2 bg-slate-700 text-emerald-400 hover:bg-slate-600 font-semibold rounded transition-colors border border-slate-600"
        >
          ← Back to Store
        </button>

        <div className="bg-slate-800 rounded-lg shadow-lg p-5 sm:p-6 mb-6 border border-slate-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {book.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            by {book.author}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="bg-slate-800 rounded-lg shadow-lg p-5 border border-slate-700">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
              Publisher
            </h3>
            <p className="text-base sm:text-lg text-white">{book.publisher}</p>
          </div>

          <div className="bg-slate-800 rounded-lg shadow-lg p-5 border border-slate-700">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
              Language
            </h3>
            <p className="text-base sm:text-lg text-white">{book.language}</p>
          </div>

          <div className="bg-slate-800 rounded-lg shadow-lg p-5 border border-slate-700">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
              Pages
            </h3>
            <p className="text-base sm:text-lg text-white">{book.pages}</p>
          </div>

          <div className="bg-slate-800 rounded-lg shadow-lg p-5 border border-slate-700">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
              Year
            </h3>
            <p className="text-base sm:text-lg text-white">{book.year}</p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-lg p-5 sm:p-6 border border-slate-700">
          <h2 className="text-lg sm:text-xl font-bold text-emerald-400 mb-4">
            Overview
          </h2>
          <p className="text-slate-300 leading-relaxed">{book.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
