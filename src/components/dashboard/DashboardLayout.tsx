import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${
          theme === 'dark' 
            ? 'bg-gradient-to-b from-gray-900 to-black' 
            : 'bg-gradient-to-b from-white to-gray-50'
        } p-6`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;