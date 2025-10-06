/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { getSingleTodo } from "../todo/todoapi";

const SingleUser = () => {
  const [todo, setTodo] = useState({});
  const params = useParams();
  console.log(params);

  const fetchTodo = async () => {
    try {
      /* 
       you can also make an api call to backend if you dont want to make call using  axios.create 
      let res = await fetch(
        `http://localhost:5000/api/todos/user/${params.id}`
        let tododata = await res.json();
      );
        */
      let tododata = await getSingleTodo(params.id);
      console.log("todo data is ", tododata);
      // console.log(localStorage.getItem("token"));
      // localStorage.removeItem("token");
      setTodo(tododata.data);
      // console.log(tododata.data);
      // console.log(tododata._id);
    } catch (error) {
      console.log("some error acccured during run time", error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-start items-center bg-gray-100 ">
      <div className="mt-10 bg-white p-10 rounded-xl shadow-xl text-xl text-cyan-900">
        <h1 className="text-center underline underline-offset-6 mb-10">
          Getting Single User Data
        </h1>
        <div className="text-2xl m-2 p-2 ">
          <h2>Title -{todo.title}</h2>
          <h2>Description -{todo.description}</h2>
          <h2>Category-{todo.category}</h2>
          <h2>Due-Date-{todo.dueDate}</h2>
        </div>
        <Link
          to={`/userTodo/update/${todo._id}`}
          className="ml-16 border-1 rounded-lg p-1 flex flex-row justify-center w-100 bg-blue-700 text-white text-2xl hover:bg-blue-600 "
        >
          update
        </Link>
      </div>
    </div>
  );
};

export default SingleUser;
