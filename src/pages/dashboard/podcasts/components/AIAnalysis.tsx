import React, { useState } from 'react';
import { Card, CardBody, Progress, Button, Chip } from "@nextui-org/react";
import { Brain, Sparkles, MessageSquare, Lightbulb, TrendingUp, Target } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

export interface AIAnalysisProps {
  video: {
    title: string;
    description?: string;
    topics?: string[];
    aiAnalysis?: {
      key_takeaways: string[];
      content_quality: {
        insightDepth: number;
        actionability: number;
        relevance: number;
        clarity: number;
      };
      recommendations: string[];
    };
  };
  onAskQuestion: () => void;
}

const AIAnalysis = ({ video, onAskQuestion }: AIAnalysisProps) => {
  const { theme } = useTheme();
  // Ensure we always have default values
  const aiInsights = video.aiAnalysis || {
    key_takeaways: [],
    content_quality: {
      insightDepth: 0,
      actionability: 0,
      relevance: 0,
      clarity: 0
    },
    recommendations: []
  };

  return (
    <Card className={`${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white border-gray-200'
    } border`}>
      <CardBody className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-[#ff3366]" />
          <h2 className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>AI Analysis</h2>
        </div>

        <div className="space-y-6">
          {/* Key Takeaways */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Key Takeaways</h3>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <ul className={`list-none space-y-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {aiInsights.key_takeaways.map((takeaway, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Quality */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Content Quality</h3>
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-3">
              {Object.entries(aiInsights.content_quality).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                      {value}%
                    </span>
                  </div>
                  <Progress 
                    value={value} 
                    color={value >= 90 ? 'success' : value >= 70 ? 'primary' : 'warning'} 
                    size="sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Topics */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Topics Covered</h3>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-wrap gap-2">
              {(video.topics || []).map((topic) => (
                <Chip key={topic} size="sm" variant="flat">
                  {topic}
                </Chip>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>AI Recommendations</h3>
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <ul className={`list-none space-y-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {aiInsights.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            className="w-full bg-secondary text-black font-medium hover:bg-secondary/90"
            startContent={<MessageSquare className="w-4 h-4" />}
            onClick={onAskQuestion}
          >
            Ask Questions About This Content
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AIAnalysis;