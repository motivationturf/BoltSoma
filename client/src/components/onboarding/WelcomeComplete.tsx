import React from 'react';
import { Button } from '../ui/Button';
import { Sparkles, Trophy, Target } from 'lucide-react';
import { Mascot } from '../mascot';

interface WelcomeCompleteProps {
  onComplete: () => void;
}

export function WelcomeComplete({ onComplete }: WelcomeCompleteProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="mx-auto mb-6">
          <Mascot size="lg" mood="excited" showBubble={false} />
        </div>
        
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to SomaSmart EduHub! 🎉
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          You're all set to begin your gamified learning journey. Your personalized dashboard is ready with activities tailored to your goals and subjects.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Trophy className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Earn Achievements</h3>
          <p className="text-sm text-gray-600">Complete challenges and unlock badges as you progress</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
          <p className="text-sm text-gray-600">Monitor your learning journey with detailed analytics</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Interactive Learning</h3>
          <p className="text-sm text-gray-600">Engage with games and activities designed for your curriculum</p>
        </div>
      </div>

      <Button
        onClick={onComplete}
        size="lg"
        className="px-12 py-4 text-lg"
      >
        Start Learning Now!
      </Button>
    </div>
  );
}