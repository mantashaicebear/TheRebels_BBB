import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-pink-200 p-4 flex justify-between">
      <h1 className="text-xl font-bold text-gray-800">SHEFunds</h1>
      <div>
        <Link to="/" className="px-4">Home</Link>
        <Link to="/courses" className="px-4">Courses</Link>
        <Link to="/grants" className="px-4">Grants</Link>
        <Link to="/wealth-aid" className="px-4">Wealth Aid</Link>
      </div>
    </nav>
  );
};

export default Navbar;

