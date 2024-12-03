import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { Button, Tabs, Tab } from "@nextui-org/react";
import FeaturedChannels from './FeaturedChannels';
import FamousGuests from './FamousGuests';

const FeaturedSection = () => {
  const [showType, setShowType] = useState<'channels' | 'guests'>('channels');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-5xl font-bold text-white bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Featured
        </h2>
        <Tabs 
          selectedKey={showType}
          onSelectionChange={(key) => setShowType(key as 'channels' | 'guests')}
          size="sm"
          classNames={{
            tabList: "bg-gray-800/50 p-1 rounded-lg",
            cursor: "bg-gray-700",
            tab: "text-gray-400 data-[selected=true]:text-white",
          }}
        >
          <Tab key="channels" title="Featured Channels" />
          <Tab key="guests" title="Famous Guests" />
        </Tabs>
      </div>

      {showType === 'channels' ? <FeaturedChannels /> : <FamousGuests />}

      {/* Premium Banner */}
      <div className="mt-8 bg-gradient-to-r from-secondary/20 to-secondary/5 rounded-lg p-6 border border-secondary/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Crown className="w-12 h-12 text-secondary" />
            <div>
              <h3 className="text-xl font-bold text-white">Unlock Premium Features</h3>
              <p className="text-gray-400">Get unlimited access to all content for just $5/month</p>
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