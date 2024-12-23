import { supabase } from '../lib/supabase';
import type { Video } from '../types/video';

export interface PodroomVideo {
  id: string;
  user_id: string;
  video_id: string;
  added_at: string;
  notes?: string;
  is_favorite: boolean;
  video?: Video;
  channel_name?: string;
}

// Add video to podroom
export const addVideoToPodroom = async (videoId: string): Promise<PodroomVideo | null> => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // First check if video already exists in podroom
    const { data: existingVideo, error: checkError } = await supabase
      .from('podroom_videos')
      .select('*')
      .eq('video_id', videoId) 
      .eq('user_id', user.id)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingVideo) {
      return existingVideo;
    }

    // Get video details with publisher info
    const { data: videoData, error: videoError } = await supabase
      .from('videos')
      .select('*, publisher:publisher_id(id)')
      .eq('id', videoId)
      .single();

    if (videoError) throw videoError;

    // Get channel info for the publisher
    const { data: channelData } = await supabase
      .from('userchannels')
      .select('channel_name, profile_image')
      .eq('user_id', videoData.publisher.id)
      .single();

    // Insert video into podroom
    const { data: newVideo, error: insertError } = await supabase
      .from('podroom_videos')
      .insert([{
        user_id: user.id,
        video_id: videoId,
        channel_name: channelData?.channel_name || 'Unknown Channel',
        publisher_id: videoData.publisher.id
      }])
      .select()
      .single();

    if (insertError) throw insertError;
    return newVideo;
  } catch (error) {
    console.error('Error adding video to podroom:', error);
    return null;
  }
};

// Remove video from podroom
export const removeVideoFromPodroom = async (videoId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('podroom_videos')
      .delete()
      .eq('video_id', videoId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing video from podroom:', error);
    return false;
  }
};

// Get all podroom videos
export const getPodroomVideos = async (): Promise<PodroomVideo[]> => {
  try {
    const { data, error } = await supabase.rpc('get_podroom_videos');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching podroom videos:', error);
    return [];
  }
};

// Check if video is in podroom
export const isVideoInPodroom = async (videoId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('podroom_videos')
      .select('id')
      .eq('video_id', videoId)
      .single();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking if video is in podroom:', error);
    return false;
  }
};