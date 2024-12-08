import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Tag, Eye, Plus, Link as LinkIcon, Brain, Sparkles, X } from 'lucide-react';
import { Button, Card, CardBody, Tabs, Tab, Chip, Progress, Avatar, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import VideoPlayer from './components/VideoPlayer';
import KeyMoments from './components/KeyMoments';
import ShortsCarousel from './components/ShortsCarousel';
import InsightsList from './components/InsightsList';
import TopicInsights from './components/TopicInsights';
import CodyAIChat from '../../../components/features/CodyAIChat';
import RelatedContent from '../podcasts/components/RelatedContent';
import NotionConnect from './components/NotionConnect';

const FeedVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [showCodyChat, setShowCodyChat] = useState(false);
  const [showNotionModal, setShowNotionModal] = useState(false);
  const [selectedView, setSelectedView] = useState('full');

  const podcastData = {
    id: '1',
    title: 'The Future of AI Technology',
    description: 'An in-depth discussion about artificial intelligence and its impact on various industries',
    duration: '2:45:30',
    views: '125K',
    channel: {
      name: 'TechInsights',
      avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
      verified: true
    },
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    progress: 75,
    topics: ['AI', 'Technology', 'Future', 'Innovation'],
    keyMoments: [
      {
        timestamp: '00:05:30',
        title: 'Introduction to AI Ethics',
        summary: 'Discussion about the importance of ethical considerations in AI development',
        insights: [
          'AI systems must be designed with clear ethical guidelines',
          'Transparency is crucial for building trust in AI',
          'Ethics should be considered from the start of development'
        ]
      },
      {
        timestamp: '00:15:45',
        title: 'Future of Machine Learning',
        summary: 'Exploring upcoming trends and innovations in machine learning',
        insights: [
          'Automated ML will become more accessible',
          'Edge computing will drive ML innovation',
          'Hybrid AI systems will combine multiple approaches'
        ]
      },
      {
        timestamp: '00:25:20',
        title: 'AI in Healthcare',
        summary: 'Applications and potential impact of AI in the healthcare industry',
        insights: [
          'AI will enhance diagnostic accuracy',
          'Personalized medicine will be revolutionized',
          'Patient care will become more efficient'
        ]
      }
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
              onClick={() => navigate('/dashboard/livespace')}
              className="text-white hover:text-white/80"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className={`text-xl font-bold ${
                'text-white'
              }`}>{podcastData.title}</h1>
              <div className="flex items-center gap-2">
                <Avatar
                  src={podcastData.channel.avatar}
                  size="sm"
                  className="ring-2 ring-white/20"
                />
                <span className="text-white">
                  {podcastData.channel.name}
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
              onClick={() => setShowNotionModal(true)}
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
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            <Card className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white border-gray-200'
            } border`}>
              <CardBody className="p-0">
                <VideoPlayer videoUrl="https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4" />
              </CardBody>
            </Card>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  startContent={<Play className="w-4 h-4" />}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Watch Full Podcast
                </Button>
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{podcastData.duration}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <Eye className="w-4 h-4" />
                  <span>{podcastData.views}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {podcastData.topics.slice(0, 3).map((topic) => (
                  <Chip key={topic} color="primary" variant="flat">
                    {topic}
                  </Chip>
                ))}
                {podcastData.topics.length > 3 && (
                  <Popover placement="bottom">
                    <PopoverTrigger>
                      <Button
                        isIconOnly
                        size="sm" 
                        variant="flat"
                        className={`${
                          theme === 'dark'
                            ? 'bg-gray-700/50 text-white hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                        } w-7 h-7 min-w-0 rounded-full text-sm font-medium`}
                      >
                        +{podcastData.topics.length - 3}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className={`${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } p-3 rounded-lg border ${
                      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div className="flex flex-wrap gap-2 max-w-[200px]">
                        {podcastData.topics.slice(3).map((topic) => (
                          <Chip key={topic} color="primary" variant="flat">
                            {topic}
                          </Chip>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>

            <Tabs 
              selectedKey={selectedView}
              onSelectionChange={(key) => setSelectedView(key.toString())}
              classNames={{
                tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
                cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
                tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
                tabContent: "group-data-[selected=true]:text-inherit"
              }}
            >
              <Tab key="full" title="Full Content" />
              <Tab key="key-moments" title="Key Moments" />
              <Tab key="insights" title="Insights" />
              <Tab key="topics" title="Topics" />
              <Tab key="shorts" title="Shorts" />
            </Tabs>

            <div className="mt-6">
              {selectedView === 'full' && (
                <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {podcastData.description}
                </div>
              )}
              {selectedView === 'key-moments' && (
                <KeyMoments moments={podcastData.keyMoments} />
              )}
              {selectedView === 'insights' && (
                <InsightsList insights={podcastData.keyMoments.flatMap(m => m.insights)} />
              )}
              {selectedView === 'topics' && (
                <TopicInsights topics={podcastData.topics} moments={podcastData.keyMoments} />
              )}
              {selectedView === 'shorts' && (
                <ShortsCarousel shorts={[
                  {
                    id: 'short-1',
                    title: 'AI Ethics Overview',
                    timestamp: '05:30',
                    views: '12.5K',
                    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
                    videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
                    sourceVideoId: podcastData.id
                  },
                  {
                    id: 'short-2',
                    title: 'Future ML Trends',
                    timestamp: '15:45',
                    views: '8.2K',
                    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
                    videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
                    sourceVideoId: podcastData.id
                  },
                  {
                    id: 'short-3',
                    title: 'AI in Healthcare',
                    timestamp: '25:20',
                    views: '15.7K',
                    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
                    videoUrl: 'https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4',
                    sourceVideoId: podcastData.id
                  }
                ]} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-[84px]">
            <Card className={`${
              theme === 'dark' 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white border-gray-200'
            } border`}>
              <CardBody className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>AI Summary</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className={`font-medium mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Key Takeaways</h3>
                    <ul className={`list-disc pl-4 space-y-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <li>AI ethics must be prioritized in development</li>
                      <li>Machine learning is becoming more accessible</li>
                      <li>Healthcare will be transformed by AI applications</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className={`font-medium mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Topics Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {podcastData.topics.map((topic) => (
                        <Chip key={topic} size="sm" variant="flat">
                          {topic}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-medium mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Content Quality</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            Insight Depth
                          </span>
                          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                            95%
                          </span>
                        </div>
                        <Progress value={95} color="success" size="sm" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            Actionability
                          </span>
                          <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                            88%
                          </span>
                        </div>
                        <Progress value={88} color="primary" size="sm" />
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-secondary text-black font-medium hover:bg-secondary/90"
                    onClick={() => setShowCodyChat(true)}
                  >
                    Ask Questions About This Content
                  </Button>
                </div>
              </CardBody>
            </Card>
            <RelatedContent topics={podcastData.topics} />
          </div>
        </div>
      </div>

      <CodyAIChat 
        isOpen={showCodyChat} 
        onClose={() => setShowCodyChat(false)} 
      />

      <NotionConnect
        isOpen={showNotionModal}
        onClose={() => setShowNotionModal(false)}
      />
    </div>
  );
};

export default FeedVideo;