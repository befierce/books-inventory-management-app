import { useState } from "react";

const AddBook = () => {
  const [formInputData, setFormInputData] = useState({
    title: "",
    author: "",
    year: "",
    pages: "",
    publisher: "",
    language: "",
    overview: "",
  });
  const formInputHandler = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setFormInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formInputData);
    setFormInputData({
      title: "",
      author: "",
      year: "",
      pages: "",
      publisher: "",
      language: "",
      overview: "",
    });
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <input
        placeholder="title"
        name="title"
        value={formInputData.title}
        onChange={formInputHandler}
      ></input>
      <input
        placeholder="author"
        name="author"
        value={formInputData.author}
        onChange={formInputHandler}
      ></input>
      <input
        placeholder="year"
        name="year"
        value={formInputData.year}
        onChange={formInputHandler}
      ></input>
      <input
        placeholder="pages"
        name="pages"
        value={formInputData.pages}
        onChange={formInputHandler}
      ></input>
      <input
        placeholder="publisher"
        name="publisher"
        value={formInputData.publisher}
        onChange={formInputHandler}
      ></input>
      <input
        placeholder="language"
        name="language"
        value={formInputData.language}
        onChange={formInputHandler}
      ></input>
      <input
        placeholder="overview"
        name="overview"
        value={formInputData.overview}
        onChange={formInputHandler}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddBook;
