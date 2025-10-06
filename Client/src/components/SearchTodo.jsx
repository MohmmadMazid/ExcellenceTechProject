import React, { useState } from "react";
import { getSingleTodo } from "../todo/todoapi";
import { Link } from "react-router-dom";

const SearchTodo = ({ handleDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [todos, setTodos] = useState([]);
  console.log(searchQuery);

  const handleSearch = async () => {
    let fetching = await fetch(
      `http://localhost:5000/api/todos/search?title=${encodeURIComponent(
        searchQuery
      )}`
    );
    let getdata = await fetching.json();
    setTodos(getdata.data);
    // console.log(data);
  };
  return (
    <div className="flex flex-col justify-center items-center m-10 bg-white p-10 rounded-lg shadow-lg">
      <div>
        <h1 className="text-xl font-bold text-center mb-10 ">Search Todo</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="search todo"
          className="border-1 p-3 w-100 rounded-2xl text-center border-gray-300 focus:outline-1 outline-offset-1 outline-green-200 text-xl tracking-wide "
        ></input>
        <br />
        <br />
        <button
          className="border-2 p-2 w-50 text-xl rounded-2xl  border-blue-900  outline-1 outline-blue-700
            bg-blue-700 outline-offset-0 hover:bg-blue-600 cursor-pointer text-white font-bold
          "
          onClick={handleSearch}
        >
          submit
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex justify-between items-start"
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

            <button
              onClick={() => handleDelete(todo._id)}
              className="ml-3 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition self-start"
            >
              Delete
            </button>
            <button
              onClick={() => getSingleTodo(todo._id)}
              className="ml-3 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition self-start"
            >
              <Link to={`singleTodo/${todo._id}`}>check</Link>
            </button>
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
