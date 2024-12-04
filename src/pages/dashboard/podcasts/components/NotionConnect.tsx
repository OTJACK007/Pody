import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody } from "@nextui-org/react";
import { Link as LinkIcon } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface NotionConnectProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotionConnect = ({ isOpen, onClose }: NotionConnectProps) => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const { theme } = useTheme();

  const notionPages = [
    {
      id: '1',
      title: 'Tech Research',
      icon: '📱',
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      title: 'AI Notes',
      icon: '🤖',
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      title: 'Learning Journal',
      icon: '📚',
      lastUpdated: '3 days ago'
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
          <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Link to Notion
          </h2>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Choose a Notion page to sync your insights
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            {notionPages.map((page) => (
              <Card
                key={page.id}
                isPressable
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                    : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                } border transition-colors ${
                  selectedPage === page.id ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedPage(page.id)}
              >
                <CardBody className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{page.icon}</span>
                      <div>
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{page.title}</p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Last updated {page.lastUpdated}</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedPage === page.id
                        ? 'border-primary bg-primary'
                        : theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                    }`} />
                  </div>
                </CardBody>
              </Card>
            ))}

            <Button
              className={`w-full ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              startContent={<LinkIcon className="w-4 h-4" />}
            >
              Create New Page
            </Button>
          </div>
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
            isDisabled={!selectedPage}
          >
            Link to Notion
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NotionConnect;