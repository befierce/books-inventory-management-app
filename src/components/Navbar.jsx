import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { use } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="">
      <div className="">
        <div className="">
          <h1 className="">Book Inventory System</h1>
          <h3 className="">Your Premium Book Collection Management</h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
