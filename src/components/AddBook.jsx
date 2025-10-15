import { useState, useEffect } from "react";

const AddBook = ({ initialData, onSubmit }) => {
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

    if (!initialData) {
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
    }
  };

  return (
    <>
      <div>
        <h2>{initialData ? "Edit Book" : "Add Book"}</h2>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div>
          <input
            placeholder="title"
            name="title"
            value={formInputData.title}
            onChange={formInputHandler}
          ></input>
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>
        <div>
          <input
            placeholder="author"
            name="author"
            value={formInputData.author}
            onChange={formInputHandler}
          ></input>
          {errors.author && <p style={{ color: "red" }}>{errors.author}</p>}
        </div>
        <div>
          <input
            placeholder="year"
            name="year"
            value={formInputData.year}
            onChange={formInputHandler}
          ></input>
          {errors.year && <p style={{ color: "red" }}>{errors.year}</p>}
        </div>
        <div>
          <input
            placeholder="pages"
            name="pages"
            value={formInputData.pages}
            onChange={formInputHandler}
          ></input>
          {errors.pages && <p style={{ color: "red" }}>{errors.pages}</p>}
        </div>
        <div>
          <input
            placeholder="publisher"
            name="publisher"
            value={formInputData.publisher}
            onChange={formInputHandler}
          ></input>
          {errors.publisher && (
            <p style={{ color: "red" }}>{errors.publisher}</p>
          )}
        </div>
        <div>
          <input
            placeholder="language"
            name="language"
            value={formInputData.language}
            onChange={formInputHandler}
          ></input>
          {errors.language && <p style={{ color: "red" }}>{errors.language}</p>}
        </div>
        <div>
          <input
            placeholder="overview"
            name="overview"
            value={formInputData.overview}
            onChange={formInputHandler}
          ></input>
          {errors.overview && <p style={{ color: "red" }}>{errors.overview}</p>}
        </div>
        <button type="submit">{initialData ? "Update" : "Submit"}</button>
      </form>
    </>
  );
};

export default AddBook;
