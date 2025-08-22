# AI Hub Setup Guide

## Chisomo Chat Setup

### 1. Get OpenRouter API Key

1. Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up for a free account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API key:
   ```
   REACT_APP_OPENROUTER_API_KEY=your-actual-api-key-here
   ```

### 3. Test the Chat

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/ai-hub/chisomo`
3. Try asking academic questions like:
   - "Explain photosynthesis"
   - "How do I solve quadratic equations?"
   - "What is the difference between RAM and ROM?"

### 4. Academic Guardrails

The chat is configured with strict academic-only prompts:

- ✅ **Allowed**: School subjects, homework help, exam prep
- ❌ **Blocked**: Personal advice, politics, inappropriate content
- 🎯 **Focus**: Zambian curriculum and context

### 5. Features

- **Real-time chat** with AI responses
- **Loading states** with "Chisomo is thinking..."
- **Error handling** with retry options
- **Suggested questions** for quick start
- **Mobile responsive** design
- **Guest mode** support with upgrade prompts

### 6. API Configuration

The chat uses OpenRouter.ai with:
- **Model**: `mistralai/mistral-7b-instruct`
- **Max tokens**: 150 (short, focused responses)
- **Temperature**: 0.7 (balanced creativity)

### 7. Troubleshooting

**If chat doesn't work:**
1. Check your API key is correct
2. Ensure you have credits on OpenRouter
3. Check browser console for errors
4. Try refreshing the page

**For development:**
- API calls are logged to console
- Error messages show in the chat
- Fallback responses for API failures

### 8. Next Steps

- [ ] Add chat history persistence
- [ ] Implement user authentication
- [ ] Add more subject-specific prompts
- [ ] Create study session tracking
- [ ] Add voice input support 