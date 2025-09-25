import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white px-10 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">TodoApp</h1>

        <ul className="flex space-x-8 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/todoForm" className="hover:text-gray-200 transition">
              TodoForm
            </Link>
          </li>
          <li>
            <Link to="/userTodos" className="hover:text-gray-200 transition">
              User Todos
            </Link>
          </li>
          <li>
            <Link to="/adminTodos" className="hover:text-gray-200 transition">
              Admin Todos
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-200 transition">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:text-gray-200 transition">
              Login
            </Link>
          </li>
          <li>
            <Link to="/logout" className="hover:text-gray-200 transition">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
