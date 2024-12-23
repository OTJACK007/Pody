import { supabase } from '../lib/supabase';
import type { Video } from '../types/video';

export const searchVideos = async (
  query: string,
  category?: string,
  type?: 'video' | 'short'
): Promise<Video[]> => {
  try {
    const { data, error } = await supabase.rpc('search_videos', {
      search_query: query,
      category_filter: category,
      type_filter: type
    });

    if (error) throw error;

    return data.map((video: any) => ({
      ...video,
      channel: {
        name: video.channel_name,
        avatar: video.channel_avatar
      }
    }));
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};