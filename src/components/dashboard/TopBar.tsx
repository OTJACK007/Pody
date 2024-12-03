import React from 'react';
import { Menu, Bell, Settings, Search } from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800/50 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center flex-1">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors md:hidden text-gray-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="ml-4 flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search podcasts, summaries, notes..."
                className="w-full bg-gray-800/50 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
          
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-800/50">
            <div className="text-right">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-400">Premium Member</p>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                alt="Profile"
                className="w-10 h-10 rounded-lg ring-2 ring-primary/50 transition-all duration-300 group-hover:ring-primary cursor-pointer"
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