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
  Sparkles
} from 'lucide-react';
import UpgradePlanModal from '../../pages/dashboard/settings/billing/UpgradePlanModal';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const navItems = [
    { name: 'Live Space', path: '/dashboard/livespace', icon: <LayoutDashboard /> },
    { name: 'Podcasts', path: '/dashboard/podcasts', icon: <Headphones /> },
    { name: 'Knowledge Library', path: '/dashboard/knowledge', icon: <Library /> },
    { name: 'My Goals', path: '/dashboard/goals', icon: <Target /> },
    { name: 'Tasks & Calendar', path: '/dashboard/tasks', icon: <Calendar /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart2 /> },
    { name: 'Connected Apps', path: '/dashboard/connected-apps', icon: <AppWindow /> },
    { name: 'Social Accounts', path: '/dashboard/social', icon: <Share2 /> },
    { name: 'New Features', path: '/dashboard/newfeatures', icon: <Sparkles /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings /> }
  ];

  return (
    <>
      <aside 
        className={`fixed md:sticky top-0 h-screen z-50 bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-2xl ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
          <div className="flex items-center">
            {isOpen ? (
              <img 
                src="https://static.wixstatic.com/media/c67dd6_c825b43e10db4bd1b336eec46c3bce30~mv2.gif"
                alt="Logo"
                className="w-32"
              />
            ) : (
              <img 
                src="https://static.wixstatic.com/shapes/c67dd6_53baa9a980544d87b59c68b9b0020981.svg"
                alt="Logo"
                className="w-8 h-8"
              />
            )}
          </div>
          <button 
            onClick={onToggle}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
          <ul className="space-y-1 px-2">
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
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center">
                      <span className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {item.icon}
                      </span>
                      {isOpen && (
                        <span className={`ml-3 font-medium transition-all duration-200 ${
                          isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                        }`}>
                          {item.name}
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 opacity-50 blur-sm" />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 mt-auto border-t border-gray-800/50">
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
      </aside>

      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
};

export default Sidebar;