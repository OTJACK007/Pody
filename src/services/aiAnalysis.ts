import { supabase } from '../lib/supabase';

export interface AIAnalysis {
  id: string;
  video_id: string;
  key_takeaways: string[];
  content_quality: {
    insightDepth: number;
    actionability: number;
    relevance: number;
    clarity: number;
  };
  recommendations: string[];
  created_at?: string;
  updated_at?: string;
}

export const getVideoAIAnalysis = async (videoId: string): Promise<AIAnalysis | null> => {
  const { data, error } = await supabase
    .from('ai_analysis')
    .select('*')
    .eq('video_id', videoId)
    .single();

  if (error) {
    console.error('Error fetching AI analysis:', error);
    // Return default structure if no analysis exists
    return {
      id: '',
      video_id: videoId,
      key_takeaways: [],
      content_quality: {
        insightDepth: 0,
        actionability: 0,
        relevance: 0,
        clarity: 0
      },
      recommendations: []
    };
  }

  return data;
};

export const updateVideoAIAnalysis = async (videoId: string, analysis: Partial<AIAnalysis>): Promise<AIAnalysis | null> => {
  const { data, error } = await supabase
    .from('ai_analysis')
    .upsert([{
      video_id: videoId,
      ...analysis,
      updated_at: new Date().toISOString()
    }], {
      onConflict: 'video_id'
    })
    .select()
    .single();

  if (error) {
    console.error('Error updating AI analysis:', error);
    return null;
  }

  return data;
};