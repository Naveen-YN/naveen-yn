/*
  # Create projects table with proper schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `description` (text, required)
      - `long_description` (text, optional)
      - `image` (text, optional)
      - `tags` (text array)
      - `link` (text, optional)
      - `features` (text array)
      - `technologies` (text array)
      - `challenges` (text array)
      - `outcomes` (text array)
      - `status` (text with constraints)
      - `start_date` (text, optional)
      - `end_date` (text, optional)
      - `category` (text with constraints)
      - `priority` (text with constraints)
      - `live_demo` (text, optional)
      - `screenshots` (text array)
      - `team_size` (integer, default 0)
      - `role` (text, optional)
      - `key_metrics` (jsonb, optional)
      - `created_at` (timestamptz, auto)
      - `updated_at` (timestamptz, auto)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for public read and write access

  3. Functions & Triggers
    - Create update timestamp function
    - Add trigger for automatic timestamp updates
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text,
  image text,
  tags text[],
  link text,
  features text[],
  technologies text[],
  challenges text[],
  outcomes text[],
  status text CHECK (status IN ('completed', 'in-progress', 'planned', 'n/a')),
  start_date text,
  end_date text,
  category text CHECK (category IN ('Academic', 'Personal', 'Professional', 'Open Source', 'Freelance', 'Hackathon', 'Research', '')),
  priority text CHECK (priority IN ('high', 'medium', 'low', 'none')),
  live_demo text,
  screenshots text[],
  team_size integer DEFAULT 0,
  role text,
  key_metrics jsonb,
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

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read on projects" ON projects;
DROP POLICY IF EXISTS "Allow public upsert on projects" ON projects;

-- Create policies for public access
CREATE POLICY "Allow public read on projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public upsert on projects"
  ON projects
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);