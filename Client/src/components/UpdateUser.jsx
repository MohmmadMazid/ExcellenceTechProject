import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleTodo, updateUserTodo } from "../todo/todoapi";

const UpdateUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  let id = params.id;
  const [todo, setTodo] = useState({
    category: "",
    completedStatues: false,
    description: "",
    dueData: Date.now(),
    title: "",
  });
  console.log("params are ", params);

  // first fetching the from backend

  useEffect(() => {
    let gettingData = async () => {
      let res = await getSingleTodo(id);
      console.log("response of the api is ", res.data);
      setTodo(res.data);
    };
    gettingData();
    console.log("todo data is ", todo);
  }, []);

  const handleInputChange = (e) => {
    setTodo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserTodo(todo._id, todo);
    alert("todo updated successfully");
    navigate("/userTodos");
  };
  return (
    <div
      className="flex flex-col justify-around items-center  bg-gray-50
      min-h-screen
    "
    >
      <div className="w-full max-w-md justify-center  bg-white rounded-xl  shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Updating User details and This is also the prefilled form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col items-center"
        >
          <input
            type="text"
            value={todo.category}
            name="category"
            onChange={handleInputChange}
            className="border-1 p-3 w-full rounded-2xl text-center border-gray-300 focus:outline-1 outline-offset-1 outline-green-200 text-xl tracking-wide "
          ></input>
          <br></br>
          <br></br>
          <input
            type="text"
            value={todo.description}
            name="description"
            onChange={handleInputChange}
            className="border-1 p-3 w-full rounded-2xl text-center border-gray-300 focus:outline-1 outline-offset-1 outline-green-200 text-xl tracking-wide "
          ></input>
          <br></br>
          <br></br>
          <input
            type="date"
            value={todo.dueData}
            name="dueData"
            onChange={handleInputChange}
            className="border-1 p-3 w-full rounded-2xl text-center border-gray-300 focus:outline-1 outline-offset-1 outline-green-200 text-xl tracking-wide "
          ></input>
          <br></br>
          <br></br>
          <input
            type="text"
            value={todo.title}
            name="title"
            onChange={handleInputChange}
            className="border-1 p-3 w-full rounded-2xl text-center border-gray-300 focus:outline-1 outline-offset-1 outline-green-200 text-xl tracking-wide "
          ></input>
          <br></br>
          <br></br>
          <button
            className="border-2 p-2 w-full text-xl rounded-2xl  border-blue-900  outline-1 outline-blue-700
            bg-blue-700 outline-offset-0 hover:bg-blue-600 cursor-pointer text-white font-bold
          "
          >
            submit
          </button>

          <br></br>
          <br></br>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
