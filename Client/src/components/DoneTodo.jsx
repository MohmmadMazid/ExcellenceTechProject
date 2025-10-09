import React, { useState, useEffect } from "react";
import { completedTodos, deleteUserTodo } from "../todo/todoapi";
import { toast } from "react-toastify";

const DoneTodo = () => {
  const [todos, setTodos] = useState([]);
  const fetchtodos = async () => {
    let data = await completedTodos();
    setTodos(data.data.data);
  };
  useEffect(() => {
    fetchtodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUserTodo(id);
      toast.success("todo deleted successfully");
      fetchtodos();

      // You may want to refresh the list here in real case
    } catch (err) {
      toast.error("failed to delete todod");
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center">Completed Todos</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 line-through">
                  {todo.title}
                </h3>
                <p className="text-gray-600 mt-1  line-through">
                  {todo.description}
                </p>
                {todo.dueDate && (
                  <p className="text-sm text-gray-500 mt-2  line-through">
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
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Now you can delete
                </button>
              </div>
            </div>
          ))}

          {todos.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-4">
              There is not any completed todo !
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoneTodo;
