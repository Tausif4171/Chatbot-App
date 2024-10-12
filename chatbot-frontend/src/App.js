import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import store from "./store/store";
import Chatbot from "./components/Chatbot";
import History from "./components/History";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <nav className="bg-white shadow-md rounded-md p-4 mb-4 w-full max-w-4xl">
            <ul className="flex justify-around">
              <li>
                <Link to="/" className="text-blue-600 hover:text-blue-800">
                  Chatbot
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-blue-600 hover:text-blue-800"
                >
                  History
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-blue-600 hover:text-blue-800">
                  Admin Panel
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
