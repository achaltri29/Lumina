#!/bin/bash

echo "🚀 Setting up Ollama for Lumina Chat Application"
echo "================================================"

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama is not installed. Please install it first:"
    echo "   Visit: https://ollama.ai/download"
    echo "   Or run: curl -fsSL https://ollama.ai/install.sh | sh"
    exit 1
fi

echo "✅ Ollama is installed"

# Start Ollama service
echo "🔄 Starting Ollama service..."
ollama serve &
OLLAMA_PID=$!

# Wait for Ollama to start
echo "⏳ Waiting for Ollama to start..."
sleep 5

# Check if Ollama is running
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "❌ Failed to start Ollama service"
    exit 1
fi

echo "✅ Ollama service is running"

# Pull the model
echo "📥 Downloading Llama2 model (this may take a while)..."
ollama pull llama2

# Verify model is available
if ollama list | grep -q "llama2"; then
    echo "✅ Llama2 model is ready"
else
    echo "❌ Failed to download Llama2 model"
    exit 1
fi

echo ""
echo "🎉 Setup complete! Your Lumina backend is ready to use Ollama."
echo ""
echo "To start your backend:"
echo "  cd Backend"
echo "  npm install"
echo "  npm start"
echo ""
echo "To stop Ollama service later:"
echo "  kill $OLLAMA_PID"
