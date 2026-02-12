import "dotenv/config";

const getOllamaResponse = async(message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: process.env.OLLAMA_MODEL || "llama2",
            prompt: message,
            stream: false
        })
    };

    try {
        const response = await fetch(`${process.env.OLLAMA_BASE_URL}/api/generate`, options);
        
        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.response) {
            throw new Error('Invalid response format from Ollama API');
        }
        
        return data.response;
    } catch(err) {
        console.error('Ollama API Error:', err);
        return "Sorry, I'm having trouble connecting to the AI service. Please make sure Ollama is running and try again.";
    }
}

export default getOllamaResponse;
