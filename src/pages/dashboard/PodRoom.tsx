import React, { useState } from 'react';
import { Headphones, Search, Filter, Grid, List as ListIcon, Upload, Link, Scissors, Wand2, MessageSquare, Video, Mic2, Play, Star, Calendar, ListVideo, Users } from 'lucide-react';
import { Input, Button, Tabs, Tab, Card, CardBody, Avatar, Badge, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import FilterPanel from './podcasts/components/FilterPanel';

const allPodcasts = [
  {
    id: 1,
    title: 'Tech Talks Daily',
    host: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
    coverImage: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=800',
    category: 'Technology',
    episodes: 156,
    rating: 4.8,
    listeners: '1.2M',
    progress: 75,
    addedDate: '2024-03-15',
    isFavorite: true
  },
  {
    id: 2,
    title: 'Mindset Mastery',
    host: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
    coverImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800',
    category: 'Personal Growth',
    episodes: 89,
    rating: 4.9,
    listeners: '850K',
    progress: 45,
    addedDate: '2024-03-14',
    isFavorite: false
  },
  {
    id: 3,
    title: 'Business Insights',
    host: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    coverImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
    category: 'Business',
    episodes: 234,
    rating: 4.7,
    listeners: '950K',
    progress: 60,
    addedDate: '2024-03-13',
    isFavorite: true
  },
  {
    id: 4,
    title: 'Fitness Revolution',
    host: 'Alex Turner',
    avatar: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    category: 'Health',
    episodes: 120,
    rating: 4.6,
    listeners: '750K',
    progress: 30,
    addedDate: '2024-03-12',
    isFavorite: false
  },
  {
    id: 5,
    title: 'Creative Minds',
    host: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    category: 'Entertainment',
    episodes: 78,
    rating: 4.5,
    listeners: '680K',
    progress: 85,
    addedDate: '2024-03-11',
    isFavorite: true
  }
];

interface Podcast {
  id: number;
  title: string;
  host: string;
  avatar: string;
  coverImage: string;
  category: string;
  episodes: number;
  rating: number;
  listeners: string;
  progress: number;
  addedDate: string;
  isFavorite?: boolean;
}

const PodRoom = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showOpusClipModal, setShowOpusClipModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'file' | 'link' | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterDuration, setFilterDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [podcasts, setPodcasts] = useState(allPodcasts);

  const handleFilterChange = (filters: any) => {
    setFilterCategory(filters.category || 'all');
    setFilterRating(filters.rating || 'all');
    setFilterDuration(filters.duration || 'all');
  };

  const toggleFavorite = (podcastId: number) => {
    setPodcasts(prevPodcasts => 
      prevPodcasts.map(podcast => 
        podcast.id === podcastId 
          ? { ...podcast, isFavorite: !podcast.isFavorite }
          : podcast
      )
    );
  };

  const getFilteredPodcasts = () => {
    let filtered = [...podcasts];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(podcast => 
        podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        podcast.host.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(podcast => podcast.category === filterCategory);
    }

    // Filter by rating
    if (filterRating !== 'all') {
      const minRating = parseInt(filterRating);
      filtered = filtered.filter(podcast => podcast.rating >= minRating);
    }

    // Filter by duration (if we had duration data)
    
    // Filter by tab
    switch (activeTab) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'favorites':
        filtered = filtered.filter(podcast => podcast.isFavorite);
        break;
    }
    
    return filtered;
  };
  const features = [
    { id: 'shorts', title: 'Turn long video into viral shorts', icon: <Scissors className="w-6 h-6" /> },
    { id: 'longToShorts', title: 'Long to shorts', icon: <Video className="w-6 h-6" /> },
    { id: 'captions', title: 'AI Captions', icon: <MessageSquare className="w-6 h-6" /> },
    { id: 'reframe', title: 'AI Reframe', icon: <Wand2 className="w-6 h-6" /> },
    { id: 'broll', title: 'AI B-Roll', icon: <Video className="w-6 h-6" /> },
    { id: 'voiceover', title: 'AI Voice-over', icon: <Mic2 className="w-6 h-6" /> }
  ];

  const handleUpload = async () => {
    setIsProcessing(true);
    
    // Simulate upload and processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    // Navigate to podcast video page after processing
    navigate('/dashboard/podroom/podcastvideo');
    setIsProcessing(false);
    setShowUploadModal(false);
  };

  const handlePodcastClick = (podcastId: number) => {
    navigate(`/dashboard/podroom/podcastvideo`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Headphones className="w-8 h-8 text-primary" />
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Your Podcasts Room</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Manage and edit your podcast content
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
            placeholder="Search podcasts..."
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className={`flex p-1 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'
          }`}>
            <Button
              isIconOnly
              className={`transition-colors ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-white'
              } ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              className={`transition-colors ${
                viewMode === 'list' ? 
                  theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                : 'bg-transparent'
              } ${viewMode === 'list' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setViewMode('list')}
            >
              <ListIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs 
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key.toString())}
        classNames={{
          tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
          cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
          tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
          tabContent: "group-data-[selected=true]:text-inherit"
        }}
      >
        <Tab key="all" title="All Podcasts" />
        <Tab key="recent" title="Recently Added" />
        <Tab key="popular" title="Most Popular" />
        <Tab key="favorites" title="Favorites" />
      </Tabs>

      <div className={viewMode === 'grid' ? 
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : 
        "w-full space-y-4"
      }>
        {getFilteredPodcasts().map((podcast) => (
          <Card 
            key={podcast.id} 
            isPressable
            isHoverable
            className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white border-gray-200'
            } border w-full`}
            onClick={() => handlePodcastClick(podcast.id)}
          >
            <CardBody className="p-4">
              {viewMode === 'grid' ? (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={podcast.coverImage}
                  alt={podcast.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar
                      src={podcast.avatar}
                      className="ring-2 ring-white/20"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{podcast.title}</h3>
                      <p className="text-sm text-gray-300">{podcast.host}</p>
                    </div>
                  </div>
                  <Progress 
                    value={podcast.progress} 
                    color="success"
                    size="sm"
                    className="max-w-full"
                  />
                </div>
              </div>
              ) : (
                <div className="flex items-center gap-6">
                  <div className="relative w-48 aspect-video flex-shrink-0 rounded-lg overflow-hidden group">
                    <img
                      src={podcast.coverImage}
                      alt={podcast.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                      45:30
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col min-w-0 justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={podcast.avatar}
                            className="w-10 h-10 ring-2 ring-white/20"
                          />
                          <div>
                            <h3 className={`text-lg font-semibold ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{podcast.title}</h3>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>{podcast.host}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          isIconOnly
                          className={`${
                            podcast.isFavorite
                              ? 'bg-primary/20 text-primary'
                              : theme === 'dark'
                                ? 'bg-gray-700/50 text-gray-400 hover:text-white'
                                : 'bg-gray-100 text-gray-600 hover:text-black'
                          } transition-colors`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(podcast.id);
                          }}
                        >
                          <Star className={podcast.isFavorite ? 'fill-current' : ''} />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge color="primary" variant="flat">
                          {podcast.category}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">★</span>
                          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                            {podcast.rating}
                          </span>
                        </div>
                        <div className={`flex items-center gap-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          <Users className="w-4 h-4" />
                          <span>{podcast.listeners}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Progress
                        value={podcast.progress}
                        color="success"
                        size="sm"
                        showValueLabel
                        className="max-w-full"
                        label="Progress"
                        valueLabel={`${podcast.progress}%`}
                        classNames={{
                          label: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
                          value: theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }}
                      />

                      <div className={`flex items-center gap-4 mt-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Added {podcast.addedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ListVideo className="w-4 h-4" />
                          <span>{podcast.episodes} Episodes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Add Podcast Modal */}
      <Modal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)}
        size="2xl"
        classNames={{
          base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
          closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
        }}
      >
        <ModalContent>
          <ModalHeader>Add New Podcast</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Card
                isPressable
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                    : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                } border transition-colors`}
                onClick={() => setUploadType('file')}
              >
                <CardBody className="p-6 text-center">
                  <Upload className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Upload File</h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Upload from your device
                  </p>
                </CardBody>
              </Card>

              <Card
                isPressable
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                    : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                } border transition-colors`}
                onClick={() => setUploadType('link')}
              >
                <CardBody className="p-6 text-center">
                  <Link className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Import from URL</h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Add from YouTube or other platforms
                  </p>
                </CardBody>
              </Card>
            </div>

            {uploadType === 'link' && (
              <div className="mt-4">
                <Input
                  label="YouTube URL"
                  placeholder="https://youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>
            )}

            {isProcessing && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    Processing...
                  </span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {uploadProgress}%
                  </span>
                </div>
                <Progress 
                  value={uploadProgress} 
                  color="primary"
                  className="max-w-full"
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setShowUploadModal(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleUpload}
              isLoading={isProcessing}
            >
              {uploadType === 'file' ? 'Upload' : 'Import'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Filter Modal */}
      <Modal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        size="lg"
        classNames={{
          base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
          closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
        }}
      >
        <ModalContent>
          <FilterPanel 
            onClose={() => setShowFilters(false)}
            onFilterChange={handleFilterChange}
          />
        </ModalContent>
      </Modal>

      {/* OpusClip Features Modal */}
      <Modal 
        isOpen={showOpusClipModal} 
        onClose={() => setShowOpusClipModal(false)}
        size="2xl"
        classNames={{
          base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
          closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              OpusClip Features
            </h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Choose a feature to enhance your content
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  isPressable
                  className={`${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                      : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                  } border transition-colors`}
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <CardBody className="p-6">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        {feature.icon}
                      </div>
                      <h3 className={`text-lg font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{feature.title}</h3>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setShowOpusClipModal(false)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              isDisabled={!selectedFeature}
            >
              Continue with OpusClip
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PodRoom;