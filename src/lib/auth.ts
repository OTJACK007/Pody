import { supabase } from './supabase';
import type { SignUpData, SignInData, Profile } from '../types/auth';

export const signIn = async ({ email, password }: SignInData) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  try {
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) throw signInError;

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Failed to fetch user profile');
    }

    return { user: authData.user, profile };
  } catch (error: any) {
    if (error.message.includes('Invalid login')) {
      throw new Error('Invalid email or password');
    }
    throw error;
  }
};

export const signUp = async ({ email, password, fullname }: SignUpData) => {
  if (!email || !password || !fullname) {
    throw new Error('All fields are required');
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullname,
        }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        throw new Error('User already exists');
      }
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};