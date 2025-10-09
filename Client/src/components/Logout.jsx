import React from "react";
import { logoutUser } from "../user/userapi";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      // alert("Logged out");
      toast.success("you are logged out successfully");
    } catch (err) {
      // alert("Logout failed");
      toast.success("failed to logged out");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleLogout}
        className="bg-blue-700 rounded-lg text-white p-2 m-3 hover:bg-blue-800 transition duration-200 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
