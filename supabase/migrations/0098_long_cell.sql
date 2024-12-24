-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own summaries" ON knowledge_summaries;
DROP POLICY IF EXISTS "Users can manage their own highlights" ON knowledge_highlights;
DROP POLICY IF EXISTS "Users can manage their own topics" ON knowledge_topics;
DROP POLICY IF EXISTS "Users can manage their own notes" ON knowledge_notes;

-- Create improved RLS policies with better security
CREATE POLICY "Users can manage their own summaries"
  ON knowledge_summaries
  FOR ALL
  USING (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM knowledge_categories kc
      WHERE kc.id = category_id AND kc.user_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM knowledge_categories kc
      WHERE kc.id = category_id AND kc.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own highlights"
  ON knowledge_highlights
  FOR ALL
  USING (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM knowledge_categories kc
      WHERE kc.id = category_id AND kc.user_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM knowledge_categories kc
      WHERE kc.id = category_id AND kc.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own topics"
  ON knowledge_topics
  FOR ALL
  USING (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM knowledge_categories kc
      WHERE kc.id = category_id AND kc.user_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM knowledge_categories kc
      WHERE kc.id = category_id AND kc.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own notes"
  ON knowledge_notes
  FOR ALL
  USING (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM knowledge_categories kc
      WHERE kc.id = category_id AND kc.user_id = auth.uid()
    )
  )
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM knowledge_categories kc
      WHERE kc.id = category_id AND kc.user_id = auth.uid()
    )
  );