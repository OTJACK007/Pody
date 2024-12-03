import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';

interface SettingsHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingsHeader = ({ icon, title, description }: SettingsHeaderProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="mb-8">
      <Button
        variant="light"
        startContent={<ArrowLeft className="w-4 h-4" />}
        className={`mb-4 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
        onClick={() => navigate('/dashboard/settings')}
      >
        Back to Settings
      </Button>
      
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{title}</h1>
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;