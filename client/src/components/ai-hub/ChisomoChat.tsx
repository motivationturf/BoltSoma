import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Send, 
  Brain, 
  Sparkles,
  ArrowLeft,
  BookOpen,
  Calculator,
  Microscope,
  GraduationCap,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Mascot } from '../mascot';
import { fetchDeepSeekChat } from '../../utils/ai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChisomoChatProps {
  isGuest?: boolean;
}

// Academic-only system prompt for Chisomo
const SYSTEM_PROMPT = `You are Chisomo, an AI tutor for Zambian high school learners. Your job is to explain academic concepts clearly and kindly.

IMPORTANT RULES:
- Only respond to questions about school subjects (Mathematics, Science, Computer Studies, Religious Education, History, Geography, English, etc.)
- Keep answers short, accurate, and easy to understand (2-3 sentences max)
- Speak like a helpful, encouraging teacher
- Use simple language appropriate for high school students
- If asked about non-academic topics, politely redirect to academic subjects
- Always be supportive and positive
- Use Zambian context when relevant
- Never say you are thinking, typing, or processing. Respond directly with the answer, without mentioning any internal process or delay.

Example responses:
- "Great question! In Mathematics, a quadratic equation is..."
- "Let me explain this Science concept simply..."
- "For Computer Studies, think of it this way..."

Remember: You're here to help with school work only!`;

export function ChisomoChat({ isGuest = false }: ChisomoChatProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Chisomo, your AI study assistant. I can help you with Mathematics, Sciences, Computer Studies, Religious Education, and other school subjects. What would you like to learn about today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasMounted = useRef(false);

  const suggestedQuestions = [
    "Explain photosynthesis in simple terms",
    "How do I solve quadratic equations?",
    "What are the main causes of climate change?",
    "Help me understand Newton's laws of motion",
    "What is the difference between RAM and ROM?",
    "Explain the concept of democracy"
  ];

  const subjects = [
    { name: "Mathematics", icon: <Calculator className="h-5 w-5" />, color: "from-green-500 to-green-600" },
    { name: "Sciences", icon: <Microscope className="h-5 w-5" />, color: "from-purple-500 to-purple-600" },
    { name: "Computer Studies", icon: <Brain className="h-5 w-5" />, color: "from-blue-500 to-blue-600" },
    { name: "Religious Education", icon: <BookOpen className="h-5 w-5" />, color: "from-orange-500 to-orange-600" }
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current) {
      if (!hasMounted.current) {
        // On initial mount, use 'auto' to avoid animation from bottom
        chatEndRef.current.scrollIntoView({ behavior: 'auto' });
        hasMounted.current = true;
      } else {
        // On subsequent updates, use 'smooth' for a nice scroll
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    // Use preventScroll to avoid browser scrolling to input
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Prepare messages for OpenRouter/DeepSeek
      const openRouterMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((msg) => ({ role: (msg.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant', content: msg.content })),
        { role: 'user' as 'user', content: content.trim() },
      ];
      const aiResponse = await fetchDeepSeekChat({ messages: openRouterMessages });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat API error:', err);
      setError('Sorry, I\'m having trouble connecting right now. Please try again in a moment.');
      // Add a fallback message
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'m having trouble connecting right now. Please try asking your question again in a moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/ai-hub')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to AI Hub
            </Button>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-4xl">💬</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Ask Chisomo
                </h1>
                <p className="text-white/90">
                  Get smart answers to academic questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardContent className="flex-1 flex flex-col p-6">
                {/* Chat Messages Area */}
                <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                            <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                message.role === 'user' 
                                  ? 'bg-blue-500 text-white' 
                                  : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                              }`}>
                                {message.role === 'user' ? '👤' : <Mascot size="sm" mood="helpful" showBubble={false} />}
                              </div>
                              <div className={`rounded-lg p-3 ${
                                message.role === 'user'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white text-gray-800 shadow-sm'
                              }`}>
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                <p className={`text-xs mt-2 ${
                                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {formatTime(message.timestamp)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Loading Indicator */}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                            <Mascot size="sm" mood="helpful" showBubble={false} />
                          </div>
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                              <span className="text-sm text-gray-600">Chisomo is thinking...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-700">{error}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setError(null)}
                              className="mt-2 text-red-600 border-red-300 hover:bg-red-100"
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Try Again
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={chatEndRef} />
                  </div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask Chisomo anything about your studies..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
                  Suggested Questions
                </h3>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      disabled={isLoading}
                      className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-green-500" />
                  Subjects I Can Help With
                </h3>
                <div className="space-y-3">
                  {subjects.map((subject, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg bg-gradient-to-r ${subject.color} text-white flex items-center space-x-3`}
                    >
                      {subject.icon}
                      <span className="font-medium">{subject.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Be specific with your questions for better answers</p>
                  <p>• Ask for step-by-step explanations</p>
                  <p>• Request examples relevant to Zambian context</p>
                  <p>• Use "explain like I'm a beginner" for simple explanations</p>
                </div>
              </CardContent>
            </Card>

            {/* Guest Mode Notice */}
            {isGuest && (
              <Card>
                <CardContent className="p-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-amber-800 mb-2">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-medium">Guest Mode - Full Access</span>
                    </div>
                    <p className="text-amber-700 text-sm">
                      Chat freely with Chisomo! Create an account to save your conversation history and unlock premium AI features.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 