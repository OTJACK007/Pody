import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Card, CardBody, Button } from "@nextui-org/react";
import { Coins, Crown, Sparkles, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface CreditOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  onTopUp: () => void;
}

const CreditOptionsModal = ({ isOpen, onClose, onUpgrade, onTopUp }: CreditOptionsModalProps) => {
  const { theme } = useTheme();

  const options = [
    {
      title: 'Upgrade Subscription',
      description: 'Get unlimited credits and premium features',
      icon: <Crown className="w-6 h-6 text-secondary" />,
      onClick: onUpgrade,
      color: 'bg-secondary/10 hover:bg-secondary/20',
      textColor: 'text-secondary'
    },
    {
      title: 'Top Up Credits',
      description: 'Purchase additional credits',
      icon: <Coins className="w-6 h-6 text-primary" />,
      onClick: onTopUp,
      color: 'bg-primary/10 hover:bg-primary/20',
      textColor: 'text-primary'
    }
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader>Add Credits</ModalHeader>
        <ModalBody className="gap-4 pb-6">
          {options.map((option) => (
            <Card
              key={option.title}
              isPressable
              className={`${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              } border transition-all duration-300 transform hover:scale-[1.02]`}
              onClick={option.onClick}
            >
              <CardBody className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${option.color}`}>
                    {option.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${option.textColor}`}>
                      {option.title}
                    </h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreditOptionsModal;