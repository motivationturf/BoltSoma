import React from 'react';
import { trackEvent } from './analytics';

// User behavior tracking
export interface UserBehavior {
  sessionId: string;
  userId?: string;
  timestamp: Date;
  event: string;
  properties: Record<string, any>;
  context: {
    page: string;
    userAgent: string;
    screenSize: string;
    timeOnPage: number;
  };
}

// Cohort analysis
export interface CohortData {
  cohortDate: string;
  cohortSize: number;
  retention: {
    day1: number;
    day7: number;
    day30: number;
  };
  engagement: {
    avgSessionDuration: number;
    avgSessionsPerDay: number;
    featureAdoption: Record<string, number>;
  };
}

// Retention events
export const RETENTION_EVENTS = {
  FIRST_VALUE: 'first_value_moment',
  HABIT_FORMATION: 'habit_formation',
  SOCIAL_CONNECTION: 'social_connection',
  INVESTMENT_MADE: 'investment_made',
  MASTERY_ACHIEVED: 'mastery_achieved',
  CHURN_RISK: 'churn_risk_detected',
  WINBACK_SUCCESS: 'winback_success'
} as const;

// Analytics service
export class AdvancedAnalytics {
  private sessionId: string;
  private userId?: string;
  private sessionStartTime: Date;
  private pageStartTime: Date;
  private events: UserBehavior[] = [];

  constructor(userId?: string) {
    this.sessionId = this.generateSessionId();
    this.userId = userId;
    this.sessionStartTime = new Date();
    this.pageStartTime = new Date();
    this.trackPageView();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track page views
  trackPageView(page: string = window.location.pathname) {
    const timeOnPage = Date.now() - this.pageStartTime.getTime();
    
    this.trackEvent('page_view', {
      page,
      timeOnPage,
      referrer: document.referrer
    });
    
    this.pageStartTime = new Date();
  }

  // Track user actions
  trackUserAction(action: string, properties: Record<string, any> = {}) {
    this.trackEvent('user_action', {
      action,
      ...properties
    });
  }

  // Track retention events
  trackRetentionEvent(event: keyof typeof RETENTION_EVENTS, properties: Record<string, any> = {}) {
    this.trackEvent(RETENTION_EVENTS[event], {
      ...properties,
      sessionDuration: Date.now() - this.sessionStartTime.getTime()
    });
  }

  // Track feature adoption
  trackFeatureAdoption(feature: string, action: 'viewed' | 'used' | 'completed') {
    this.trackEvent('feature_adoption', {
      feature,
      action,
      timestamp: new Date().toISOString()
    });
  }

  // Track engagement metrics
  trackEngagement(metric: string, value: number) {
    this.trackEvent('engagement', {
      metric,
      value,
      sessionDuration: Date.now() - this.sessionStartTime.getTime()
    });
  }

  // Track churn risk indicators
  trackChurnRisk(riskFactors: string[], riskScore: number) {
    this.trackEvent('churn_risk', {
      riskFactors,
      riskScore,
      timestamp: new Date().toISOString()
    });
  }

  // Track winback attempts
  trackWinbackAttempt(type: string, success: boolean) {
    this.trackEvent('winback_attempt', {
      type,
      success,
      timestamp: new Date().toISOString()
    });
  }

  private trackEvent(event: string, properties: Record<string, any> = {}) {
    const behavior: UserBehavior = {
      sessionId: this.sessionId,
      userId: this.userId,
      timestamp: new Date(),
      event,
      properties,
      context: {
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        timeOnPage: Date.now() - this.pageStartTime.getTime()
      }
    };

    this.events.push(behavior);
    
    // Send to analytics backend
    this.sendToAnalytics(behavior);
  }

  private async sendToAnalytics(behavior: UserBehavior) {
    try {
      await fetch('/api/analytics/behavior', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(behavior)
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  // Get session summary
  getSessionSummary() {
    const sessionDuration = Date.now() - this.sessionStartTime.getTime();
    const eventCount = this.events.length;
    const pagesVisited = new Set(this.events.filter(e => e.event === 'page_view').map(e => e.properties.page)).size;
    
    return {
      sessionId: this.sessionId,
      sessionDuration,
      eventCount,
      pagesVisited,
      events: this.events
    };
  }
}

// Analytics hooks
export function useAnalytics(userId?: string) {
  const [analytics] = React.useState(() => new AdvancedAnalytics(userId));

  React.useEffect(() => {
    // Track page views on route changes
    const handleRouteChange = () => {
      analytics.trackPageView();
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [analytics]);

  return analytics;
}

// Public getter to expose session start time safely
export function getSessionStartTime(analytics: AdvancedAnalytics): Date {
  // @ts-expect-error private access bridged intentionally via typed accessor
  return analytics.sessionStartTime as Date;
}

// Cohort analysis utilities
export function analyzeCohort(userIds: string[], startDate: Date, endDate: Date): Promise<CohortData> {
  return fetch('/api/analytics/cohort', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userIds, startDate, endDate })
  }).then(res => res.json());
}

// Retention prediction
export function predictRetention(userBehavior: UserBehavior[]): number {
  // Simple retention prediction based on engagement patterns
  const sessionCount = userBehavior.filter(e => e.event === 'page_view').length;
  const actionCount = userBehavior.filter(e => e.event === 'user_action').length;
  const featureUsage = userBehavior.filter(e => e.event === 'feature_adoption').length;
  
  // Weighted scoring
  const score = (sessionCount * 0.3) + (actionCount * 0.4) + (featureUsage * 0.3);
  return Math.min(Math.max(score / 10, 0), 1); // Normalize to 0-1
}

// Usage in components
export function useRetentionTracking() {
  const analytics = useAnalytics();
  
  const trackFirstValue = React.useCallback(() => {
    analytics.trackRetentionEvent('FIRST_VALUE', {
      valueType: 'achievement_unlocked',
      timeToValue: Date.now() - getSessionStartTime(analytics).getTime(),
    });
  }, [analytics]);

  const trackHabitFormation = React.useCallback((daysStreak: number) => {
    analytics.trackRetentionEvent('HABIT_FORMATION', {
      daysStreak,
      habitType: 'daily_login'
    });
  }, [analytics]);

  const trackSocialConnection = React.useCallback((connectionType: string) => {
    analytics.trackRetentionEvent('SOCIAL_CONNECTION', {
      connectionType,
      timestamp: new Date().toISOString()
    });
  }, [analytics]);

  const trackInvestment = React.useCallback((investmentType: string, value: number) => {
    analytics.trackRetentionEvent('INVESTMENT_MADE', {
      investmentType,
      value,
      timestamp: new Date().toISOString()
    });
  }, [analytics]);

  return {
    trackFirstValue,
    trackHabitFormation,
    trackSocialConnection,
    trackInvestment,
    analytics
  };
} 