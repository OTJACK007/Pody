import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';

interface GuestHeaderProps {
  onBack: () => void;
}

const GuestHeader = ({ onBack }: GuestHeaderProps) => {
  const { theme } = useTheme();

  return (
    <Button
      variant="light"
      startContent={<ArrowLeft className="w-4 h-4" />}
      className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
      onClick={onBack}
    >
      Back to Live Space
    </Button>
  );
};

export default GuestHeader;