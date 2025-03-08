import React from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Financial Courses</h1>
      <div className="mt-4">
        <Link to="/course-details" className="block p-4 bg-gray-100 my-2 rounded">Course 1: Budgeting Basics</Link>
        <Link to="/course-details" className="block p-4 bg-gray-100 my-2 rounded">Course 2: Smart Investing</Link>
      </div>
    </div>
  );
};

export default Courses;
