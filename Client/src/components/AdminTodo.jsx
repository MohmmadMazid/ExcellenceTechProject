import React, { useEffect, useState } from "react";
import { getAdminTodos, deleteAdminTodo } from "../todo/todoapi";

const AdminTodos = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await getAdminTodos();
      setTodos(res.data);
    } catch (err) {
      alert("Failed to load admin todos");
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdminTodo(id);
      fetchTodos();
    } catch (err) {
      alert("Failed to delete admin todo");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="mb-2">
            <span>
              {todo.title} - {todo.description}
            </span>
            <button
              onClick={() => handleDelete(todo._id)}
              className="ml-3 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTodos;
