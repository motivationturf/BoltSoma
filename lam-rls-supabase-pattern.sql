-- Enable RLS on all tables (following Supabase pattern)
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lam_generation_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (following Supabase pattern)
CREATE POLICY "Enable read access for all users" ON grades FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON subjects FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON topics FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON lessons FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON questions FOR SELECT USING (true);

-- Create policies for user progress (following Supabase pattern)
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for full access (following Supabase pattern)
CREATE POLICY "Enable all access for authenticated users" ON grades FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON subjects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON topics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON lessons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON questions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON user_progress FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON lam_generation_logs FOR ALL USING (auth.role() = 'authenticated'); 