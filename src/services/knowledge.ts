import { supabase } from '../lib/supabase';
import type { KnowledgeCategory, KnowledgeNote, KnowledgeSummary, KnowledgeHighlight, KnowledgeTopic } from '../types/knowledge';

// Category operations
export const searchCategories = async (query: string): Promise<KnowledgeCategory[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase.rpc('search_knowledge_categories', { 
    search_query: query,
    search_user_id: user.id 
  });

  if (error) throw error;
  return data;
};

export const getCategoryById = async (id: string): Promise<KnowledgeCategory | null> => {
  const { data, error } = await supabase
    .from('knowledge_categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createCategory = async (
  name: string,
  description?: string,
  image?: string
): Promise<KnowledgeCategory> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('knowledge_categories')
    .insert([{
      name,
      description,
      image,
      user_id: user.id,
      notes_count: 0,
      last_updated: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateCategory = async (
  id: string,
  updates: Partial<KnowledgeCategory>
): Promise<KnowledgeCategory> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Add updated_at timestamp
  updates.last_updated = new Date().toISOString();

  const { data, error } = await supabase
    .from('knowledge_categories')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user owns the category
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('knowledge_categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Content operations
export const getCategoryContent = async (categoryId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const [summariesResult, highlightsResult, topicsResult, notesResult] = await Promise.all([
    supabase
      .from('knowledge_summaries')
      .select('*')
      .eq('category_id', categoryId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('knowledge_highlights')
      .select('*')
      .eq('category_id', categoryId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase
      .from('knowledge_topics')
      .select('*')
      .eq('category_id', categoryId)
      .eq('user_id', user.id)
      .order('relevance', { ascending: false }),
    supabase
      .from('knowledge_notes')
      .select('*')
      .eq('category_id', categoryId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
  ]);

  if (summariesResult.error) throw summariesResult.error;
  if (highlightsResult.error) throw highlightsResult.error;
  if (topicsResult.error) throw topicsResult.error;
  if (notesResult.error) throw notesResult.error;

  return {
    summaries: summariesResult.data || [],
    highlights: highlightsResult.data || [],
    topics: topicsResult.data || [],
    notes: notesResult.data || []
  };
};

// Export operations
export const exportVideoToKnowledge = async (
  videoId: string,
  categoryId: string,
  sections: string[]
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .rpc('export_video_to_knowledge', {
        video_id: videoId,
        category_id: categoryId,
        sections: sections
      });

    if (data?.error) {
      console.error('Export failed:', data.message);
      throw new Error(data.message);
    }

    return true;
  } catch (error) {
    console.error('Error exporting video:', error);
    return false;
  }
};