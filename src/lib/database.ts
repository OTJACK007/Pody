import { supabase } from './supabase';
import type { UserSettings } from '../types/settings';
import type { ProfileData, ProfessionalInfo } from '../types/settings';

// User Settings
export const getUserProfile = async (userId: string): Promise<ProfileData | null> => {
  try {
    const { data: profile, error: profileError } = await supabase 
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;
    return profile;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  try {
    const { data: settings, error: settingsError } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (settingsError) throw settingsError;
    if (!settings) return null;

    return {
      theme: settings.theme || 'dark',
      colorScheme: settings.color_scheme || '#ff3366',
      notifications: settings.notifications || {},
      language: settings.language || {},
      privacy: settings.privacy || {},
      professionalInfo: settings.professional_info || {
        company: '',
        jobTitle: '',
        location: '',
        website: ''
      }
    };
  } catch (error) {
    console.error('Error getting user settings:', error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, profileData: Partial<ProfileData>) => {
  const { error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId);

  if (error) throw error;
};

export const updateUserProfessionalInfo = async (userId: string, professionalInfo: ProfessionalInfo) => {
  const { error } = await supabase 
    .from('user_settings')
    .update({
      professional_info: professionalInfo
    })
    .eq('user_id', userId);

  if (error) throw error;
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
          profile_picture: settings.profilePicture
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