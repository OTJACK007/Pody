import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { createUserSettings, createDefaultSocialAccounts, getUserSettings } from '../lib/database';
import { defaultSettings } from '../lib/defaultSettings';
import { useNavigate } from 'react-router-dom';
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signOut } from '../lib/auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
          const user = sessionData.session.user;
          const existingSettings = await getUserSettings(user.id);
          
          if (!existingSettings) {
            const firstName = user.user_metadata?.first_name || '';
            const lastName = user.user_metadata?.last_name || '';
            
            // Get user profile to check role
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', user.id)
              .single();
            
            const settings = {
              ...defaultSettings,
              firstName,
              lastName,
              email: user.email || '',
              role: profile?.role || 'user',
              profilePicture: 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'
            };

            await createUserSettings(user.id, settings);
            await createDefaultSocialAccounts(user.id);
          }
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }
    };

    handleRedirectResult();
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    await signInWithEmail(email, password);
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data } = await signUpWithEmail(email, password, fullName);
    const user = data?.user;
    if (!user) throw new Error('Failed to create user account');

    const [firstName, ...lastNameParts] = fullName.trim().split(' ');
    const lastName = lastNameParts.join(' ');
    
    const settings = {
      ...defaultSettings,
      firstName,
      lastName,
      email,
      role: 'user',
      profilePicture: 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png',
    };

    try {
      await createUserSettings(user.id, settings);
    } catch (error) {
      console.error('Error creating user settings:', error);
      throw error;
    }
    // Return without navigating - user needs to verify email first
    return;
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const value = {
    currentUser,
    loading,
    signIn,
    signUp,
    signInWithGoogle: handleSignInWithGoogle,
    logout: handleSignOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};