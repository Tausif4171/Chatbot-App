import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(
          "https://chatbot-backend4171.vercel.app/api/chatbot/responses"
        );
        setResponses(res.data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      {loading ? (
        <p>Loading responses...</p>
      ) : (
        <ul>
          {responses.map((response, index) => (
            <li key={index} className="border-b py-2">
              <p>
                <strong>User ID:</strong> {response.userId}
              </p>
              <p>
                <strong>Input:</strong> {response.input}
              </p>
              <p>
                <strong>Result:</strong> {response.result_text}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
