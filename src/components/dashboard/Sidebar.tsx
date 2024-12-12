import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Library, 
  Target, 
  Calendar, 
  BarChart2, 
  AppWindow,
  Share2,
  Crown,
  Settings,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Sparkles,
  Sun,
  Moon,
  Bot,
  Rocket,
  Settings2
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import UpgradePlanModal from '../../pages/dashboard/settings/billing/UpgradePlanModal';
import { useAdmin } from '../../hooks/useAdmin';
import BrandDealsBanner from './BrandDealsBanner';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { isAdmin } = useAdmin();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Live Space', path: '/dashboard/livespace', icon: <LayoutDashboard /> },
    { name: 'Creator Space', path: '/dashboard/creator-space', icon: <Rocket /> },
    { name: 'Pod Room', path: '/dashboard/podroom', icon: <Headphones /> },
    { name: 'Knowledge Library', path: '/dashboard/knowledge', icon: <Library /> },
    { name: 'Ask Cody AI', path: '/dashboard/cody-ai', icon: <Bot /> },
    { name: 'My Goals', path: '/dashboard/goals', icon: <Target /> },
    { name: 'Tasks & Calendar', path: '/dashboard/tasks', icon: <Calendar /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart2 /> },
    { name: 'Connected Apps', path: '/dashboard/connected-apps', icon: <AppWindow /> },
    { name: 'Social Accounts', path: '/dashboard/social', icon: <Share2 /> },
    { name: 'New Features', path: '/dashboard/newfeatures', icon: <Sparkles /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings /> },
    ...(isAdmin ? [{ name: 'Backoffice', path: '/dashboard/backoffice', icon: <Settings2 /> }] : [])
  ];

  return (
    <>
      <aside 
        className={`fixed md:sticky top-0 h-screen z-50 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        } transition-all duration-300 flex flex-col shadow-2xl ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className={`flex items-center justify-between p-4 border-b ${
          theme === 'dark' ? 'border-gray-800/50' : 'border-gray-200'
        }`}>
          <div className="flex items-center">
            {isOpen ? (
              <img 
                src={theme === 'dark' 
                  ? "https://static.wixstatic.com/media/c67dd6_5cc828167e994843bb5580cea3f362fa~mv2.png"
                  : "https://static.wixstatic.com/media/c67dd6_db5e32cf31f84b6a901529f12f889b58~mv2.png"
                }
                alt="Logo"
                className="w-32"
              />
            ) : (
              <img 
                src="https://static.wixstatic.com/media/c67dd6_13666aed622048b3b2f3a929081c486f~mv2.png"
                alt="Logo"
                className="w-8 h-8"
              />
            )}
          </div>
          <button 
            onClick={onToggle}
            className={`p-2 hover:bg-gray-800 rounded-lg transition-colors ${
              theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <BrandDealsBanner isOpen={isOpen} />

        <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
          <ul className="px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={`
                      flex items-center px-3 py-3 rounded-lg transition-all duration-200
                      group relative overflow-hidden
                      ${isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : `${theme === 'dark' ? 'text-gray-400 hover:bg-gray-800/50 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center">
                      <span className={`w-6 h-6 ${isActive ? 'text-white' : theme === 'dark' ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-black'}`}>
                        {item.icon}
                      </span>
                      {isOpen && (
                        <span className={`ml-3 font-medium transition-all duration-200 ${
                          isActive ? 'text-white' : theme === 'dark' ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-black'
                        }`}>
                          {item.name}
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <span className="absolute inset-0 opacity-50 bg-gradient-to-r from-primary to-primary/50 blur-sm" />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`p-4 mt-auto border-t ${theme === 'dark' ? 'border-gray-800/50' : 'border-gray-200'}`}>
          <div className="flex flex-col gap-4">
            <button
              onClick={toggleTheme}
              className={`
                flex items-center justify-center p-2 rounded-lg transition-all duration-200
                ${theme === 'dark' ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-black'}
              `}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setShowUpgradeModal(true)}
              className={`
                w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200
                bg-secondary/10 text-secondary hover:bg-secondary/20
              `}
            >
              <div className="flex items-center">
                <Crown className="w-6 h-6" />
                {isOpen && <span className="ml-3 font-medium">Subscribe for $5</span>}
              </div>
            </button>
          </div>
        </div>
      </aside>

      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
};

export default Sidebar;
