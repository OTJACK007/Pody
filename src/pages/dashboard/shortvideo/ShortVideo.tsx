import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Brain, Plus, CheckCircle2, Eye, MessageSquare, Share2, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button, Card, CardBody, Avatar, Badge } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import CodyAIChat from '../../../components/features/CodyAIChat';
import RelatedShorts from './components/RelatedShorts';
import KeyInsights from './components/KeyInsights';

const ShortVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const sourceVideoId = location.state?.sourceVideoId;
  const { theme } = useTheme();
  const [showCodyChat, setShowCodyChat] = useState(false);

  const shortData = {
    id: '1',
    title: 'Quick AI Tips for Beginners',
    description: 'Essential tips for getting started with AI development',
    videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
    views: '1.2M',
    likes: '45K',
    shares: '12K',
    channel: {
      name: 'TechBites',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      verified: true,
      subscribers: '500K'
    },
    insights: [
      'Start with basic ML concepts',
      'Focus on data quality',
      'Use pre-trained models',
      'Practice with real projects'
    ]
  };

  return (
    <div className="min-h-screen -mt-[60px]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              isIconOnly
              variant="light"
              onClick={() => sourceVideoId ? navigate(`/dashboard/feedvideo/${sourceVideoId}`) : navigate('/dashboard/livespace')}
              className="text-white hover:text-white/80"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className={`text-xl font-bold ${
                'text-white'
              }`}>{shortData.title}</h1>
              <div className="flex items-center gap-2">
                <Avatar
                  src={shortData.channel.avatar}
                  size="sm"
                  className="ring-2 ring-white/20"
                />
                <span className="text-white">
                  {shortData.channel.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              startContent={<Plus className="w-4 h-4" />}
              className="bg-secondary text-black font-medium hover:bg-secondary/90"
            >
              Add to PodRoom
            </Button>
            <Button
              startContent={<img 
                src="https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png"
                alt="Notion"
                className="w-4 h-4"
              />}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Link to Notion
            </Button>
            <Button
              startContent={<Brain className="w-4 h-4" />}
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => setShowCodyChat(true)}
            >
              Ask Cody AI
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-[84px] pb-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Video Player */}
            <div className="aspect-[9/16] max-w-[500px] mx-auto relative group">
              <Button
                isIconOnly
                className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => navigate('/dashboard/shortvideo/previous-id')}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <video
                src={shortData.videoUrl}
                className="w-full h-full object-cover rounded-xl"
                controls
                autoPlay
                loop
              />
              <Button
                isIconOnly
                className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => navigate('/dashboard/shortvideo/next-id')}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Channel Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar
                  src={shortData.channel.avatar}
                  className="w-12 h-12 ring-2 ring-white/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{shortData.channel.name}</h3>
                    {shortData.channel.verified && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {shortData.channel.subscribers} subscribers
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="bg-primary text-white"
                  startContent={<Plus className="w-4 h-4" />}
                >
                  Follow
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Eye className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  {shortData.views} views
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  {shortData.likes} likes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  {shortData.shares} shares
                </span>
              </div>
            </div>

            {/* Key Insights */}
            <KeyInsights insights={shortData.insights} />
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* ShortsStorm Banner */}
            <Card className="bg-gradient-to-br from-purple-600 via-primary to-orange-500 border-none">
              <CardBody className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://static.wixstatic.com/media/c67dd6_4bfeb28dfbb84aa8b0685bb79c7ab934~mv2.png"
                    alt="ShortsStorm"
                    className="w-12 h-12"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">Start Using ShortStorm Now</h3>
                    <p className="text-white/80">Make perfect shorts in one click</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/20 hover:bg-white/30"
                >
                  Try ShortStorm
                </Button>
              </CardBody>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-secondary text-black font-medium"
                onClick={() => setShowCodyChat(true)}
                startContent={<Brain className="w-4 h-4" />}
              >
                Ask Cody AI
              </Button>
              <Button
                className="flex-1 bg-primary text-white"
                startContent={<Plus className="w-4 h-4" />}
              >
                Add to PodRoom
              </Button>
            </div>

            {/* Related Shorts */}
            <RelatedShorts currentShortId={id} />
          </div>
        </div>
      </div>

      <CodyAIChat 
        isOpen={showCodyChat} 
        onClose={() => setShowCodyChat(false)} 
      />
    </div>
  );
};

export default ShortVideo;