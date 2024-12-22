import { supabase } from '../lib/supabase';

export const getVideoKeyMoments = async (videoId: string) => {
  const { data, error } = await supabase
    .from('key_moments')
    .select('*')
    .eq('video_id', videoId)
    .order('timestamp');

  if (error) {
    console.error('Error fetching key moments:', error);
    return [];
  }

  return data;
};

export const getVideoTranscript = async (videoId: string) => {
  const { data, error } = await supabase
    .from('transcripts')
    .select('*')
    .eq('video_id', videoId)
    .order('time');

  if (error) {
    console.error('Error fetching transcript:', error);
    return [];
  }

  return data;
};

export const getVideoTopics = async (videoId: string) => {
  const { data, error } = await supabase
    .from('topics')
    .select('*')
    .eq('video_id', videoId)
    .order('relevance', { ascending: false });

  if (error) {
    console.error('Error fetching topics:', error);
    return [];
  }

  return data;
};