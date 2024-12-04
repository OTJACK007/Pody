import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';

interface CreatorToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const CreatorToolCard = ({ title, description, icon, color }: CreatorToolCardProps) => {
  const { theme } = useTheme();

  return (
    <Card 
      isPressable
      className={`${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } border transition-all duration-300 transform hover:scale-[1.02]`}
    >
      <CardBody className="p-4">
        <div className={`p-3 rounded-xl ${color} mb-3 w-fit`}>
          {icon}
        </div>
        <h3 className={`text-lg font-semibold mb-1 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>{title}</h3>
        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          {description}
        </p>
      </CardBody>
    </Card>
  );
};

export default CreatorToolCard;