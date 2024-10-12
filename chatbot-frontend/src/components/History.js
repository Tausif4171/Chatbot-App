import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchUserResponses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/chatbot/history"
        );
        setResponses(res.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchUserResponses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My History</h1>
      <ul>
        {responses.map((response, index) => (
          <li key={index} className="border-b py-2">
            <p>
              <strong>Summary:</strong> {response.summary}
            </p>
            <p>
              <strong>Result:</strong> {response.result_text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
