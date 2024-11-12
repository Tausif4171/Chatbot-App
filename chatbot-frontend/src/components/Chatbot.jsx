import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addResponse } from "../store/historySlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copyIcon from "../assets/copy.svg";

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
      const res = await axios.post(
        "https://chatbot-backend4171.vercel.app/api/chatbot",
        {
          query,
        }
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error sending query:", error);
      toast.error("Error fetching the response.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResponse = async () => {
    if (response) {
      try {
        await axios.post(
          "https://chatbot-backend4171.vercel.app/api/chatbot/save",
          {
            input: query,
            result_text: response.result_text,
          }
        );
        dispatch(addResponse(response));
        toast.success("Response saved successfully!", {
          autoClose: 3000,
          closeOnClick: true,
        });
      } catch (error) {
        console.error("Error saving response:", error);
        toast.error("Error saving the response.");
      }
    }
  };

  const handleCopyToClipboard = () => {
    if (response?.result_text) {
      navigator.clipboard.writeText(response.result_text).then(() => {
        toast.success("Result copied to clipboard!", {
          autoClose: 2000,
          closeOnClick: true,
        });
      });
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
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold">Result:</h2>
            <button
              onClick={handleCopyToClipboard}
              className="text-gray-500 hover:text-green-500"
              aria-label="Copy result"
            >
              <img src={copyIcon} alt="copy icon" className="w-6 h-6" />
            </button>
          </div>

          <p className="mr-2 mb-4">{response.result_text}</p>

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
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 "
          >
            Save Response
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Chatbot;
