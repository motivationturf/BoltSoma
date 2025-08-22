import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  AlertCircle,
  ArrowLeft,
  Trophy,
  Lightbulb,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface LearningInsightsProps {
  isGuest?: boolean;
}

export function LearningInsights({ isGuest = false }: LearningInsightsProps) {
  const navigate = useNavigate();
  const insights = {
    overall: {
      score: 78,
      trend: "+12%",
      status: "improving"
    },
    subjects: [
      { name: "Mathematics", score: 85, trend: "+15%", color: "from-green-500 to-green-600" },
      { name: "Sciences", score: 72, trend: "+8%", color: "from-purple-500 to-purple-600" },
      { name: "Computer Studies", score: 90, trend: "+20%", color: "from-blue-500 to-blue-600" },
      { name: "Religious Education", score: 65, trend: "+5%", color: "from-orange-500 to-orange-600" }
    ],
    strengths: [
      "Problem-solving in Mathematics",
      "Programming concepts",
      "Scientific method understanding"
    ],
    weaknesses: [
      "Religious Education memorization",
      "Chemistry calculations",
      "Essay writing skills"
    ],
    recommendations: [
      "Focus on Religious Education for 30 minutes daily",
      "Practice chemistry problems twice a week",
      "Join study groups for essay writing"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
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
              <div className="text-4xl">📊</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Learning Insights
                </h1>
                <p className="text-white/90">
                  See your strengths and weaknesses based on game performance and progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overall Performance */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Overall Performance</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg">
                    <div className="text-3xl font-bold mb-2">{insights.overall.score}%</div>
                    <div className="text-white/90">Overall Score</div>
                    <div className="text-sm mt-2 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {insights.overall.trend}
                    </div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
                    <div className="text-3xl font-bold mb-2">4</div>
                    <div className="text-white/90">Subjects Tracked</div>
                    <div className="text-sm mt-2">All active</div>
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg">
                    <div className="text-3xl font-bold mb-2">12</div>
                    <div className="text-white/90">Study Sessions</div>
                    <div className="text-sm mt-2">This month</div>
                  </div>
                </div>

                {/* Subject Performance */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Subject Performance</h3>
                <div className="space-y-4">
                  {insights.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                          {subject.score}%
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{subject.name}</div>
                          <div className="text-sm text-gray-600 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                            {subject.trend}
                          </div>
                        </div>
                      </div>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${subject.color}`}
                          style={{ width: `${subject.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Sidebar */}
          <div className="space-y-6">
            {/* Strengths */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-green-500" />
                  Your Strengths
                </h3>
                <div className="space-y-2">
                  {insights.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-700">{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                  Areas for Improvement
                </h3>
                <div className="space-y-2">
                  {insights.weaknesses.map((weakness, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-orange-700">{weakness}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-blue-500" />
                  AI Recommendations
                </h3>
                <div className="space-y-3">
                  {insights.recommendations.map((recommendation, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                        <span className="text-sm text-blue-700">{recommendation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Study Time Distribution */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Time Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mathematics</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sciences</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Computer Studies</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Religious Education</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="h-2 bg-orange-500 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Trends */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Trends</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-700">Weekly Improvement</span>
                      <span className="text-sm font-bold text-green-700">+8.5%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-700">Consistency Score</span>
                      <span className="text-sm font-bold text-blue-700">85%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-purple-700">Study Efficiency</span>
                      <span className="text-sm font-bold text-purple-700">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 