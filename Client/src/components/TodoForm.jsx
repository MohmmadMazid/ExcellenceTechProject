import React, { useState } from "react";
import { createTodo } from "../todo/todoapi";
import { toast } from "react-toastify";

const TodoForm = () => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "",
  });

  const handleCreate = async () => {
    if (!todo.title || !todo.description) {
      alert("Title and Description are required");
      return;
    }

    try {
      await createTodo(todo);
      // alert("Todo created successfully");
      toast.success("todo created successfully");
      // onTodoCreated();
      setTodo({
        title: "",
        description: "",
        dueDate: "",
        category: "",
      });
    } catch (err) {
      // alert(err.response?.data?.message || "Failed to create todo");
      // toast.error(" failed to create todo !");

      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create a New Todo
      </h3>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          placeholder="Enter description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Due Date</label>
        <input
          type="date"
          value={todo.dueDate}
          onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Category</label>
        <input
          type="text"
          placeholder="Work, Personal, etc."
          value={todo.category}
          onChange={(e) => setTodo({ ...todo, category: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/*
           this is specify for the user role waether a user is admin or only user
        <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          User Role
        </label>
        <input
          type="text"
          placeholder="admin / user"
          value={todo.user.role}
          onChange={(e) =>
            setTodo({ ...todo, user: { ...todo.user, role: e.target.value } })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div> */}

      <button
        onClick={handleCreate}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 cursor-pointer"
      >
        ➕ Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
