/*
  # Create coding profiles table with advanced features

  1. New Tables
    - `coding_profiles`
      - `id` (uuid, primary key)
      - `name` (text, platform name)
      - `icon` (text, icon name)
      - `link` (text, profile URL)
      - `username` (text, platform username)
      - `description` (text, profile description)
      - `is_active` (boolean, visibility toggle)
      - `has_live_stats` (boolean, live stats capability)
      - `order_index` (integer, display order)
      - `color_scheme` (text, visual theme)
      - `achievements` (text[], list of achievements)
      - `custom_stats` (jsonb, platform-specific statistics)
      - `last_updated` (timestamptz, stats update time)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `coding_profiles` table
    - Add policies for public access
    - Add unique constraint on name for duplicate prevention

  3. Indexes
    - Index on order_index for sorting
    - Index on is_active for filtering
    - Index on name for searching
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create coding_profiles table
CREATE TABLE IF NOT EXISTS coding_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'FaCode',
  link text NOT NULL,
  username text DEFAULT '',
  description text DEFAULT '',
  is_active boolean DEFAULT true,
  has_live_stats boolean DEFAULT false,
  order_index integer DEFAULT 0,
  color_scheme text DEFAULT 'blue',
  achievements text[] DEFAULT '{}',
  custom_stats jsonb DEFAULT '{}',
  last_updated timestamptz DEFAULT CURRENT_TIMESTAMP,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  
  -- Add unique constraint for platform name
  CONSTRAINT unique_coding_profile_name UNIQUE (name)
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_coding_profiles_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_coding_profiles_updated_at
    BEFORE UPDATE ON coding_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_coding_profiles_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coding_profiles_order ON coding_profiles(order_index);
CREATE INDEX IF NOT EXISTS idx_coding_profiles_active ON coding_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_coding_profiles_name ON coding_profiles(name);
CREATE INDEX IF NOT EXISTS idx_coding_profiles_has_stats ON coding_profiles(has_live_stats);
CREATE INDEX IF NOT EXISTS idx_coding_profiles_last_updated ON coding_profiles(last_updated);

-- Enable Row Level Security
ALTER TABLE coding_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read on coding_profiles"
  ON coding_profiles
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Allow public insert on coding_profiles"
  ON coding_profiles
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on coding_profiles"
  ON coding_profiles
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on coding_profiles"
  ON coding_profiles
  FOR DELETE
  TO public
  USING (true);

-- Insert default coding profiles with enhanced data
INSERT INTO coding_profiles (
  name, icon, link, username, description, is_active, has_live_stats, order_index, color_scheme, achievements, custom_stats
) VALUES 
  (
    'LeetCode',
    'SiLeetcode',
    'https://leetcode.com/u/Naveen_YN/',
    'Naveen_YN',
    'Competitive programming and algorithm practice platform',
    true,
    true,
    1,
    'yellow',
    ARRAY['Contest Rating 1650+', '245+ Problems Solved', '7-day streak'],
    '{
      "leetcode": {
        "totalSolved": 245,
        "totalQuestions": 2500,
        "easySolved": 120,
        "mediumSolved": 95,
        "hardSolved": 30,
        "acceptanceRate": 68.5,
        "ranking": 125000,
        "contestRating": 1650,
        "globalRanking": 89000,
        "currentlyAttempting": "Two Sum II - Input Array Is Sorted",
        "recentSubmissions": 15,
        "streak": 7
      }
    }'::jsonb
  ),
  (
    'GitHub',
    'FaGithub',
    'https://github.com/Naveen-YN',
    'Naveen-YN',
    'Open source contributions and project repositories',
    true,
    true,
    2,
    'gray',
    ARRAY['28 Public Repos', '45 Followers', '1250+ Commits'],
    '{
      "github": {
        "public_repos": 28,
        "followers": 45,
        "following": 32,
        "created_at": "2021-03-15T00:00:00Z",
        "bio": "Passionate developer building innovative solutions with AI/ML",
        "location": "Hyderabad, India",
        "company": "Student at Malla Reddy University",
        "totalStars": 156,
        "totalCommits": 1250,
        "contributionsThisYear": 890
      }
    }'::jsonb
  ),
  (
    'GeeksforGeeks',
    'SiGeeksforgeeks',
    'https://www.geeksforgeeks.org/user/naveen_yn/',
    'naveen_yn',
    'Programming articles and practice problems platform',
    true,
    false,
    3,
    'green',
    ARRAY['Active Contributor', 'Problem Solver'],
    '{}'::jsonb
  ),
  (
    'CodeChef',
    'SiCodechef',
    'https://www.codechef.com/users/naveen_ny',
    'naveen_ny',
    'Competitive programming contests and challenges',
    true,
    false,
    4,
    'orange',
    ARRAY['Regular Participant', 'Contest Solver'],
    '{}'::jsonb
  ),
  (
    'HackerRank',
    'SiHackerrank',
    'https://www.hackerrank.com/profile/naveen_yn',
    'naveen_yn',
    'Skill assessments and coding challenges platform',
    true,
    false,
    5,
    'green',
    ARRAY['Certified Skills', 'Problem Solver'],
    '{}'::jsonb
  )
ON CONFLICT (name) DO NOTHING;