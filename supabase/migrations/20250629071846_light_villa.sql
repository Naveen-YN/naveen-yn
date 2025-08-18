/*
  # Fix Coding Profiles RLS Policies

  1. Security Changes
    - Drop existing restrictive policies that require authentication
    - Create new public policies that allow all CRUD operations
    - Ensure public read access is maintained
  
  2. Changes Made
    - Allow public INSERT operations
    - Allow public UPDATE operations  
    - Allow public DELETE operations
    - Maintain existing public SELECT policy
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated users to update coding_profiles" ON coding_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to insert coding_profiles" ON coding_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to delete coding_profiles" ON coding_profiles;

-- Create new public policies that allow all operations
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

-- The SELECT policy already exists, so we don't need to create it again
-- It should already allow public read access: (is_active = true)