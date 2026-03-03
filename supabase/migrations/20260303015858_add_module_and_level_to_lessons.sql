/*
  # Add Module and Level Fields to Lessons

  1. Schema Changes
    - Add `module_name` column to lessons (text, for grouping like "Week 1", "Module 2")
    - Add `level` column to lessons (text, for difficulty levels)
    - Add `published` column to lessons (boolean, default true)

  2. Important Notes
    - These fields enable the organized curriculum structure
    - Module name groups lessons together in collapsible sections
    - Level indicates Beginner/Intermediate/Advanced
    - Published flag allows hiding lessons from students
*/

-- Add new columns to lessons table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lessons' AND column_name = 'module_name'
  ) THEN
    ALTER TABLE lessons ADD COLUMN module_name TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lessons' AND column_name = 'level'
  ) THEN
    ALTER TABLE lessons ADD COLUMN level TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lessons' AND column_name = 'published'
  ) THEN
    ALTER TABLE lessons ADD COLUMN published BOOLEAN DEFAULT true;
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lessons_module_name ON lessons(module_name);
CREATE INDEX IF NOT EXISTS idx_lessons_level ON lessons(level);
CREATE INDEX IF NOT EXISTS idx_lessons_published ON lessons(published);
