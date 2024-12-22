import React, { useState } from 'react';
import { Card, CardBody, Button, Progress } from "@nextui-org/react";
import { Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect } from 'react';
import { getVideoTopics } from '../../../../services/videoData';

interface TopicInsightsProps {
  videoId: string;
}

const TopicInsights = ({ videoId }: TopicInsightsProps) => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [topics, setTopics] = useState<Array<{
    id: string;
    topic_name: string;
    relevance: number;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const loadTopics = async () => {
      const data = await getVideoTopics(videoId);
      setTopics(data);
      setIsLoading(false);
    };

    loadTopics();
  }, [videoId]);

  if (isLoading) {
    return <div>Loading topics...</div>;
  }

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <Card
          key={topic.id}
          className={`${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          } border transition-colors`}
        >
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Tag className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{topic.topic_name}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-32">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Relevance
                    </span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {topic.relevance}%
                    </span>
                  </div>
                  <Progress value={topic.relevance} color="primary" size="sm" />
                </div>
                <Button
                  isIconOnly
                  variant="light"
                  onClick={() => setExpandedTopic(expandedTopic === topic.topic_name ? null : topic.topic_name)}
                  className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                >
                  {expandedTopic === topic.topic_name ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>

            {expandedTopic === topic.topic_name && (
              <div className="space-y-3 mt-4 pl-4 border-l-2 border-primary/30">
                <div className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Topic insights will appear here</span>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default TopicInsights;