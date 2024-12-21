/*
  # Create userchannels table
  
  1. New Tables
    - userchannels
      - id (uuid, primary key)
      - channel_id (uuid)
      - user_id (uuid, references auth.users)
      - banner_image (text)
      - profile_image (text)
      - channel_name (text)
      - youtube_link (text)
      - created_at (timestamp)
      - updated_at (timestamp)
  
  2. Security
    - Enable RLS
    - Add policies for user access
*/

-- Create userchannels table
CREATE TABLE IF NOT EXISTS userchannels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id uuid DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  banner_image text,
  profile_image text,
  channel_name text NOT NULL,
  youtube_link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE userchannels ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own channel"
  ON userchannels
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own channel"
  ON userchannels
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own channel"
  ON userchannels
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_userchannels_updated_at
  BEFORE UPDATE ON userchannels
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();