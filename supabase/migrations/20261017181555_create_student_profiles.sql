/*
# Create student_profiles table

1. New Tables
- `student_profiles`
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text, full name of the student)
  - `phone` (text, contact phone number)
  - `program` (text, the course/program the student is enrolling in)
  - `education_level` (text, highest education attained)
  - `bio` (text, optional short biography)
  - `created_at` (timestamptz, defaults to now)
  - `updated_at` (timestamptz, defaults to now)

2. Security
- Enable RLS on `student_profiles`.
- Owner-scoped CRUD: each authenticated student can only access their own profile row.
- The id column defaults to auth.uid() so inserts that omit it still satisfy the WITH CHECK.
*/

CREATE TABLE IF NOT EXISTS student_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE DEFAULT auth.uid(),
  full_name text NOT NULL,
  phone text,
  program text,
  education_level text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON student_profiles;
CREATE POLICY "select_own_profile" ON student_profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON student_profiles;
CREATE POLICY "insert_own_profile" ON student_profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON student_profiles;
CREATE POLICY "update_own_profile" ON student_profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON student_profiles;
CREATE POLICY "delete_own_profile" ON student_profiles
  FOR DELETE TO authenticated USING (auth.uid() = id);
