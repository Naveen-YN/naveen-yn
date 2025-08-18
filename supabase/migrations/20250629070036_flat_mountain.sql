/*
  # Fix RLS policy for coding_profiles table

  1. Security Changes
    - Drop existing restrictive UPDATE policy on coding_profiles table
    - Create new UPDATE policy that allows authenticated users to update all coding profiles
    - Ensure proper permissions for admin dashboard functionality

  2. Changes Made
    - Remove overly restrictive UPDATE policy
    - Add permissive UPDATE policy for authenticated users
    - Maintain existing SELECT and other policies
*/

-- Drop the existing UPDATE policy if it exists
DROP POLICY IF EXISTS "Allow public update on coding_profiles" ON coding_profiles;

-- Create a new UPDATE policy that allows authenticated users to update coding profiles
CREATE POLICY "Allow authenticated users to update coding_profiles"
  ON coding_profiles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Also ensure we have proper INSERT policy for authenticated users
DROP POLICY IF EXISTS "Allow public insert on coding_profiles" ON coding_profiles;

CREATE POLICY "Allow authenticated users to insert coding_profiles"
  ON coding_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Ensure DELETE policy exists for authenticated users
DROP POLICY IF EXISTS "Allow public delete on coding_profiles" ON coding_profiles;

CREATE POLICY "Allow authenticated users to delete coding_profiles"
  ON coding_profiles
  FOR DELETE
  TO authenticated
  USING (true);