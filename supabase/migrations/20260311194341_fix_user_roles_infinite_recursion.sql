/*
  # Fix Infinite Recursion in user_roles RLS Policies

  ## Problem
  The current RLS policies on user_roles cause infinite recursion because:
  - "Admins can view all roles" policy queries user_roles to check admin status
  - This triggers the policy again, creating an infinite loop
  
  ## Solution
  1. Drop existing problematic policies
  2. Create a security definer function to check admin status
  3. Recreate policies using the function to avoid recursion
  
  ## Changes
  - Drop all existing user_roles policies
  - Create `is_admin()` function with SECURITY DEFINER
  - Recreate safe RLS policies using the function
*/

-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Users can view their own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON user_roles;

-- Create a security definer function to check if user is admin
-- This function runs with elevated privileges and doesn't trigger RLS
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'owner')
  );
END;
$$;

-- Recreate policies without infinite recursion
CREATE POLICY "Users can view their own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (is_admin());

CREATE POLICY "Admins can insert roles"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update roles"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete roles"
  ON user_roles
  FOR DELETE
  TO authenticated
  USING (is_admin());
