import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ShortVideo from './pages/dashboard/shortvideo/ShortVideo';
import { ThemeProvider } from './contexts/ThemeContext';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import LiveSpace from './pages/dashboard/LiveSpace';
import CreatorSpace from './pages/dashboard/CreatorSpace';
import ManageChannel from './pages/dashboard/creatorSpace/pages/ManageChannel';
import Channel from './pages/dashboard/livespace/channel/Channel';
import FeedVideo from './pages/dashboard/feedvideo/FeedVideo';
import GuestVideos from './pages/dashboard/guestvideos/GuestVideos';
import KnowledgeLibrary from './pages/dashboard/KnowledgeLibrary';
import CodyAI from './pages/dashboard/CodyAI';
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
import PodRoom from './pages/dashboard/PodRoom';
import PodcastVideo from './pages/dashboard/podcasts/PodcastVideo';
import NewFeatures from './pages/dashboard/NewFeatures';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/livespace" replace />} />
          <Route path="livespace" element={<LiveSpace />} />
            <Route path="creator-space" element={<CreatorSpace />} />
            <Route path="creator-space/manage-channel" element={<ManageChannel />} />
            <Route path="livespace/channel" element={<Channel />} />
            <Route path="feedvideo/:id" element={<FeedVideo />} />
            <Route path="shortvideo/:id" element={<ShortVideo />} />
            <Route path="guestvideos/:id" element={<GuestVideos />} />
            <Route path="podroom" element={<PodRoom />} />
            <Route path="podroom/podcastvideo" element={<PodcastVideo />} />
            <Route path="knowledge" element={<KnowledgeLibrary />} />
            <Route path="cody-ai" element={<CodyAI />} />
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
            <Route path="newfeatures" element={<NewFeatures />} />
          </Route>
        </Routes>
    </ThemeProvider>
  );
}

export default App;