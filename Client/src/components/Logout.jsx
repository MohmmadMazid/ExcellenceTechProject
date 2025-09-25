import React from "react";
import { logoutUser } from "../user/userapi";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logged out");
    } catch (err) {
      alert("Logout failed");
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-700 rounded-lg text-white p-2 m-3 hover:bg-blue-800 transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
