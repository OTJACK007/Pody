import React, { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle2, Users, Clock, ArrowRight } from 'lucide-react';
import { Button, Badge, Avatar } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../contexts/ThemeContext';
import { supabase } from '../../../../lib/supabase';

interface LiveCreator {
  id: string;
  channel_name: string;
  profile_image: string;
  streaming_platform: string;
  stream_title: string;
  stream_viewers: number;
  stream_started_at: string;
}

const LiveBanner = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [featuredCreator, setFeaturedCreator] = useState<LiveCreator | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('userchannels')
          .select('*')
          .eq('is_streaming', true)
          .order('stream_viewers', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setFeaturedCreator(data);
      } catch (error) {
        console.error('Error loading live creators:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedCreator();
  }, []);

  const formatViewers = (viewers: number) => {
    if (viewers >= 1000000) {
      return `${(viewers / 1000000).toFixed(1)}M`;
    }
    if (viewers >= 1000) {
      return `${(viewers / 1000).toFixed(1)}K`;
    }
    return viewers.toString();
  };

  const formatStreamTime = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60);
    
    if (diff < 60) {
      return `${diff}m`;
    }
    return `${Math.floor(diff / 60)}h ${diff % 60}m`;
  };

  if (!featuredCreator) return null;

  return (
    <div className={`${
      theme === 'dark'
        ? 'bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-800/50 border-gray-700/50'
        : 'bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 border-gray-200/50'
    } border rounded-lg relative overflow-hidden group`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 animate-pulse pointer-events-none" />
      
      <div className="relative p-6 flex items-center gap-8 z-10">
        <div className="relative">
          <Avatar
            src={featuredCreator.profile_image}
            className="w-24 h-24 ring-4 ring-primary/20"
          />
          <div className="absolute -top-2 -right-2">
            <div className="p-2 rounded-full bg-background">
              <img 
                src="https://static.wixstatic.com/media/c67dd6_089d6bbd564f44d283886219447b54da~mv2.png"
                alt="Twitch"
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <h2 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{featuredCreator.channel_name}</h2>
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <Badge
              content=""
              color="danger"
              placement="bottom-right"
              className="animate-pulse"
            >
              <span className="text-sm font-semibold text-primary">LIVE</span>
            </Badge>
          </div>
          
          <p className={`text-lg mb-3 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>{featuredCreator.stream_title}</p>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}> 
              <Users className="w-4 h-4" />
              <span>{formatViewers(featuredCreator.stream_viewers)} viewers</span>
            </div>
            <div className={`flex items-center gap-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Clock className="w-4 h-4" />
              <span>Live for {formatStreamTime(featuredCreator.stream_started_at)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            className="bg-primary text-white"
            radius="full"
            size="lg"
            endContent={<ExternalLink className="w-4 h-4" />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://twitch.tv/${featuredCreator.channel_name}`, '_blank');
            }}
            style={{ position: 'relative', zIndex: 20 }}
          >
            Watch Stream
          </Button>
          <Button
            className="bg-primary text-white"
            radius="full"
            size="lg"
            endContent={<ArrowRight className="w-4 h-4" />}
            onClick={(e) => {
              e.preventDefault(); 
              e.stopPropagation();
              navigate('/dashboard/livespace/live-creators');
            }}
            style={{ position: 'relative', zIndex: 20 }}
          >
            View All Live
          </Button>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default LiveBanner;