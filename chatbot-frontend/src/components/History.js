import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Fetch saved responses from the API
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/chatbot/history"
        );
        setResponses(res.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Chatbot Response History</h2>
      <ul className="mt-4">
        {responses.map((response, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded mb-4">
            <h3 className="font-bold">Summary:</h3>
            <p>{response.summary}</p>
            <h3 className="font-bold">Result:</h3>
            <p>{response.result_text}</p>
            {response.result_table_path && (
              <img src={response.result_table_path} alt="Result Table" />
            )}
            {response.result_visualization_path && (
              <img
                src={response.result_visualization_path}
                alt="Result Visualization"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
