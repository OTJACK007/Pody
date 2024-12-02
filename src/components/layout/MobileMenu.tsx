import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../../types';
import ConnectAppsDropdown from '../features/ConnectAppsDropdown';
import FeaturesMenu from '../features/FeaturesMenu';

interface MobileMenuProps {
  items: NavItem[];
}

const MobileMenu = ({ items }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-primary transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed top-[60px] right-0 w-full bg-background border-t border-gray-800 shadow-lg">
          {items.map((item) => (
            <div key={item.name}>
              <button
                className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-gray-800 transition-colors text-white"
                onClick={() => {
                  if (item.name === 'Connect Apps') {
                    setIsAppsOpen(!isAppsOpen);
                    setIsFeaturesOpen(false);
                  } else if (item.name === 'Features List') {
                    setIsFeaturesOpen(!isFeaturesOpen);
                    setIsAppsOpen(false);
                  }
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
              {item.name === 'Connect Apps' && isAppsOpen && (
                <ConnectAppsDropdown isOpen={true} />
              )}
              {item.name === 'Features List' && isFeaturesOpen && (
                <FeaturesMenu isOpen={true} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;