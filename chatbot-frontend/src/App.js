// src/App.js
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import store from "./store/store";
import Chatbot from "./components/Chatbot";
import History from "./components/History";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
          <nav className="mb-4">
            <Link to="/" className="mx-2 text-blue-600">
              Chatbot
            </Link>
            <Link to="/history" className="mx-2 text-blue-600">
              History
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<Chatbot />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
