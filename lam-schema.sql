-- SomaSmart EduHub - Learning Assistance Module (LAM) Schema
-- This schema supports the Zambian secondary education curriculum with Form 1 and Grades 9-12

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. GRADES TABLE
CREATE TABLE IF NOT EXISTS grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SUBJECTS TABLE
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TOPICS TABLE
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_id UUID NOT NULL REFERENCES grades(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(grade_id, subject_id, name)
);

-- 4. LESSONS TABLE
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown content
  created_by UUID NOT NULL, -- References auth.users(id)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('MCQ', 'FillInTheBlank', 'TrueFalse', 'ShortAnswer')),
  options JSONB, -- For MCQ questions: {"A": "option1", "B": "option2", ...}
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('Easy', 'Medium', 'Hard')) DEFAULT 'Medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. USER PROGRESS TABLE (for tracking student progress)
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- References auth.users(id)
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0, -- in seconds
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- 7. LAM GENERATION LOGS TABLE (for tracking AI generation)
CREATE TABLE IF NOT EXISTS lam_generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_id UUID NOT NULL REFERENCES grades(id),
  subject_id UUID NOT NULL REFERENCES subjects(id),
  topic_id UUID REFERENCES topics(id),
  generated_by UUID NOT NULL, -- References auth.users(id)
  generation_type TEXT NOT NULL CHECK (generation_type IN ('lesson', 'quiz', 'both')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_topics_grade_subject ON topics(grade_id, subject_id);
CREATE INDEX IF NOT EXISTS idx_lessons_topic ON lessons(topic_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_topic ON user_progress(user_id, topic_id);
CREATE INDEX IF NOT EXISTS idx_lam_logs_grade_subject ON lam_generation_logs(grade_id, subject_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert Zambian secondary education curriculum data
INSERT INTO grades (name, description) VALUES 
  ('Form 1', 'First year of secondary education'),
  ('Grade 9', 'Second year of high school education'),
  ('Grade 10', 'Third year of high school education'),
  ('Grade 11', 'Fourth year of high school education'),
  ('Grade 12', 'Fifth year of high school education')
ON CONFLICT (name) DO NOTHING;

INSERT INTO subjects (name, description) VALUES 
  ('Mathematics', 'Core mathematics including algebra, geometry, calculus, and statistics'),
  ('English', 'English language and literature'),
  ('Physics', 'Physical sciences including mechanics, electricity, and modern physics'),
  ('Chemistry', 'Chemical sciences including organic chemistry, inorganic chemistry, and physical chemistry'),
  ('Biology', 'Life sciences including cell biology, genetics, and ecology'),
  ('History', 'World history and Zambian history'),
  ('Geography', 'Physical and human geography'),
  ('Computer Science', 'Programming, algorithms, and computer systems'),
  ('Business Studies', 'Economics, accounting, and business management'),
  ('Religious Education', 'Religious and moral education'),
  ('Physical Education', 'Physical education and sports'),
  ('Creative Arts', 'Art, music, and creative expression')
ON CONFLICT (name) DO NOTHING;

-- Insert sample topics for Grade 9 Mathematics
INSERT INTO topics (grade_id, subject_id, name, description) 
SELECT 
  g.id as grade_id,
  s.id as subject_id,
  t.name,
  t.description
FROM grades g, subjects s, (VALUES 
  ('Algebraic Expressions', 'Introduction to algebraic expressions and equations'),
  ('Linear Equations', 'Solving linear equations and inequalities'),
  ('Quadratic Equations', 'Solving quadratic equations and functions'),
  ('Geometry Basics', 'Basic geometric concepts and theorems'),
  ('Statistics', 'Data collection, analysis, and probability')
) AS t(name, description)
WHERE g.name = 'Grade 9' AND s.name = 'Mathematics'
ON CONFLICT (grade_id, subject_id, name) DO NOTHING;

-- Insert sample topics for Grade 9 Physics
INSERT INTO topics (grade_id, subject_id, name, description) 
SELECT 
  g.id as grade_id,
  s.id as subject_id,
  t.name,
  t.description
FROM grades g, subjects s, (VALUES 
  ('Mechanics', 'Motion, forces, and energy'),
  ('Waves and Sound', 'Wave properties and sound waves'),
  ('Electricity', 'Basic electrical circuits and current'),
  ('Light and Optics', 'Light waves, reflection, and refraction'),
  ('Thermal Physics', 'Heat, temperature, and thermodynamics')
) AS t(name, description)
WHERE g.name = 'Grade 9' AND s.name = 'Physics'
ON CONFLICT (grade_id, subject_id, name) DO NOTHING; 