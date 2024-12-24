-- Create knowledge categories table
CREATE TABLE IF NOT EXISTS knowledge_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  image text,
  notes_count integer DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create knowledge notes table
CREATE TABLE IF NOT EXISTS knowledge_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES knowledge_categories ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text,
  source_type text,
  source_title text,
  source_url text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE knowledge_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_notes ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX idx_knowledge_categories_user_id ON knowledge_categories(user_id);
CREATE INDEX idx_knowledge_categories_name ON knowledge_categories(name);
CREATE INDEX idx_knowledge_notes_category_id ON knowledge_notes(category_id);
CREATE INDEX idx_knowledge_notes_user_id ON knowledge_notes(user_id);
CREATE INDEX idx_knowledge_notes_tags ON knowledge_notes USING gin(tags);

-- Create RLS policies for knowledge_categories
CREATE POLICY "Users can view their own categories"
  ON knowledge_categories FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own categories"
  ON knowledge_categories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories"
  ON knowledge_categories FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories"
  ON knowledge_categories FOR DELETE
  USING (auth.uid() = user_id);

-- Create RLS policies for knowledge_notes
CREATE POLICY "Users can view their own notes"
  ON knowledge_notes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes"
  ON knowledge_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes"
  ON knowledge_notes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes"
  ON knowledge_notes FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update notes count
CREATE OR REPLACE FUNCTION update_category_notes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE knowledge_categories
    SET notes_count = notes_count + 1,
        last_updated = now()
    WHERE id = NEW.category_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE knowledge_categories
    SET notes_count = notes_count - 1,
        last_updated = now()
    WHERE id = OLD.category_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for notes count
CREATE TRIGGER update_notes_count
  AFTER INSERT OR DELETE ON knowledge_notes
  FOR EACH ROW
  EXECUTE FUNCTION update_category_notes_count();

-- Create function to search categories
CREATE OR REPLACE FUNCTION search_knowledge_categories(
  search_query text,
  user_id uuid
)
RETURNS SETOF knowledge_categories
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM knowledge_categories
  WHERE user_id = search_knowledge_categories.user_id
  AND (
    search_query IS NULL
    OR name ILIKE '%' || search_query || '%'
    OR description ILIKE '%' || search_query || '%'
  )
  ORDER BY last_updated DESC;
END;
$$;