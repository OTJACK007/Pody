import { supabase } from './supabase';
import type { UserSettings } from '../types/settings';
import type { SocialAccount } from '../types/socialAccounts';

// User Settings
export const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const createUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  const { error } = await supabase
    .from('user_settings')
    .insert([{ user_id: userId, ...settings }]);

  if (error) throw error;
};

export const updateUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  const { error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('user_id', userId);

  if (error) throw error;
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