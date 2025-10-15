import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { use } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-800 text-white ">
      <h1 className="text-lg px-20 py-12 font-bold h-32" >Book Inventory System</h1>
    </div>
  );
};

export default Navbar;
