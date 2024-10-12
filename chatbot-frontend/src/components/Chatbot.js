import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addResponse } from "../store/historySlice";
import axios from "axios";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        query,
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Error sending query:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResponse = async () => {
    if (response) {
      try {
        // Make an API call to save the response to the database
        await axios.post("http://localhost:5000/api/chatbot/save", {
          summary: response.summary,
          result_text: response.result_text,
          // Add any other relevant fields
        });
        dispatch(addResponse(response));
        alert("Response saved!");
      } catch (error) {
        console.error("Error saving response:", error);
      }
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ask your question..."
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded mt-2 w-full hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {response && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">Summary:</h2>
          <p>{response.summary}</p>
          <h2 className="font-bold">Result:</h2>
          <p>{response.result_text}</p>

          {response.result_table_path && (
            <img
              src={response.result_table_path}
              alt="Result Table"
              className="my-2 rounded"
            />
          )}

          {response.result_visualization_path && (
            <img
              src={response.result_visualization_path}
              alt="Result Visualization"
              className="my-2 rounded"
            />
          )}

          <button
            onClick={handleSaveResponse}
            className="bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600"
          >
            Save Response
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
