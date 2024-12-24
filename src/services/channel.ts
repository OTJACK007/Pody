import { supabase } from '../lib/supabase';

export interface UserChannel {
  id: string;
  channel_id: string;
  user_id: string;
  banner_image: string | null;
  profile_image: string | null;
  channel_name: string;
  youtube_link: string | null;
  created_at: string;
  updated_at: string;
}

export const getUserChannel = async (userId: string): Promise<UserChannel | null> => {
  const { data, error } = await supabase
    .from('userchannels')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user channel:', error);
    return null;
  }

  return data;
};

export const createUserChannel = async (userId: string, channelData: Partial<UserChannel>): Promise<UserChannel | null> => {
  const { data, error } = await supabase
    .from('userchannels')
    .insert([{
      user_id: userId,
      channel_name: channelData.channel_name || 'My Channel',
      youtube_link: channelData.youtube_link || '',
      banner_image: channelData.banner_image || '',
      profile_image: channelData.profile_image || ''
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user channel:', error);
    return null;
  }

  return data;
};

export const updateUserChannel = async (userId: string, updates: Partial<UserChannel>): Promise<UserChannel | null> => {
  const { data, error } = await supabase
    .from('userchannels')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user channel:', error);
    return null;
  }

  return data;
};

export const uploadChannelImage = async (
  userId: string,
  file: File,
  type: 'banner' | 'profile'
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${type}.${fileExt}`;
    const { error: uploadError, data } = await supabase.storage
      .from('channel-images')
      .upload(fileName, file, {
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('channel-images')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error(`Error uploading ${type} image:`, error);
    return null;
  }
};

// Get featured channels
export const getFeaturedChannels = async (): Promise<UserChannel[]> => {
  try {
    const { data, error } = await supabase
      .from('userchannels')
      .select('*')
      .eq('is_shogun_featured', true)
      .order('channel_name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching featured channels:', error);
    return [];
  }
};

// Get featured guests
export const getFeaturedGuests = async (): Promise<UserChannel[]> => {
  try {
    const { data, error } = await supabase
      .from('userchannels')
      .select('*')
      .eq('is_creator', true)
      .eq('is_shogun_featured', true)
      .order('channel_name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching featured guests:', error);
    return [];
  }
};