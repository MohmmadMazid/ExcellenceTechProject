import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-400">
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row items-center justify-between px-6 py-4 text-center space-y-4 lg:space-y-0">
        <h1 className="underline text-sm lg:text-base">
          All Rights Reserved By Mohmmad Mazid
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <Link to="/linkinIn" className="hover:underline">
            LinkedIn
          </Link>
          <Link to="/Instagram" className="hover:underline">
            Instagram
          </Link>
          <Link to="/githube" className="hover:underline">
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
