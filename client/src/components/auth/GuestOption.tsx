import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { User, Sparkles } from 'lucide-react';

interface GuestOptionProps {
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export function GuestOption({ className = '', variant = 'default' }: GuestOptionProps) {
  const navigate = useNavigate();

  const handleGuestMode = () => {
    navigate('/guest');
  };

  if (variant === 'compact') {
    return (
      <Button
        onClick={handleGuestMode}
        variant="outline"
        size="sm"
        className={`flex items-center space-x-2 ${className}`}
      >
        <User className="h-4 w-4" />
        <span>Guest Mode</span>
      </Button>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Try SomaSmart</h3>
            <p className="text-xs text-gray-600">No account required</p>
          </div>
        </div>
        <Button
          onClick={handleGuestMode}
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center space-x-2 border-orange-300 text-orange-700 hover:bg-orange-50"
        >
          <User className="h-4 w-4" />
          <span>Start Learning Now</span>
        </Button>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleGuestMode}
          variant="outline"
          className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <User className="h-4 w-4 mr-2" />
          Continue as Guest
        </Button>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Explore SomaSmart without creating an account
      </p>
    </div>
  );
} 