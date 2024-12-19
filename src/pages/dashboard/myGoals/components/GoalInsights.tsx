import React from 'react';
import { Card, CardBody, CardHeader, Avatar } from "@nextui-org/react";
import { Lightbulb, PlayCircle } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useGoals } from '../../../../contexts/GoalsContext';
import { useNavigate } from 'react-router-dom';

const GoalInsights = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { goals } = useGoals();
  
  const insights = goals
    .filter(goal => goal.linkedContent?.length > 0)
    .slice(0, 3)
    .map(goal => ({
      id: goal.id,
      title: goal.linkedContent[0].title,
      source: goal.title,
      image: goal.linkedContent[0].thumbnailUrl,
      timestamp: goal.linkedContent[0].sourceUrl,
      videoId: goal.linkedContent[0].id
    }));

  const handleVideoClick = (videoId: string) => {
    navigate(`/dashboard/feedvideo/${videoId}`);
  };

  return (
    <Card className={`${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white border-gray-200'
    } border`}>
      <CardHeader className="flex gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Related Insights</h3>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Key takeaways from podcasts
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`flex items-start gap-3 p-2 rounded-lg ${
                theme === 'dark'
                  ? 'hover:bg-gray-700/30'
                  : 'hover:bg-gray-100'
              } transition-colors cursor-pointer group`}
              onClick={() => handleVideoClick(insight.videoId)}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle className="w-8 h-8 text-white" />
                </div>
                <span className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-1 rounded">
                  {insight.timestamp}
                </span>
              </div>
              <div>
                <h4 className={`font-medium group-hover:text-primary transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {insight.title}
                </h4>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {insight.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default GoalInsights;