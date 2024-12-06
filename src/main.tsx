import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from './contexts/AuthContext';
import { UserSettingsProvider } from './contexts/UserSettingsContext';
import { SettingsProvider } from './contexts/SettingsContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <UserSettingsProvider>
          <NextUIProvider>
            <App />
          </NextUIProvider>
        </UserSettingsProvider>
      </SettingsProvider>
    </AuthProvider>
  </StrictMode>
);