import { supabase } from '../../lib/supabase';
import { AppearanceSettings } from '../../types/settings';

export const getAppearanceSettings = async (userId: string): Promise<AppearanceSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('appearance')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.appearance;
  } catch (error) {
    console.error('Error fetching appearance settings:', error);
    return null;
  }
};

export const updateAppearanceSettings = async (userId: string, settings: AppearanceSettings): Promise<void> => {
  try {
    const { error } = await supabase
      .from('user_settings')
      .update({
        appearance: settings,
        updated_at: new Date()
      })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating appearance settings:', error);
    throw error;
  }
};