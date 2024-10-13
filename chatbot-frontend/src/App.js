import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store/store";
import Layout from "./components/Layout";
import Chatbot from "./components/Chatbot";
import History from "./components/History";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Chatbot />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
