import { useState, useEffect } from "react";

const AddBook = ({ initialData, onSubmit, onCancel }) => {
  const [formInputData, setFormInputData] = useState({
    title: "",
    author: "",
    year: "",
    pages: "",
    publisher: "",
    language: "",
    overview: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormInputData({
        title: initialData.title || "",
        author: initialData.author || "",
        year: initialData.year || "",
        pages: initialData.pages || "",
        publisher: initialData.publisher || "",
        language: initialData.language || "",
        overview: initialData.overview || "",
      });
    }
  }, [initialData]);

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setFormInputData((prev) => {
      return { ...prev, [name]: value };
    });
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const formValidation = () => {
    const newErrors = {};
    if (!formInputData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (/^\d+$/.test(formInputData.title.trim())) {
      newErrors.title = "Title cannot be only numbers";
    }
    if (!formInputData.author.trim()) {
      newErrors.author = "Author is required";
    } else if (/^\d+$/.test(formInputData.author.trim())) {
      newErrors.author = "Author should not have numbers only";
    }
    if (!formInputData.year) {
      newErrors.year = "year is required";
    } else if (!/^\d{4}$/.test(formInputData.year)) {
      newErrors.year = "Enter valid year";
    }
    if (!formInputData.pages) {
      newErrors.pages = "Pages are required";
    } else if (!/^\d+$/.test(formInputData.pages)) {
      newErrors.pages = "Pages must be a positive number";
    }
    if (!formInputData.publisher.trim()) {
      newErrors.publisher = "Publisher is required";
    } else if (/^\d+$/.test(formInputData.publisher.trim())) {
      newErrors.publisher = "Publisher cannot be only numbers";
    }
    if (!formInputData.language.trim()) {
      newErrors.language = "Language is required";
    } else if (/^\d+$/.test(formInputData.language.trim())) {
      newErrors.language = "Language cannot be only numbers";
    }
    if (!formInputData.overview.trim()) {
      newErrors.overview = "Overview is required";
    } else if (/^\d+$/.test(formInputData.overview.trim())) {
      newErrors.overview = "Overview cannot be only numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formInputData);
    if (!formValidation()) {
      return;
    }

    if (onSubmit) {
      onSubmit(formInputData);
    }
    setFormInputData({
      title: "",
      author: "",
      year: "",
      pages: "",
      publisher: "",
      language: "",
      overview: "",
    });
    setErrors({});
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-5 sm:p-6 border border-slate-700">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-emerald-400">
          {initialData ? "Edit Book" : "Add Book"}
        </h2>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <input
              placeholder="Title"
              name="title"
              value={formInputData.title}
              onChange={formInputHandler}
              className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Author"
              name="author"
              value={formInputData.author}
              onChange={formInputHandler}
              className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            {errors.author && (
              <p className="text-red-400 text-sm mt-1">{errors.author}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Year"
              name="year"
              value={formInputData.year}
              onChange={formInputHandler}
              className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            {errors.year && (
              <p className="text-red-400 text-sm mt-1">{errors.year}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Pages"
              name="pages"
              value={formInputData.pages}
              onChange={formInputHandler}
              className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            {errors.pages && (
              <p className="text-red-400 text-sm mt-1">{errors.pages}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Publisher"
              name="publisher"
              value={formInputData.publisher}
              onChange={formInputHandler}
              className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            {errors.publisher && (
              <p className="text-red-400 text-sm mt-1">{errors.publisher}</p>
            )}
          </div>
          <div>
            <input
              placeholder="Language"
              name="language"
              value={formInputData.language}
              onChange={formInputHandler}
              className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
            {errors.language && (
              <p className="text-red-400 text-sm mt-1">{errors.language}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <textarea
              placeholder="Overview"
              name="overview"
              value={formInputData.overview}
              onChange={formInputHandler}
              rows="4"
              className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
            />
            {errors.overview && (
              <p className="text-red-400 text-sm mt-1">{errors.overview}</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white text-sm font-semibold rounded hover:bg-emerald-500 transition-colors duration-200"
          >
            {initialData ? "Update Book" : "Add Book"}
          </button>
          {initialData && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-8 py-3 ml-0 sm:ml-3 mt-3 sm:mt-0 bg-slate-600 text-white text-sm font-semibold rounded hover:bg-slate-500 transition-colors duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddBook;
