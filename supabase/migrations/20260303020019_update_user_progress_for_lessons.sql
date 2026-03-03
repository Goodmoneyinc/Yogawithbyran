/*
  # Update User Progress Table for Lessons

  1. Schema Changes
    - Add `lesson_id` column to track progress for lessons (UUID reference)
    - Keep existing `video_id` for backward compatibility
    - Update unique constraint to include lesson_id
    - Add index for better query performance

  2. Important Notes
    - This migration supports both the old modules/videos structure and new courses/lessons structure
    - RLS policies will automatically apply to the new column
*/

-- Add lesson_id column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_progress' AND column_name = 'lesson_id'
  ) THEN
    ALTER TABLE user_progress ADD COLUMN lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_lesson ON user_progress(user_id, lesson_id);

-- Drop old unique constraint if it exists and create new one
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'user_progress_user_id_video_id_key'
  ) THEN
    ALTER TABLE user_progress DROP CONSTRAINT user_progress_user_id_video_id_key;
  END IF;
END $$;

-- Add composite unique constraint for lesson tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'user_progress_user_id_lesson_id_key'
  ) THEN
    ALTER TABLE user_progress ADD CONSTRAINT user_progress_user_id_lesson_id_key UNIQUE (user_id, lesson_id);
  END IF;
END $$;
