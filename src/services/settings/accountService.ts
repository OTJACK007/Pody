import { supabase } from '../../lib/supabase';

export interface AccountSettings {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
  location: string;
  website: string;
  profilePicture: string;
}

export const getAccountSettings = async (userId: string): Promise<AccountSettings | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching account settings:', error);
    return null;
  }
};

export const updateAccountSettings = async (userId: string, settings: Partial<AccountSettings>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: settings.firstName,
        last_name: settings.lastName,
        email: settings.email,
        phone_number: settings.phoneNumber,
        company: settings.company,
        job_title: settings.jobTitle,
        location: settings.location,
        website: settings.website,
        avatar_url: settings.profilePicture,
        updated_at: new Date()
      })
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating account settings:', error);
    throw error;
  }
};