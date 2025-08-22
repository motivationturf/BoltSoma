import React, { useState, useEffect } from 'react';
import { AvatarSelection } from './AvatarSelection';
import { SubjectSelection } from './SubjectSelection';
import { LearningGoals } from './LearningGoals';
import { WelcomeComplete } from './WelcomeComplete';
import { trackEvent } from '../../utils/analytics';

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  avatar: string;
  subjects: string[];
  learningGoals: string[];
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    avatar: '',
    subjects: [],
    learningGoals: []
  });
  const [showMathTips, setShowMathTips] = useState(false);

  const updateData = (update: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...update }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(onboardingData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepComplete = (stepId: string) => {
    trackEvent('onboarding_step_completed', { step: stepId });
  };

  // Branching: Show math tips if user selects Math
  useEffect(() => {
    if (onboardingData.subjects.includes('mathematics')) {
      setShowMathTips(true);
    } else {
      setShowMathTips(false);
    }
  }, [onboardingData.subjects]);

  const steps = [
    {
      component: AvatarSelection,
      props: {
        selectedAvatar: onboardingData.avatar,
        onSelect: (avatar: string) => updateData({ avatar }),
        onNext: nextStep,
        onComplete: () => handleStepComplete('avatar_selection')
      }
    },
    {
      component: SubjectSelection,
      props: {
        selectedSubjects: onboardingData.subjects,
        onSelect: (subjects: string[]) => updateData({ subjects }),
        onNext: nextStep,
        onBack: prevStep,
        onComplete: () => handleStepComplete('subject_selection')
      }
    },
    {
      component: LearningGoals,
      props: {
        selectedGoals: onboardingData.learningGoals,
        onSelect: (learningGoals: string[]) => updateData({ learningGoals }),
        onNext: nextStep,
        onBack: prevStep,
        onComplete: () => handleStepComplete('learning_goals')
      }
    },
    ...(showMathTips
      ? [{
          component: () => (
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Math Power Tips</h2>
              <p className="mb-4">You chose Mathematics! Did you know you can unlock special math challenges and badges?</p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={nextStep}
              >
                Continue
              </button>
            </div>
          ),
          props: {}
        }]
      : []),
    {
      component: WelcomeComplete,
      props: {
        onComplete: () => onComplete(onboardingData)
      }
    }
  ];

  const CurrentStepComponent = steps[currentStep].component as any;
  const stepProps = steps[currentStep].props as any;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {steps.slice(0, -1).map((_, index) => (
              <React.Fragment key={index}>
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                  ${index <= currentStep 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {index + 1}
                </div>
                {index < steps.length - 2 && (
                  <div className={`
                    w-12 h-1 rounded transition-colors
                    ${index < currentStep ? 'bg-green-600' : 'bg-gray-200'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>

        <CurrentStepComponent {...stepProps} />
      </div>
    </div>
  );
}