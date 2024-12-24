import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';

// Layout Components
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminRoute from './components/AdminRoute';

// Auth & Callback Pages
import AuthCallback from './pages/AuthCallback';
import NotionCallback from './pages/NotionCallback';
import LandingPage from './pages/LandingPage';

// Dashboard Pages
import LiveSpace from './pages/dashboard/LiveSpace';
import Channel from './pages/dashboard/livespace/Channel';
import LiveCreators from './pages/dashboard/livespace/LiveCreators';
import BrandDeals from './pages/dashboard/BrandDeals';

// Feed & Guest Videos
import FeedVideo from './pages/dashboard/feedvideo/FeedVideo';
import GuestVideos from './pages/dashboard/guestvideos/GuestVideos';

// Creator Space
import CreatorSpace from './pages/dashboard/CreatorSpace';
import ManageChannel from './pages/dashboard/creatorSpace/pages/ManageChannel';
import ManageVideos from './pages/dashboard/creatorSpace/pages/ManageVideos';

// Video Pages
import VideoPage from './pages/dashboard/video/VideoPage';
import EditVideo from './pages/dashboard/video/EditVideo';
import ShortVideo from './pages/dashboard/shortvideo/ShortVideo';

// Knowledge Library
import KnowledgeLibrary from './pages/dashboard/KnowledgeLibrary';
import CategoryPage from './pages/dashboard/knowledge/CategoryPage';
import NoteDetailsPage from './pages/dashboard/knowledge/pages/NoteDetailsPage';
import AISummaryDetailsPage from './pages/dashboard/knowledge/pages/AISummaryDetailsPage';

// Podcasts
import PodcastVideo from './pages/dashboard/podcasts/PodcastVideo';

// PodRoom
import PodRoom from './pages/dashboard/PodRoom';

// Connected Apps
import ConnectedApps from './pages/dashboard/ConnectedApps';
import AppConfig from './pages/dashboard/connectedApps/AppConfig';
import YoutubeConfig from './pages/dashboard/connectedApps/pages/YoutubeConfig';
import TwitterConfig from './pages/dashboard/connectedApps/pages/TwitterConfig';
import NotionConfig from './pages/dashboard/connectedApps/pages/NotionConfig';
import SpotifyConfig from './pages/dashboard/connectedApps/pages/SpotifyConfig';
import ZapierConfig from './pages/dashboard/connectedApps/pages/ZapierConfig';
import OpusClipConfig from './pages/dashboard/connectedApps/pages/OpusClipConfig';
import MiroConfig from './pages/dashboard/connectedApps/pages/MiroConfig';
import GoogleTasksConfig from './pages/dashboard/connectedApps/pages/GoogleTasksConfig';
import SkoolConfig from './pages/dashboard/connectedApps/pages/SkoolConfig';
import BonzaiConfig from './pages/dashboard/connectedApps/pages/BonzaiConfig';
import PatreonConfig from './pages/dashboard/connectedApps/pages/PatreonConfig';
import MetaConfig from './pages/dashboard/connectedApps/pages/MetaConfig';

// Notifications & Features
import Notifications from './pages/dashboard/Notifications';
import NewFeatures from './pages/dashboard/NewFeatures';

// Other Features
import CodyAI from './pages/dashboard/CodyAI';
import MyGoals from './pages/dashboard/MyGoals';
import TasksCalendar from './pages/dashboard/TasksCalendar';
import Analytics from './pages/dashboard/Analytics';
import SocialAccounts from './pages/dashboard/SocialAccounts';
import Subscribe from './pages/dashboard/Subscribe';

// Settings
import Settings from './pages/dashboard/Settings';
import AccountSettings from './pages/dashboard/settings/AccountSettings';
import NotificationSettings from './pages/dashboard/settings/NotificationSettings';
import PrivacySettings from './pages/dashboard/settings/PrivacySettings';
import AppearanceSettings from './pages/dashboard/settings/AppearanceSettings';
import LanguageSettings from './pages/dashboard/settings/LanguageSettings';
import BillingSettings from './pages/dashboard/settings/BillingSettings';

