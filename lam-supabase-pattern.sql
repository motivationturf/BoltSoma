-- SomaSmart EduHub - LAM Schema (Following Official Supabase Pattern)
-- Based on: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs

-- 1. Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create topics table
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

-- 4. Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('MCQ', 'FillInTheBlank', 'TrueFalse', 'ShortAnswer')),
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('Easy', 'Medium', 'Hard')) DEFAULT 'Medium',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- 7. Create lam_generation_logs table
CREATE TABLE IF NOT EXISTS lam_generation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_id UUID NOT NULL REFERENCES grades(id),
  subject_id UUID NOT NULL REFERENCES subjects(id),
  topic_id UUID REFERENCES topics(id),
  generated_by UUID NOT NULL,
  generation_type TEXT NOT NULL CHECK (generation_type IN ('lesson', 'quiz', 'both')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Insert sample data (following Supabase pattern)
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