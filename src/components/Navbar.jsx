import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold">Book Inventory System</h1>
          <h3 className="text-2xl font-100">
            Your Premium Book Collection Management
          </h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
