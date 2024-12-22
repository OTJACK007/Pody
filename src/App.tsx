import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import AuthCallback from './pages/AuthCallback';
import ShortVideo from './pages/dashboard/shortvideo/ShortVideo';
import EditVideo from './pages/dashboard/video/EditVideo';
import VideoPage from './pages/dashboard/video/VideoPage';
import { ThemeProvider } from './contexts/ThemeContext';
import BrandDeals from './pages/dashboard/BrandDeals';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import LiveSpace from './pages/dashboard/LiveSpace';
import CreatorSpace from './pages/dashboard/CreatorSpace';
import ManageChannel from './pages/dashboard/creatorSpace/pages/ManageChannel';
import ManageVideos from './pages/dashboard/creatorSpace/pages/ManageVideos';
import Channel from './pages/dashboard/livespace/Channel';
import FeedVideo from './pages/dashboard/feedvideo/FeedVideo';
import GuestVideos from './pages/dashboard/guestvideos/GuestVideos';
import KnowledgeLibrary from './pages/dashboard/KnowledgeLibrary';
import CodyAI from './pages/dashboard/CodyAI';
import MyGoals from './pages/dashboard/myGoals/MyGoals';
import TasksCalendar from './pages/dashboard/TasksCalendar';
import Analytics from './pages/dashboard/Analytics';
import ConnectedApps from './pages/dashboard/ConnectedApps';
import YoutubeConfig from './pages/dashboard/connectedApps/pages/YoutubeConfig';
import TwitterConfig from './pages/dashboard/connectedApps/pages/TwitterConfig';
import MetaConfig from './pages/dashboard/connectedApps/pages/MetaConfig';
import NotionConfig from './pages/dashboard/connectedApps/pages/NotionConfig';
import SpotifyConfig from './pages/dashboard/connectedApps/pages/SpotifyConfig';
import ZapierConfig from './pages/dashboard/connectedApps/pages/ZapierConfig';
import OpusClipConfig from './pages/dashboard/connectedApps/pages/OpusClipConfig';
import MiroConfig from './pages/dashboard/connectedApps/pages/MiroConfig';
import GoogleTasksConfig from './pages/dashboard/connectedApps/pages/GoogleTasksConfig';
import SkoolConfig from './pages/dashboard/connectedApps/pages/SkoolConfig';
import BonzaiConfig from './pages/dashboard/connectedApps/pages/BonzaiConfig';
import PatreonConfig from './pages/dashboard/connectedApps/pages/PatreonConfig';
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
import Backoffice from './pages/dashboard/backoffice/Backoffice';
import FeaturesManagement from './pages/dashboard/backoffice/features/FeaturesManagement';
import PodRoom from './pages/dashboard/PodRoom';
import PodcastVideo from './pages/dashboard/podcasts/PodcastVideo';
import NewFeatures from './pages/dashboard/NewFeatures';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/livespace" replace />} />
          <Route path="livespace" element={<LiveSpace />} />
            <Route path="creator-space" element={<CreatorSpace />} />
            <Route path="creator-space/manage-channel" element={<ManageChannel />} />
            <Route path="creator-space/manage-videos" element={<ManageVideos />} />
            <Route path="branddeals" element={<BrandDeals />} />
            <Route path="livespace/channel" element={<Channel />} />
            <Route path="feedvideo/:id" element={<FeedVideo />} />
            <Route path="shortvideo/:id" element={<ShortVideo />} />
            <Route path="video/:id" element={<VideoPage />} />
            <Route path="video/edit/:id" element={<EditVideo />} />
            <Route path="guestvideos/:id" element={<GuestVideos />} />
            <Route path="podroom" element={<PodRoom />} />
            <Route path="podroom/podcastvideo" element={<PodcastVideo />} />
            <Route path="knowledge" element={<KnowledgeLibrary />} />
            <Route path="cody-ai" element={<CodyAI />} />
            <Route path="goals" element={<MyGoals />} />
            <Route path="tasks" element={<TasksCalendar />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="connected-apps" element={<ConnectedApps />} />
            <Route path="connected-apps/configure/youtube" element={<YoutubeConfig />} />
            <Route path="connected-apps/configure/x-twitter" element={<TwitterConfig />} />
            <Route path="connected-apps/configure/meta" element={<MetaConfig />} />
            <Route path="connected-apps/configure/notion" element={<NotionConfig />} />
            <Route path="connected-apps/configure/spotify" element={<SpotifyConfig />} />
            <Route path="connected-apps/configure/zapier" element={<ZapierConfig />} />
            <Route path="connected-apps/configure/opus-clip" element={<OpusClipConfig />} />
            <Route path="connected-apps/configure/miro" element={<MiroConfig />} />
            <Route path="connected-apps/configure/google-tasks" element={<GoogleTasksConfig />} />
            <Route path="connected-apps/configure/skool" element={<SkoolConfig />} />
            <Route path="connected-apps/configure/bonzai" element={<BonzaiConfig />} />
            <Route path="connected-apps/configure/patreon" element={<PatreonConfig />} />
            <Route path="social" element={<SocialAccounts />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="settings" element={<Settings />} />
            <Route path="settings/account" element={<AccountSettings />} />
            <Route path="settings/notifications" element={<NotificationSettings />} />
            <Route path="settings/privacy" element={<PrivacySettings />} />
            <Route path="settings/appearance" element={<AppearanceSettings />} />
            <Route path="settings/language" element={<LanguageSettings />} />
            <Route path="settings/billing" element={<BillingSettings />} />
            <Route path="backoffice" element={<AdminRoute><Backoffice /></AdminRoute>} />
            <Route path="backoffice/features" element={<AdminRoute><FeaturesManagement /></AdminRoute>} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="newfeatures" element={<NewFeatures />} />
          </Route>
        </Routes>
    </ThemeProvider>
  );
}

export default App;