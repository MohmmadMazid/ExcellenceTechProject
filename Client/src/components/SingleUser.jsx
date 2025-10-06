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
    let tododata = await getSingleTodo(params.id);
    setTodo(tododata.data);
    console.log(tododata.data);
    console.log(tododata._id);
  };

  useEffect(() => {
    fetchTodo();
  }, []);
  return (
    <div>
      <h1>Getting Single User Data</h1>
      <div className="text-2xl m-2 p-2 rounded-lg border-2 bg-cyan-300 text-purple-900 border-green-600">
        <h2>{todo.category}</h2>
        <h2>{todo.description}</h2>
      </div>
      <Link to={`/userTodo/update/${todo._id}`}>update</Link>
    </div>
  );
};

export default SingleUser;
