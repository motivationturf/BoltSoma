import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContextV2 } from '../context/AuthContextV2';
import { Button } from '../components/ui/Button';
import { User, BookOpen, Gamepad2, Brain, Sparkles } from 'lucide-react';

export default function GuestPage() {
  const navigate = useNavigate();
  const { createGuestSession, isLoading, error, clearError } = useAuthContextV2();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    grade: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createGuestSession(formData);
      // Navigation is handled by the auth hook
    } catch (error) {
      console.error('Guest session creation failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Try SomaSmart
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start learning without creating an account
          </p>
        </div>

        {/* Guest Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg border border-gray-200">
          <div className="mb-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-orange-900 mb-2">What you can do as a guest:</h4>
              <ul className="text-xs text-orange-800 space-y-1">
                <li>• Explore lessons and subjects</li>
                <li>• Try interactive quizzes</li>
                <li>• Access the game arcade</li>
                <li>• Use AI learning tools</li>
                <li>• Experience the platform</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="First name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Grade Selection */}
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                Grade Level (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select your grade (optional)</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Starting session...
                </div>
              ) : (
                'Start Learning Now'
              )}
            </Button>
          </form>

          {/* Features Preview */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-900 mb-4">What you'll find:</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <BookOpen className="h-4 w-4 text-green-500" />
                <span>Lessons</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <Gamepad2 className="h-4 w-4 text-blue-500" />
                <span>Games</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <Brain className="h-4 w-4 text-purple-500" />
                <span>AI Tools</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <Sparkles className="h-4 w-4 text-orange-500" />
                <span>Quizzes</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Want to save your progress?{' '}
              <button
                onClick={() => navigate('/register')}
                className="font-medium text-green-600 hover:text-green-500"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 