import React, { useState, useEffect } from 'react';
import { Headphones, Search, Filter, Grid, List as ListIcon, Upload, Link, Scissors, Wand2, MessageSquare, Video, Mic2, Play, Star, Calendar, ListVideo, Users, CheckCircle2, Trash2 } from 'lucide-react';
import { Input, Button, Tabs, Tab, Card, CardBody, Avatar, Badge, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { usePodroom } from '../../hooks/usePodroom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import FilterPanel from './podcasts/components/FilterPanel';

const PodRoom = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const { videos, isLoading, error, refreshVideos, removeVideo } = usePodroom();

  useEffect(() => {
    refreshVideos();
  }, []);

  const handleRemoveVideo = async (videoId: string) => {
    setVideoToDelete(videoId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (videoToDelete) {
      await removeVideo(videoToDelete);
      setShowDeleteModal(false);
      setVideoToDelete(null);
    }
  };

  const toggleFavorite = async (videoId: string) => {
    try {
      if (!currentUser?.id) return;
      
      const { error } = await supabase
        .from('podroom_videos')
        .update({ 
          is_favorite: !videos.find(v => v.video_id === videoId)?.is_favorite 
        })
        .eq('video_id', videoId)
        .eq('user_id', currentUser.id);

      if (error) throw error;
      await refreshVideos();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const filteredVideos = videos.filter(item => {
    const matchesSearch = item.video?.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'favorites' && item.is_favorite);
    return matchesSearch && matchesTab;
  });

  // Rest of the component remains the same as in the original file...

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Headphones className="w-8 h-8 text-primary" />
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Your PodRoom</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Manage your saved videos and podcasts
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            startContent={<Upload className="w-4 h-4" />}
            className="bg-primary text-white hover:bg-primary/90"
            onClick={() => setShowUploadModal(true)}
          >
            Add Podcast
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search saved content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
        </div>
        <div className="flex items-center gap-3 ml-4">
          <Button
            startContent={<Filter className="w-4 h-4" />}
            className={`${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
            onClick={() => setShowFilters(true)}
          >
            Filters
          </Button>
        </div>
      </div>

      <Tabs 
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key.toString())}
        classNames={{
          tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
          cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
          tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
          tabContent: "group-data-[selected=true]:text-inherit"
        }}
      >
        <Tab key="all" title="All Podcasts" />
        <Tab key="favorites" title="Favorites" />
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-12">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {error}
            </p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              No videos found in your PodRoom.
            </p>
          </div>
        ) : (
          filteredVideos.map((item) => (
            <Card 
              key={item.id}
              isPressable
              onPress={() => navigate(`/dashboard/video/${item.video_id}`)}
              className={`${
                theme === 'dark' 
                  ? 'bg-gray-800/50 border-gray-700/50' 
                  : 'bg-white border-gray-200'
              } border hover:scale-[1.02] transition-all duration-300`}
            >
              <CardBody className="p-4">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={item.video?.thumbnail}
                    alt={item.video?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-sm rounded">
                    {item.video?.duration}
                  </div>
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{item.video?.title}</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={item.video?.channel?.avatar}
                      size="sm"
                      className="ring-2 ring-white/20"
                    />
                    <div className="flex items-center gap-2">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {item.channel_name || 'Unknown Channel'}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      isIconOnly
                      variant="light"
                      isDisabled={!currentUser}
                      className={`${
                        item.is_favorite ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(item.video_id);
                      }}
                    >
                      <Star className="w-4 h-4" fill={item.is_favorite ? 'currentColor' : 'none'} />
                    </Button>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      isDisabled={!currentUser}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveVideo(item.video_id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{item.video?.views} views</span>
                </div>
              </CardBody>
            </Card>
          )))}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setVideoToDelete(null);
        }}
        classNames={{
          base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
          closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
        }}
      >
        <ModalContent>
          <ModalHeader>Remove from PodRoom</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to remove this video from your PodRoom?</p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              onPress={() => {
                setShowDeleteModal(false);
                setVideoToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={confirmDelete}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Remaining modals and components stay the same */}
    </div>
  );
};

export default PodRoom;