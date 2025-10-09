import React, { useState } from "react";
import { getSingleTodo } from "../todo/todoapi";
import { Link } from "react-router-dom";

const SearchTodo = ({ handleDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(
      `http://localhost:5000/api/todos/search?title=${encodeURIComponent(
        searchQuery
      )}`
    );
    const data = await res.json();
    setTodos(data.data);
  };

  return (
    <div className=" rounded-2xl bg-white active:outline-1 active:outline-blue-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-700">
        Search Todo
      </h1>

      <div className="w-full flex flex-col items-center space-y-4 sm:space-y-6 mb-8 px-4">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search todo"
          className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg text-base tracking-wide focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-base sm:text-lg font-medium hover:bg-blue-500 transition cursor-pointer"
        >
          Submit
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {todo.title}
              </h3>
              <p className="text-gray-600 mt-1">{todo.description}</p>
              {todo.dueDate && (
                <p className="text-sm text-gray-500 mt-2">
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </p>
              )}
              {todo.category && (
                <p className="text-sm text-indigo-500 mt-1">
                  Category: {todo.category}
                </p>
              )}
            </div>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleDelete(todo._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
              >
                Delete
              </button>
              <Link to={`singleTodo/${todo._id}`}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                  Check
                </button>
              </Link>
            </div>
          </div>
        ))}

        {todos.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-4">
            No todos available. Search one above!
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchTodo;
