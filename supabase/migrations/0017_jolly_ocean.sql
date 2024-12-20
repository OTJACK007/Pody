/*
  # Create Features Table

  1. New Tables
    - `features`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text)
      - `description` (text) 
      - `requested_at` (timestamptz)
      - `development_progress` (integer)
      - `expected_release` (text)
      - `subfeatures` (text[])
      - `votes_up` (integer)
      - `votes_down` (integer)
      - `status` (enum)
      - `created_by` (uuid)

  2. Security
    - Enable RLS
    - Add policies for viewing and voting
*/

-- Create feature status enum
CREATE TYPE feature_status AS ENUM ('collectingvotes', 'upcoming', 'published', 'inbox');

-- Create features table
CREATE TABLE IF NOT EXISTS features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text NOT NULL,
  requested_at timestamptz DEFAULT now(),
  development_progress integer DEFAULT 0,
  expected_release text,
  subfeatures text[] DEFAULT '{}',
  votes_up integer DEFAULT 0,
  votes_down integer DEFAULT 0,
  status feature_status DEFAULT 'inbox',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create feature_votes table to track user votes
CREATE TABLE IF NOT EXISTS feature_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_id uuid REFERENCES features(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type text NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(feature_id, user_id)
);

-- Enable RLS
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_votes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Features are viewable by everyone"
  ON features FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can suggest features"
  ON features FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can vote on features"
  ON feature_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can change their votes"
  ON feature_votes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON features
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();