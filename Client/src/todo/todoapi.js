import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/todos", // match backend
  withCredentials: true, // send cookies
});

// Get todos for users
export const getUserTodos = () => API.get("/user");

// Get todos for admins
export const getAdminTodos = () => API.get("/admin");

// Create a new todo
export const createTodo = (todoData) => API.post("/", todoData);

// Update todo as user
export const updateUserTodo = (id, updateData) =>
  API.put(`/user/${id}`, updateData);

// get single User

export const getSingleTodo = (id) => API.get(`user/${id}`);

// Update todo as admin
export const updateAdminTodo = (id, updateData) =>
  API.put(`/admin/${id}`, updateData);

// Delete todo as user
export const deleteUserTodo = (id) => API.delete(`/user/${id}`);

// Delete todo as admin
export const deleteAdminTodo = (id) => API.delete(`/admin/${id}`);

// completed todos ,bringing completed todos of loggedIn User

export const completedTodos = () => API.get("/user/completedTodos");
// marks as done todo
export const marksAsDone = (id) => API.put(`/user/${id}/markdone`);
