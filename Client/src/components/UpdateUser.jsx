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
    navigate("/userTodos");
  };
  return (
    <div>
      <h1>Updating User details and This is also the prefilled form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo.category}
          name="category"
          onChange={handleInputChange}
        ></input>
        <br></br>
        <br></br>
        <input
          type="text"
          value={todo.description}
          name="description"
          onChange={handleInputChange}
        ></input>
        <br></br>
        <br></br>
        <input
          type="date"
          value={todo.dueData}
          name="dueData"
          onChange={handleInputChange}
        ></input>
        <br></br>
        <br></br>
        <input
          type="text"
          value={todo.title}
          name="title"
          onChange={handleInputChange}
        ></input>
        <br></br>
        <br></br>
        <button>submit</button>

        <br></br>
        <br></br>
      </form>
    </div>
  );
};

export default UpdateUser;
