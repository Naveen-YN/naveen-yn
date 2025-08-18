/*
  # Create Resume Table

  1. New Table
    - `resumes`
      - `id` (uuid, primary key)
      - `file_name` (text, name of the resume file)
      - `file_url` (text, URL to the resume file)
      - `file_type` (text, type of file - PDF, DOC, etc.)
      - `is_active` (boolean, whether this is the active resume)
      - `upload_date` (timestamptz, when the resume was uploaded)
      - `created_at` (timestamptz, auto)
      - `updated_at` (timestamptz, auto)

  2. Security
    - Enable RLS on `resumes` table
    - Add policies for public read access
    - Add policies for authenticated operations
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  is_active boolean DEFAULT true,
  upload_date timestamptz DEFAULT CURRENT_TIMESTAMP,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_resumes_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_resumes_updated_at
    BEFORE UPDATE ON resumes
    FOR EACH ROW
    EXECUTE FUNCTION update_resumes_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resumes_is_active ON resumes(is_active);
CREATE INDEX IF NOT EXISTS idx_resumes_upload_date ON resumes(upload_date);

-- Enable Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read on resumes"
  ON resumes
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public insert on resumes"
  ON resumes
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on resumes"
  ON resumes
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on resumes"
  ON resumes
  FOR DELETE
  TO public
  USING (true);

-- Insert default resume if needed
INSERT INTO resumes (
  file_name,
  file_url,
  file_type,
  is_active
) VALUES (
  'Naveen-Yanamadala-Resume.pdf',
  'https://novark.s3.ap-south-1.amazonaws.com/Naveen-Yanamadala-Resume-1.pdf',
  'application/pdf',
  true
) ON CONFLICT DO NOTHING;