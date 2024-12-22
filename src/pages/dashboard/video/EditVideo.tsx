import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save, X } from 'lucide-react';
import { Button, Card, CardBody, Input, Textarea, Tabs, Tab } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import { getVideoWithMetadata, updateVideo } from '../../../services/video'; 
import { updateVideoAIAnalysis } from '../../../services/aiAnalysis';
import VideoPreview from './components/VideoPreview';
import EditKeyMoments from './components/EditKeyMoments';
import EditTopics from './components/EditTopics';
import EditTranscript from './components/EditTranscript';
import EditFullContent from './components/EditFullContent';
import EditAIAnalysis from './components/EditAIAnalysis';
import type { Video } from '../../../types/video';

const EditVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('details');
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [videoData, setVideoData] = useState<{
    video: Video;
    insights: any[];
    keyMoments: any[];
    transcript: any[];
    topics: any[];
    fullContent: any;
    aiAnalysis: any;
  } | null>(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (!id || !currentUser?.id) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const data = await getVideoWithMetadata(id);
        if (!data) {
          setError('Video not found');
          return;
        }

        // Check if user owns the video
        if (data.video.publisher_id !== currentUser.id) {
          setError('You do not have permission to edit this video');
          return;
        }

        setVideoData(data);
      } catch (error) {
        console.error('Error loading video:', error);
        setError('Error loading video');
      } finally {
        setIsLoading(false);
      }
    };

    loadVideo();
  }, [id, currentUser?.id]);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser?.id) return;

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      // Upload to thumbnails bucket
      const fileExt = file.name.split('.').pop();
      const fileName = `${currentUser.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('thumbnails')
        .upload(fileName, file, {
          upsert: true
        });
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('thumbnails')
        .getPublicUrl(fileName);
      
      // Update video data with actual URL
      setVideoData(prev => prev ? {
        ...prev,
        video: { ...prev.video, thumbnail: publicUrl }
      } : null);
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      alert('Failed to upload thumbnail. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!videoData) return;

    setIsSaving(true);
    setError(null);
    
    try {
      // Update main video data
      const updatedVideo = await updateVideo(id!, {
        title: videoData.video.title,
        description: videoData.video.description,
        thumbnail: videoData.video.thumbnail,
        updated_at: new Date().toISOString()
      });
      
      if (!updatedVideo) {
        throw new Error('Failed to update video');
      }

      // Update AI analysis
      const updatedAnalysis = await updateVideoAIAnalysis(id!, {
        key_takeaways: videoData.aiAnalysis?.key_takeaways || [],
        content_quality: videoData.aiAnalysis?.content_quality || {
          insightDepth: 0,
          actionability: 0,
          relevance: 0,
          clarity: 0
        },
        recommendations: videoData.aiAnalysis?.recommendations || []
      });

      if (!updatedAnalysis) {
        throw new Error('Failed to update AI analysis');
      }
      
      // Update topics
      const { error: topicsError } = await supabase
        .from('topics')
        .upsert(
          videoData.topics.map(topic => ({
            id: topic.id,
            video_id: id,
            topic_name: topic.topic_name,
            relevance: topic.relevance
          }))
        );

      if (topicsError) throw topicsError;

      // Update key moments
      const { error: keyMomentsError } = await supabase
        .from('key_moments')
        .upsert(
          videoData.keyMoments.map(moment => ({
            id: moment.id,
            video_id: id,
            timestamp: moment.timestamp,
            title: moment.title,
            summary: moment.summary
          }))
        );

      if (keyMomentsError) throw keyMomentsError;

      // Update full content
      const { error: fullContentError } = await supabase
        .from('full_content')
        .upsert({
          video_id: id,
          title: videoData.fullContent.title,
          description: videoData.fullContent.description,
          sections: videoData.fullContent.sections
        }, {
          onConflict: 'video_id'
        });

      if (fullContentError) throw fullContentError;

      navigate(`/dashboard/video/${id}`);
    } catch (error) {
      console.error('Error saving changes:', error);
      setError('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
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

  const { video } = videoData;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            onClick={() => navigate('/dashboard/creator-space/manage-videos')}
            className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Edit Video</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            color="danger"
            variant="flat"
            onClick={() => navigate('/dashboard/creator-space/manage-videos')}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            startContent={<Save className="w-4 h-4" />}
            onClick={handleSave}
            isLoading={isSaving}
          >
            Save Changes
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
        <Tab key="details" title="Basic Details" />
        <Tab key="key-moments" title="Key Moments" />
        <Tab key="topics" title="Topics" />
        <Tab key="transcript" title="Transcript" />
        <Tab key="full-content" title="Full Content" />
        <Tab key="ai-analysis" title="AI Analysis" />
      </Tabs>

      <div className="space-y-6">
        {selectedTab === 'details' && (
          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6 space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Video Title</label>
                <Input
                  value={video.title}
                  onChange={(e) => setVideoData(prev => prev ? {
                    ...prev,
                    video: { ...prev.video, title: e.target.value }
                  } : null)}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Description</label>
                <Textarea
                  value={video.description || ''}
                  onChange={(e) => setVideoData(prev => prev ? {
                    ...prev,
                    video: { ...prev.video, description: e.target.value }
                  } : null)}
                  minRows={4}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Thumbnail</label>
                <div className="relative">
                  <VideoPreview
                    thumbnailUrl={video.thumbnail}
                    onUpload={() => thumbnailInputRef.current?.click()}
                  />
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {selectedTab === 'key-moments' && (
          <EditKeyMoments
            keyMoments={videoData.keyMoments}
            onChange={(newKeyMoments) => setVideoData(prev => prev ? {
              ...prev,
              keyMoments: newKeyMoments
            } : null)}
          />
        )}

        {selectedTab === 'topics' && (
          <EditTopics
            topics={videoData.topics}
            onChange={(newTopics) => setVideoData(prev => prev ? {
              ...prev,
              topics: newTopics
            } : null)}
          />
        )}

        {selectedTab === 'transcript' && (
          <EditTranscript
            transcript={videoData.transcript}
            onChange={(newTranscript) => setVideoData(prev => prev ? {
              ...prev,
              transcript: newTranscript
            } : null)}
          />
        )}

        {selectedTab === 'full-content' && (
          <EditFullContent
            fullContent={videoData.fullContent}
            onChange={(newFullContent) => setVideoData(prev => prev ? {
              ...prev,
              fullContent: newFullContent
            } : null)}
          />
        )}

        {selectedTab === 'ai-analysis' && (
          <EditAIAnalysis
            analysis={videoData.aiAnalysis}
            onChange={(newAnalysis) => setVideoData(prev => prev ? {
              ...prev,
              aiAnalysis: newAnalysis
            } : null)}
          />
        )}
      </div>
    </div>
  );
};

export default EditVideo;