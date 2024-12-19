import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/auth';
import { getProfile } from '../lib/auth';

interface AuthContextType {
  currentUser: User | null;
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const refreshProfile = async () => {
    if (!currentUser) return;
    try {
      const profile = await getProfile(currentUser.id);
      setProfile(profile);
    } catch (error) {
      console.error('Error refreshing profile:', error);
      setError(error as Error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
          const profile = await getProfile(session.user.id);
          setProfile(profile);
          navigate('/dashboard/livespace');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setCurrentUser(session.user);
        try {
          const profile = await getProfile(session.user.id);
          setProfile(profile);
          navigate('/dashboard/livespace');
        } catch (error) {
          console.error('Error loading profile:', error);
          setError(error as Error);
        }
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setProfile(null);
        navigate('/');
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{
      currentUser,
      profile,
      loading,
      error,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};