import { supabase } from '../supabase';
import type { UserSettings } from '../database';

export const defaultSettings: Partial<UserSettings> = {
  theme: 'dark',
  color_scheme: '#ff3366',
  notifications: {
    browser: true,
    categories: {},
    content: {
      'new-episodes': true,
      recommendations: true,
      trending: true
    },
    social: {
      follows: true,
      mentions: true,
      replies: true
    },
    system: {
      maintenance: false,
      security: true,
      updates: true,
      email: true,
      emailFrequency: 'immediate',
      mobile: false,
      quietHours: {
        enabled: false,
        end: '07:00',
        start: '22:00',
        sound: true
      }
    }
  },
  language: {
    language: 'en',
    region: 'US',
    timeZone: 'auto',
    dateFormat: 'MM/DD/YYYY'
  },
  privacy: {
    show_profile: true,
    allow_listening_activity: false,
    share_library: true,
    allow_friend_requests: true
  }
};

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
    .insert([{
      user_id: userId,
      ...defaultSettings,
      ...settings
    }]);

  if (error) throw error;
};

export const updateUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  const { error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('user_id', userId);

  if (error) throw error;
};