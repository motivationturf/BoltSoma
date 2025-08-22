import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Target, Trophy, Users, Clock, ChevronLeft } from 'lucide-react';

interface LearningGoalsProps {
  selectedGoals: string[];
  onSelect: (goals: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const learningGoals = [
  {
    id: 'improve-grades',
    title: 'Improve My Grades',
    description: 'Focus on getting better marks in assessments and exams',
    icon: Trophy,
    color: 'bg-yellow-500'
  },
  {
    id: 'exam-preparation',
    title: 'Prepare for Exams',
    description: 'Get ready for upcoming tests and final examinations',
    icon: Target,
    color: 'bg-red-500'
  },
  {
    id: 'daily-practice',
    title: 'Practice Daily',
    description: 'Build a consistent learning habit with daily activities',
    icon: Clock,
    color: 'bg-blue-500'
  },
  {
    id: 'compete-friends',
    title: 'Compete with Friends',
    description: 'Challenge classmates and learn together socially',
    icon: Users,
    color: 'bg-green-500'
  },
  {
    id: 'master-concepts',
    title: 'Master Key Concepts',
    description: 'Develop deep understanding of fundamental topics',
    icon: Target,
    color: 'bg-purple-500'
  },
  {
    id: 'career-prep',
    title: 'Prepare for Career',
    description: 'Learn skills that will help in future studies and work',
    icon: Trophy,
    color: 'bg-indigo-500'
  }
];

export function LearningGoals({ selectedGoals, onSelect, onNext, onBack }: LearningGoalsProps) {
  const toggleGoal = (goalId: string) => {
    const updated = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    onSelect(updated);
  };

  return (
    <div className="text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Set Your Learning Goals
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose what you want to achieve with LearnZM. These goals will help us personalize your learning experience and track your progress.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {learningGoals.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id);
          const Icon = goal.icon;
          
          return (
            <Card
              key={goal.id}
              className={`
                cursor-pointer transition-all duration-200 
                ${isSelected 
                  ? 'ring-4 ring-green-500 shadow-lg' 
                  : 'hover:shadow-md'
                }
              `}
              onClick={() => toggleGoal(goal.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${goal.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {goal.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {goal.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="px-8"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Button
          onClick={onNext}
          disabled={selectedGoals.length === 0}
          size="lg"
          className="px-8"
        >
          Complete Setup
        </Button>
      </div>

      {selectedGoals.length === 0 && (
        <p className="text-sm text-gray-500 mt-4">
          Please select at least one learning goal to continue
        </p>
      )}
    </div>
  );
}