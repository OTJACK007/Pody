import { supabase } from '../lib/supabase';

export interface Feature {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'review' | 'ready';
  stage?: string;
  quarter?: string;
  progress: number;
  expected_date?: string;
  features: string[];
  votes: {
    up: number;
    down: number;
    users: Record<string, 'up' | 'down'>;
  };
  category: string;
  requested_by: string;
  requested_date: Date;
  destination: 'upcoming' | 'suggested' | 'maybe' | 'collecting';
  published_date?: Date;
  last_modified: Date;
  modified_by: string;
}

export const fetchFeatures = async (destination: string): Promise<Feature[]> => {
  const { data, error } = await supabase
    .from('features')
    .select('*')
    .eq('destination', destination)
    .order('last_modified', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createFeature = async (feature: Omit<Feature, 'id'>): Promise<string> => {
  const { data, error } = await supabase
    .from('features')
    .insert([feature])
    .select()
    .single();

  if (error) throw error;
  return data.id;
};

export const updateFeature = async (id: string, updates: Partial<Feature>): Promise<void> => {
  const { error } = await supabase
    .from('features')
    .update({ ...updates, last_modified: new Date() })
    .eq('id', id);

  if (error) throw error;
};

export const submitVote = async (featureId: string, userId: string, voteType: 'up' | 'down'): Promise<void> => {
  const { data: feature, error: fetchError } = await supabase
    .from('features')
    .select('votes')
    .eq('id', featureId)
    .single();

  if (fetchError) throw fetchError;

  const votes = feature.votes;
  const previousVote = votes.users[userId];

  // Remove previous vote if exists
  if (previousVote) {
    votes[previousVote]--;
    delete votes.users[userId];
  }

  // Add new vote
  votes[voteType]++;
  votes.users[userId] = voteType;

  const { error: updateError } = await supabase
    .from('features')
    .update({ 
      votes,
      last_modified: new Date()
    })
    .eq('id', featureId);

  if (updateError) throw updateError;
};

export const moveFeatureToDestination = async (
  featureId: string, 
  destination: Feature['destination']
): Promise<void> => {
  const { error } = await supabase
    .from('features')
    .update({ 
      destination,
      last_modified: new Date()
    })
    .eq('id', featureId);

  if (error) throw error;
};

export const publishFeature = async (featureId: string): Promise<void> => {
  const { error } = await supabase
    .from('features')
    .update({ 
      published_date: new Date(),
      last_modified: new Date()
    })
    .eq('id', featureId);

  if (error) throw error;
};

export const updateExistingFeature = async (id: string, updates: Partial<Feature>): Promise<void> => {
  const { error } = await supabase
    .from('features')
    .update({ ...updates, last_modified: new Date() })
    .eq('id', id);

  if (error) throw error;
};

export const publishFeatureToProduction = async (featureId: string): Promise<void> => {
  const { error } = await supabase
    .from('features')
    .update({ 
      published_date: new Date(),
      last_modified: new Date(),
      status: 'published'
    })
    .eq('id', featureId);

  if (error) throw error;
};

export const loadTemplateFeatures = async (): Promise<void> => {
  const templateFeatures = [
    {
      title: 'AI-Powered Summaries',
      description: 'Get instant, accurate summaries of any podcast episode using advanced AI technology',
      status: 'published',
      progress: 100,
      features: [
        'Smart content analysis',
        'Multi-language support',
        'Key points extraction'
      ],
      category: 'AI & Machine Learning',
      requested_by: 'system',
      destination: 'published',
      votes: { up: 0, down: 0, users: {} }
    },
    {
      title: 'Cross-Platform Sync',
      description: 'Seamlessly sync your content and preferences across all your devices',
      status: 'development',
      progress: 75,
      features: [
        'Real-time synchronization',
        'Offline support',
        'Cross-device compatibility'
      ],
      category: 'User Experience',
      requested_by: 'system',
      destination: 'upcoming',
      votes: { up: 0, down: 0, users: {} }
    }
  ];

  const { error } = await supabase
    .from('features')
    .insert(templateFeatures.map(feature => ({
      ...feature,
      requested_date: new Date(),
      last_modified: new Date(),
      modified_by: 'system'
    })));

  if (error) throw error;
};