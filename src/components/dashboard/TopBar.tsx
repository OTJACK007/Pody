import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Settings, Search } from 'lucide-react';
import { Avatar, Button, Badge } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';
import NotificationsMenu from './NotificationsMenu';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <header className={`${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-800/50' 
        : 'bg-white border-gray-200'
    } border-b sticky top-0 z-40`}>
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center flex-1">
          <button
            onClick={onMenuClick}
            className={`p-2 hover:bg-gray-800 rounded-lg transition-colors md:hidden ${
              theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="ml-4 flex-1 max-w-xl">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search podcasts, summaries, notes..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800/50 text-white border-gray-700/50 focus:border-primary'
                    : 'bg-gray-100 text-black border-gray-200 focus:border-primary'
                } focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-500`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationsMenu notificationCount={3} />
          
          <Button
            isIconOnly
            className={`${
              theme === 'dark' 
                ? 'bg-transparent hover:bg-gray-800' 
                : 'bg-transparent hover:bg-gray-100'
            }`}
            onClick={() => navigate('/dashboard/settings')}
          >
            <Settings className={`w-6 h-6 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`} />
          </Button>
          
          <div className={`flex items-center space-x-3 pl-4 border-l ${
            theme === 'dark' ? 'border-gray-800/50' : 'border-gray-200'
          }`}>
            <div className="text-right">
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>John Doe</p>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Premium Member</p>
            </div>
            <div className="relative">
              <Avatar
                isBordered
                color="primary"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                className="w-10 h-10"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;