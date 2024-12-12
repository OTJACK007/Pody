import React, { useState } from 'react';
import { LayoutDashboard, AppWindow, ListVideo } from 'lucide-react';
import MobileMenu from './MobileMenu';
import ConnectAppsDropdown from '../features/ConnectAppsDropdown';
import FeaturesMenu from '../features/FeaturesMenu';
import AuthDialog from '../auth/AuthDialog';
import { NavItem } from '../../types';

const Header = () => {
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Connect Apps', icon: <AppWindow className="w-5 h-5" /> },
    { name: 'Features', icon: <ListVideo className="w-5 h-5" /> }
  ];

  return (
    <header className="h-[60px] bg-background/95 backdrop-blur-sm text-white fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between w-full h-full px-6">
        <nav className="flex items-center space-x-8">
          <div className="flex items-center">
            <img 
              src="https://static.wixstatic.com/media/c67dd6_5cc828167e994843bb5580cea3f362fa~mv2.png" 
              alt="Logo"
              className="object-contain w-24 h-24" 
            />
          </div>
          <ul className="hidden space-x-6 md:flex">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                <button 
                  className="flex items-center space-x-2 transition-colors hover:text-primary"
                  onClick={() => {
                    if (item.name === 'Connect Apps') setIsAppsOpen(!isAppsOpen);
                    if (item.name === 'Features') setIsFeaturesOpen(!isFeaturesOpen);
                  }}
                  onMouseEnter={() => {
                    if (item.name === 'Connect Apps') setIsAppsOpen(true);
                    if (item.name === 'Features') setIsFeaturesOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (item.name === 'Connect Apps') setIsAppsOpen(false);
                    if (item.name === 'Features') setIsFeaturesOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
                {item.name === 'Connect Apps' && (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsAppsOpen(true)}
                    onMouseLeave={() => setIsAppsOpen(false)}
                  >
                    <ConnectAppsDropdown isOpen={isAppsOpen} />
                  </div>
                )}
                {item.name === 'Features' && (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsFeaturesOpen(true)}
                    onMouseLeave={() => setIsFeaturesOpen(false)}
                  >
                    <FeaturesMenu isOpen={isFeaturesOpen} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="items-center hidden h-10 px-4 space-x-2 text-white transition-colors rounded-lg md:flex bg-secondary/20 hover:bg-secondary/30">
            <img 
              src="https://static.wixstatic.com/media/c67dd6_6c38c4c1f3524c42b5c7c30b68fdd9bf~mv2.png" 
              alt="Discord"
              className="w-5 h-5"
            />
            <span>Join our Discord</span>
          </button>
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center px-4 py-2 space-x-2 transition-colors rounded-lg bg-primary hover:bg-primary/90"
          >
            <img 
              src="https://static.wixstatic.com/shapes/c67dd6_53baa9a980544d87b59c68b9b0020981.svg" 
              alt="Join icon"
              className="w-5 h-5"
            />
            <span className="font-medium">Join Now</span>
          </button>
          <MobileMenu items={navItems} />
        </div>
      </div>

      {isAuthOpen && <AuthDialog onClose={() => setIsAuthOpen(false)} />}
    </header>
  );
};

export default Header;