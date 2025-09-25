import "./App.css";
import AdminTodos from "./components/AdminTodo";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoForm from "./components/TodoForm";
import UserTodos from "./components/UserTodo";
import Homepage from "./Homepage";
import Logout from "./components/Logout";

import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userTodos" element={<UserTodos />} />
        <Route path="/adminTodos" element={<AdminTodos />} />
        <Route path="/todoForm" element={<TodoForm />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
