import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Card, CardBody } from "@nextui-org/react";
import { CreditCard, Wallet } from 'lucide-react';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddPaymentModal = ({ isOpen, onClose, onSubmit }: AddPaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'paypal' | 'crypto' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      icon: 'https://static.wixstatic.com/media/c67dd6_ba6512237a194a9a9297eeeb9219122e~mv2.png',
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
        base: "bg-gray-800 text-white",
        closeButton: "text-white hover:bg-gray-700"
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
                  className="bg-gray-700/50 border border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  <CardBody className="p-4">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="p-3 bg-gray-600/50 rounded-xl">
                        <img 
                          src={method.icon} 
                          alt={method.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{method.name}</p>
                        <p className="text-sm text-gray-400">{method.description}</p>
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
                  input: "bg-gray-700/50 text-white",
                  inputWrapper: "bg-gray-700/50 border-gray-600"
                }}
              />
              <Input
                label="Cardholder Name"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                classNames={{
                  input: "bg-gray-700/50 text-white",
                  inputWrapper: "bg-gray-700/50 border-gray-600"
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
                <Input
                  label="CVC"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  type="password"
                  classNames={{
                    input: "bg-gray-700/50 text-white",
                    inputWrapper: "bg-gray-700/50 border-gray-600"
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Wallet className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Continue to {selectedMethod === 'paypal' ? 'PayPal' : 'MoonPay'}
              </h3>
              <p className="text-gray-400">
                You'll be redirected to {selectedMethod === 'paypal' ? 'PayPal' : 'MoonPay'} to complete your payment
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {selectedMethod && (
            <Button
              variant="flat"
              className="mr-auto bg-gray-700 text-white hover:bg-gray-600"
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