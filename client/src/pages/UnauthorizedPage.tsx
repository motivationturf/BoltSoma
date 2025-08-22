import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="card-3d shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            
            <p className="text-gray-600 mb-6">
              Sorry, you don't have permission to access this page. This could be because:
            </p>
            
            <ul className="text-left text-sm text-gray-600 mb-8 space-y-2">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                You need to be logged in to access this feature
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Your account doesn't have the required permissions
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                This feature is only available for registered users
              </li>
            </ul>
            
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg transition-all duration-300"
              >
                Sign In
              </Button>
              
              <Button
                onClick={() => navigate('/register')}
                variant="outline"
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Create Account
              </Button>
              
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-900"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 