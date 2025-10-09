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
import SingleUser from "./components/SingleUser";
import UpdateUser from "./components/UpdateUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoneTodo from "./components/DoneTodo";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <ToastContainer />
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userTodos" element={<UserTodos />} />
        <Route path="userTodos/singleTodo/:id" element={<SingleUser />} />
        <Route path="userTodo/update/:id" element={<UpdateUser />} />
        <Route path="/adminTodos" element={<AdminTodos />} />
        <Route path="/todoForm" element={<TodoForm />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/userTodo" element={<UserTodo />} /> */}
        <Route path="/completedTodos" element={<DoneTodo />} />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
