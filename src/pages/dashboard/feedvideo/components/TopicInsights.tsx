import React, { useState } from 'react';
import { Card, CardBody, Button, Progress } from "@nextui-org/react";
import { Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface KeyMoment {
  timestamp: string;
  title: string;
  summary: string;
  insights: string[];
}

interface TopicInsightsProps {
  topics: string[];
  moments: KeyMoment[];
}

const TopicInsights = ({ topics, moments }: TopicInsightsProps) => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const { theme } = useTheme();

  const getTopicInsights = (topic: string) => {
    return moments.flatMap(moment => 
      moment.insights.filter(insight => 
        insight.toLowerCase().includes(topic.toLowerCase())
      )
    );
  };

  const getTopicRelevance = (topic: string) => {
    const insights = getTopicInsights(topic);
    return Math.min(100, (insights.length / moments.length) * 100);
  };

  return (
    <div className="space-y-4">
      {topics.map((topic) => {
        const isExpanded = expandedTopic === topic;
        const insights = getTopicInsights(topic);
        const relevance = getTopicRelevance(topic);

        return (
          <Card
            key={topic}
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
                    }`}>{topic}</h3>
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
                        {Math.round(relevance)}%
                      </span>
                    </div>
                    <Progress value={relevance} color="primary" size="sm" />
                  </div>
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => setExpandedTopic(isExpanded ? null : topic)}
                    className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {isExpanded && (
                <div className="space-y-3 mt-4 pl-4 border-l-2 border-primary/30">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`${
                        theme === 'dark' ? 'text-gray-300' :  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{insight}</span>
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