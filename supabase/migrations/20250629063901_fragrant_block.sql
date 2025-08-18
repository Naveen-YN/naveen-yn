/*
  # Create About Me table with comprehensive profile management

  1. New Tables
    - `about_me`
      - `id` (uuid, primary key)
      - `about_text` (text, main about content)
      - `profile_picture` (text, profile image URL)
      - `resume_url` (text, resume file URL)
      - `tagline` (text, short professional tagline)
      - `location` (text, current location)
      - `availability` (text, current availability status)
      - `experience_years` (integer, years of experience)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `key_highlights`
      - `id` (uuid, primary key)
      - `icon` (text, icon name)
      - `title` (text, highlight title)
      - `description` (text, highlight description)
      - `order_index` (integer, display order)
      - `is_active` (boolean, visibility toggle)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `additional_highlights`
      - Similar structure to key_highlights
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated operations
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create about_me table
CREATE TABLE IF NOT EXISTS about_me (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  about_text text NOT NULL DEFAULT '',
  profile_picture text DEFAULT '',
  resume_url text DEFAULT '',
  tagline text DEFAULT '',
  location text DEFAULT '',
  availability text DEFAULT 'Open to opportunities',
  experience_years integer DEFAULT 0,
  phone text DEFAULT '',
  email text DEFAULT '',
  linkedin_url text DEFAULT '',
  github_url text DEFAULT '',
  website_url text DEFAULT '',
  skills_summary text DEFAULT '',
  interests text[] DEFAULT '{}',
  languages text[] DEFAULT '{}',
  certifications_count integer DEFAULT 0,
  projects_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Create key_highlights table
CREATE TABLE IF NOT EXISTS key_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Code',
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  color_scheme text DEFAULT 'blue',
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Create additional_highlights table
CREATE TABLE IF NOT EXISTS additional_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Lightbulb',
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  color_scheme text DEFAULT 'purple',
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_about_me_updated_at
    BEFORE UPDATE ON about_me
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_key_highlights_updated_at
    BEFORE UPDATE ON key_highlights
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_additional_highlights_updated_at
    BEFORE UPDATE ON additional_highlights
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_about_me_is_active ON about_me(is_active);
CREATE INDEX IF NOT EXISTS idx_key_highlights_order ON key_highlights(order_index);
CREATE INDEX IF NOT EXISTS idx_key_highlights_active ON key_highlights(is_active);
CREATE INDEX IF NOT EXISTS idx_additional_highlights_order ON additional_highlights(order_index);
CREATE INDEX IF NOT EXISTS idx_additional_highlights_active ON additional_highlights(is_active);

-- Enable Row Level Security
ALTER TABLE about_me ENABLE ROW LEVEL SECURITY;
ALTER TABLE key_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE additional_highlights ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read on about_me"
  ON about_me
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public insert on about_me"
  ON about_me
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on about_me"
  ON about_me
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on about_me"
  ON about_me
  FOR DELETE
  TO public
  USING (true);

-- Policies for key_highlights
CREATE POLICY "Allow public read on key_highlights"
  ON key_highlights
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public insert on key_highlights"
  ON key_highlights
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on key_highlights"
  ON key_highlights
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on key_highlights"
  ON key_highlights
  FOR DELETE
  TO public
  USING (true);

-- Policies for additional_highlights
CREATE POLICY "Allow public read on additional_highlights"
  ON additional_highlights
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public insert on additional_highlights"
  ON additional_highlights
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on additional_highlights"
  ON additional_highlights
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on additional_highlights"
  ON additional_highlights
  FOR DELETE
  TO public
  USING (true);

-- Insert default about_me record
INSERT INTO about_me (
  about_text,
  tagline,
  location,
  availability,
  experience_years,
  email,
  linkedin_url,
  github_url,
  skills_summary,
  interests,
  languages
) VALUES (
  'I am passionate about technology and aspire to secure an entry-level role in software development engineering where I can apply my technical expertise, analytical mindset, and dedication to continuous learning. I am eager to contribute innovative solutions to complex challenges, collaborate with dynamic teams, and drive meaningful impact through high-quality, impactful work that supports organizational growth and success.',
  'Aspiring Software Developer & AI Enthusiast',
  'Hyderabad, India',
  'Open to opportunities',
  0,
  'naveen.yanamadala@example.com',
  'https://linkedin.com/in/naveen-yn',
  'https://github.com/Naveen-YN',
  'Full-stack development with expertise in Python, Java, and modern web technologies',
  ARRAY['Artificial Intelligence', 'Machine Learning', 'Web Development', 'Competitive Programming', 'Open Source'],
  ARRAY['English', 'Telugu', 'Hindi']
) ON CONFLICT DO NOTHING;

-- Insert default key highlights
INSERT INTO key_highlights (icon, title, description, order_index, color_scheme) VALUES
  ('Code', 'Technical Excellence', 'Passionate about cutting-edge technologies and best practices', 1, 'blue'),
  ('Target', 'Goal-Oriented', 'Focused on delivering impactful solutions and measurable results', 2, 'green'),
  ('Lightbulb', 'Innovation Mindset', 'Always exploring new approaches to solve complex challenges', 3, 'yellow'),
  ('Users', 'Team Collaboration', 'Effective communication and teamwork in diverse environments', 4, 'purple')
ON CONFLICT DO NOTHING;

-- Insert default additional highlights
INSERT INTO additional_highlights (icon, title, description, order_index, color_scheme) VALUES
  ('Briefcase', 'Professional Growth', 'Committed to continuous learning and skill development', 1, 'indigo'),
  ('Award', 'Academic Excellence', 'Strong academic foundation with focus on practical application', 2, 'pink'),
  ('Zap', 'Quick Learner', 'Rapidly adapts to new technologies and methodologies', 3, 'orange'),
  ('Heart', 'Passion-Driven', 'Genuine enthusiasm for creating meaningful software solutions', 4, 'red')
ON CONFLICT DO NOTHING;