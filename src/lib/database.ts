import { supabase } from './supabase';
import type { UserSettings } from '../types/settings';
import type { SocialAccount } from '../types/socialAccounts';

// User Settings
export const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  try {
    const { data: profile, error: profileError } = await supabase 
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    const { data: settings, error: settingsError } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (settingsError) throw settingsError;

    if (!profile || !settings) return null;

    return {
      firstName: profile.first_name || '',
      lastName: profile.last_name || '',
      email: profile.email || '',
      role: profile.role || 'user',
      profilePicture: profile.avatar_url || '',
      theme: settings.theme || 'dark',
      colorScheme: settings.color_scheme || '#ff3366',
      notifications: settings.notifications || {},
      language: settings.language || {},
      privacy: settings.privacy || {}
    };
  } catch (error) {
    console.error('Error getting user settings:', error);
    return null;
  }
};

export const createUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  // First create/update profile
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      email: settings.email,
      first_name: settings.firstName,
      last_name: settings.lastName,
      avatar_url: settings.profilePicture,
      role: 'user'
    });

  if (profileError) throw profileError;

  // Then create settings
  const { error } = await supabase
    .from('user_settings')
    .insert([{
      user_id: userId,
      theme: settings.theme || 'dark',
      color_scheme: settings.colorScheme || '#ff3366',
      notifications: settings.notifications || {},
      language: settings.language || {},
      privacy: settings.privacy || {}
    }]);

  if (error) throw error;
};

export const updateUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    if (settings.firstName || settings.lastName || settings.email || settings.profilePicture) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: settings.firstName,
          last_name: settings.lastName,
          email: settings.email,
          avatar_url: settings.profilePicture
        })
        .eq('id', userId);

      if (profileError) throw profileError;
    }

    const { error: settingsError } = await supabase
      .from('user_settings')
      .update({
        theme: settings.theme,
        color_scheme: settings.colorScheme,
        notifications: settings.notifications,
        language: settings.language,
        privacy: settings.privacy,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (settingsError) throw settingsError;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

// Social Accounts
export const getUserSocialAccounts = async (userId: string): Promise<SocialAccount[]> => {
  const { data, error } = await supabase
    .from('social_accounts')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data || [];
};

export const createDefaultSocialAccounts = async (userId: string) => {
  const { error } = await supabase
    .from('social_accounts')
    .insert([{
      user_id: userId,
      platform: 'youtube',
      username: '',
      profile_url: '',
      followers: '0',
      is_connected: false
    }]);

  if (error) throw error;
};

export const connectSocialAccount = async (userId: string, account: Omit<SocialAccount, 'id'>) => {
  const { error } = await supabase
    .from('social_accounts')
    .upsert([{
      user_id: userId,
      ...account,
      updated_at: new Date()
    }]);

  if (error) throw error;
};

export const disconnectSocialAccount = async (userId: string, platform: string) => {
  const { error } = await supabase
    .from('social_accounts')
    .delete()
    .eq('user_id', userId)
    .eq('platform', platform);

  if (error) throw error;
};