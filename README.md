# Lumina 

Lumina is an intelligent chat application that enables users to interact with local AI models (powered by Ollama) through a modern, responsive interface. It features secure user authentication, persistent chat history, and seamless thread management.

## Features

- **🤖 AI Chat Interface**: Real-time interaction with LLMs with markdown support.
- **📝 Thread Management**: Create multiple chat threads, switch between them, and delete old conversations.
- **🔒 User Authentication**: Secure Signup/Login functionality.
- **🛡️ Data Privacy**: Chat history is isolated per user—you only see what you create.
- **🎨 Modern UI**: Clean, responsive design built with React and Vite.

## Tech Stack

**Frontend:**
- **React.js** (Vite)
- **CSS3** (Custom styling)
- **Axios** (API communication)
- **React Router** (Navigation)
- **Context API** (State management)

**Backend:**
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **JWT** (JSON Web Tokens for authentication)
- **Bcrypt.js** (Password hashing)
- **Ollama** (Local AI Model Integration)

## Prerequisites

Before running the project, ensure you have the following installed:

1.  **[Node.js](https://nodejs.org/)** (v16 or higher)
2.  **[MongoDB](https://www.mongodb.com/)** (Running locally or using Atlas)
3.  **[Ollama](https://ollama.ai/)** (For running the AI model locally)

## Getting Started

### 1. Setup AI Model (Ollama)
1.  Download and install **Ollama**.
2.  Pull a model (e.g., Llama 2) by opening your terminal and running:
    ```bash
    ollama pull llama2
    ```
3.  Start the Ollama server:
    ```bash
    ollama serve
    ```

### 2. Backend Setup
1.  Navigate to the `Backend` directory:
    ```bash
    cd Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `Backend` directory and add your configuration:
    ```env
    PORT=8080
    MONGODB_URI=mongodb://localhost:27017/lumina
    JWT_SECRET=your_super_secret_key_change_this
    ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```
    *(Use `npm start` if you don't have nodemon installed)*

### 3. Frontend Setup
1.  Open a new terminal and navigate to the `Frontend` directory:
    ```bash
    cd Frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and visit: `http://localhost:5173`

## Usage

- **Sign Up**: Create an account to start saving your chats.
- **Login**: Access your saved history.
- **Guest Mode**: You can chat without logging in, but history will not be saved/retrieved.
