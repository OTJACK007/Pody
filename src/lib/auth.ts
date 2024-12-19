import { supabase } from './supabase';
import type { SignUpData, SignInData } from '../types/auth';

export const signIn = async ({ email, password }: SignInData) => {
  // Vérifier que les champs ne sont pas vides
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

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

  // Vérifier que l'utilisateur existe dans la table profiles
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    throw new Error('User profile not found');
  }

  return { data, error: null, profile };
};

export const signUp = async ({ email, password, fullname }: SignUpData) => {
  // Vérifier que les champs ne sont pas vides
  if (!email || !password || !fullname) {
    throw new Error('All fields are required');
  }

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

export const isAdmin = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking admin status:', error);
    return false;
  }

  return data?.role === 'admin';
};