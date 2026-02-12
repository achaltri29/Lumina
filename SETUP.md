# 🚀 Lumina Chat Application Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Git

## Quick Start with Ollama (Free AI Alternative)

### 1. Install Ollama

**macOS:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Windows:**
Download from [ollama.ai](https://ollama.ai/download)

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

### 3. Start Ollama and Download Model

```bash
# Start Ollama service
ollama serve

# In another terminal, download the model
ollama pull llama2
```

### 4. Start Backend Server

```bash
cd Backend
npm start
```

### 5. Start Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Alternative AI Services

### Using OpenAI (Paid)

1. Get API key from [OpenAI](https://platform.openai.com/api-keys)
2. Update `.env` file:
```env
AI_SERVICE=openai
OPENAI_API_KEY=your_api_key_here
```

### Using Google Gemini (Free Tier)

1. Get API key from [Google AI Studio](https://aistudio.google.com/)
2. Update `.env` file:
```env
AI_SERVICE=gemini
GEMINI_API_KEY=your_api_key_here
```

## Environment Variables

Create a `.env` file in the Backend directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/lumina

# AI Service Configuration
AI_SERVICE=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# Server Configuration
PORT=8080
```

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Error:**
   - Make sure MongoDB is running
   - Check MONGODB_URI in .env file

2. **Ollama Connection Error:**
   - Make sure Ollama is running: `ollama serve`
   - Check if model is downloaded: `ollama list`

3. **Port Already in Use:**
   - Change PORT in .env file
   - Kill process using port 8080

### Frontend Issues

1. **CORS Error:**
   - Make sure backend is running on port 8080
   - Check CORS configuration in server.js

2. **API Connection Error:**
   - Verify backend URL in ChatWindow.jsx
   - Check if backend is running

## Available AI Models for Ollama

- `llama2` - General purpose (recommended)
- `llama2:13b` - Larger, more capable
- `codellama` - Code generation
- `mistral` - Fast and efficient
- `gemma` - Google's model

To use a different model, update `OLLAMA_MODEL` in .env file.

## API Endpoints

- `GET /health` - Health check
- `GET /api/thread` - Get all threads
- `GET /api/thread/:threadId` - Get specific thread
- `POST /api/chat` - Send message
- `DELETE /api/thread/:threadId` - Delete thread

## Development

### Backend Development
```bash
cd Backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd Frontend
npm run dev  # Vite dev server
```

## Production Deployment

1. Set up MongoDB Atlas or production MongoDB
2. Update environment variables
3. Build frontend: `npm run build`
4. Use PM2 or similar for backend process management

## Support

If you encounter any issues:
1. Check the console logs
2. Verify all services are running
3. Check environment variables
4. Ensure all dependencies are installed
