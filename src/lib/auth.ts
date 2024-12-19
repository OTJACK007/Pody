import { supabase } from './supabase';
import type { SignUpData, SignInData } from '../types/auth';

export const signIn = async ({ email, password }: SignInData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    if (error.message.includes('Invalid login')) {
      throw new Error('Invalid email or password');
    }
    throw error;
  }

  return { data, error: null };
};

export const signUp = async ({ email, password, fullname }: SignUpData) => {
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
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};