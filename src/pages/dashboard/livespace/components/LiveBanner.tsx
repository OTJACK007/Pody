import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import { Button, Badge, Avatar } from "@nextui-org/react";

const LiveBanner = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-800/50 border border-gray-700 rounded-lg p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 animate-pulse"></div>
      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Badge 
              content="" 
              color="danger" 
              placement="bottom-right" 
              shape="circle" 
              size="sm" 
              classNames={{ badge: "animate-pulse" }}
            >
              <Avatar 
                isBordered 
                radius="lg" 
                size="lg" 
                src="https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400" 
              />
            </Badge>
            <div className="absolute -top-1 -right-1">
              <span className="flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-white">TechInsights</h3>
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Live on</span>
              <img 
                src="https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp" 
                alt="X/Twitter" 
                className="w-5 h-5" 
              />
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>LIVE</span>
              </span>
            </div>
          </div>
        </div>
        <Button 
          endContent={<ExternalLink className="w-4 h-4" />}
          className="bg-[#1DA1F2] text-white hover:bg-[#1A91DA] transition-all duration-300 transform hover:scale-105"
          radius="full"
          size="md"
        >
          Join Live Stream
        </Button>
      </div>
    </div>
  );
};

export default LiveBanner;