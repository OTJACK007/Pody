import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Card, CardBody } from "@nextui-org/react";
import { CreditCard, Wallet } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddPaymentModal = ({ isOpen, onClose, onSubmit }: AddPaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'paypal' | 'crypto' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubmit({ method: selectedMethod, data: { cardNumber, cardName, expiry, cvc } });
    setIsLoading(false);
    onClose();
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit Card',
      icon: 'https://static.wixstatic.com/media/c67dd6_0f9e633415a3470b92e088b44ec1d324~mv2.png',
      description: 'Pay with Visa, Mastercard, or American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'https://static.wixstatic.com/media/c67dd6_ba6512237a194a9a9297eeeb9219122e~mv2.png',
      description: 'Fast and secure payment with PayPal'
    },
    {
      id: 'crypto',
      name: 'MoonPay',
      icon: 'https://static.wixstatic.com/media/c67dd6_8dfcffeaa9b34dab888e64ceee0531f0~mv2.png',
      description: 'Pay with cryptocurrency'
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
        <ModalHeader>Add Payment Method</ModalHeader>
        <ModalBody>
          {!selectedMethod ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  isPressable
                  onPress={() => setSelectedMethod(method.id as any)}
                  className={`${
                    theme === 'dark'
                      ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                      : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                  } border transition-colors`}
                >
                  <CardBody className="p-4">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className={`p-3 rounded-xl ${
                        theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200'
                      }`}>
                        <img 
                          src={method.icon} 
                          alt={method.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{method.name}</p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>{method.description}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : selectedMethod === 'card' ? (
            <div className="space-y-4">
              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                startContent={<CreditCard className="w-4 h-4 text-gray-400" />}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <Input
                label="Cardholder Name"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
                <Input
                  label="CVC"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  type="password"
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Wallet className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Continue to {selectedMethod === 'paypal' ? 'PayPal' : 'MoonPay'}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                You'll be redirected to {selectedMethod === 'paypal' ? 'PayPal' : 'MoonPay'} to complete your payment
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {selectedMethod && (
            <Button
              variant="flat"
              className={`mr-auto ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
              onPress={() => setSelectedMethod(null)}
            >
              Back
            </Button>
          )}
          <Button
            className="bg-red-500/20 text-red-500 hover:bg-red-500/30"
            variant="flat"
            onPress={onClose}
          >
            Cancel
          </Button>
          {selectedMethod && (
            <Button
              className="bg-secondary text-black hover:bg-secondary/90"
              onPress={handleSubmit}
              isLoading={isLoading}
            >
              {selectedMethod === 'card' ? 'Add Card' : `Continue with ${selectedMethod === 'paypal' ? 'PayPal' : 'MoonPay'}`}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPaymentModal;