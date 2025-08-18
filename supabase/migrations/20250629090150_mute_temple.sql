/*
  # Create certificates table with comprehensive features

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `image` (text, required)
      - `description` (text, required)
      - `issuer` (text, optional)
      - `issue_date` (text, optional)
      - `expiry_date` (text, optional)
      - `credential_id` (text, optional)
      - `credential_url` (text, optional)
      - `category` (text with constraints)
      - `skills` (text array)
      - `verified` (boolean, default false)
      - `is_active` (boolean, default true)
      - `order_index` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `certificates` table
    - Add policies for public CRUD operations

  3. Performance
    - Add indexes for common queries
    - Optimize for search and filtering
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image text NOT NULL,
  description text NOT NULL,
  issuer text DEFAULT '',
  issue_date text DEFAULT '',
  expiry_date text DEFAULT '',
  credential_id text DEFAULT '',
  credential_url text DEFAULT '',
  category text DEFAULT 'Technical' CHECK (category IN ('Technical', 'Professional', 'Academic', 'Security', 'Achievement')),
  skills text[] DEFAULT '{}',
  verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_certificates_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_certificates_updated_at
    BEFORE UPDATE ON certificates
    FOR EACH ROW
    EXECUTE FUNCTION update_certificates_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_certificates_category ON certificates(category);
CREATE INDEX IF NOT EXISTS idx_certificates_verified ON certificates(verified);
CREATE INDEX IF NOT EXISTS idx_certificates_active ON certificates(is_active);
CREATE INDEX IF NOT EXISTS idx_certificates_order ON certificates(order_index);
CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates(created_at);
CREATE INDEX IF NOT EXISTS idx_certificates_skills ON certificates USING GIN(skills);

-- Enable Row Level Security
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read on certificates"
  ON certificates
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public insert on certificates"
  ON certificates
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on certificates"
  ON certificates
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on certificates"
  ON certificates
  FOR DELETE
  TO public
  USING (true);

-- Insert sample certificates
INSERT INTO certificates (
  title, image, description, issuer, issue_date, category, skills, verified, order_index
) VALUES 
  (
    'AWS Certified Cloud Practitioner',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    'Foundational understanding of AWS Cloud concepts, services, and terminology',
    'Amazon Web Services',
    '2024-01',
    'Technical',
    ARRAY['AWS', 'Cloud Computing', 'Infrastructure'],
    true,
    1
  ),
  (
    'Google Cloud Professional Certificate',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    'Professional-level expertise in Google Cloud Platform services and solutions',
    'Google Cloud',
    '2023-11',
    'Professional',
    ARRAY['Google Cloud', 'DevOps', 'Kubernetes'],
    true,
    2
  ),
  (
    'Microsoft Azure Fundamentals',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    'Fundamental knowledge of cloud services and how they are provided with Microsoft Azure',
    'Microsoft',
    '2023-09',
    'Technical',
    ARRAY['Azure', 'Cloud Services', 'Microsoft Technologies'],
    true,
    3
  ),
  (
    'Certified Ethical Hacker (CEH)',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
    'Comprehensive understanding of ethical hacking methodologies and cybersecurity',
    'EC-Council',
    '2023-07',
    'Security',
    ARRAY['Cybersecurity', 'Penetration Testing', 'Network Security'],
    true,
    4
  ),
  (
    'Python Programming Certification',
    'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop',
    'Advanced proficiency in Python programming language and its applications',
    'Python Institute',
    '2023-05',
    'Technical',
    ARRAY['Python', 'Programming', 'Data Science'],
    true,
    5
  ),
  (
    'Machine Learning Specialization',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    'Comprehensive understanding of machine learning algorithms and implementation',
    'Stanford University',
    '2023-03',
    'Academic',
    ARRAY['Machine Learning', 'AI', 'Data Science', 'Python'],
    true,
    6
  )
ON CONFLICT DO NOTHING;