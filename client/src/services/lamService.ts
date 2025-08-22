import { supabase } from '../lib/supabase';
import {
  Grade,
  Subject,
  Topic,
  Lesson,
  Question,
  UserProgress,
  LAMGenerationLog,
  TopicFilter,
  QuestionFilter,
  GenerateContentRequest,
  GenerateContentResponse,
  Quiz,
  QuizResult
} from '../types/lam';

export class LAMService {
  // ===== GRADES =====
  async getGrades(): Promise<Grade[]> {
    const { data, error } = await supabase
      .from('grades')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  }

  async getGradeById(id: string): Promise<Grade | null> {
    const { data, error } = await supabase
      .from('grades')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  // ===== SUBJECTS =====
  async getSubjects(): Promise<Subject[]> {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  }

  async getSubjectById(id: string): Promise<Subject | null> {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  // ===== TOPICS =====
  async getTopics(filter?: TopicFilter): Promise<Topic[]> {
    let query = supabase
      .from('topics')
      .select(`
        *,
        grade:grades(*),
        subject:subjects(*)
      `)
      .order('name');

    if (filter?.grade_id) {
      query = query.eq('grade_id', filter.grade_id);
    }
    if (filter?.subject_id) {
      query = query.eq('subject_id', filter.subject_id);
    }
    if (filter && 'search' in filter && filter.search) {
      // filter may be a partial; guard with in-operator for TS
      query = query.ilike('name', `%${filter.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getTopicById(id: string): Promise<Topic | null> {
    const { data, error } = await supabase
      .from('topics')
      .select(`
        *,
        grade:grades(*),
        subject:subjects(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createTopic(topic: Omit<Topic, 'id' | 'created_at' | 'updated_at'>): Promise<Topic> {
    const { data, error } = await supabase
      .from('topics')
      .insert(topic)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // ===== LESSONS =====
  async getLessonsByTopic(topicId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        topic:topics(*)
      `)
      .eq('topic_id', topicId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async getLessonById(id: string): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        topic:topics(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createLesson(lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .insert(lesson)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson> {
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // ===== QUESTIONS =====
  async getQuestionsByTopic(topicId: string, filter?: QuestionFilter): Promise<Question[]> {
    let query = supabase
      .from('questions')
      .select('*')
      .eq('lesson_id', topicId);

    if (filter?.lesson_id) {
      query = query.eq('lesson_id', filter.lesson_id);
    }
    if (filter?.difficulty_level) {
      query = query.eq('difficulty_level', filter.difficulty_level);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getQuestionsByLesson(lessonId: string, filter?: QuestionFilter): Promise<Question[]> {
    let query = supabase
      .from('questions')
      .select('*')
      .eq('lesson_id', lessonId);

    if (filter?.difficulty_level) {
      query = query.eq('difficulty_level', filter.difficulty_level);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getQuestionById(id: string): Promise<Question | null> {
    const { data, error } = await supabase
      .from('questions')
      .select(`
        *,
        topic:topics(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async createQuestion(question: Omit<Question, 'id' | 'created_at' | 'updated_at'>): Promise<Question> {
    const { data, error } = await supabase
      .from('questions')
      .insert(question)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async createQuestions(questions: Omit<Question, 'id' | 'created_at' | 'updated_at'>[]): Promise<Question[]> {
    const { data, error } = await supabase
      .from('questions')
      .insert(questions)
      .select();
    
    if (error) throw error;
    return data || [];
  }

  // ===== USER PROGRESS =====
  async getUserProgress(userId: string, topicId?: string): Promise<UserProgress[]> {
    let query = supabase
      .from('user_progress')
      .select(`
        *,
        topic:topics(*),
        lesson:lessons(*)
      `)
      .eq('user_id', userId);

    if (topicId) {
      query = query.eq('topic_id', topicId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async updateUserProgress(progress: Partial<UserProgress> & { user_id: string; topic_id: string }): Promise<UserProgress> {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert(progress, { onConflict: 'user_id,topic_id' })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // ===== LAM GENERATION =====
  async createGenerationLog(log: Omit<LAMGenerationLog, 'id' | 'created_at'>): Promise<LAMGenerationLog> {
    const { data, error } = await supabase
      .from('lam_generation_logs')
      .insert(log)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateGenerationLog(id: string, updates: Partial<LAMGenerationLog>): Promise<LAMGenerationLog> {
    const { data, error } = await supabase
      .from('lam_generation_logs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async getGenerationLogs(gradeId?: string, subjectId?: string): Promise<LAMGenerationLog[]> {
    let query = supabase
      .from('lam_generation_logs')
      .select(`
        *,
        grade:grades(*),
        subject:subjects(*),
        topic:topics(*)
      `)
      .order('created_at', { ascending: false });

    if (gradeId) {
      query = query.eq('grade_id', gradeId);
    }
    if (subjectId) {
      query = query.eq('subject_id', subjectId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // ===== QUIZ FUNCTIONS =====
  async generateQuiz(topicId: string, questionCount: number = 10): Promise<Quiz> {
    const questions = await this.getQuestionsByTopic(topicId);
    
    // Randomly select questions
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Math.min(questionCount, questions.length));
    
    return {
      id: crypto.randomUUID(),
      topic_id: topicId,
      questions: selectedQuestions.map((q) => ({
        id: q.id,
        question_text: q.question_text,
        options: q.options ?? [],
        correct_answer: q.correct_answer,
        explanation: q.explanation,
      })),
      total_questions: selectedQuestions.length,
      passing_score: Math.ceil(selectedQuestions.length * 0.7), // 70% passing score
    };
  }

  async submitQuizResult(result: Omit<QuizResult, 'completed_at'>): Promise<QuizResult> {
    // In a real implementation, you'd save this to a quiz_results table
    // For now, we'll just return the result with a timestamp
    return {
      ...result,
      completed_at: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const lamService = new LAMService(); 