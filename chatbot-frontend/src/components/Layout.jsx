import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faHistory,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-r from-green-200 to-green-500 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        Welcome to the Chatbot Application
      </h1>

      <p className="text-lg text-white mb-9 text-center">
        Chat with our AI to get answers quickly and easily! 💬 🤖
      </p>

      <nav className="bg-white shadow-lg rounded-md p-4 mb-4 w-full max-w-4xl">
        <ul className="flex justify-around">
          <li>
            <Link
              to="/"
              className="flex items-center text-green-600 hover:text-green-800 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faComments} className="mr-1" /> Chatbot
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="flex items-center text-green-600 hover:text-green-800 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faHistory} className="mr-1" /> History
            </Link>
          </li>
          {/* <li>
            <Link
              to="/admin"
              className="flex items-center text-green-600 hover:text-green-800 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faUserShield} className="mr-1" /> Admin
              Panel
            </Link>
          </li> */}
        </ul>
      </nav>

      <div className="w-full max-w-4xl p-4">{children}</div>
    </div>
  );
};

export default Layout;
