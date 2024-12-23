import { supabase } from '../lib/supabase';
import { getVideoAIAnalysis } from './aiAnalysis';
import type { Video, Insight, KeyMoment, Transcript, Topic, FullContent, RelatedContent } from '../types/video';

// Get video by ID with all metadata
export const getVideoWithMetadata = async (videoId: string): Promise<{
  video: Video;
  insights: Insight[];
  keyMoments: KeyMoment[];
  transcript: Transcript[];
  topics: Topic[];
  fullContent: FullContent;
  relatedVideos: Video[];
} | null> => {
  try {
    const [
      { data: video },
      { data: insights },
      { data: keyMoments },
      { data: transcriptData },
      { data: topics },
      { data: fullContentData },
      { data: relatedContent },
      aiAnalysis
    ] = await Promise.all([
      supabase.from('videos').select('*').eq('id', videoId).single(),
      supabase.from('insights').select('*').eq('video_id', videoId),
      supabase.from('key_moments').select('*').eq('video_id', videoId),
      supabase.from('transcripts_json').select('content').eq('video_id', videoId).single(),
      supabase.from('topics').select('*').eq('video_id', videoId),
      supabase.from('full_content').select('*').eq('video_id', videoId),
      supabase.from('related_content')
        .select('*, related_video:videos!related_video_id(*)')
        .eq('video_id', videoId),
      getVideoAIAnalysis(videoId)
    ]);

    if (!video) return null;
    
    // Get the most recent full content entry if multiple exist
    const fullContent = fullContentData && fullContentData.length > 0 
      ? fullContentData.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )[0]
      : null;

    return {
      video,
      insights: insights || [],
      keyMoments: keyMoments || [],
      transcript: transcriptData?.content || [],
      topics: topics || [],
      fullContent,
      relatedVideos: relatedContent?.map(rc => rc.related_video) || [],
      aiAnalysis
    };
  } catch (error) {
    console.error('Error fetching video metadata:', error);
    return null;
  }
};

// Get user's videos
export const getUserVideos = async (userId: string, type?: 'video' | 'short'): Promise<Video[]> => {
  let query = supabase
    .from('videos')
    .select('*')
    .eq('publisher_id', userId)
    .order('publish_date', { ascending: false });

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching user videos:', error);
    return [];
  }

  return data;
};

// Get public videos with optional category filter
export const getPublicVideos = async (category?: string): Promise<Video[]> => {
  try {
    let query = supabase
      .from('videos')
      .select(`
        *,
        channel:userchannels!inner(
          channel_name,
          profile_image
        )
      `)
      .eq('status', 'public')
      .order('publish_date', { ascending: false });

    if (category && category !== 'Trending') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(video => ({
      ...video,
      channel: {
        name: video.channel?.channel_name || 'Unknown Channel',
        avatar: video.channel?.profile_image || "https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png"
      }
    }));
  } catch (error) {
    console.error('Error fetching public videos:', error);
    return [];
  }
};

// Get public shorts with optional category filter
export const getPublicShorts = async (category?: string): Promise<Video[]> => {
  try {
    let query = supabase
      .from('videos')
      .select(`
        *,
        channel:userchannels!inner(
          channel_name,
          profile_image
        )
      `)
      .eq('status', 'public')
      .eq('type', 'short')
      .order('publish_date', { ascending: false });
      
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;

    if (error) throw error;

    return data.map(video => ({
      ...video,
      channel: {
        name: video.channel?.channel_name || 'Unknown Channel',
        avatar: video.channel?.profile_image || "https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png"
      }
    }));
  } catch (error) {
    console.error('Error fetching public shorts:', error);
    return [];
  }
};

