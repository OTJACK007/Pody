import React from 'react';
import { Card, CardBody, CardHeader, Avatar } from "@nextui-org/react";
import { Lightbulb, PlayCircle } from 'lucide-react';

const GoalInsights = () => {
  const insights = [
    {
      id: 1,
      title: 'Building Confidence',
      source: 'Public Speaking Mastery',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
      timestamp: '32:15'
    },
    {
      id: 2,
      title: 'Investment Strategies',
      source: 'Financial Freedom',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400',
      timestamp: '45:30'
    },
    {
      id: 3,
      title: 'Course Creation Tips',
      source: 'Digital Education',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      timestamp: '28:45'
    }
  ];

  return (
    <Card className="bg-gray-800/50 border border-gray-700/50">
      <CardHeader className="flex gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Related Insights</h3>
          <p className="text-sm text-gray-400">Key takeaways from podcasts</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer group"
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
                <h4 className="text-white font-medium group-hover:text-primary transition-colors">
                  {insight.title}
                </h4>
                <p className="text-sm text-gray-400">{insight.source}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default GoalInsights;