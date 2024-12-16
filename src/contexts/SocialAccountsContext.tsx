import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserSocialAccounts, connectSocialAccount, disconnectSocialAccount } from '../lib/database';
import type { SocialAccount } from '../types/socialAccounts';

interface SocialAccountsContextType {
  accounts: SocialAccount[];
  isLoading: boolean;
  connectAccount: (account: SocialAccount) => Promise<void>;
  disconnectAccount: (platform: string) => Promise<void>;
  refreshAccounts: () => Promise<void>;
}

const SocialAccountsContext = createContext<SocialAccountsContextType | null>(null);

export const useSocialAccounts = () => {
  const context = useContext(SocialAccountsContext);
  if (!context) {
    throw new Error('useSocialAccounts must be used within a SocialAccountsProvider');
  }
  return context;
};

export const SocialAccountsProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccounts = async () => {
    if (!currentUser?.uid) return;

    try {
      const userAccounts = await getUserSocialAccounts(currentUser.uid);
      setAccounts(userAccounts);
    } catch (error) {
      console.error('Error refreshing social accounts:', error);
    }
  };

  useEffect(() => {
    const loadAccounts = async () => {
      setIsLoading(true);
      await refreshAccounts();
      setIsLoading(false);
    };

    if (currentUser?.uid) {
      loadAccounts();
    }
  }, [currentUser]);

  const connectAccount = async (account: SocialAccount) => {
    if (!currentUser?.uid) return;
    
    try {
      await connectSocialAccount(currentUser.uid, account);
      await refreshAccounts();
    } catch (error) {
      console.error('Error connecting account:', error);
      throw error;
    }
  };

  const disconnectAccount = async (platform: string) => {
    if (!currentUser?.uid) return;
    
    try {
      await disconnectSocialAccount(currentUser.uid, platform);
      await refreshAccounts();
    } catch (error) {
      console.error('Error disconnecting account:', error);
      throw error;
    }
  };

  const value = {
    accounts,
    isLoading,
    connectAccount,
    disconnectAccount,
    refreshAccounts
  };

  return (
    <SocialAccountsContext.Provider value={value}>
      {children}
    </SocialAccountsContext.Provider>
  );
};