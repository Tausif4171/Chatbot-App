import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserResponses = async () => {
      try {
        const res = await axios.get(
          "https://chatbot-backend4171.vercel.app/api/chatbot/history"
        );
        setResponses(res.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserResponses();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold">My History</h1>
      {loading ? (
        <p>Loading history...</p>
      ) : (
        <ul>
          {responses.map((response, index) => (
            <li key={index} className="border-b py-2">
              <p>
                <strong>Prompt:</strong> {response.prompt}
              </p>
              <p>
                <strong>Chatbot Response:</strong> {response.result}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
