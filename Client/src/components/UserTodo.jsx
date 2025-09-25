import React, { useEffect, useState } from "react";
import { getUserTodos, deleteUserTodo } from "../todo/todoapi";
import TodoForm from "./TodoForm";

const UserTodos = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await getUserTodos();
      setTodos(res.data);
    } catch (err) {
      alert("Failed to load todos");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUserTodo(id);
      fetchTodos();
    } catch (err) {
      alert("Failed to delete todo");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        User Todos
      </h2>

      {/* Todo Form */}
      <div className="max-w-md mx-auto mb-8">
        <TodoForm onTodoCreated={fetchTodos} />
      </div>

      {/* Todos List */}
      <div className="max-w-4xl mx-auto">
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
