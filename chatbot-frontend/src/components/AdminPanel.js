import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/chatbot/responses"
        ); // Create an endpoint to fetch responses
        setResponses(res.data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };

    fetchResponses();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
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

export default AdminPanel;
