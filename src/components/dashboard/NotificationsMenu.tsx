import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare, Gift, Star, ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface NotificationsMenuProps {
  notificationCount: number;
}

const NotificationsMenu = ({ notificationCount }: NotificationsMenuProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New Episode Available',
      description: 'TechInsights just uploaded "The Future of AI"',
      time: '2 minutes ago',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: 2,
      type: 'gift',
      title: 'Special Offer',
      description: 'Get 20% off on annual subscription',
      time: '1 hour ago',
      icon: <Gift className="w-4 h-4" />
    },
    {
      id: 3,
      type: 'star',
      title: 'Achievement Unlocked',
      description: "You have watched 50 episodes!",
      time: '2 hours ago',
      icon: <Star className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewAll = () => {
    setIsOpen(false);
    navigate('/dashboard/notifications');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className={`relative p-2 rounded-lg transition-colors ${
          theme === 'dark'
            ? 'hover:bg-gray-800'
            : 'hover:bg-gray-100'
        }`}
      >
        <Bell className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {notificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-xl border z-50 ${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Notifications</h3>
              <button 
                onClick={handleViewAll}
                className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-2 rounded-lg transition-colors cursor-pointer group ${
                    theme === 'dark'
                      ? 'hover:bg-gray-700/50'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20">
                    {notification.icon}
                  </div>
                  <div>
                    <h4 className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{notification.title}</h4>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{notification.description}</p>
                    <span className={`text-xs mt-1 block ${
                      theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsMenu;