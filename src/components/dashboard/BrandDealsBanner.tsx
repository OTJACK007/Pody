import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const BrandDealsBanner = ({ isOpen }: { isOpen: boolean }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div 
      onClick={() => navigate('/dashboard/branddeals')}
      className={`relative mx-2 mb-4 rounded-xl overflow-hidden cursor-pointer group ${
        isOpen ? 'h-[140px]' : 'h-16'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient" />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://static.wixstatic.com/media/c67dd6_086459f1bb084f8d9c73f8a852d13ead~mv2.gif"
            alt="360DEALS Logo"
            className={`object-contain ${isOpen ? 'w-10 h-10' : 'w-8 h-8'}`}
          />
          {isOpen && (
            <img 
              src="https://static.wixstatic.com/media/c67dd6_cf685e278f2c44cba6aab77903f78ecf~mv2.gif"
              alt="360DEALS"
              className="h-8 object-contain"
            />
          )}
        </div>

        {isOpen && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-white font-medium">8 Active Deals</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/80">Avg. Deal Value</span>
              <span className="text-sm font-bold text-white">$2.5K - $5K</span>
            </div>
          </div>
        )}
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
      </div>
    </div>
  );
};

export default BrandDealsBanner;