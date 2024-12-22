import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Progress } from "@nextui-org/react";
import { Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { supabase } from '../../../../lib/supabase';

interface TopicInsightsProps {
  topics: Array<{
    id: string;
    topic_name: string;
    relevance: number;
    insight_ids?: string[];
  }>;
}

const TopicInsights = ({ topics }: TopicInsightsProps) => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [topicInsights, setTopicInsights] = useState<Record<string, Array<{id: string; content: string}>>>({});
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true);
      const insightsByTopic: Record<string, Array<{id: string; content: string}>> = {};
      
      for (const topic of topics) {
        if (topic.insight_ids && topic.insight_ids.length > 0) {
          const { data: insights, error } = await supabase
            .from('insights')
            .select('id, content')
            .in('id', topic.insight_ids)
            .order('created_at', { ascending: false });
            
          if (!error && insights) {
            insightsByTopic[topic.id] = insights;
          } else {
            console.error('Error fetching insights:', error);
          }
        }
      }
      
      setTopicInsights(insightsByTopic);
      setIsLoading(false);
    };

    fetchInsights();
  }, [topics]);

  return (
    <div className="space-y-4">
      {topics.map((topic) => {
        const insights = topicInsights[topic.id] || [];

        return (
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
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{insights.length} insights found</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Relevance
                      </span>
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        {Math.round(topic.relevance)}%
                      </span>
                    </div>
                    <Progress value={topic.relevance} color="primary" size="sm" />
                  </div>
                {isLoading ? (
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
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
                )}
                </div>
              </div>

              {expandedTopic === topic.topic_name && insights.length > 0 && (
                <div className="space-y-3 mt-4 pl-4 border-l-2 border-primary/30">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{insight.content}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default TopicInsights;