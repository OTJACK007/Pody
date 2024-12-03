import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@nextui-org/react";

interface SettingsHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SettingsHeader = ({ icon, title, description }: SettingsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <Button
        variant="light"
        startContent={<ArrowLeft className="w-4 h-4" />}
        className="mb-4 text-gray-400 hover:text-white"
        onClick={() => navigate('/dashboard/settings')}
      >
        Back to Settings
      </Button>
      
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsHeader;