import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/users",
  withCredentials: true,
});

// Register user
export const registerUser = (userData) => API.post("/register", userData);

// Login user
export const loginUser = (credentials) => API.post("/login", credentials);

// Logout user
export const logoutUser = () => API.post("/logout");
