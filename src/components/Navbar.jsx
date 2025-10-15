import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { use } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const addABookHandler = () => {
    // useState((prev) => !prev);
    navigate("/addbookform");
  };
  return (
    <nav className="">
      <div className="">
        <div className="">
          <h1 className="">Book Inventory System</h1>
          <h3 className="">Your Premium Book Collection Management</h3>
        </div>
        <div>
          <button onClick={addABookHandler}>Add a Book</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
