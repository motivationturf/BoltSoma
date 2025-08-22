import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Lightbulb, 
  Sparkles,
  ArrowLeft,
  Plus,
  Download,
  Share2,
  Edit3,
  Eye
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface ContentStudioProps {
  isGuest?: boolean;
}

export function ContentStudio({ isGuest = false }: ContentStudioProps) {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [contentType, setContentType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const topics = [
    { name: "Quadratic Equations", subject: "Mathematics", icon: "📊" },
    { name: "Photosynthesis", subject: "Biology", icon: "🌱" },
    { name: "Programming Basics", subject: "Computer Studies", icon: "💻" },
    { name: "Religious Ethics", subject: "Religious Education", icon: "📚" }
  ];

  const contentTypes = [
    { type: "lesson", label: "Lesson Plan", icon: <BookOpen className="h-5 w-5" />, color: "from-blue-500 to-blue-600" },
    { type: "quiz", label: "Practice Quiz", icon: <FileText className="h-5 w-5" />, color: "from-green-500 to-green-600" },
    { type: "summary", label: "Study Summary", icon: <Lightbulb className="h-5 w-5" />, color: "from-purple-500 to-purple-600" },
    { type: "worksheet", label: "Worksheet", icon: <Edit3 className="h-5 w-5" />, color: "from-orange-500 to-orange-600" }
  ];

  const handleGenerateContent = () => {
    if (!selectedTopic || !contentType) return;
    
    setIsGenerating(true);
    // TODO: Implement AI content generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
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
              <div className="text-4xl">📚</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Content Studio
                </h1>
                <p className="text-white/90">
                  Generate lessons, questions, and revision guides from syllabus topics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Content Generator */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Content</h2>
                
                <div className="space-y-6">
                  {/* Topic Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose Topic
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {topics.map((topic, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTopic(topic.name)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedTopic === topic.name
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 bg-white hover:border-orange-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{topic.icon}</div>
                            <div>
                              <div className="font-medium text-gray-900">{topic.name}</div>
                              <div className="text-sm text-gray-600">{topic.subject}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Content Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Content Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {contentTypes.map((content, index) => (
                        <button
                          key={index}
                          onClick={() => setContentType(content.type)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            contentType === content.type
                              ? `border-orange-500 bg-gradient-to-r ${content.color} text-white`
                              : 'border-gray-200 bg-white hover:border-orange-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {content.icon}
                            <span className="font-medium">{content.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerateContent}
                    disabled={!selectedTopic || !contentType || isGenerating}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3"
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Content
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Generated Content */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample Generated Content</h2>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg">
                    <h3 className="font-bold mb-2">📊 Quadratic Equations - Lesson Plan</h3>
                    <p className="text-white/90">Generated for Mathematics Grade 10</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Lesson Objectives</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Understand the standard form of quadratic equations</li>
                      <li>• Solve quadratic equations using factoring method</li>
                      <li>• Apply quadratic equations to real-world problems</li>
                      <li>• Practice with Zambian context examples</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Concepts</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Standard Form:</strong> ax² + bx + c = 0</p>
                      <p><strong>Factoring Method:</strong> Find factors that multiply to give 'c' and add to give 'b'</p>
                      <p><strong>Real-world Application:</strong> Projectile motion, area calculations</p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Practice Problems</h4>
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p><strong>Problem 1:</strong> Solve x² + 5x + 6 = 0</p>
                        <p className="text-gray-600 mt-1">Hint: Find two numbers that multiply to 6 and add to 5</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p><strong>Problem 2:</strong> A rectangular garden has an area of 24 square meters. If the length is 2 meters more than the width, find the dimensions.</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What Can You Generate?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI creates educational content specifically tailored to the Zambian curriculum 
              and learning standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lesson Plans</h3>
              <p className="text-gray-600 text-sm">
                Complete lesson plans with objectives, activities, and assessments.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Practice Quizzes</h3>
              <p className="text-gray-600 text-sm">
                Multiple-choice and problem-solving questions with explanations.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Summaries</h3>
              <p className="text-gray-600 text-sm">
                Concise summaries of key concepts and important points.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Worksheets</h3>
              <p className="text-gray-600 text-sm">
                Printable worksheets with exercises and answer keys.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 