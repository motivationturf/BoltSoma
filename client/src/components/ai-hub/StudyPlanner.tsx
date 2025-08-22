import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Target, 
  BookOpen,
  ArrowLeft,
  Plus,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function StudyPlanner() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const isGuest = !user;
  const [selectedSubject, setSelectedSubject] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const [goal, setGoal] = useState('');

  const subjects = [
    { name: "Mathematics", icon: "📊", color: "from-green-500 to-green-600" },
    { name: "Sciences", icon: "🔬", color: "from-purple-500 to-purple-600" },
    { name: "Computer Studies", icon: "💻", color: "from-blue-500 to-blue-600" },
    { name: "Religious Education", icon: "📚", color: "from-orange-500 to-orange-600" }
  ];

  const timeOptions = [
    { value: "30min", label: "30 minutes" },
    { value: "1hour", label: "1 hour" },
    { value: "2hours", label: "2 hours" },
    { value: "3hours", label: "3 hours" }
  ];

  const goalOptions = [
    "Review and understand key concepts",
    "Practice problem-solving",
    "Prepare for upcoming test",
    "Complete homework assignments",
    "Read and summarize notes"
  ];

  const handleCreatePlan = () => {
    // TODO: Implement AI study plan generation
    // TODO: Implement AI study plan generation
    alert('Creating study plan...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
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
              <div className="text-4xl">🗓️</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Study Planner
                </h1>
                <p className="text-white/90">
                  Create smart revision plans by subject, time, and learning goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Creator */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Study Plan</h2>
                
                <div className="space-y-6">
                  {/* Subject Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose Subject
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {subjects.map((subject, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSubject(subject.name)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedSubject === subject.name
                              ? `border-green-500 bg-gradient-to-r ${subject.color} text-white`
                              : 'border-gray-200 bg-white hover:border-green-300'
                          }`}
                        >
                          <div className="text-2xl mb-2">{subject.icon}</div>
                          <div className="font-medium">{subject.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Study Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Available Study Time
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setStudyTime(option.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            studyTime === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <Clock className="h-4 w-4 mr-2 inline" />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Goal Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Study Goal
                    </label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      aria-label="Select study goal"
                    >
                      <option value="">Select a goal...</option>
                      {goalOptions.map((goalOption, index) => (
                        <option key={index} value={goalOption}>
                          {goalOption}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Create Plan Button */}
                  <Button
                    onClick={handleCreatePlan}
                    disabled={!selectedSubject || !studyTime || !goal}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Generate Study Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Plan Preview */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sample Study Plan</h2>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg">
                    <h3 className="font-bold mb-2">📊 Mathematics - 1 Hour Session</h3>
                    <p className="text-white/90">Goal: Review and understand key concepts</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium">Warm-up (10 min)</div>
                        <div className="text-sm text-gray-600">Review previous homework problems</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Target className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium">Main Focus (35 min)</div>
                        <div className="text-sm text-gray-600">Practice quadratic equations with real-world examples</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                      <div>
                        <div className="font-medium">Review (15 min)</div>
                        <div className="text-sm text-gray-600">Summarize key points and note areas for improvement</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Study Tips</span>
                    </div>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Take short breaks every 25 minutes</li>
                      <li>• Use real-world examples from Zambia</li>
                      <li>• Practice with past exam questions</li>
                      <li>• Review notes before starting new topics</li>
                    </ul>
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
              Why Use AI Study Planning?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI creates personalized study plans based on your learning style, 
              available time, and academic goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
              <p className="text-gray-600 text-sm">
                Plans tailored to your specific learning objectives and exam preparation needs.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Time-Efficient</h3>
              <p className="text-gray-600 text-sm">
                Optimize your study sessions with smart time management and focused learning.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">
                Monitor your learning progress and adjust plans based on performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 