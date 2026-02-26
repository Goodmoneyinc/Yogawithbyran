/*
  # Create LMS Schema for Full Learning Management System

  ## New Tables Created
  
  1. **user_roles** - Manages user roles and permissions
     - `id` (bigint, primary key, auto-increment)
     - `user_id` (uuid, references auth.users, unique)
     - `role` (text, default: 'student') - Can be 'student', 'admin', or 'owner'
     - `created_at` (timestamptz, default: now())
     - `updated_at` (timestamptz, default: now())
  
  2. **modules** - Course module organization
     - `id` (bigint, primary key, auto-increment)
     - `title` (text, required)
     - `description` (text, nullable)
     - `order_index` (integer, required) - Controls display order
     - `published` (boolean, default: false)
     - `created_at` (timestamptz, default: now())
     - `updated_at` (timestamptz, default: now())
  
  3. **videos** - Individual video content
     - `id` (bigint, primary key, auto-increment)
     - `module_id` (bigint, references modules)
     - `title` (text, required)
     - `description` (text, nullable)
     - `mux_playback_id` (text, required) - Mux video playback ID
     - `mux_asset_id` (text, required) - Mux asset ID for management
     - `duration` (integer, nullable) - Video duration in seconds
     - `order_index` (integer, required) - Order within module
     - `published` (boolean, default: false)
     - `created_at` (timestamptz, default: now())
     - `updated_at` (timestamptz, default: now())
  
  4. **user_progress** - Tracks student video completion
     - `id` (bigint, primary key, auto-increment)
     - `user_id` (uuid, references auth.users)
     - `video_id` (bigint, references videos)
     - `completed` (boolean, default: false)
     - `last_position` (integer, default: 0) - Last watched position in seconds
     - `completion_percentage` (integer, default: 0) - 0-100
     - `completed_at` (timestamptz, nullable)
     - `created_at` (timestamptz, default: now())
     - `updated_at` (timestamptz, default: now())
     - UNIQUE constraint on (user_id, video_id)

  ## Security (Row Level Security)
  
  All tables have RLS enabled with appropriate policies:
  
  - **user_roles**: Users can view their own role, admins can manage all roles
  - **modules**: Public read for published modules, admin write access
  - **videos**: Public read for published videos, admin write access  
  - **user_progress**: Users can view/update their own progress only
  
  ## Indexes
  
  Created for optimal query performance:
  - user_roles: user_id
  - modules: order_index
  - videos: module_id, order_index
  - user_progress: user_id, video_id, completed status
*/

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin', 'owner')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own role"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Admins can view all roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can insert roles"
  ON user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can update roles"
  ON user_roles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published modules"
  ON modules
  FOR SELECT
  TO authenticated
  USING (published = true);

CREATE POLICY "Admins can view all modules"
  ON modules
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can insert modules"
  ON modules
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can update modules"
  ON modules
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can delete modules"
  ON modules
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  module_id bigint REFERENCES modules(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  mux_playback_id text NOT NULL,
  mux_asset_id text NOT NULL,
  duration integer,
  order_index integer NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published videos"
  ON videos
  FOR SELECT
  TO authenticated
  USING (published = true);

CREATE POLICY "Admins can view all videos"
  ON videos
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can insert videos"
  ON videos
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can update videos"
  ON videos
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

CREATE POLICY "Admins can delete videos"
  ON videos
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = (select auth.uid())
      AND role IN ('admin', 'owner')
    )
  );

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  video_id bigint REFERENCES videos(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  last_position integer DEFAULT 0,
  completion_percentage integer DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, video_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert their own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update their own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_modules_order ON modules(order_index);
CREATE INDEX IF NOT EXISTS idx_videos_module_id ON videos(module_id);
CREATE INDEX IF NOT EXISTS idx_videos_order ON videos(order_index);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_video_id ON user_progress(video_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed ON user_progress(completed);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_roles_updated_at') THEN
    CREATE TRIGGER update_user_roles_updated_at
      BEFORE UPDATE ON user_roles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_modules_updated_at') THEN
    CREATE TRIGGER update_modules_updated_at
      BEFORE UPDATE ON modules
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_videos_updated_at') THEN
    CREATE TRIGGER update_videos_updated_at
      BEFORE UPDATE ON videos
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_progress_updated_at') THEN
    CREATE TRIGGER update_user_progress_updated_at
      BEFORE UPDATE ON user_progress
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
