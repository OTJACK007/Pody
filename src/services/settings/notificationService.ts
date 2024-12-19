import { supabase } from '../../lib/supabase';
import { NotificationSettings } from '../../types/settings';

export const getNotificationSettings = async (userId: string): Promise<NotificationSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('notifications')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.notifications;
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    return null;
  }
};

export const updateNotificationSettings = async (userId: string, settings: NotificationSettings): Promise<void> => {
  try {
    const { error } = await supabase
      .from('user_settings')
      .update({
        notifications: settings,
        updated_at: new Date()
      })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating notification settings:', error);
    throw error;
  }
};