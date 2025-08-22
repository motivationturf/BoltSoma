// LAM (Learning Assistance Module) TypeScript Interfaces

export interface Grade {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: string;
  name: string;
  grade_id: string;
  subject_id: string;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  topic_id: string;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  lesson_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correct_answer: string;
  explanation?: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  score?: number;
  time_spent?: number;
  created_at: string;
  updated_at: string;
}

export interface LAMGenerationLog {
  id: string;
  user_id: string;
  topic_id: string;
  generation_type: 'lesson' | 'quiz' | 'both';
  status: 'pending' | 'completed' | 'failed';
  content_generated: string;
  created_at: string;
  updated_at: string;
}

// Filter interfaces
export interface TopicFilter {
  grade_id?: string;
  subject_id?: string;
  search?: string;
}

export interface QuestionFilter {
  lesson_id?: string;
  difficulty_level?: string;
}

// Request/Response interfaces
export interface GenerateContentRequest {
  topic_id: string;
  generation_type: 'lesson' | 'quiz' | 'both';
  difficulty_level?: string;
}

export interface GenerateContentResponse {
  lesson?: Lesson;
  questions?: Question[];
  status: 'success' | 'error';
  message?: string;
}

// Quiz interfaces
export interface QuizQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  topic_id: string;
  questions: QuizQuestion[];
  total_questions: number;
  passing_score: number;
}

export interface QuizResult {
  quiz_id: string;
  user_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_taken: number;
  completed_at: string;
}