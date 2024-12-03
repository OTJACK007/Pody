import React, { useState } from 'react';
import { Headphones, Search, Filter, Grid, List as ListIcon, Upload, Link, Scissors, Wand2, MessageSquare, Video, Mic2 } from 'lucide-react';
import { Input, Button, Tabs, Tab, Card, CardBody, Avatar, Badge, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';

const Podcasts = () => {
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showOpusClipModal, setShowOpusClipModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'file' | 'link' | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  const podcasts = [
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
      progress: 75
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
      progress: 45
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
      progress: 60
    }
  ];

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
    navigate('/dashboard/podcasts/podcastvideo');
    setIsProcessing(false);
    setShowUploadModal(false);
  };

  const handlePodcastClick = (podcastId: number) => {
    navigate(`/dashboard/podcasts/podcastvideo`);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Headphones className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-white">Podcasts</h1>
            <p className="text-gray-400 mt-1">Manage and edit your podcast content</p>
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
            classNames={{
              input: "bg-gray-700/50 text-white",
              inputWrapper: "bg-gray-700/50 border-gray-600"
            }}
          />
        </div>
        <div className="flex items-center gap-3 ml-4">
          <Button
            startContent={<Filter className="w-4 h-4" />}
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            Filters
          </Button>
          <div className="flex bg-gray-800/50 p-1 rounded-lg">
            <Button
              isIconOnly
              className="bg-gray-700"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              className="bg-transparent"
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
          tabList: "bg-gray-800/50 p-1 rounded-lg",
          cursor: "bg-gray-700",
          tab: "text-gray-400 data-[selected=true]:text-white",
        }}
      >
        <Tab key="all" title="All Podcasts" />
        <Tab key="recent" title="Recently Added" />
        <Tab key="popular" title="Most Popular" />
        <Tab key="favorites" title="Favorites" />
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast) => (
          <Card 
            key={podcast.id} 
            isPressable
            isHoverable
            className="bg-gray-800/50 border border-gray-700/50"
            onClick={() => handlePodcastClick(podcast.id)}
          >
            <CardBody className="p-6">
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

              <div className="flex items-center justify-between mb-4">
                <Badge color="primary" variant="flat">
                  {podcast.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white">{podcast.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{podcast.episodes} Episodes</span>
                <span>{podcast.listeners} Listeners</span>
              </div>
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
          base: "bg-gray-800 text-white",
          closeButton: "text-white hover:bg-gray-700"
        }}
      >
        <ModalContent>
          <ModalHeader>Add New Podcast</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Card
                isPressable
                className="bg-gray-700/50 border border-gray-600 hover:bg-gray-700 transition-colors"
                onClick={() => setUploadType('file')}
              >
                <CardBody className="p-6 text-center">
                  <Upload className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="text-lg font-semibold">Upload File</h3>
                  <p className="text-sm text-gray-400">Upload from your device</p>
                </CardBody>
              </Card>

              <Card
                isPressable
                className="bg-gray-700/50 border border-gray-600 hover:bg-gray-700 transition-colors"
                onClick={() => setUploadType('link')}
              >
                <CardBody className="p-6 text-center">
                  <Link className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="text-lg font-semibold">Import from URL</h3>
                  <p className="text-sm text-gray-400">Add from YouTube or other platforms</p>
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
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>
            )}

            {isProcessing && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Processing...</span>
                  <span className="text-sm text-white">{uploadProgress}%</span>
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

      {/* OpusClip Features Modal */}
      <Modal 
        isOpen={showOpusClipModal} 
        onClose={() => setShowOpusClipModal(false)}
        size="2xl"
        classNames={{
          base: "bg-gray-800 text-white",
          closeButton: "text-white hover:bg-gray-700"
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-2xl">OpusClip Features</h2>
            <p className="text-sm text-gray-400">Choose a feature to enhance your content</p>
          </ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  isPressable
                  className="bg-gray-700/50 border border-gray-600 hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <CardBody className="p-6">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
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

export default Podcasts;