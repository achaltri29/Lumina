import "dotenv/config";

const getOpenAIAPIResponse = async(message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: message
            }]
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
        }
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Invalid response format from OpenAI API');
        }
        
        return data.choices[0].message.content; //reply
    } catch(err) {
        console.error('OpenAI API Error:', err);
        return "Sorry, I'm having trouble connecting to the AI service. Please try again later.";
    }
}

export default getOpenAIAPIResponse;