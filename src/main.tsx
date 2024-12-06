import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from './contexts/AuthContext';
import { UserSettingsProvider } from './contexts/UserSettingsContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { SocialAccountsProvider } from './contexts/SocialAccountsContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <UserSettingsProvider>
            <SocialAccountsProvider>
              <NextUIProvider>
                <App />
              </NextUIProvider>
            </SocialAccountsProvider>
          </UserSettingsProvider>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);