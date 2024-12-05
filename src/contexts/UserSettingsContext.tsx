import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserSettings, UserSettings } from '../lib/firestore';

interface UserSettingsContextType {
  userSettings: UserSettings | null;
  refreshSettings: () => Promise<void>;
}

const UserSettingsContext = createContext<UserSettingsContextType | null>(null);

export const useUserSettings = () => {
  const context = useContext(UserSettingsContext);
  if (!context) {
    throw new Error('useUserSettings must be used within a UserSettingsProvider');
  }
  return context;
};

export const UserSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

  const refreshSettings = async () => {
    if (currentUser?.uid) {
      const settings = await getUserSettings(currentUser.uid);
      setUserSettings(settings);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, [currentUser]);

  return (
    <UserSettingsContext.Provider value={{ userSettings, refreshSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};