import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { Lightbulb } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface KeyInsightsProps {
  insights: string[];
}

const KeyInsights = ({ insights }: KeyInsightsProps) => {
  const { theme } = useTheme();

  return (
    <Card className={`${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white border-gray-200'
    } border`}>
      <CardBody className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Key Insights</h3>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {insight}
              </p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default KeyInsights;