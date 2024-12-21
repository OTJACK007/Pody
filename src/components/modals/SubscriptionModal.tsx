import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Card, CardBody, Button } from "@nextui-org/react";
import { Crown, Check, Star } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  channelName: string;
  subscriptionPrice: string;
}

const SubscriptionModal = ({ isOpen, onClose, channelName, subscriptionPrice }: SubscriptionModalProps) => {
  const { theme } = useTheme();

  const benefits = [
    {
      title: 'Shogun360 Basic Plan',
      price: '$5',
      description: 'Unlock all content across the platform',
      features: [
        'Access to all videos and content',
        'AI-powered summaries',
        'Knowledge library access',
        'Basic analytics'
      ]
    },
    {
      title: channelName + ' Channel',
      price: '$7.99',
      description: 'Support your favorite creator',
      features: [
        'Exclusive content access',
        'Early access to new episodes',
        'Ad-free experience',
        'Exclusive community access',
        'Direct messaging with creator',
        'Monthly Q&A sessions'
      ]
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
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Crown className="w-6 h-6 text-secondary" />
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Choose Your Plan
            </h2>
          </div>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Select the plan that best fits your needs
          </p>
        </ModalHeader>
        <ModalBody className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((plan, index) => (
            <Card key={index} className={`${
            theme === 'dark'
              ? 'bg-gray-700/50 border-gray-600'
              : 'bg-gray-50 border-gray-200'
          } border`}>
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{plan.title}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className={`text-3xl font-bold ${
                      theme === 'dark' ? 'text-secondary' : 'text-secondary/90'
                    }`}>{plan.price}</span>
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      per month
                    </span>
                  </div>
                </div>
                <Star className="w-8 h-8 text-secondary" />
              </div>

              <div className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-secondary/20">
                      <Check className="w-4 h-4 text-secondary" />
                    </div>
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full mt-6 bg-secondary text-black font-medium hover:bg-secondary/90"
              >
                Choose {plan.title}
              </Button>
            </CardBody>
          </Card>
          ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionModal;