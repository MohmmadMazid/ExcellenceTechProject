import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-indigo-600">Todo App</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Stay productive and organized by managing your daily tasks with ease.
          Create, edit, and track todos all in one place.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 text-gray-800 font-medium px-6 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mt-16 grid grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            Easy to Use
          </h3>
          <p className="text-gray-600">
            A simple interface that makes managing tasks smooth and effortless.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            Stay Organized
          </h3>
          <p className="text-gray-600">
            Categorize tasks, set deadlines, and track your progress easily.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Secure</h3>
          <p className="text-gray-600">
            Your data is safe and accessible only to you with secure login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
