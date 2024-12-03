import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Check, Crown, Zap, Star, Rocket } from 'lucide-react';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradePlanModal = ({ isOpen, onClose }: UpgradePlanModalProps) => {
  const plans = [
    {
      name: 'Basic',
      price: '$5',
      credits: '50',
      icon: <Crown className="w-6 h-6 text-yellow-400" />,
      color: 'bg-yellow-400/10',
      textColor: 'text-yellow-400',
      features: [
        'Access to all podcast summaries',
        'Basic AI-powered insights',
        'Standard quality audio',
        'Email support'
      ],
      current: true
    },
    {
      name: 'Credit Starter',
      price: '$20',
      credits: '100',
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      color: 'bg-blue-400/10',
      textColor: 'text-blue-400',
      features: [
        'Everything in Basic',
        'Priority access to new content',
        'Advanced AI analysis',
        'HD audio quality'
      ]
    },
    {
      name: 'Pro',
      price: '$29',
      credits: '250',
      icon: <Star className="w-6 h-6 text-purple-400" />,
      color: 'bg-purple-400/10',
      textColor: 'text-purple-400',
      features: [
        'Everything in Credit Starter',
        'Custom AI training',
        'Team collaboration',
        'Priority support'
      ],
      popular: true
    },
    {
      name: 'Elite',
      price: '$50',
      originalPrice: '$70',
      credits: '600',
      icon: <Rocket className="w-6 h-6 text-secondary" />,
      color: 'bg-secondary/10',
      textColor: 'text-secondary',
      features: [
        'Everything in Pro',
        'Unlimited AI generations',
        'Custom branding',
        'Dedicated account manager'
      ]
    }
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="4xl"
      classNames={{
        base: "bg-gray-800 text-white",
        closeButton: "text-white hover:bg-gray-700"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Upgrade for more features</h2>
          <p className="text-sm text-gray-400">Choose the perfect plan for your needs</p>
        </ModalHeader>
        <ModalBody className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`bg-gray-700/50 border ${
                  plan.popular 
                    ? 'border-secondary relative z-10 transform hover:scale-105 transition-transform' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <CardHeader className="flex flex-col gap-2 pb-0">
                  <div className="flex items-center justify-between w-full">
                    <div className={`p-2 ${plan.color} rounded-lg`}>
                      {plan.icon}
                    </div>
                    {plan.popular && (
                      <span className="bg-secondary text-black text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  {plan.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {plan.originalPrice}/month
                    </span>
                  )}
                  <p className={`text-sm ${plan.textColor}`}>
                    <span className="font-bold text-base">{plan.credits}</span> Credits
                  </p>
                </CardHeader>
                <CardBody>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      plan.current
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-secondary text-black hover:bg-secondary/90'
                    }`}
                    disabled={plan.current}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade Now'}
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

export default UpgradePlanModal;