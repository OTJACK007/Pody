import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Input } from "@nextui-org/react";
import { NotebookPen, Search } from 'lucide-react';
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
          <div className="flex items-center gap-4">
            <img 
              src="https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png"
              alt="Notion"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Connect to Notion
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Sync your insights and summaries with Notion
              </p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="mb-6">
            <Input
              placeholder="Search pages..."
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />
          </div>

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
                      <div className={`p-3 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-600/50' : 'bg-gray-200'
                      }`}>
                        <span className="text-2xl">{page.icon}</span>
                      </div>
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
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${
                  theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
                }`}>or</span>
              </div>
            </div>
            
            <Button
              className={`w-full ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              startContent={
                <img 
                  src="https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png"
                  alt="Notion"
                  className="w-5 h-5 object-contain"
                />
              }
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
            className="bg-secondary text-black hover:bg-secondary/90"
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