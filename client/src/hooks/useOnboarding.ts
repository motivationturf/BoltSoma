import { useState } from 'react';

export interface OnboardingData {
  profileComplete: boolean;
  firstActionTaken: boolean;
  valueRealized: boolean;
  [key: string]: any;
}

export function useOnboarding(initialData?: Partial<OnboardingData>) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    profileComplete: false,
    firstActionTaken: false,
    valueRealized: false,
    ...initialData,
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepComplete = (stepId: string) => {
    setOnboardingData(prev => ({ ...prev, [stepId]: true }));
    setCurrentStep(prev => prev + 1);
  };

  const resetOnboarding = () => {
    setOnboardingData({
      profileComplete: false,
      firstActionTaken: false,
      valueRealized: false,
    });
    setCurrentStep(0);
  };

  return {
    onboardingData,
    setOnboardingData,
    currentStep,
    setCurrentStep,
    handleStepComplete,
    resetOnboarding,
  };
} 