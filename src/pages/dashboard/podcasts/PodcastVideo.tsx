import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, MessageSquare, Share2, Download } from 'lucide-react';
import { Button, Card, CardBody, Avatar, Badge, Progress } from "@nextui-org/react";

const PodcastVideo = () => {
  const navigate = useNavigate();

  const keyMoments = [
    {
      id: 1,
      timestamp: '00:05:30',
      title: 'Introduction to AI Ethics',
      summary: 'Discussion about the importance of ethical considerations in AI development',
      tags: ['AI', 'Ethics', 'Technology']
    },
    {
      id: 2,
      timestamp: '00:15:45',
      title: 'Future of Machine Learning',
      summary: 'Exploring upcoming trends and innovations in machine learning',
      tags: ['ML', 'Future Tech', 'Innovation']
    },
    {
      id: 3,
      timestamp: '00:25:20',
      title: 'AI in Healthcare',
      summary: 'Applications and potential impact of AI in the healthcare industry',
      tags: ['Healthcare', 'AI Applications', 'Medicine']
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          isIconOnly
          variant="light"
          onClick={() => navigate('/dashboard/podcasts')}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">The Future of AI Technology</h1>
          <div className="flex items-center gap-3 mt-2">
            <Avatar
              src="https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400"
              className="ring-2 ring-white/20"
            />
            <div>
              <p className="text-white font-medium">Tech Talks Daily</p>
              <p className="text-sm text-gray-400">John Smith</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
            <video
              src="https://video.wixstatic.com/video/c67dd6_8c436b9b6e42468a9e2b68ea49868528/1080p/mp4/file.mp4"
              controls
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge color="primary" variant="flat">Technology</Badge>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>45 minutes</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                isIconOnly
                variant="light"
                className="text-gray-400 hover:text-white"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                className="text-gray-400 hover:text-white"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                className="text-gray-400 hover:text-white"
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Key Moments</h2>
          {keyMoments.map((moment) => (
            <Card 
              key={moment.id}
              className="bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <CardBody className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white">{moment.title}</h3>
                      <span className="text-sm text-gray-400">{moment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{moment.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {moment.tags.map((tag) => (
                        <Badge key={tag} variant="flat" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodcastVideo;