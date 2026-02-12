# 🚀 Groq Setup Guide for Lumina Chat

## Why Groq?

- **Free Tier**: 14,400 requests per day
- **Ultra Fast**: 200+ tokens per second
- **Multiple Models**: Llama 3, Mixtral, Gemma
- **No Local Setup**: Cloud-based API
- **OpenAI Compatible**: Easy integration

## Quick Setup

### 1. Get Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `gsk_`)

### 2. Update Environment Variables

Edit `Backend/.env` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/lumina

# AI Service Configuration
AI_SERVICE=groq
GROQ_API_KEY=gsk_your_actual_api_key_here
GROQ_MODEL=llama3-8b-8192

# Server Configuration
PORT=8080
```

### 3. Start Your Application

```bash
# Terminal 1: Start Backend
cd Backend
npm start

# Terminal 2: Start Frontend
cd Frontend
npm run dev
```

## Available Groq Models

| Model | Size | Speed | Best For |
|-------|------|-------|----------|
| `llama3-8b-8192` | 8B | Very Fast | General purpose (recommended) |
| `llama3-70b-8192` | 70B | Fast | Complex reasoning |
| `mixtral-8x7b-32768` | 47B | Fast | Multilingual |
| `gemma-7b-it` | 7B | Very Fast | Code generation |

## Testing Your Setup

```bash
cd Backend
node test-setup.js
```

## Troubleshooting

### Common Issues

1. **Invalid API Key**
   - Check if key starts with `gsk_`
   - Verify key is copied correctly
   - Ensure no extra spaces

2. **Rate Limit Exceeded**
   - Free tier: 14,400 requests/day
   - Wait for reset or upgrade plan

3. **Model Not Found**
   - Check model name in .env
   - Use exact model names from Groq docs

### Error Messages

- `401 Unauthorized`: Invalid API key
- `429 Too Many Requests`: Rate limit exceeded
- `400 Bad Request`: Invalid model or parameters

## Performance Comparison

| Service | Speed | Cost | Setup |
|---------|-------|------|-------|
| Groq | ⚡⚡⚡ | Free | Easy |
| OpenAI | ⚡⚡ | Paid | Easy |
| Ollama | ⚡ | Free | Complex |

## Advanced Configuration

### Custom Model Parameters

Edit `Backend/utils/groq.js`:

```javascript
body: JSON.stringify({
    model: process.env.GROQ_MODEL || "llama3-8b-8192",
    messages: [{
        role: "user",
        content: message
    }],
    temperature: 0.7,    // Creativity (0-1)
    max_tokens: 1024,    // Response length
    top_p: 0.9,          // Diversity
    stream: false        // Streaming response
})
```

### Switching Models

Change `GROQ_MODEL` in `.env`:

```env
# For faster responses
GROQ_MODEL=llama3-8b-8192

# For better quality
GROQ_MODEL=llama3-70b-8192

# For code generation
GROQ_MODEL=gemma-7b-it
```

## Monitoring Usage

1. Visit [console.groq.com](https://console.groq.com)
2. Go to "Usage" section
3. Monitor your daily requests
4. Set up alerts for limits

## Next Steps

1. ✅ Get Groq API key
2. ✅ Update .env file
3. ✅ Start backend server
4. ✅ Start frontend
5. ✅ Test chat functionality

Your Lumina chat app is now powered by Groq's ultra-fast AI! 🎉
