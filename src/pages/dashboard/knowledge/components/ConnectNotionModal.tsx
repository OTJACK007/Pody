import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody } from "@nextui-org/react";
import { ArrowRight } from 'lucide-react';

interface ConnectNotionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectNotionModal = ({ isOpen, onClose }: ConnectNotionModalProps) => {
  const features = [
    'Sync notes automatically',
    'Create daily summaries',
    'Organize by workspace',
    'Two-way sync',
    'Custom templates'
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
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl">Connect with Notion</h2>
          <p className="text-sm text-gray-400">Sync your notes and summaries with Notion</p>
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center justify-center py-6">
            <img
              src="https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png"
              alt="Notion"
              className="w-32 h-32 object-contain"
            />
          </div>

          <Card className="bg-gray-700/50 border border-gray-600">
            <CardBody>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <ArrowRight className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={onClose}
          >
            Connect to Notion
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConnectNotionModal;