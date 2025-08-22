// Application Constants

export const APP_CONFIG = {
  name: 'SomaSmart EduHub',
  version: '1.0.0',
  description: 'Gamified learning platform for Zambian students',
  supportEmail: 'support@somasmart.com',
  maxFileSize: 10 * 1024 * 1024, // 10MB
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  GUEST: '/guest',
  DASHBOARD: '/dashboard',
  SUBJECTS: '/subjects',
  ARCADE: '/arcade',
  AI_HUB: '/ai-hub',
  CHALLENGES: '/challenges',
  LEADERBOARDS: '/leaderboards',
  PROFILE: '/profile',
  UNAUTHORIZED: '/unauthorized',
} as const;

export const SUBJECTS = {
  COMPUTER_STUDIES: 'computer-studies',
  MATHEMATICS: 'mathematics',
  SCIENCES: 'sciences',
  RELIGIOUS_EDUCATION: 'religious-education',
} as const;

export const GRADES = {
  FORM_1: '8',
  GRADE_9: '9',
  GRADE_10: '10',
  GRADE_11: '11',
  GRADE_12: '12',
} as const;

export const GAME_TYPES = {
  BRAIN_BUSTER: 'mulungushi-quiz',
  FLASHCARDS: 'luangwa-flip',
  TIME_CHALLENGE: 'zambezi-rush',
  JUMBLE_MASTER: 'kundalila-puzzles',
  CLASS_CHALLENGE: 'kalambo-clash',
  ZED_LEGACY: 'zed-legacy',
} as const;

export const AI_TOOLS = {
  CHISOMO_CHAT: 'chisomo',
  STUDY_PLANNER: 'planner',
  LEARNING_INSIGHTS: 'insights',
  CONTENT_STUDIO: 'content-studio',
} as const;

export const USER_ROLES = {
  GUEST: 'guest',
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
} as const;

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
  SHORT_ANSWER: 'short_answer',
  FILL_IN_BLANK: 'fill_in_blank',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  SUCCESS: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d',
  },
  WARNING: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    900: '#78350f',
  },
  ERROR: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    900: '#7f1d1d',
  },
} as const;

export const ZAMBIAN_THEME = {
  GREEN: '#16a34a',
  ORANGE: '#f59e0b',
  RED: '#dc2626',
  COPPER: '#b45309',
  EMERALD: '#059669',
} as const;