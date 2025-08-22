// Core User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  mobile?: string;
  grade: string;
  avatar?: string;
  createdAt: Date;
  lastLogin: Date;
}

// Progress and Achievement Types
export interface ProgressUpdate {
  subjectId: string;
  progress: number;
  completed: boolean;
  timestamp: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: string;
  category: 'academic' | 'social' | 'streak' | 'challenge';
}

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  disabled?: boolean;
}

// Challenge Types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number;
  participants: number;
  deadline: string;
  isActive: boolean;
}

export interface ChallengeResult {
  challengeId: string;
  score: number;
  timeSpent: number;
  completed: boolean;
  timestamp: Date;
}

// Game Types
export interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameSession {
  id: string;
  gameType: string;
  score: number;
  timeSpent: number;
  questionsAnswered: number;
  completed: boolean;
  timestamp: Date;
}

// Lesson Types
export interface LessonSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'interactive' | 'quiz';
  duration?: number;
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: string;
  sections: LessonSection[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// AI Hub Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  schedule: StudySession[];
  createdAt: Date;
}

export interface StudySession {
  id: string;
  subject: string;
  duration: number;
  startTime: Date;
  completed: boolean;
}

// Error Types
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

// Form Types
export interface FormData {
  [key: string]: string | number | boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

// UI Component Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
}

// Utility Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}