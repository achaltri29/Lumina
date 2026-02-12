import "dotenv/config";

const getGroqResponse = async(message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: process.env.GROQ_MODEL || "llama3-8b-8192",
            messages: [{
                role: "user",
                content: message
            }],
            temperature: 0.7,
            max_tokens: 1024
        })
    };

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Groq API Error Details:', errorData);
            throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorData.error?.message || ''}`);
        }
        
        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            console.error('Invalid Groq response format:', data);
            throw new Error('Invalid response format from Groq API');
        }
        
        return data.choices[0].message.content;
    } catch(err) {
        console.error('Groq API Error:', err);
        return "Sorry, I'm having trouble connecting to the AI service. Please check your Groq API key and try again.";
    }
}

export default getGroqResponse;
