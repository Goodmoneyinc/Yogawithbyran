/*
  # Create Courses and Lessons Tables

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `published` (boolean, default false)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `order_index` (integer, default 0)

    - `lessons`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `mux_playback_id` (text, for video playback)
      - `mux_asset_id` (text, for video management)
      - `course_id` (uuid, references courses)
      - `order_index` (integer, default 0)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to view published courses
    - Add policies for admins to manage courses and lessons
    - Add policies for students to view published lessons

  3. Important Notes
    - This creates a separate course/lesson structure alongside your existing modules/videos
    - Uses UUID for primary keys as specified
    - Includes proper foreign key constraints
*/

-- Enable uuid extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  published BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  mux_playback_id TEXT,
  mux_asset_id TEXT,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can update courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'owner')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can delete courses"
  ON courses FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'owner')
    )
  );

-- Lessons policies
CREATE POLICY "Users can view lessons from published courses"
  ON lessons FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = lessons.course_id
      AND courses.published = true
    )
  );

CREATE POLICY "Admins can view all lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can insert lessons"
  ON lessons FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can update lessons"
  ON lessons FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'owner')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can delete lessons"
  ON lessons FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'owner')
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(published);
