import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Plus, Link as LinkIcon, Sparkles, X } from 'lucide-react';
import { Button, Card, CardBody, Tabs, Tab, Chip, Progress, Avatar, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { getVideoWithMetadata } from '../../../services/video';
import { getVideoAIAnalysis } from '../../../services/aiAnalysis';
import VideoPlayer from '../podcasts/components/VideoPlayer';
import KeyMoments from '../podcasts/components/KeyMoments';
import FullContent from '../podcasts/components/FullContent';
import InsightsList from '../podcasts/components/InsightsList';
import TopicInsights from '../podcasts/components/TopicInsights';
import TranscriptView from '../podcasts/components/TranscriptView';
import CodyAIChat from '../../../components/features/CodyAIChat';
import NotionConnect from '../podcasts/components/NotionConnect';
import AIAnalysis from '../podcasts/components/AIAnalysis';
import RelatedContent from '../podcasts/components/RelatedContent';
import type { Video } from '../../../types/video';

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [showCodyChat, setShowCodyChat] = useState(false);
  const [showNotionModal, setShowNotionModal] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedView, setSelectedView] = useState('full');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [channelData, setChannelData] = useState<any>(null);
  const [videoData, setVideoData] = useState<{
    video: Video;
    aiAnalysis: any;
    insights: any[];
    keyMoments: any[];
    transcript: any[];
    topics: any[];
    fullContent: any;
    relatedVideos: Video[];
  } | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);
      try {
        const data = await getVideoWithMetadata(id);
        if (!data) {
          setError('Video not found');
          return;
        }

        const aiAnalysis = await getVideoAIAnalysis(id);
        
        // Fetch channel data
        const { data: channel } = await supabase
          .from('userchannels')
          .select('*')
          .eq('user_id', data?.video?.publisher_id)
          .single();
        
        setChannelData(channel);
        
        if (!data || !aiAnalysis) {
          setError('Video not found');
          return;
        }

        // Check permissions
        if (data.video.status !== 'public' && data.video.publisher_id !== currentUser?.id) {
          setError('You do not have permission to view this video');
          return;
        }

        setVideoData({
          ...data,
          aiAnalysis
        });
      } catch (error) {
        console.error('Error loading video:', error);
        setError('Error loading video');
      } finally {
        setIsLoading(false);
      }
    };

    loadVideo();
  }, [id, currentUser?.id]);

  const handleNotionExtract = async (pageId: string) => {
    if (!videoData) return;
    
    try {
      await notionService.extractContentToNotion(pageId, {
        title: videoData.video.title,
        description: videoData.video.description,
        overview_section: videoData.fullContent.overview_section,
        deepdive_section: videoData.fullContent.deepdive_section
      });
    } catch (error) {
      console.error('Error extracting to Notion:', error);
      alert('Failed to extract content to Notion. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !videoData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border max-w-md w-full`}>
          <CardBody className="p-6 text-center">
            <X className="w-12 h-12 text-danger mx-auto mb-4" />
            <h2 className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{error}</h2>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Please check the URL and try again
            </p>
            <Button
              className="mt-4"
              color="primary"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const { video, insights, keyMoments, transcript, topics, fullContent, relatedVideos } = videoData;

  return (
    <div className="min-h-screen -mt-[60px]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              isIconOnly
              variant="light"
              onClick={() => navigate(-1)}
              className="text-white hover:text-white/80"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">{video.title}</h1>
              <div className="flex items-center gap-2">
                <Avatar
                  src={channelData?.profile_image || "https://static.wixstatic.com/media/c67dd6_14b426420ff54c82ad19ed7af43ef12b~mv2.png"}
                  size="sm"
                  className="ring-2 ring-white/20"
                />
                <span className="text-white">
                  {channelData?.channel_name || 'Unknown Channel'}
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
                <VideoPlayer videoUrl={video.video_url || ''} />
              </CardBody>
            </Card>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span>{video.duration}</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span>{video.views} views</span>
                </div>
              </div>
              <div className="flex gap-2">
                {topics.slice(0, 3).map((topic, index) => (
                  <Chip key={topic.id} color="primary" variant="flat">
                    {topic.topic_name}
                  </Chip>
                ))}
                {topics.length > 3 && (
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
                        +{topics.length - 3}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className={`${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    } p-3 rounded-lg border ${
                      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                      <div className="flex flex-wrap gap-2 max-w-[200px]">
                        {topics.slice(3).map((topic) => (
                          <Chip key={topic.id} color="primary" variant="flat">
                            {topic.topic_name}
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
              <Tab key="transcript" title="Transcript" />
            </Tabs>

            <div className="mt-6">
              {selectedView === 'full' && fullContent && (
                <FullContent content={fullContent} />
              )}
              {selectedView === 'key-moments' && (
                <KeyMoments moments={keyMoments} />
              )}
              {selectedView === 'insights' && (
                <InsightsList insights={insights} />
              )}
              {selectedView === 'topics' && (
                <TopicInsights topics={topics} moments={keyMoments} />
              )}
              {selectedView === 'transcript' && (
                <TranscriptView transcript={transcript} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sticky top-[84px]">
            <AIAnalysis 
              video={{
                title: video.title,
                description: video.description,
                topics: topics.map(t => t.topic_name),
                aiAnalysis: videoData.aiAnalysis
              }}
              onAskQuestion={() => setShowCodyChat(true)} 
            />
            <RelatedContent videos={relatedVideos} />
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
        onPageSelect={handleNotionExtract}
        title={videoData?.video.title}
      />
    </div>
  );
};

export default VideoPage;