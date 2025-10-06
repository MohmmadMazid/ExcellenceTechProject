import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "./user/userapi";

const Navbar = () => {
  const navigate = useNavigate();
  let tokenValue = localStorage.getItem("token");
  let [token, setToken] = useState(tokenValue);
  console.log("token check inside the navbar component ", token);
  const handleLogout = async () => {
    try {
      await logoutUser();
      // let token = localStorage.getItem("token");
      if (token) {
        alert("use logged Out");
        // localStorage.removeItem("token");
        let removeToken = localStorage.removeItem("token");
        setToken(removeToken);
      } else {
        alert("you are allready logged out , now you need to logein !");
        navigate("/login");
      }
    } catch (err) {
      alert("user not Logged out successfully", err);
    }
  };

  return (
    <nav className="sticky top-0 z-100 bg-indigo-600 text-white px-10 py-4 shadow-md  ">
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

          {/* <li>
            <Link to="/logout" className="hover:text-gray-200 transition">
              Logout
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
