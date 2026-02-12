import "dotenv/config";
import getAIResponse from "./utils/aiService.js";

const testAIService = async () => {
    console.log("🧪 Testing AI Service Setup");
    console.log("==========================");
    
    console.log(`AI Service: ${process.env.AI_SERVICE || 'groq'}`);
    
    if (process.env.AI_SERVICE === 'groq') {
        console.log(`Groq Model: ${process.env.GROQ_MODEL || 'llama3-8b-8192'}`);
        console.log(`API Key: ${process.env.GROQ_API_KEY ? '✅ Set' : '❌ Missing'}`);
    } else if (process.env.AI_SERVICE === 'ollama') {
        console.log(`Ollama URL: ${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}`);
        console.log(`Model: ${process.env.OLLAMA_MODEL || 'llama2'}`);
    }
    
    try {
        console.log("\n📤 Sending test message...");
        const response = await getAIResponse("Hello, can you respond with just 'Test successful'?");
        console.log("📥 AI Response:", response);
        console.log("\n✅ AI Service is working correctly!");
    } catch (error) {
        console.error("❌ AI Service test failed:", error.message);
        console.log("\n🔧 Troubleshooting:");
        
        if (process.env.AI_SERVICE === 'groq') {
            console.log("1. Get API key from: https://console.groq.com");
            console.log("2. Update GROQ_API_KEY in .env file");
            console.log("3. Check if API key is valid");
        } else if (process.env.AI_SERVICE === 'ollama') {
            console.log("1. Make sure Ollama is running: ollama serve");
            console.log("2. Check if model is downloaded: ollama list");
            console.log("3. Verify .env file configuration");
        }
    }
};

testAIService();
