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

// Update todo as admin
export const updateAdminTodo = (id, updateData) =>
  API.put(`/admin/${id}`, updateData);

// Delete todo as user
export const deleteUserTodo = (id) => API.delete(`/user/${id}`);

// Delete todo as admin
export const deleteAdminTodo = (id) => API.delete(`/admin/${id}`);
