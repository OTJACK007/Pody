import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getUserSettings,
  updateAppearanceSettings,
  updateNotificationSettings,
  updatePrivacySettings,
  updateLanguageSettings,
  updateBillingSettings,
  type AppearanceSettings,
  type NotificationSettings,
  type PrivacySettings,
  type LanguageSettings,
  type BillingSettings
} from '../lib/firestore/collections/settings';

interface SettingsContextType {
  appearance: AppearanceSettings | null;
  notifications: NotificationSettings | null;
  privacy: PrivacySettings | null;
  language: LanguageSettings | null;
  billing: BillingSettings | null;
  updateAppearance: (settings: AppearanceSettings) => Promise<void>;
  updateNotifications: (settings: NotificationSettings) => Promise<void>;
  updatePrivacy: (settings: PrivacySettings) => Promise<void>;
  updateLanguage: (settings: LanguageSettings) => Promise<void>;
  updateBilling: (settings: BillingSettings) => Promise<void>;
  refreshSettings: () => Promise<void>;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const [appearance, setAppearance] = useState<AppearanceSettings | null>(null);
  const [notifications, setNotifications] = useState<NotificationSettings | null>(null);
  const [privacy, setPrivacy] = useState<PrivacySettings | null>(null);
  const [language, setLanguage] = useState<LanguageSettings | null>(null);
  const [billing, setBilling] = useState<BillingSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSettings = async () => {
    if (!currentUser?.uid) return;

    try {
      const settings = await getUserSettings(currentUser.uid);
      if (settings) {
        setAppearance(settings.appearance);
        setNotifications(settings.notifications);
        setPrivacy(settings.privacy);
        setLanguage(settings.language);
        setBilling(settings.billing);
      }
    } catch (error) {
      console.error('Error refreshing settings:', error);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      await refreshSettings();
      setIsLoading(false);
    };

    if (currentUser?.uid) {
      loadSettings();
    }
  }, [currentUser]);

  const updateAppearance = async (settings: AppearanceSettings) => {
    if (!currentUser?.uid) return;
    
    try {
      await updateAppearanceSettings(currentUser.uid, settings);
      setAppearance(settings);
    } catch (error) {
      console.error('Error updating appearance settings:', error);
      throw error;
    }
  };

  const updateNotifications = async (settings: NotificationSettings) => {
    if (!currentUser?.uid) return;
    
    try {
      await updateNotificationSettings(currentUser.uid, settings);
      setNotifications(settings);
    } catch (error) {
      console.error('Error updating notification settings:', error);
      throw error;
    }
  };

  const updatePrivacy = async (settings: PrivacySettings) => {
    if (!currentUser?.uid) return;
    
    try {
      await updatePrivacySettings(currentUser.uid, settings);
      setPrivacy(settings);
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      throw error;
    }
  };

  const updateLanguage = async (settings: LanguageSettings) => {
    if (!currentUser?.uid) return;
    
    try {
      await updateLanguageSettings(currentUser.uid, settings);
      setLanguage(settings);
    } catch (error) {
      console.error('Error updating language settings:', error);
      throw error;
    }
  };

  const updateBilling = async (settings: BillingSettings) => {
    if (!currentUser?.uid) return;
    
    try {
      await updateBillingSettings(currentUser.uid, settings);
      setBilling(settings);
    } catch (error) {
      console.error('Error updating billing settings:', error);
      throw error;
    }
  };

  const value = {
    appearance,
    notifications,
    privacy,
    language,
    billing,
    updateAppearance,
    updateNotifications,
    updatePrivacy,
    updateLanguage,
    updateBilling,
    refreshSettings,
    isLoading
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};