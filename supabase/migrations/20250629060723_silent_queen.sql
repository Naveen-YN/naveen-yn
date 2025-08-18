/*
  # Create Skills Table with Duplicate Prevention

  1. New Tables
    - `skills`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `icon` (text, default 'FaCode')
      - `background_color` (text, default blue theme)
      - `text_color` (text, default white)
      - `border_color` (text, default blue border)
      - `category` (text, required)
      - `description` (text, optional)
      - `proficiency` (integer, 1-5 or null)
      - `is_custom` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `skills` table
    - Add policies for public CRUD operations

  3. Constraints & Indexes
    - Unique constraint on normalized name+category to prevent duplicates
    - Check constraint for proficiency range (1-5 or null)
    - Performance indexes on common query fields

  4. Default Data
    - Pre-populate with essential skills across categories
    - Includes General Skills, Programming Languages, and Web Development
*/

-- Create skills table with all necessary columns
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'FaCode',
  background_color text NOT NULL DEFAULT 'rgba(59, 130, 246, 0.15)',
  text_color text NOT NULL DEFAULT '#FFFFFF',
  border_color text NOT NULL DEFAULT 'rgba(59, 130, 246, 0.3)',
  category text NOT NULL,
  description text DEFAULT '',
  proficiency integer,
  is_custom boolean DEFAULT true,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  
  -- Add check constraint for proficiency validation
  CONSTRAINT skills_proficiency_check CHECK (proficiency IS NULL OR (proficiency >= 1 AND proficiency <= 5))
);

-- Create unique index for duplicate prevention (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS unique_skill_name_category 
ON skills (lower(trim(name)), lower(trim(category)));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_skills_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_skills_updated_at ON skills;
CREATE TRIGGER update_skills_updated_at
    BEFORE UPDATE ON skills
    FOR EACH ROW
    EXECUTE FUNCTION update_skills_updated_at_column();

-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_created_at ON skills(created_at);
CREATE INDEX IF NOT EXISTS idx_skills_proficiency ON skills(proficiency) WHERE proficiency IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_skills_is_custom ON skills(is_custom);
CREATE INDEX IF NOT EXISTS idx_skills_name ON skills(name);

-- Enable Row Level Security
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read on skills" ON skills;
DROP POLICY IF EXISTS "Allow public insert on skills" ON skills;
DROP POLICY IF EXISTS "Allow public update on skills" ON skills;
DROP POLICY IF EXISTS "Allow public delete on skills" ON skills;

-- Create policies for public access
CREATE POLICY "Allow public read on skills"
  ON skills
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on skills"
  ON skills
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on skills"
  ON skills
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on skills"
  ON skills
  FOR DELETE
  TO public
  USING (true);

-- Insert default skills with proper duplicate prevention
INSERT INTO skills (
  name, icon, background_color, text_color, border_color, category, description, proficiency, is_custom
) VALUES 
  -- General Skills
  ('Team Management', 'FaUsers', 'rgba(139, 92, 246, 0.15)', '#FFFFFF', 'rgba(139, 92, 246, 0.3)', 'General Skills', 'Effective team coordination and leadership', 4, true),
  ('Adaptability', 'FaLightbulb', 'rgba(245, 158, 11, 0.15)', '#FFFFFF', 'rgba(245, 158, 11, 0.3)', 'General Skills', 'Quickly adapting to new challenges', 4, true),
  ('Communication', 'FaComments', 'rgba(16, 185, 129, 0.15)', '#FFFFFF', 'rgba(16, 185, 129, 0.3)', 'General Skills', 'Clear and effective communication', 5, true),
  ('Time Management', 'FaClock', 'rgba(168, 85, 247, 0.15)', '#FFFFFF', 'rgba(168, 85, 247, 0.3)', 'General Skills', 'Efficient task prioritization', 4, true),
  
  -- Programming Languages
  ('Python', 'FaPython', 'rgba(59, 130, 246, 0.15)', '#FFFFFF', 'rgba(59, 130, 246, 0.3)', 'Programming Languages', 'Proficient in Python programming', 5, true),
  ('C++', 'SiCplusplus', 'rgba(0, 89, 156, 0.15)', '#FFFFFF', 'rgba(0, 89, 156, 0.3)', 'Programming Languages', 'Experienced in C++ for algorithms', 4, true),
  ('Java', 'FaJava', 'rgba(237, 139, 0, 0.15)', '#FFFFFF', 'rgba(237, 139, 0, 0.3)', 'Programming Languages', 'Skilled in Java development', 4, true),
  ('Kotlin', 'SiKotlin', 'rgba(127, 82, 255, 0.15)', '#FFFFFF', 'rgba(127, 82, 255, 0.3)', 'Programming Languages', 'Familiar with Kotlin for Android', 3, true),
  ('C#', 'FaCode', 'rgba(35, 145, 32, 0.15)', '#FFFFFF', 'rgba(35, 145, 32, 0.3)', 'Programming Languages', 'Knowledge of C# for .NET', 3, true),
  
  -- Web Development
  ('HTML', 'FaHtml5', 'rgba(227, 79, 38, 0.15)', '#FFFFFF', 'rgba(227, 79, 38, 0.3)', 'Web Development', 'Building semantic web structures', 5, true),
  ('CSS', 'FaCss3Alt', 'rgba(21, 114, 182, 0.15)', '#FFFFFF', 'rgba(21, 114, 182, 0.3)', 'Web Development', 'Styling responsive interfaces', 5, true),
  ('JavaScript', 'FaJs', 'rgba(247, 223, 30, 0.15)', '#000000', 'rgba(247, 223, 30, 0.3)', 'Web Development', 'Dynamic client-side scripting', 4, true),
  ('PHP', 'SiPhp', 'rgba(119, 123, 180, 0.15)', '#FFFFFF', 'rgba(119, 123, 180, 0.3)', 'Web Development', 'Server-side scripting with PHP', 3, true),
  ('SQL', 'FaDatabase', 'rgba(51, 103, 145, 0.15)', '#FFFFFF', 'rgba(51, 103, 145, 0.3)', 'Web Development', 'Database querying and management', 4, true),
  ('MongoDB', 'SiMongodb', 'rgba(71, 162, 72, 0.15)', '#FFFFFF', 'rgba(71, 162, 72, 0.3)', 'Web Development', 'NoSQL database operations', 4, true)
ON CONFLICT DO NOTHING;