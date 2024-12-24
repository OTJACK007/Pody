-- Add missing indexes
CREATE INDEX IF NOT EXISTS idx_knowledge_summaries_user_category ON knowledge_summaries(user_id, category_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_highlights_user_category ON knowledge_highlights(user_id, category_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_topics_user_category ON knowledge_topics(user_id, category_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_notes_user_category ON knowledge_notes(user_id, category_id);

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Users can manage their own summaries" ON knowledge_summaries;
DROP POLICY IF EXISTS "Users can manage their own highlights" ON knowledge_highlights;
DROP POLICY IF EXISTS "Users can manage their own topics" ON knowledge_topics;
DROP POLICY IF EXISTS "Users can manage their own notes" ON knowledge_notes;

-- Create improved RLS policies
CREATE POLICY "Users can manage their own summaries"
  ON knowledge_summaries
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own highlights"
  ON knowledge_highlights
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own topics"
  ON knowledge_topics
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own notes"
  ON knowledge_notes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add foreign key constraints if missing
DO $$ BEGIN
  ALTER TABLE knowledge_summaries 
    ADD CONSTRAINT fk_knowledge_summaries_category 
    FOREIGN KEY (category_id) 
    REFERENCES knowledge_categories(id) 
    ON DELETE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE knowledge_highlights
    ADD CONSTRAINT fk_knowledge_highlights_category
    FOREIGN KEY (category_id)
    REFERENCES knowledge_categories(id)
    ON DELETE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE knowledge_topics
    ADD CONSTRAINT fk_knowledge_topics_category
    FOREIGN KEY (category_id)
    REFERENCES knowledge_categories(id)
    ON DELETE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE knowledge_notes
    ADD CONSTRAINT fk_knowledge_notes_category
    FOREIGN KEY (category_id)
    REFERENCES knowledge_categories(id)
    ON DELETE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;