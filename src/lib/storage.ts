import { supabase } from './supabase';

export const uploadProfilePicture = async (
  userId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/profile.${fileExt}`;

    // Upload file
    const { error: uploadError, data } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

export const deleteProfilePicture = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase.storage
      .from('avatars')
      .remove([`${userId}/profile`]);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    throw error;
  }
};