import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import LiveSpace from './pages/dashboard/LiveSpace';
import KnowledgeLibrary from './pages/dashboard/KnowledgeLibrary';
import MyGoals from './pages/dashboard/MyGoals';
import TasksCalendar from './pages/dashboard/TasksCalendar';
import Analytics from './pages/dashboard/Analytics';
import ConnectedApps from './pages/dashboard/ConnectedApps';
import SocialAccounts from './pages/dashboard/SocialAccounts';
import Subscribe from './pages/dashboard/Subscribe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/livespace" replace />} />
          <Route path="livespace" element={<LiveSpace />} />
          <Route path="knowledge" element={<KnowledgeLibrary />} />
          <Route path="goals" element={<MyGoals />} />
          <Route path="tasks" element={<TasksCalendar />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="connected-apps" element={<ConnectedApps />} />
          <Route path="social" element={<SocialAccounts />} />
          <Route path="subscribe" element={<Subscribe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;