import { supabase } from '../supabase';
import type { SocialAccount } from '../database';

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
      ...account
    }]);

  if (error) throw error;
};

export const disconnectSocialAccount = async (userId: string, platform: string) => {
  const { error } = await supabase
    .from('social_accounts')
    .update({ 
      is_connected: false,
      access_token: null,
      refresh_token: null,
      token_expiry: null
    })
    .eq('user_id', userId)
    .eq('platform', platform);

  if (error) throw error;
};