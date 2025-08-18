/*
  # Complete Education System Database Schema

  1. New Tables
    - `education` - Store education records with all details
    - `education_highlights` - Store education highlight cards
  
  2. Features
    - Full education record management
    - Custom image support with fallback
    - Highlight cards with ordering
    - RLS policies for public access
    - Indexes for performance
    - Triggers for auto-updating timestamps
  
  3. Security
    - Enable RLS on all tables
    - Public access policies for all operations
    - Proper constraints and validations
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  degree text NOT NULL,
  course text NOT NULL,
  institution text NOT NULL,
  duration text NOT NULL,
  cgpa text DEFAULT '',
  level text NOT NULL DEFAULT 'undergraduate',
  status text NOT NULL DEFAULT 'current',
  highlights text[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  custom_image text DEFAULT '',
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  
  -- Add constraints for valid values
  CONSTRAINT education_level_check CHECK (level IN ('undergraduate', 'postgraduate', 'diploma', 'intermediate', 'secondary')),
  CONSTRAINT education_status_check CHECK (status IN ('current', 'completed', 'graduated'))
);

-- Create education_highlights table
CREATE TABLE IF NOT EXISTS education_highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'FaUniversity',
  color text NOT NULL DEFAULT 'text-blue-400 hover:border-blue-400/30',
  value text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp for education
CREATE OR REPLACE FUNCTION update_education_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to update updated_at timestamp for education highlights
CREATE OR REPLACE FUNCTION update_education_highlights_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_education_updated_at
    BEFORE UPDATE ON education
    FOR EACH ROW
    EXECUTE FUNCTION update_education_updated_at_column();

CREATE TRIGGER update_education_highlights_updated_at
    BEFORE UPDATE ON education_highlights
    FOR EACH ROW
    EXECUTE FUNCTION update_education_highlights_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_education_level ON education(level);
CREATE INDEX IF NOT EXISTS idx_education_status ON education(status);
CREATE INDEX IF NOT EXISTS idx_education_order ON education(order_index);
CREATE INDEX IF NOT EXISTS idx_education_active ON education(is_active);
CREATE INDEX IF NOT EXISTS idx_education_created_at ON education(created_at);

CREATE INDEX IF NOT EXISTS idx_education_highlights_order ON education_highlights(order_index);
CREATE INDEX IF NOT EXISTS idx_education_highlights_active ON education_highlights(is_active);

-- Enable Row Level Security
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_highlights ENABLE ROW LEVEL SECURITY;

-- Create policies for education table
CREATE POLICY "Allow public read on education"
  ON education
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public insert on education"
  ON education
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on education"
  ON education
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on education"
  ON education
  FOR DELETE
  TO public
  USING (true);

-- Create policies for education_highlights table
CREATE POLICY "Allow public read on education_highlights"
  ON education_highlights
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public insert on education_highlights"
  ON education_highlights
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on education_highlights"
  ON education_highlights
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on education_highlights"
  ON education_highlights
  FOR DELETE
  TO public
  USING (true);

-- Insert default education records
INSERT INTO education (
  degree, course, institution, duration, cgpa, level, status, highlights, skills, order_index
) VALUES 
  (
    'Bachelor of Technology (B.Tech)',
    'Computer Science and Engineering (Specialization in AI & ML)',
    'Malla Reddy University, Hyderabad, Telangana',
    '2021 to 2025',
    'CGPA: 8.25',
    'undergraduate',
    'current',
    ARRAY[
      'Specialization in Artificial Intelligence & Machine Learning',
      'Relevant coursework in Data Structures, Algorithms, and Software Engineering',
      'Active participation in coding competitions and tech events',
      'Dean''s List for academic excellence',
      'Member of Computer Science Society'
    ],
    ARRAY['Python', 'Java', 'Machine Learning', 'Data Structures', 'Algorithms', 'Web Development', 'Database Management'],
    1
  ),
  (
    'Intermediate (MPC)',
    'Mathematics, Physics, Chemistry',
    'Narayana Junior College, Hyderabad, Telangana',
    '2019 to 2021',
    'Percentage: 92%',
    'intermediate',
    'completed',
    ARRAY[
      'Strong foundation in Mathematics and Physics',
      'Developed analytical and problem-solving skills',
      'Prepared for competitive engineering entrance exams',
      'Secured admission in top engineering college'
    ],
    ARRAY['Mathematics', 'Physics', 'Chemistry', 'Analytical Thinking', 'Problem Solving'],
    2
  ),
  (
    'SSC (Secondary School Certificate)',
    'Secondary School Certificate',
    'SR Digi School, Hyderabad, Telangana',
    '2019',
    'GPA: 9.2',
    'secondary',
    'graduated',
    ARRAY[
      'Built strong academic foundation',
      'Developed interest in science and technology',
      'Participated in various academic competitions',
      'School topper in Mathematics and Science'
    ],
    ARRAY['Academic Foundation', 'Science', 'Mathematics', 'Leadership'],
    3
  )
ON CONFLICT DO NOTHING;

-- Insert default education highlights
INSERT INTO education_highlights (
  title, subtitle, description, icon, color, value, order_index
) VALUES 
  (
    'B.Tech',
    'Computer Science & Engineering',
    'AI & ML Specialization',
    'FaUniversity',
    'text-blue-400 hover:border-blue-400/30',
    'B.Tech',
    1
  ),
  (
    '8.25',
    'Current CGPA',
    'Academic Excellence',
    'FaStar',
    'text-green-400 hover:border-green-400/30',
    '8.25',
    2
  ),
  (
    '2025',
    'Expected Graduation',
    'Final Year Student',
    'FaCalendarAlt',
    'text-purple-400 hover:border-purple-400/30',
    '2025',
    3
  ),
  (
    '4+',
    'Years of Study',
    'Continuous Learning',
    'FaBook',
    'text-orange-400 hover:border-orange-400/30',
    '4+',
    4
  )
ON CONFLICT DO NOTHING;