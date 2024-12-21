import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { useTheme } from '../../../../../contexts/ThemeContext';

const ChannelStats = () => {
  const { theme } = useTheme();
  
  const stats = {
    totalViews: '25M',
    totalEpisodes: 156,
    avgRating: 4.8
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(stats).map(([key, value]) => (
        <Card key={key} className={`${
          theme === 'dark'
            ? 'bg-gray-800/50 border-gray-700/50'
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {value}
            </h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {key.split(/(?=[A-Z])/).join(' ')}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ChannelStats;
