-- Create notion_connections table
CREATE TABLE IF NOT EXISTS notion_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  access_token text NOT NULL,
  workspace_id text NOT NULL,
  workspace_name text,
  bot_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create notion_pages table
CREATE TABLE IF NOT EXISTS notion_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  notion_page_id text NOT NULL,
  title text NOT NULL,
  icon text,
  last_edited timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, notion_page_id)
);

-- Enable RLS
ALTER TABLE notion_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE notion_pages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage their own Notion connections"
  ON notion_connections
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own Notion pages"
  ON notion_pages
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER set_timestamp_notion_connections
  BEFORE UPDATE ON notion_connections
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_timestamp_notion_pages  
  BEFORE UPDATE ON notion_pages
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();