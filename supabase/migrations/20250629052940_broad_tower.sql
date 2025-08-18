/*
  # Final Projects Table Setup

  1. Database Structure
    - Complete projects table with all required fields
    - Proper constraints and indexes
    - RLS policies for public access
    
  2. Security
    - Enable RLS on projects table
    - Add policies for full CRUD operations
    
  3. Performance
    - Add indexes for common queries
    - Optimize for search and filtering
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing objects to avoid conflicts
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP POLICY IF EXISTS "Allow public read on projects" ON projects;
DROP POLICY IF EXISTS "Allow public insert on projects" ON projects;
DROP POLICY IF EXISTS "Allow public update on projects" ON projects;
DROP POLICY IF EXISTS "Allow public delete on projects" ON projects;
DROP POLICY IF EXISTS "Allow public upsert on projects" ON projects;

-- Recreate projects table with proper structure
DROP TABLE IF EXISTS projects CASCADE;
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text,
  image text,
  tags text[] DEFAULT '{}',
  link text,
  features text[] DEFAULT '{}',
  technologies text[] DEFAULT '{}',
  challenges text[] DEFAULT '{}',
  outcomes text[] DEFAULT '{}',
  status text DEFAULT 'planned' CHECK (status IN ('completed', 'in-progress', 'planned', 'n/a')),
  start_date text,
  end_date text,
  category text DEFAULT '' CHECK (category IN ('Academic', 'Personal', 'Professional', 'Open Source', 'Freelance', 'Hackathon', 'Research', '')),
  priority text DEFAULT 'none' CHECK (priority IN ('high', 'medium', 'low', 'none')),
  live_demo text,
  screenshots text[] DEFAULT '{}',
  team_size integer DEFAULT 0,
  role text,
  key_metrics jsonb DEFAULT '[]',
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

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_tags ON projects USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read on projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on projects"
  ON projects
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on projects"
  ON projects
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on projects"
  ON projects
  FOR DELETE
  TO public
  USING (true);

-- Insert sample project if table is empty
INSERT INTO projects (
  title,
  slug,
  description,
  long_description,
  image,
  tags,
  link,
  features,
  technologies,
  challenges,
  outcomes,
  status,
  start_date,
  end_date,
  category,
  priority,
  live_demo,
  team_size,
  role,
  key_metrics
) VALUES (
  'Virtual Healthcare Companion Chatbot',
  'virtual-healthcare-companion',
  'An intelligent healthcare chatbot using NLTK for disease prediction, preventive measures, and medical guidance with an intuitive user interface.',
  'The Virtual Healthcare Companion Chatbot is an innovative solution designed to provide accessible healthcare information and preliminary disease prediction using advanced natural language processing techniques.',
  'https://neuropia.s3.ap-south-1.amazonaws.com/project-img/healthcare.jpg',
  ARRAY['Python', 'NLTK', 'Django', 'Healthcare', 'AI'],
  'https://github.com/Naveen-YN/Virtual-Healthcare-Companion-Chatbot-Utilizing-NLTK',
  ARRAY[
    'Symptom-based disease prediction with 85% accuracy',
    'Preventive healthcare recommendations',
    'Multi-language support for accessibility',
    'Real-time chat interface with medical guidance',
    'Integration with medical databases'
  ],
  ARRAY[
    'Python for backend logic and AI processing',
    'NLTK for natural language processing',
    'Django for web framework',
    'SQLite for data storage',
    'Bootstrap for responsive UI'
  ],
  ARRAY[
    'Ensuring medical information accuracy and reliability',
    'Implementing robust natural language understanding',
    'Creating an intuitive user experience for non-technical users'
  ],
  ARRAY[
    'Developed a functional chatbot capable of understanding health-related queries',
    'Achieved 85% accuracy in symptom-based disease prediction',
    'Successfully deployed with positive user feedback'
  ],
  'completed',
  '2023-08',
  '2023-12',
  'Academic',
  'high',
  'https://healthcare-chatbot-demo.com',
  1,
  'Full Stack Developer',
  '[
    {"label": "Accuracy", "value": "85%"},
    {"label": "Response Time", "value": "<2s"},
    {"label": "User Satisfaction", "value": "4.2/5"}
  ]'::jsonb
) ON CONFLICT (slug) DO NOTHING;