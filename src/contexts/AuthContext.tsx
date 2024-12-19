import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signOut } from '../lib/supabase';
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
          
          // Profile is automatically created by the database trigger
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (!profile) {
            console.error('Profile not found for user:', user.id);
          }
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }
    };

    handleRedirectResult();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const value = {
    currentUser,
    loading,
    signIn: signInWithEmail,
    signUp: signUpWithEmail,
    signInWithGoogle,
    logout: handleSignOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};