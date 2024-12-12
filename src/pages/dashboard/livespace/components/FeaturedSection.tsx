import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { Button, Tabs, Tab } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';
import FeaturedChannels from './FeaturedChannels';
import FamousGuests from './FamousGuests';

const FeaturedSection = () => {
  const [showType, setShowType] = useState('guests');
  const { theme } = useTheme();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-5xl font-bold bg-gradient-to-r from-${
          theme === 'dark' ? 'white' : 'gray-900'
        } to-gray-500 bg-clip-text text-transparent`}>
          Featured
        </h2>
        <Tabs 
          selectedKey={showType}
          onSelectionChange={(key) => setShowType(key as 'channels' | 'guests')}
          size="sm"
          classNames={{
            tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
            cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
            tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
            tabContent: "group-data-[selected=true]:text-inherit"
          }}
        >
          <Tab key="guests" title="Famous Guests" />
          <Tab key="channels" title="Featured Channels" />
        </Tabs>
      </div>

      {showType === 'guests' ? <FamousGuests /> : <FeaturedChannels />}

      {/* Premium Banner */}
      <div className={`mt-8 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-800/50 border-gray-700'
          : 'bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 border-gray-200'
      } rounded-lg p-6 border relative overflow-hidden`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Crown className="w-12 h-12 text-secondary" />
            <div>
              <h3 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Unlock Premium Features</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Get unlimited access to all content for just $5/month
              </p>
            </div>
          </div>
          <Button
            color="success"
            size="lg"
            className="bg-secondary text-black font-semibold"
          >
            Subscribe for $5
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;