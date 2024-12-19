import { supabase } from '../lib/supabase';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  status: 'active' | 'completed' | 'upcoming';
  startDate: Date;
  dueDate: Date;
  completedDate?: Date;
  linkedContent: LinkedContent[];
}

export interface LinkedContent {
  id: string;
  contentType: string;
  title: string;
  sourceUrl?: string;
  thumbnailUrl?: string;
}

export const createGoal = async (goal: Omit<Goal, 'id' | 'linkedContent'>) => {
  const { data, error } = await supabase
    .from('goals')
    .insert([{
      title: goal.title,
      description: goal.description,
      category: goal.category,
      progress: goal.progress,
      status: goal.status,
      start_date: goal.startDate,
      due_date: goal.dueDate
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateGoal = async (goalId: string, updates: Partial<Goal>) => {
  const { error } = await supabase
    .from('goals')
    .update({
      title: updates.title,
      description: updates.description,
      category: updates.category,
      progress: updates.progress,
      status: updates.status,
      due_date: updates.dueDate,
      updated_at: new Date()
    })
    .eq('id', goalId);

  if (error) throw error;
};

export const updateGoalProgress = async (
  goalId: string,
  progress: number,
  notes?: string
) => {
  const { error } = await supabase
    .rpc('update_goal_progress', {
      p_goal_id: goalId,
      p_progress: progress,
      p_notes: notes
    });

  if (error) throw error;
};

export const linkContentToGoal = async (
  goalId: string,
  content: Omit<LinkedContent, 'id'>
) => {
  const { error } = await supabase
    .from('goal_linked_content')
    .insert([{
      goal_id: goalId,
      content_type: content.contentType,
      title: content.title,
      source_url: content.sourceUrl,
      thumbnail_url: content.thumbnailUrl
    }]);

  if (error) throw error;
};

export const getGoals = async (status?: string) => {
  let query = supabase
    .from('goals')
    .select(`
      *,
      goal_linked_content (*)
    `);

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getGoalById = async (goalId: string) => {
  const { data, error } = await supabase
    .from('goals')
    .select(`
      *,
      goal_linked_content (*)
    `)
    .eq('id', goalId)
    .single();

  if (error) throw error;
  return data;
};

export const deleteGoal = async (goalId: string) => {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', goalId);

  if (error) throw error;
};