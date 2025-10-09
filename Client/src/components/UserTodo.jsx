import React, { useEffect, useState } from "react";
import { getUserTodos, deleteUserTodo } from "../todo/todoapi";
import { Link } from "react-router-dom";
import SearchTodo from "./SearchTodo";
// import TodoForm from "./TodoForm"; // Uncomment if needed
import { toast } from "react-toastify";

const UserTodos = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await getUserTodos();
      setTodos(res.data);
    } catch (err) {
      alert("Failed to load todos");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserTodo(id);
      toast.success("todo deleted successfully");
      fetchTodos(); // Refresh list after deletion
    } catch (err) {
      // alert("Failed to delete todo");
      toast.error("failed to delete todod");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-6 text-center">
        User Todos
      </h2>

      {/* Optional Todo Form */}
      {/* <div className="max-w-xl mx-auto mb-8">
        <TodoForm onTodoCreated={fetchTodos} />
      </div> */}

      {/* Search Todo */}
      <div className="max-w-5xl mx-auto mb-8 px-4">
        <SearchTodo handleDelete={handleDelete} />
      </div>

      {/* Todos List */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>

                <Link to={`singleTodo/${todo._id}`}>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                    Check
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {todos.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-4">
              No todos available. Create one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTodos;
