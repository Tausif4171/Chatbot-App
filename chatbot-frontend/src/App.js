import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faHistory,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import store from "./store/store";
import Chatbot from "./components/Chatbot";
import History from "./components/History";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-r from-green-200 to-green-500 flex flex-col items-center justify-center px-6 py-12">
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
              <li>
                <Link
                  to="/admin"
                  className="flex items-center text-green-600 hover:text-green-800 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faUserShield} className="mr-1" /> Admin
                  Panel
                </Link>
              </li>
            </ul>
          </nav>
          <div className="w-full max-w-4xl p-4">
            <Routes>
              <Route path="/" element={<Chatbot />} />
              <Route path="/history" element={<History />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
