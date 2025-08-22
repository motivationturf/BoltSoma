import { useState, useEffect } from 'react';

interface RetentionEvent {
  type: 'achievement' | 'streak' | 'onboarding' | 'milestone';
  data: any;
  timestamp: number;
}

export function useRetentionAnimations() {
  const [events, setEvents] = useState<RetentionEvent[]>([]);
  const [currentEvent, setCurrentEvent] = useState<RetentionEvent | null>(null);

  const triggerAchievement = (achievement: any) => {
    const event: RetentionEvent = {
      type: 'achievement',
      data: achievement,
      timestamp: Date.now()
    };
    setEvents(prev => [...prev, event]);
    setCurrentEvent(event);
  };

  const triggerStreakMilestone = (milestone: any) => {
    const event: RetentionEvent = {
      type: 'streak',
      data: milestone,
      timestamp: Date.now()
    };
    setEvents(prev => [...prev, event]);
    setCurrentEvent(event);
  };

  const triggerOnboardingStep = (step: any) => {
    const event: RetentionEvent = {
      type: 'onboarding',
      data: step,
      timestamp: Date.now()
    };
    setEvents(prev => [...prev, event]);
    setCurrentEvent(event);
  };

  const clearCurrentEvent = () => {
    setCurrentEvent(null);
  };

  // Auto-clear events after 5 seconds
  useEffect(() => {
    if (currentEvent) {
      const timer = setTimeout(() => {
        clearCurrentEvent();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentEvent]);

  return {
    currentEvent,
    events,
    triggerAchievement,
    triggerStreakMilestone,
    triggerOnboardingStep,
    clearCurrentEvent
  };
} 