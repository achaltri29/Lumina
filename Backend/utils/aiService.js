import "dotenv/config";
import getOpenAIAPIResponse from "./openai.js";
import getOllamaResponse from "./ollama.js";
import getGroqResponse from "./groq.js";

const getAIResponse = async(message) => {
    const aiService = process.env.AI_SERVICE || "groq";
    
    try {
        switch(aiService.toLowerCase()) {
            case "openai":
                return await getOpenAIAPIResponse(message);
            case "ollama":
                return await getOllamaResponse(message);
            case "groq":
                return await getGroqResponse(message);
            default:
                console.warn(`Unknown AI service: ${aiService}. Falling back to Groq.`);
                return await getGroqResponse(message);
        }
    } catch(err) {
        console.error(`Error with ${aiService}:`, err);
        // Fallback to Groq if primary service fails
        if (aiService.toLowerCase() !== "groq") {
            console.log("Falling back to Groq...");
            return await getGroqResponse(message);
        }
        throw err;
    }
}

export default getAIResponse;
