import { useState } from 'react';

export type AppState =
  | 'landing'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'onboarding'
  | 'dashboard'
  | 'subjects'
  | 'challenges'
  | 'leaderboards'
  | 'forum'
  | 'profile'
  | 'lesson'
  | 'quiz'
  | 'guest-dashboard'
  | 'guest-to-account'
  | 'arcade'
  | 'ai-hub'
  | 'ai-chisomo'
  | 'ai-planner'
  | 'ai-insights'
  | 'ai-content-studio';

export function useNavigation(initialState: AppState = 'landing') {
  const [currentState, setCurrentState] = useState<AppState>(initialState);
  const [currentSubject, setCurrentSubject] = useState<string>('');
  const [currentTopic, setCurrentTopic] = useState<string>('');

  const handleNavigate = (view: AppState, subjectId?: string, topicId?: string) => {
    setCurrentState(view);
    if (subjectId) setCurrentSubject(subjectId);
    if (topicId) setCurrentTopic(topicId);
  };

  return {
    currentState,
    setCurrentState,
    currentSubject,
    setCurrentSubject,
    currentTopic,
    setCurrentTopic,
    handleNavigate,
  };
} 