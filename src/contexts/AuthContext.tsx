import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut } from '../lib/supabase';
import { createUserSettings, createDefaultSocialAccounts, getUserSettings } from '../lib/database';
import { defaultSettings } from '../lib/defaultSettings';
import { useNavigate } from 'react-router-dom';

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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        // User has been verified and signed in
        const user = session?.user;
        if (user) {
          try {
            const existingSettings = await getUserSettings(user.id);
            if (!existingSettings) {
              const firstName = user.user_metadata?.first_name || '';
              const lastName = user.user_metadata?.last_name || '';
              
              const settings = {
                ...defaultSettings,
                firstName,
                lastName,
                email: user.email || '',
                role: 'user',
                profilePicture: 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'
              };

              await createUserSettings(user.id, settings);
              await createDefaultSocialAccounts(user.id);
            }
            navigate('/dashboard/livespace');
          } catch (error) {
            console.error('Error setting up user:', error);
          }
        }
      }
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
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const user = session.user;
          const existingSettings = await getUserSettings(user.id);
          
          if (!existingSettings) {
            const firstName = user.user_metadata?.first_name || '';
            const lastName = user.user_metadata?.last_name || '';
            
            const settings = {
              ...defaultSettings,
              firstName,
              lastName,
              email: user.email || '',
              role: 'user',
              profilePicture: 'https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png'
            };

            await createUserSettings(user.id, settings);
            await createDefaultSocialAccounts(user.id);
          }
          
          navigate('/dashboard/livespace');
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

  const signInWithGoogle = async () => {
    try {
      // Navigate after successful sign-in
      navigate('/dashboard/livespace');
      
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
    signInWithGoogle,
    logout: handleSignOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};