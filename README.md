# Chatbot App

## Description

The Chatbot App is a web application that provides chatbot functionality powered by a Language Learning Model (LLM). The app utilizes the **BROK API**, which leverages natural language processing (NLP) to generate responses based on user input. Users can engage with the chatbot to get context-aware answers to their queries.

## Technologies Used

This project was built using the following technologies:
- **Frontend**: ReactJS, JavaScript, Tailwind CSS, Redux
- **Backend**: Node.js, Express.js, MongoDB
- **API**: BROK API (LLM)

## API Integration

This project integrates a Language Learning Model (LLM) API to provide chatbot functionality. The BROK API allows the chatbot to understand and reply to various types of queries, providing accurate and context-aware responses.

## How to Run the Project Locally

### Backend Setup

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Tausif4171/Chatbot-App.git
   
2. Navigate to the backend directory:
   ```bash
   cd chatbot-backend

4. Install the required dependencies:
   ```bash
   npm install

5. Set up environment variables:
   - Create a .env file in the backend directory and configure MongoDB connection string and BROK API key. Example:
     ```
     MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.9uhg0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
     BROK_API_KEY="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"

6. Start the backend server:
   ```bash
   npm run dev

The backend server will run on http://localhost:5000.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd chatbot-frontend

3. Install the required dependencies:
   ```bash
   npm install
     
5. Start the frontend development server:
   ```bash
   npm start
     
The app will run on http://localhost:3000.

Thanks!