// Admin
import Backoffice from './pages/dashboard/backoffice/Backoffice';
import FeaturesManagement from './pages/dashboard/backoffice/features/FeaturesManagement';

const App = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/auth/notion/callback" element={<NotionCallback />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/livespace" replace />} />
          
          {/* Live Space */}
          <Route path="livespace" element={<LiveSpace />} />
          <Route path="livespace/channel" element={<Channel />} />
          <Route path="livespace/live-creators" element={<LiveCreators />} />
          <Route path="branddeals" element={<BrandDeals />} />
          <Route path="feedvideo/:id" element={<FeedVideo />} />
          <Route path="guestvideos/:id" element={<GuestVideos />} />
          
          {/* Creator Space */}
          <Route path="creator-space" element={<CreatorSpace />} />
          <Route path="creator-space/manage-channel" element={<ManageChannel />} />
          <Route path="creator-space/manage-videos" element={<ManageVideos />} />
          
          {/* Video Routes */}
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="video/edit/:id" element={<EditVideo />} />
          <Route path="shortvideo/:id" element={<ShortVideo />} />
          
          {/* Knowledge Library Routes */}
          <Route path="knowledge" element={<KnowledgeLibrary />} />
          <Route path="knowledge/category/:categoryId" element={<CategoryPage />} />
          <Route path="knowledge/note/:noteId" element={<NoteDetailsPage />} />
          <Route path="knowledge/ai-summary/:summaryId" element={<AISummaryDetailsPage />} />
          
          {/* PodRoom */}
          <Route path="podroom" element={<PodRoom />} />
          <Route path="podroom/podcastvideo" element={<PodcastVideo />} />
          
          {/* Connected Apps */}
          <Route path="connected-apps" element={<ConnectedApps />} />
          <Route path="connected-apps/configure/:appId" element={<AppConfig />} />
          <Route path="connected-apps/configure/youtube" element={<YoutubeConfig />} />
          <Route path="connected-apps/configure/twitter" element={<TwitterConfig />} />
          <Route path="connected-apps/configure/notion" element={<NotionConfig />} />
          <Route path="connected-apps/configure/spotify" element={<SpotifyConfig />} />
          <Route path="connected-apps/configure/zapier" element={<ZapierConfig />} />
          <Route path="connected-apps/configure/opus-clip" element={<OpusClipConfig />} />
          <Route path="connected-apps/configure/miro" element={<MiroConfig />} />
          <Route path="connected-apps/configure/google-tasks" element={<GoogleTasksConfig />} />
          <Route path="connected-apps/configure/skool" element={<SkoolConfig />} />
          <Route path="connected-apps/configure/bonzai" element={<BonzaiConfig />} />
          <Route path="connected-apps/configure/patreon" element={<PatreonConfig />} />
          <Route path="connected-apps/configure/meta" element={<MetaConfig />} />
          
          {/* Other Features */}
          <Route path="cody-ai" element={<CodyAI />} />
          <Route path="goals" element={<MyGoals />} />
          <Route path="tasks" element={<TasksCalendar />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="social" element={<SocialAccounts />} />
          <Route path="subscribe" element={<Subscribe />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="newfeatures" element={<NewFeatures />} />
          
          {/* Settings */}
          <Route path="settings" element={<Settings />} />
          <Route path="settings/account" element={<AccountSettings />} />
          <Route path="settings/notifications" element={<NotificationSettings />} />
          <Route path="settings/privacy" element={<PrivacySettings />} />
          <Route path="settings/appearance" element={<AppearanceSettings />} />
          <Route path="settings/language" element={<LanguageSettings />} />
          <Route path="settings/billing" element={<BillingSettings />} />
          
          {/* Admin Routes */}
          <Route path="backoffice" element={<AdminRoute><Backoffice /></AdminRoute>} />
          <Route path="backoffice/features" element={<AdminRoute><FeaturesManagement /></AdminRoute>} />
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;