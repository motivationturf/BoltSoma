import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Target, Star, Zap, BookOpen, Gamepad2, Trophy } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  type: 'question' | 'selection' | 'preference' | 'goal' | 'personality';
  options?: Array<{
    id: string;
    label: string;
    description: string;
    icon: React.ComponentType<any>;
    nextStep?: string;
  }>;
  skipAllowed?: boolean;
  adaptiveContent?: boolean;
}

interface UserProfile {
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  motivation: 'achievement' | 'social' | 'mastery' | 'exploration';
  timeAvailability: 'low' | 'medium' | 'high';
  preferredSubjects: string[];
  goals: string[];
  personality: 'achiever' | 'socializer' | 'explorer' | 'killer';
}

export function AdvancedOnboardingFlow({ onComplete }: { onComplete: (profile: UserProfile) => void }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    learningStyle: 'mixed',
    motivation: 'achievement',
    timeAvailability: 'medium',
    preferredSubjects: [],
    goals: [],
    personality: 'achiever'
  });
  const [showPersonalityTest, setShowPersonalityTest] = useState(false);

  // Dynamic onboarding steps based on user responses
  const getOnboardingSteps = (): OnboardingStep[] => {
    const baseSteps: OnboardingStep[] = [
      {
        id: 'welcome',
        title: 'Welcome to SomaSmart! 🦅',
        description: 'Let\'s personalize your learning experience in just 3 minutes.',
        type: 'question'
      },
      {
        id: 'learning-style',
        title: 'How do you learn best?',
        description: 'This helps us recommend the right content for you.',
        type: 'selection',
        options: [
          {
            id: 'visual',
            label: 'Visual Learner',
            description: 'I prefer diagrams, charts, and visual explanations',
            icon: Brain
          },
          {
            id: 'auditory',
            label: 'Auditory Learner',
            description: 'I learn best through listening and discussions',
            icon: BookOpen
          },
          {
            id: 'kinesthetic',
            label: 'Hands-on Learner',
            description: 'I learn by doing and interactive activities',
            icon: Gamepad2
          },
          {
            id: 'mixed',
            label: 'Mixed Style',
            description: 'I use different methods depending on the topic',
            icon: Star
          }
        ]
      },
      {
        id: 'motivation',
        title: 'What motivates you most?',
        description: 'Understanding your motivation helps us keep you engaged.',
        type: 'selection',
        options: [
          {
            id: 'achievement',
            label: 'Achievements & Recognition',
            description: 'I love earning badges and seeing my progress',
            icon: Trophy
          },
          {
            id: 'social',
            label: 'Social Connection',
            description: 'I enjoy learning with friends and competing',
            icon: Star
          },
          {
            id: 'mastery',
            label: 'Skill Mastery',
            description: 'I want to deeply understand and master topics',
            icon: Target
          },
          {
            id: 'exploration',
            label: 'Discovery & Exploration',
            description: 'I love trying new things and discovering content',
            icon: Zap
          }
        ]
      }
    ];

    // Add personality test for users who show exploration tendencies
    if (userProfile.motivation === 'exploration') {
      baseSteps.push({
        id: 'personality',
        title: 'Quick Personality Check',
        description: 'This helps us match you with the perfect learning path.',
        type: 'personality',
        skipAllowed: true
      });
    }

    // Add subject-specific steps based on learning style
    if (userProfile.learningStyle === 'kinesthetic') {
      baseSteps.push({
        id: 'game-preference',
        title: 'What games interest you most?',
        description: 'We\'ll prioritize these in your arcade.',
        type: 'selection',
        options: [
          { id: 'puzzle', label: 'Puzzle Games', description: 'Brain teasers and logic challenges', icon: Brain },
          { id: 'speed', label: 'Speed Challenges', description: 'Quick thinking and fast-paced games', icon: Zap },
          { id: 'strategy', label: 'Strategy Games', description: 'Planning and tactical thinking', icon: Target },
          { id: 'mixed', label: 'Mixed Games', description: 'I enjoy variety in my games', icon: Star }
        ]
      });
    }

    // Add time availability step
    baseSteps.push({
      id: 'time-availability',
      title: 'How much time can you dedicate?',
      description: 'This helps us suggest the right session lengths.',
      type: 'selection',
      options: [
        { id: 'low', label: '15-30 minutes/day', description: 'Quick daily sessions', icon: Star },
        { id: 'medium', label: '30-60 minutes/day', description: 'Moderate study time', icon: Target },
        { id: 'high', label: '1+ hours/day', description: 'Extended learning sessions', icon: Trophy }
      ]
    });

    // Add goal setting
    baseSteps.push({
      id: 'goals',
      title: 'What are your learning goals?',
      description: 'Select all that apply to help us personalize your experience.',
      type: 'goal',
      adaptiveContent: true
    });

    return baseSteps;
  };

  const steps = getOnboardingSteps();
  const currentStep = steps[currentStepIndex];

  const handleOptionSelect = (optionId: string) => {
    // Update user profile based on selection
    const updates: Partial<UserProfile> = {};
    
    switch (currentStep.id) {
      case 'learning-style':
        updates.learningStyle = optionId as UserProfile['learningStyle'];
        break;
      case 'motivation':
        updates.motivation = optionId as UserProfile['motivation'];
        break;
      case 'time-availability':
        updates.timeAvailability = optionId as UserProfile['timeAvailability'];
        break;
    }
    
    setUserProfile(prev => ({ ...prev, ...updates }));
    
    // Move to next step
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(userProfile);
    }
  };

  const handleGoalsUpdate = (goals: string[]) => {
    setUserProfile(prev => ({ ...prev, goals }));
  };

  const renderStepContent = () => {
    switch (currentStep.type) {
      case 'selection':
        return (
          <div className="space-y-3">
            {currentStep.options?.map((option) => {
              const Icon = option.icon;
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option.id)}
                  className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        );

      case 'goal':
        return (
          <GoalSelection
            selectedGoals={userProfile.goals}
            onGoalsChange={handleGoalsUpdate}
            onComplete={() => onComplete(userProfile)}
          />
        );

      case 'personality':
        return (
          <PersonalityTest
            onComplete={(personality) => {
              setUserProfile(prev => ({ ...prev, personality: personality as UserProfile['personality'] }));
              onComplete({ ...userProfile, personality: personality as UserProfile['personality'] });
            }}
          />
        );

      default:
        return (
          <div className="text-center">
            <p className="text-gray-600 mb-6">{currentStep.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStepIndex(prev => prev + 1)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Continue
            </motion.button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <motion.div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
            />
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-900 mb-4 text-center"
            >
              {currentStep.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mb-8 text-center"
            >
              {currentStep.description}
            </motion.p>

            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Goal Selection Component
function GoalSelection({ 
  selectedGoals, 
  onGoalsChange, 
  onComplete 
}: { 
  selectedGoals: string[];
  onGoalsChange: (goals: string[]) => void;
  onComplete: () => void;
}) {
  const goalOptions = [
    { id: 'improve_grades', label: 'Improve my grades', icon: '📈' },
    { id: 'prepare_exams', label: 'Prepare for exams', icon: '📚' },
    { id: 'learn_new_skills', label: 'Learn new skills', icon: '🎯' },
    { id: 'compete_friends', label: 'Compete with friends', icon: '🏆' },
    { id: 'explore_subjects', label: 'Explore new subjects', icon: '🔍' },
    { id: 'build_streak', label: 'Build a learning streak', icon: '🔥' }
  ];

  const handleGoalToggle = (goalId: string) => {
    const newGoals = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    onGoalsChange(newGoals);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {goalOptions.map((goal) => (
          <motion.button
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGoalToggle(goal.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedGoals.includes(goal.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">{goal.icon}</div>
            <div className="text-sm font-medium text-gray-900">{goal.label}</div>
          </motion.button>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        disabled={selectedGoals.length === 0}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
      >
        Complete Setup ({selectedGoals.length} goals selected)
      </motion.button>
    </div>
  );
}

// Personality Test Component
function PersonalityTest({ onComplete }: { onComplete: (personality: string) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      question: "When playing games, I prefer to...",
      options: [
        { id: 'achiever', text: 'Complete all challenges and earn achievements' },
        { id: 'socializer', text: 'Play with friends and share my progress' },
        { id: 'explorer', text: 'Discover new features and try different strategies' },
        { id: 'killer', text: 'Compete for the highest scores and rankings' }
      ]
    },
    {
      question: "In group projects, I usually...",
      options: [
        { id: 'achiever', text: 'Focus on getting the best grade possible' },
        { id: 'socializer', text: 'Enjoy collaborating and building relationships' },
        { id: 'explorer', text: 'Want to try new approaches and creative solutions' },
        { id: 'killer', text: 'Take charge and ensure we win or succeed' }
      ]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Determine personality based on answers
      const answerCounts = Object.values(answers).reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const personality = Object.entries(answerCounts)
        .sort(([,a], [,b]) => b - a)[0][0];
      
      onComplete(personality);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-sm text-gray-500 mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {currentQ.question}
        </h3>
      </div>
      
      <div className="space-y-3">
        {currentQ.options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(option.id)}
            className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </div>
  );
} 