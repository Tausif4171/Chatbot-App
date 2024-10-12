import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addResponse } from "../store/historySlice"; // Import correct action
import axios from "axios";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        query,
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Error sending query:", error);
    }
  };

  const handleSaveResponse = () => {
    if (response) {
      dispatch(addResponse(response)); // Dispatch correct action
      alert("Response saved!");
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          className="border rounded p-2 w-full"
          placeholder="Ask your question..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Submit
        </button>
      </form>
      {response && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">Summary:</h2>
          <p>{response.summary}</p>
          <h2 className="font-bold">Result:</h2>
          <p>{response.result_text}</p>

          {/* Conditionally render result_table_path if it exists and is a valid URL */}
          {response.result_table_path && (
            <img src={response.result_table_path} alt="Result Table" />
          )}

          {/* Conditionally render result_visualization_path if it exists and is a valid URL */}
          {response.result_visualization_path && (
            <img
              src={response.result_visualization_path}
              alt="Result Visualization"
            />
          )}

          <button
            onClick={handleSaveResponse}
            className="bg-green-500 text-white p-2 rounded mt-2"
          >
            Save Response
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
