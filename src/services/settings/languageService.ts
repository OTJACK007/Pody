import { supabase } from '../../lib/supabase';
import { LanguageSettings } from '../../types/settings';

export const getLanguageSettings = async (userId: string): Promise<LanguageSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('language')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.language;
  } catch (error) {
    console.error('Error fetching language settings:', error);
    return null;
  }
};

export const updateLanguageSettings = async (userId: string, settings: LanguageSettings): Promise<void> => {
  try {
    const { error } = await supabase
      .from('user_settings')
      .update({
        language: settings,
        updated_at: new Date()
      })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating language settings:', error);
    throw error;
  }
};