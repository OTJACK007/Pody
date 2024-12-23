import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock, ExternalLink, Search, Filter } from 'lucide-react';
import { Card, CardBody, Avatar, Button, Input, Badge, Tabs, Tab } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { supabase } from '../../../lib/supabase';

interface LiveCreator {
  id: string;
  channel_name: string;
  profile_image: string;
  streaming_platform: string;
  stream_title: string;
  stream_viewers: number;
  stream_started_at: string;
}

const LiveCreators = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [creators, setCreators] = useState<LiveCreator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadCreators = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('userchannels')
          .select('*')
          .eq('is_streaming', true)
          .order('stream_viewers', { ascending: false });

        if (error) throw error;
        setCreators(data || []);
      } catch (error) {
        console.error('Error loading live creators:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCreators();
  }, []);

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.channel_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         creator.stream_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || creator.streaming_platform === selectedPlatform;
    return matchesSearch && matchesPlatform;
  });

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'YouTube': return 'text-red-500 bg-red-500/10';
      case 'Twitch': return 'text-purple-500 bg-purple-500/10';
      case 'Kick': return 'text-green-500 bg-green-500/10';
      case 'X': return 'text-blue-400 bg-blue-400/10';
      case 'TikTok': return 'text-pink-500 bg-pink-500/10';
      case 'Instagram': return 'text-purple-500 bg-purple-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube':
        return 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png';
      case 'Twitch':
        return 'https://static.wixstatic.com/media/c67dd6_089d6bbd564f44d283886219447b54da~mv2.png';
      case 'Kick':
        return 'https://static.wixstatic.com/media/c67dd6_39dedfcfc65b4375a61bf0e763ac8447~mv2.png';
      case 'X':
        return 'https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp';
      case 'TikTok':
        return 'https://static.wixstatic.com/media/c67dd6_669a072e9da540e3aef4ab2262eb8693~mv2.png';
      case 'Instagram':
        return 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png';
      default:
        return '';
    }
  };

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          isIconOnly
          variant="light"
          onClick={() => navigate('/dashboard/livespace')}
          className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Watch Live Creators</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            {filteredCreators.length} creators streaming right now
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search live creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
        </div>
      </div>

      <Tabs 
        selectedKey={selectedPlatform}
        onSelectionChange={(key) => setSelectedPlatform(key.toString())}
        classNames={{
          tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
          cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
          tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
          tabContent: "group-data-[selected=true]:text-inherit"
        }}
      >
        <Tab key="all" title="All Platforms" />
        <Tab key="YouTube" title={
          <div className="flex items-center gap-2">
            <img src={getPlatformIcon('YouTube')} alt="YouTube" className="w-4 h-4" />
            <span>YouTube</span>
          </div>
        } />
        <Tab key="Twitch" title={
          <div className="flex items-center gap-2">
            <img src={getPlatformIcon('Twitch')} alt="Twitch" className="w-4 h-4" />
            <span>Twitch</span>
          </div>
        } />
        <Tab key="Kick" title={
          <div className="flex items-center gap-2">
            <img src={getPlatformIcon('Kick')} alt="Kick" className="w-4 h-4" />
            <span>Kick</span>
          </div>
        } />
        <Tab key="X" title={
          <div className="flex items-center gap-2">
            <img src={getPlatformIcon('X')} alt="X" className="w-4 h-4" />
            <span>X</span>
          </div>
        } />
        <Tab key="TikTok" title={
          <div className="flex items-center gap-2">
            <img src={getPlatformIcon('TikTok')} alt="TikTok" className="w-4 h-4" />
            <span>TikTok</span>
          </div>
        } />
        <Tab key="Instagram" title={
          <div className="flex items-center gap-2">
            <img src={getPlatformIcon('Instagram')} alt="Instagram" className="w-4 h-4" />
            <span>Instagram</span>
          </div>
        } />
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredCreators.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              No live creators found
            </p>
          </div>
        ) : (
          filteredCreators.map((creator) => (
            <Card
              isFooterBlurred
              key={creator.id}
              className={`${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700/50' 
                  : 'bg-white border-gray-200'
              } border group hover:scale-[1.02] transition-all duration-300 overflow-hidden`}
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={creator.profile_image}
                  alt={creator.channel_name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={creator.profile_image}
                      className="ring-2 ring-white w-10 h-10"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{creator.channel_name}</h3>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Users className="w-3 h-3" />
                        <span>{formatViewers(creator.stream_viewers)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary`}>
                    <img 
                      src={getPlatformIcon(creator.streaming_platform)}
                      alt={creator.streaming_platform}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">LIVE</span>
                  </div>
                </div>
              </div>
              <CardBody className="absolute bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 w-full before:rounded-xl rounded-large">
                <div className="flex flex-grow gap-2 items-center">
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/80">{creator.stream_title}</p>
                    <p className="text-tiny text-white/80">
                      Live for {formatStreamTime(creator.stream_started_at)}
                    </p>
                  </div>
                  <Button
                    className="bg-primary text-white ml-auto"
                    variant="flat"
                    size="sm"
                    endContent={<ExternalLink className="w-3 h-3" />}
                  >
                    Watch
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveCreators;