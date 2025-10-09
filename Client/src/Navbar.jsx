import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "./user/userapi";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // new state
  let tokenValue = localStorage.getItem("token");
  let [token, setToken] = useState(tokenValue);

  const handleLogout = async () => {
    try {
      await logoutUser();
      if (token) {
        // alert("user logged out");
        toast.success("you are logged out successfully");

        let removeToken = localStorage.removeItem("token");
        setToken(removeToken);
      } else {
        // alert("you are already logged out, please login!");
        toast.success("you are already logged out, please login!");

        navigate("/login");
      }
    } catch (err) {
      toast.success("failed to logged out");
      // alert("User not logged out successfully");
      console.log(err);
    }
  };

  return (
    <nav className=" bg-indigo-600 text-white px-4 sm:px-10 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-2xl font-bold">TodoApp</h1>

        {/* Hamburger for small screens */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
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
            <Link
              to="/completedTodos"
              className="hover:text-gray-200 transition"
            >
              Completed Todos
            </Link>
          </li>
          {token ? (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-200 transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col mt-4 space-y-4 text-lg font-medium md:hidden">
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/todoForm" onClick={() => setIsMenuOpen(false)}>
              TodoForm
            </Link>
          </li>
          <li>
            <Link to="/userTodos" onClick={() => setIsMenuOpen(false)}>
              User Todos
            </Link>
          </li>
          <li>
            <Link
              to="/completedTodos"
              className="hover:text-gray-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Completed Todos
            </Link>
          </li>
          <li>
            <Link to="/adminTodos" onClick={() => setIsMenuOpen(false)}>
              Admin Todos
            </Link>
          </li>
          {token ? (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
