import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { UserSettingsProvider } from './contexts/UserSettingsContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { SocialAccountsProvider } from './contexts/SocialAccountsContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <UserSettingsProvider>
          <SocialAccountsProvider>
            {children}
          </SocialAccountsProvider>
        </UserSettingsProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};