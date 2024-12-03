import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import LiveSpace from './pages/dashboard/LiveSpace';
import KnowledgeLibrary from './pages/dashboard/KnowledgeLibrary';
import MyGoals from './pages/dashboard/myGoals/MyGoals';
import TasksCalendar from './pages/dashboard/TasksCalendar';
import Analytics from './pages/dashboard/Analytics';
import ConnectedApps from './pages/dashboard/ConnectedApps';
import AppConfig from './pages/dashboard/connectedApps/AppConfig';
import SocialAccounts from './pages/dashboard/SocialAccounts';
import Subscribe from './pages/dashboard/Subscribe';
import Settings from './pages/dashboard/Settings';
import Notifications from './pages/dashboard/Notifications';
import AccountSettings from './pages/dashboard/settings/AccountSettings';
import NotificationSettings from './pages/dashboard/settings/NotificationSettings';
import PrivacySettings from './pages/dashboard/settings/PrivacySettings';
import AppearanceSettings from './pages/dashboard/settings/AppearanceSettings';
import LanguageSettings from './pages/dashboard/settings/LanguageSettings';
import BillingSettings from './pages/dashboard/settings/BillingSettings';
import Podcasts from './pages/dashboard/Podcasts';
import PodcastVideo from './pages/dashboard/podcasts/PodcastVideo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/livespace" replace />} />
          <Route path="livespace" element={<LiveSpace />} />
          <Route path="podcasts" element={<Podcasts />} />
          <Route path="podcasts/podcastvideo" element={<PodcastVideo />} />
          <Route path="knowledge" element={<KnowledgeLibrary />} />
          <Route path="goals" element={<MyGoals />} />
          <Route path="tasks" element={<TasksCalendar />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="connected-apps" element={<ConnectedApps />} />
          <Route path="connected-apps/configure/:appId" element={<AppConfig />} />
          <Route path="social" element={<SocialAccounts />} />
          <Route path="subscribe" element={<Subscribe />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/account" element={<AccountSettings />} />
          <Route path="settings/notifications" element={<NotificationSettings />} />
          <Route path="settings/privacy" element={<PrivacySettings />} />
          <Route path="settings/appearance" element={<AppearanceSettings />} />
          <Route path="settings/language" element={<LanguageSettings />} />
          <Route path="settings/billing" element={<BillingSettings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;