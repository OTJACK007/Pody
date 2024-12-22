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
}

export const getVideoAIAnalysis = async (videoId: string): Promise<AIAnalysis | null> => {
  const { data, error } = await supabase
    .from('ai_analysis')
    .select('*')
    .eq('video_id', videoId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching AI analysis:', error);
    return null;
  }
  
  // Return default values if no analysis exists
  if (!data) {
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