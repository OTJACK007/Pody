import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Filter, Grid, List as ListIcon, Eye, Lock, Globe, MoreVertical, Play, Calendar, Clock } from 'lucide-react';
import { Card, CardBody, Button, Input, Avatar, Badge, Progress, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';
import VideoUploadModal from '../components/VideoUploadModal';
import VideoFiltersModal from '../components/VideoFiltersModal';

const ManageVideos = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTab, setSelectedTab] = useState('all');
  const [contentType, setContentType] = useState<'videos' | 'shorts'>('videos');

  const videos = [
    {
      id: 1,
      title: 'Getting Started with AI Development',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      views: '125K',
      duration: '15:30',
      publishDate: '2024-03-15',
      status: 'public',
      progress: 100,
      type: 'video'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
      views: '98K',
      duration: '12:45',
      publishDate: '2024-03-14',
      status: 'private',
      progress: 100,
      type: 'video'
    },
    {
      id: 3,
      title: 'Web3 Development Guide',
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
      views: '156K',
      duration: '18:20',
      publishDate: '2024-03-13',
      status: 'unlisted',
      progress: 75,
      type: 'video'
    },
    {
      id: 4,
      title: 'Quick AI Tips',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      views: '250K',
      duration: '0:60',
      publishDate: '2024-03-12',
      status: 'public',
      progress: 100,
      type: 'short'
    },
    {
      id: 5,
      title: 'ML Best Practices',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
      views: '180K',
      duration: '0:45',
      publishDate: '2024-03-11',
      status: 'public',
      progress: 100,
      type: 'short'
    }
  ];

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

  const handleStatusChange = (videoId: number, newStatus: string) => {
    // Handle status change logic here
    console.log(`Changing status of video ${videoId} to ${newStatus}`);
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
          <div className={`flex p-1 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
          }`}>
            <Button
              isIconOnly
              className={viewMode === 'grid' ? 
                theme === 'dark' ? 'bg-gray-700' : 'bg-white' 
                : 'bg-transparent'
              }
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              className={viewMode === 'list' ? 
                theme === 'dark' ? 'bg-gray-700' : 'bg-white' 
                : 'bg-transparent'
              }
              onClick={() => setViewMode('list')}
            >
              <ListIcon className="w-4 h-4" />
            </Button>
          </div>
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
            placeholder={`Search ${contentType}...`}
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

      <div className={viewMode === 'grid' ? 
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
        "space-y-4"
      }>
        {videos.filter(video => video.type === contentType.slice(0, -1)).map((video) => (
          <Card 
            key={video.id}
            className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white border-gray-200'
            } border hover:scale-[1.02] transition-all duration-300`}
            isPressable
            onPress={() => navigate(video.type === 'video' ? '/dashboard/podroom/podcastvideo' : `/dashboard/shortvideo/${video.id}`)}
          >
            <CardBody className="p-4">
              {viewMode === 'grid' ? (
                <>
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
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Analytics</DropdownItem>
                        <DropdownItem
                          className="text-danger"
                          color="danger"
                        >
                          Delete
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
                        <span>{video.publishDate}</span>
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
                  {video.progress < 100 && video.status !== 'unlisted' && (
                    <Progress value={video.progress} color="primary" size="sm" className="mt-4" />
                  )}
                </>
              ) : (
                <div className="flex items-center gap-6">
                  <div className="relative w-48 aspect-video flex-shrink-0 rounded-lg overflow-hidden group">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
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
                  <div className="flex-grow flex flex-col min-w-0 justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-lg font-semibold ${
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
                            <DropdownItem>Edit</DropdownItem>
                            <DropdownItem>Analytics</DropdownItem>
                            <DropdownItem
                              className="text-danger"
                              color="danger"
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className={`flex items-center gap-2 text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Eye className="w-4 h-4" />
                          <span>{video.views} views</span>
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Calendar className="w-4 h-4" />
                          <span>{video.publishDate}</span>
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Clock className="w-4 h-4" />
                          <span>{video.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
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
                      {video.progress < 100 && video.status !== 'unlisted' && (
                        <Progress 
                          value={video.progress}
                          color="primary"
                          size="sm"
                          className="max-w-md"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
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
        onFilterChange={(filters) => {
          console.log('Applied filters:', filters);
          // Handle filter changes here
        }}
      />
    </div>
  );
};

export default ManageVideos;