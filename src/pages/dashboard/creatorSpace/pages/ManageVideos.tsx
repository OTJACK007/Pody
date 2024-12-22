import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Filter, Grid, List as ListIcon, Eye, Lock, Globe, MoreVertical, Play, Calendar, Clock } from 'lucide-react';
import { Card, CardBody, Button, Input, Avatar, Badge, Progress, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { getUserVideos, getFilteredVideos, updateVideoStatus, deleteVideo } from '../../../../services/video';
import type { Video } from '../../../../services/video';
import VideoUploadModal from '../components/VideoUploadModal';
import VideoFiltersModal from '../components/VideoFiltersModal';

const ManageVideos = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTab, setSelectedTab] = useState('all');
  const [contentType, setContentType] = useState<'videos' | 'shorts'>('videos');
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');

  useEffect(() => {
    loadVideos();
  }, [currentUser?.id, contentType, selectedTab, dateFilter, durationFilter]);

  const loadVideos = async () => {
    if (!currentUser?.id) return;
    
    setIsLoading(true);
    try {
      const filters = {
        type: contentType === 'videos' ? 'video' : 'short',
        status: selectedTab !== 'all' ? selectedTab as 'public' | 'private' | 'unlisted' : undefined,
        search: searchQuery || undefined,
        date: dateFilter !== 'all' ? dateFilter : undefined,
        duration: durationFilter !== 'all' ? durationFilter : undefined
      };

      const data = await getFilteredVideos(currentUser.id, filters);
      setVideos(data);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (filters: { date: string; duration: string }) => {
    setDateFilter(filters.date);
    setDurationFilter(filters.duration);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'public':
        return 'success';
      case 'private':
        return 'danger';
      case 'unlisted':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'public':
        return <Globe className="w-4 h-4" />;
      case 'private':
        return <Lock className="w-4 h-4" />;
      case 'unlisted':
        return <Eye className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleStatusChange = async (videoId: string, newStatus: string) => {
    try {
      await updateVideoStatus(videoId, newStatus as 'public' | 'private' | 'unlisted');
      loadVideos(); // Reload videos to reflect changes
    } catch (error) {
      console.error('Error updating video status:', error);
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo(videoId);
        loadVideos(); // Reload videos after deletion
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button
          variant="light"
          startContent={<ArrowLeft className="w-4 h-4" />}
          className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
          onClick={() => navigate('/dashboard/creator-space')}
        >
          Back to Creator Space
        </Button>
        <div className="flex items-center gap-3">
          <Button
            startContent={<Filter className="w-4 h-4" />}
            className={`${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
            onClick={() => setShowFiltersModal(true)}
          >
            Filters
          </Button>
          <Button
            startContent={<Upload className="w-4 h-4" />}
            className="bg-primary text-white hover:bg-primary/90"
            onClick={() => setShowUploadModal(true)}
          >
            Upload Video
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && loadVideos()}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
        </div>
      </div>

      <Tabs
        selectedKey={contentType}
        onSelectionChange={(key) => setContentType(key as 'videos' | 'shorts')}
        classNames={{
          tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
          cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
          tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
          tabContent: "group-data-[selected=true]:text-inherit"
        }}
      >
        <Tab key="videos" title="Videos" />
        <Tab key="shorts" title="Shorts" />
      </Tabs>
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
        <Tab key="all" title="All Videos" />
        <Tab key="public" title="Public" />
        <Tab key="private" title="Private" />
        <Tab key="unlisted" title="Unlisted" />
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && (
          <div className="col-span-full flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {!isLoading && videos.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              No videos found. Upload your first video to get started!
            </p>
          </div>
        )}
        {!isLoading && videos.length > 0 && videos
          .filter(video => video.type === contentType.slice(0, -1))
          .map((video) => (
          <Card 
            key={video.id}
            className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white border-gray-200'
            } border hover:scale-[1.02] transition-all duration-300`}
            isPressable
            onPress={() => navigate(`/dashboard/video/${video.id}`)}
          >
            <CardBody className="p-4">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-8 h-8 text-white">
                    <Play className="w-full h-full" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                  {video.duration}
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{video.title}</h3>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      variant="light"
                      className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem onPress={() => navigate(`/dashboard/video/edit/${video.id}`)}>Edit</DropdownItem>
                    <DropdownItem>
                      <div 
                        className="text-danger cursor-pointer w-full"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        Delete
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Eye className="w-4 h-4" />
                    <span>{video.views}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(video.publish_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      size="sm"
                      color={getStatusColor(video.status)}
                      variant="flat"
                      startContent={getStatusIcon(video.status)}
                    >
                      {video.status}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    onAction={(key) => handleStatusChange(video.id, key.toString())}
                  >
                    <DropdownItem key="public" startContent={<Globe className="w-4 h-4" />}>
                      Public
                    </DropdownItem>
                    <DropdownItem key="private" startContent={<Lock className="w-4 h-4" />}>
                      Private
                    </DropdownItem>
                    <DropdownItem key="unlisted" startContent={<Eye className="w-4 h-4" />}>
                      Unlisted
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <VideoUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
      
      <VideoFiltersModal
        isOpen={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  );
};

export default ManageVideos;