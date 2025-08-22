import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  BookOpen, 
  Brain, 
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Mascot, MascotPresets } from '../mascot';
import { AppLayout } from '../layout/AppLayout';

interface AiToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  emoji: string;
  href: string;
  gradient: string;
  isComingSoon?: boolean;
}

const AiToolCard: React.FC<AiToolCardProps> = ({ 
  title, 
  description, 
  icon, 
  emoji, 
  href, 
  gradient,
  isComingSoon = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <Card className={`h-full bg-gradient-to-br ${gradient} text-white overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-300`}>
        <CardContent className="p-6 h-full flex flex-col">
          {/* Decorative elements removed for clarity and vibrancy */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-4xl drop-shadow-lg">{emoji}</div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  {icon}
                </div>
              </div>
              {isComingSoon && (
                <span className="px-3 py-1 bg-yellow-500/90 text-white text-xs font-bold rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{title}</h3>
              <p className="text-white/90 text-sm leading-relaxed drop-shadow">{description}</p>
            </div>
            {/* Action Button */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50"
                disabled={isComingSoon}
              >
                {isComingSoon ? 'Coming Soon' : 'Get Started'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface AiHubPageProps {
  isGuest?: boolean;
}

export function AiHubPage({ isGuest = false }: AiHubPageProps) {
  const navigate = useNavigate();
  const aiTools = [
    {
      title: "Chisomo Chat",
      description: "Ask academic questions and get simple, subject-specific answers powered by AI.",
      icon: <MessageSquare className="h-6 w-6 text-white" />, 
      emoji: "💬",
      href: "/ai-hub/chisomo",
      gradient: "from-purple-600 via-blue-600 to-cyan-500", // Carousel 1
      isComingSoon: false
    },
    {
      title: "Study Planner",
      description: "Create smart revision plans by subject, time, and learning goals.",
      icon: <Calendar className="h-6 w-6 text-white" />, 
      emoji: "🗓️",
      href: "/ai-hub/planner",
      gradient: "from-green-500 via-emerald-500 to-teal-500", // Carousel 2
      isComingSoon: false
    },
    {
      title: "Learning Insights",
      description: "See your strengths and weaknesses based on game performance and progress.",
      icon: <BarChart3 className="h-6 w-6 text-white" />, 
      emoji: "📊",
      href: "/ai-hub/insights",
      gradient: "from-orange-500 via-red-500 to-pink-500", // Carousel 3
      isComingSoon: false
    },
    {
      title: "Content Studio",
      description: "Generate lessons, questions, and revision guides from syllabus topics.",
      icon: <BookOpen className="h-6 w-6 text-white" />, 
      emoji: "📚",
      href: "/ai-hub/content-studio",
      gradient: "from-indigo-500 via-purple-500 to-pink-500", // Carousel 4
      isComingSoon: false
    },
    {
      title: "Smart Tutor",
      description: "Personalized tutoring sessions with step-by-step problem solving.",
      icon: <Brain className="h-6 w-6 text-white" />, 
      emoji: "🧠",
      href: "/ai-hub/tutor",
      gradient: "from-yellow-500 via-orange-500 to-red-500", // Carousel 5
      isComingSoon: true
    },
    {
      title: "Quiz Generator",
      description: "Create custom quizzes and practice tests for any subject.",
      icon: <Target className="h-6 w-6 text-white" />, 
      emoji: "🎯",
      href: "/ai-hub/quiz-generator",
      gradient: "from-green-600 via-orange-500 to-red-600", // Carousel 6
      isComingSoon: true
    }
  ];

  const handleToolClick = (href: string, isComingSoon: boolean) => {
    if (isComingSoon) {
      // Show coming soon message
      return;
    }
    
    // Navigate to the AI tool
    const route = href.replace('/ai-hub/', '');
    navigate(`ai-${route}`);
  };

  return (
    <AppLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
                <Mascot size="lg" mood="excited" showBubble={false} />
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  Chisomo AI Hub
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Smarter learning with AI — your study companion built for Zambian students.
                </p>
              </div>
            </div>
            
            {/* Chisomo Eagle Message */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto">
              <div className="flex items-center space-x-4">
                  <Mascot size="md" mood="wise" showBubble={false} />
                <div>
                  <p className="text-lg font-medium mb-2">Chisomo's AI Wisdom</p>
                  <p className="text-white/90">
                    "Like an eagle soaring high above the mountains, AI helps you see learning from new heights! 
                    These tools are your digital study partners, ready to guide you through any academic challenge."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div onClick={() => handleToolClick(tool.href, tool.isComingSoon || false)}>
                <AiToolCard
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                  emoji={tool.emoji}
                  href={tool.href}
                  gradient={tool.gradient}
                  isComingSoon={tool.isComingSoon}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Chisomo AI?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI tools are specifically designed for Zambian students and curriculum, 
              making learning more accessible and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart & Fast</h3>
              <p className="text-gray-600">
                Get instant answers and explanations tailored to your learning level.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized</h3>
              <p className="text-gray-600">
                AI adapts to your learning style and progress for better results.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Zambian Focus</h3>
              <p className="text-gray-600">
                Content and examples relevant to Zambian curriculum and culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AppLayout>
  );
} 