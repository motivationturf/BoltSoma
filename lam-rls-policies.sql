-- SomaSmart EduHub - LAM Row Level Security (RLS) Policies
-- Run this AFTER the main lam-schema.sql has been executed successfully

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lam_generation_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access (students can view content)
CREATE POLICY "Public can read grades" ON grades FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read subjects" ON subjects FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read topics" ON topics FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read lessons" ON lessons FOR SELECT TO anon USING (true);
CREATE POLICY "Public can read questions" ON questions FOR SELECT TO anon USING (true);

-- RLS Policies for authenticated users
CREATE POLICY "Users can read their own progress" ON user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for teachers/admins (full access)
CREATE POLICY "Teachers can manage all content" ON grades FOR ALL TO authenticated USING (true);
CREATE POLICY "Teachers can manage all content" ON subjects FOR ALL TO authenticated USING (true);
CREATE POLICY "Teachers can manage all content" ON topics FOR ALL TO authenticated USING (true);
CREATE POLICY "Teachers can manage all content" ON lessons FOR ALL TO authenticated USING (true);
CREATE POLICY "Teachers can manage all content" ON questions FOR ALL TO authenticated USING (true);
CREATE POLICY "Teachers can manage all content" ON user_progress FOR ALL TO authenticated USING (true);
CREATE POLICY "Teachers can manage all content" ON lam_generation_logs FOR ALL TO authenticated USING (true); 