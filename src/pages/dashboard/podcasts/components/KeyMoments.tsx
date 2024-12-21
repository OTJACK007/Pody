import React from 'react';
import { Card, CardBody, Button, Progress } from "@nextui-org/react";
import { Play, Clock, MessageSquare } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface KeyMoment {
  timestamp: string;
  title: string;
  summary: string;
  insights: string[];
}

interface KeyMomentsProps {
  moments: KeyMoment[];
}

const KeyMoments = ({ moments }: KeyMomentsProps) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-4">
      {moments.map((moment, index) => (
        <Card
          key={index}
          className={`${
            theme === 'dark'
              ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
              : 'bg-white border-gray-200 hover:bg-gray-50'
          } border transition-colors group`}
        >
          <CardBody className="p-4">
            <div className="flex items-start gap-4">
              <Button
                isIconOnly
                className="bg-primary text-white"
                onClick={() => console.log('Play moment')}
              >
                <Play className="w-4 h-4" />
              </Button>

              <div className="flex-grow">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{moment.title}</h3>
                    <p className={`text-sm mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{moment.summary}</p>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>{moment.timestamp}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {moment.insights.map((insight, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4">
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="group-hover:bg-primary/20"
                    >
                      Save Insight
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      className={`${
                        theme === 'dark'
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default KeyMoments;