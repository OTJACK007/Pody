import { supabase } from '../lib/supabase';

export interface Feature {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  requested_at: Date;
  development_progress: number;
  expected_release: string | null;
  subfeatures: string[];
  votes_up: number;
  votes_down: number;
  status: 'inbox' | 'collectingvotes' | 'upcoming' | 'published';
  created_by: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateFeatureInput {
  title: string;
  subtitle: string;
  description: string;
  status: Feature['status'];
  created_by: string;
}

export const createFeature = async (feature: CreateFeatureInput): Promise<string> => {
  const { data, error } = await supabase
    .from('features')
    .insert([{
      ...feature,
      requested_at: new Date(),
      development_progress: 0,
      votes_up: 0,
      votes_down: 0,
      subfeatures: []
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating feature:', error);
    throw error;
  }

  return data.id;
};

export const fetchFeatures = async (status: Feature['status']): Promise<Feature[]> => {
  const { data, error } = await supabase
    .from('features')
    .select('*')
    .eq('status', status)
    .order('requested_at', { ascending: false });

  if (error) {
    console.error('Error fetching features:', error);
    throw error;
  }

  return data || [];
};

export const suggestFeature = async (feature: { 
  title: string; 
  subtitle: string; 
  description: string; 
  status: Feature['status']; 
  created_by: string;
}): Promise<Feature> => {
  const { data, error } = await supabase
    .from('features')
    .insert([{
      ...feature,
      requested_at: new Date(),
      development_progress: 0,
      votes_up: 0,
      votes_down: 0,
      subfeatures: []
    }])
    .select()
    .single();

  if (error) {
    console.error('Error suggesting feature:', error);
    throw error;
  }

  return data;
};

export const updateExistingFeature = async (id: string, updates: Partial<Feature>): Promise<void> => {
  const { error } = await supabase
    .from('features')
    .update({
      ...updates,
      updated_at: new Date()
    })
    .eq('id', id);

  if (error) {
    console.error('Error updating feature:', error);
    throw error;
  }
};

export const submitVote = async (featureId: string, userId: string, voteType: 'up' | 'down'): Promise<void> => {
  const { data: existingVote } = await supabase
    .from('feature_votes')
    .select('vote_type')
    .eq('feature_id', featureId)
    .eq('user_id', userId)
    .single();

  if (existingVote) {
    // Remove previous vote
    await supabase
      .from('features')
      .update({
        [`votes_${existingVote.vote_type}`]: supabase.sql`${`votes_${existingVote.vote_type}`} - 1`
      })
      .eq('id', featureId);

    await supabase
      .from('feature_votes')
      .delete()
      .eq('feature_id', featureId)
      .eq('user_id', userId);
  }

  // Add new vote
  await supabase
    .from('feature_votes')
    .insert([{
      feature_id: featureId,
      user_id: userId,
      vote_type: voteType
    }]);

  await supabase
    .from('features')
    .update({
      [`votes_${voteType}`]: supabase.sql`${`votes_${voteType}`} + 1`,
      updated_at: new Date()
    })
    .eq('id', featureId);
};

export const moveFeatureToDestination = async (featureId: string, status: Feature['status']): Promise<void> => {
  const { error } = await supabase
    .from('features')
    .update({
      status,
      updated_at: new Date()
    })
    .eq('id', featureId);

  if (error) {
    console.error('Error moving feature:', error);
    throw error;
  }
};

export const publishFeatureToProduction = async (featureId: string): Promise<void> => {
  const { error } = await supabase
    .from('features')
    .update({
      status: 'published',
      development_progress: 100,
      updated_at: new Date()
    })
    .eq('id', featureId);

  if (error) {
    console.error('Error publishing feature:', error);
    throw error;
  }
};

export const loadTemplateFeatures = async (): Promise<void> => {
  const templateFeatures = [
    {
      title: 'AI-Powered Summaries',
      subtitle: 'Get instant podcast insights',
      description: 'Get instant, accurate summaries of any podcast episode using advanced AI technology',
      development_progress: 100,
      expected_release: 'Released',
      subfeatures: [
        'Smart content analysis',
        'Multi-language support',
        'Key points extraction'
      ],
      status: 'published',
      created_by: 'system'
    },
    {
      title: 'Cross-Platform Sync',
      subtitle: 'Seamless device integration',
      description: 'Seamlessly sync your content and preferences across all your devices',
      development_progress: 75,
      expected_release: 'Q2 2024',
      subfeatures: [
        'Real-time synchronization',
        'Offline support',
        'Cross-device compatibility'
      ],
      status: 'upcoming',
      created_by: 'system'
    }
  ];

  const { error } = await supabase
    .from('features')
    .insert(templateFeatures);

  if (error) {
    console.error('Error loading template features:', error);
    throw error;
  }
};