// Get filtered videos
export const getFilteredVideos = async (
  userId: string,
  filters: {
    type?: 'video' | 'short';
    status?: 'private' | 'public' | 'unlisted';
    search?: string;
    date?: string;
    duration?: string;
  }
): Promise<Video[]> => {
  let query = supabase
    .from('videos')
    .select('*')
    .eq('publisher_id', userId)
    .order('publish_date', { ascending: false });

  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  // Date filter
  if (filters.date) {
    const now = new Date();
    switch (filters.date) {
      case 'today':
        query = query.gte('publish_date', new Date(now.setHours(0,0,0,0)).toISOString());
        break;
      case 'week':
        query = query.gte('publish_date', new Date(now.setDate(now.getDate() - 7)).toISOString());
        break;
      case 'month':
        query = query.gte('publish_date', new Date(now.setMonth(now.getMonth() - 1)).toISOString());
        break;
      case 'year':
        query = query.gte('publish_date', new Date(now.setFullYear(now.getFullYear() - 1)).toISOString());
        break;
    }
  }

  // Duration filter
  if (filters.duration) {
    switch (filters.duration) {
      case 'short':
        query = query.lte('duration', '05:00');
        break;
      case 'medium':
        query = query.gt('duration', '05:00').lte('duration', '20:00');
        break;
      case 'long':
        query = query.gt('duration', '20:00');
        break;
    }
  }
  const { data, error } = await query;

  if (error) {
    console.error('Error fetching filtered videos:', error);
    return [];
  }

  return data;
};

// Update video status
export const updateVideoStatus = async (
  videoId: string,
  status: 'private' | 'public' | 'unlisted'
): Promise<Video | null> => {
  const { data, error } = await supabase
    .from('videos')
    .update({ status })
    .eq('id', videoId)
    .select()
    .single();

  if (error) {
    console.error('Error updating video status:', error);
    return null;
  }

  return data;
};

// Delete video
export const deleteVideo = async (videoId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', videoId);

  if (error) {
    console.error('Error deleting video:', error);
    return false;
  }

  return true;
};

// Upload video file
export const uploadVideo = async (
  userId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(fileName, file, {
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading video:', error);
    return null;
  }
};

// Upload thumbnail
export const uploadThumbnail = async (
  userId: string,
  file: File
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/thumbnails/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(fileName, file, {
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    return null;
  }
};

// Increment video views
export const incrementViews = async (videoId: string): Promise<void> => {
  const { error } = await supabase.rpc('increment_video_views', {
    video_id: videoId
  });

  if (error) {
    console.error('Error incrementing views:', error);
  }
};

export const updateVideo = async (videoId: string, updates: Partial<Video>): Promise<Video | null> => {
  // Add updated_at timestamp
  const updatedData = {
    ...updates,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('videos')
    .update(updatedData)
    .eq('id', videoId)
    .select()
    .single();

  if (error) {
    console.error('Error updating video:', error);
    return null;
  }

  return data;
};

// Video metadata operations
export const getVideo = async (videoId: string) => {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select(`
        *,
        channel:userchannels!inner(
          channel_name,
          profile_image
        )
      `)
      .eq('id', videoId)
      .single();

    if (error) throw error;

    return {
      ...data,
      channel: {
        name: data.channel?.channel_name || 'Unknown Channel',
        avatar: data.channel?.profile_image || "https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png"
      },
      relatedVideos: await getRelatedVideos(videoId)
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
};

const getRelatedVideos = async (videoId: string) => {
  try {
    const { data, error } = await supabase
      .rpc('get_video_relationships')
      .eq('video_id', videoId)
      .single();

    if (error) throw error;

    return data?.related_videos || [];
  } catch (error) {
    console.error('Error fetching related videos:', error);
    return [];
  }
};

// Search videos
export const searchVideos = async (
  query: string,
  category?: string,
  type?: 'video' | 'short'
): Promise<Video[]> => {
  try {
    const { data, error } = await supabase.rpc('search_videos', {
      search_query: query || '',
      category_filter: category || null,
      type_filter: type || null
    });

    if (error) throw error;
    if (!data) return [];

    return data.map((video: any) => ({
      ...video,
      channel: {
        name: video.channel_name || 'Unknown Channel',
        avatar: video.channel_avatar || 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png',
        verified: video.channel_is_verified || false
      }
    }));
  } catch (error) {
    console.error('Error searching videos:', error instanceof Error ? error.message : error);
    return [];
  }
};

// Get filtered videos