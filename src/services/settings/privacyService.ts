import { supabase } from '../../lib/supabase';
import { PrivacySettings } from '../../types/settings';

export const getPrivacySettings = async (userId: string): Promise<PrivacySettings | null> => {
  try {
    const { data, error } = await supabase
      .from('user_settings')
      .select('privacy')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.privacy;
  } catch (error) {
    console.error('Error fetching privacy settings:', error);
    return null;
  }
};

export const updatePrivacySettings = async (userId: string, settings: PrivacySettings): Promise<void> => {
  try {
    const { error } = await supabase
      .from('user_settings')
      .update({
        privacy: settings,
        updated_at: new Date()
      })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating privacy settings:', error);
    throw error;
  }
};

export const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export const setupTwoFactor = async (userId: string, type: 'phone' | 'authenticator'): Promise<void> => {
  try {
    const { error } = await supabase
      .from('user_settings')
      .update({
        privacy: {
          password_authentication: {
            [type === 'phone' ? 'phone_number_authentication' : 'authenticator_app']: {
              enabled: true,
              last_used: new Date()
            }
          }
        }
      })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error setting up 2FA:', error);
    throw error;
  }
};