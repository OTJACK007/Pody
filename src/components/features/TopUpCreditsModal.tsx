import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Card, CardBody, Button } from "@nextui-org/react";
import { Sparkles, Zap, Star, Crown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface TopUpCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TopUpCreditsModal = ({ isOpen, onClose }: TopUpCreditsModalProps) => {
  const { theme } = useTheme();

  const creditPackages = [
    {
      credits: 100,
      price: '$5',
      icon: <Sparkles className="w-6 h-6" />,
      name: 'Starter Pack',
      color: 'bg-blue-500/10',
      textColor: 'text-blue-500',
      popular: false
    },
    {
      credits: 300,
      price: '$12',
      icon: <Zap className="w-6 h-6" />,
      name: 'Power Pack',
      color: 'bg-primary/10',
      textColor: 'text-primary',
      popular: true
    },
    {
      credits: 500,
      price: '$18',
      icon: <Star className="w-6 h-6" />,
      name: 'Pro Pack',
      color: 'bg-purple-500/10',
      textColor: 'text-purple-500',
      popular: false
    },
    {
      credits: 1000,
      price: '$30',
      icon: <Crown className="w-6 h-6" />,
      name: 'Ultimate Pack',
      color: 'bg-secondary/10',
      textColor: 'text-secondary',
      popular: false
    }
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader>Top Up Credits</ModalHeader>
        <ModalBody className="gap-6 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {creditPackages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-800/50 border-gray-700/50'
                    : 'bg-white border-gray-200'
                } border ${
                  pkg.popular ? 'border-secondary ring-2 ring-secondary' : ''
                } transition-all duration-300 transform hover:scale-[1.02]`}
              >
                <CardBody className="p-4">
                  <div className="relative">
                    {pkg.popular && (
                      <span className="absolute -top-2 -right-2 bg-secondary text-black text-xs font-bold px-2 py-1 rounded-full">
                        Best Value
                      </span>
                    )}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${pkg.color}`}>
                        {pkg.icon}
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold ${pkg.textColor}`}>
                          {pkg.name}
                        </h3>
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                          {pkg.credits} Credits
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className={`text-2xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{pkg.price}</span>
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        USD
                      </span>
                    </div>
                    <Button
                      className={`w-full ${pkg.popular ? 'bg-secondary text-black' : 'bg-primary text-white'}`}
                    >
                      Purchase Now
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TopUpCreditsModal;