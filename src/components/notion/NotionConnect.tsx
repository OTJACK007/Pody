import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Card, CardBody } from "@nextui-org/react";
import { NotebookPen, Search, Plus, ExternalLink } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { notionService, type NotionPage } from '../../services/notion';

interface NotionConnectProps {
  isOpen: boolean;
  onClose: () => void;
  onPageSelect: (pageId: string) => Promise<void>;
  title?: string;
}

const NotionConnect = ({ isOpen, onClose, onPageSelect, title = 'Content' }: NotionConnectProps) => {
  const { theme } = useTheme();
  const [pages, setPages] = useState<NotionPage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingPage, setIsCreatingPage] = useState(false);

  useEffect(() => {
    if (isOpen && notionService.isAuthenticated()) {
      loadPages();
    }
  }, [isOpen]);

  const loadPages = async () => {
    try {
      const notionPages = await notionService.getPages();
      setPages(notionPages);
    } catch (error) {
      console.error('Error loading Notion pages:', error);
    }
  };

  const handleAuth = () => {
    window.location.href = notionService.getAuthUrl();
  };

  const handleCreatePage = async () => {
    setIsCreatingPage(true);
    try {
      const pageId = await notionService.createPage(title || 'New Content');
      await onPageSelect(pageId);
      onClose();
    } catch (error) {
      console.error('Error creating page:', error);
    } finally {
      setIsCreatingPage(false);
    }
  };

  const handlePageSelect = async (pageId: string) => {
    setIsLoading(true);
    try {
      await onPageSelect(pageId);
      onClose();
    } catch (error) {
      console.error('Error selecting page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!notionService.isAuthenticated()) {
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="lg"
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
                  Connect your Notion account to extract content
                </p>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className="text-center py-8">
            <NotebookPen className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className={`text-xl font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Connect Your Notion Account
            </h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Connect your Notion account to start extracting content
            </p>
            <Button
              className="mt-4 bg-black text-white"
              onClick={handleAuth}
              startContent={
                <img 
                  src="https://static.wixstatic.com/media/c67dd6_c0f6b842de844dff9ac8e0e71e7e5a18~mv2.png"
                  alt="Notion"
                  className="w-5 h-5"
                />
              }
            >
              Connect with Notion
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

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
                Extract to Notion
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Choose where to extract your content
              </p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="mb-6">
            <Input
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />
          </div>

          <div className="space-y-4">
            {filteredPages.map((page) => (
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
                        <span className="text-2xl">{page.icon || '📄'}</span>
                      </div>
                      <div>
                        <p className={`font-medium ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{page.title}</p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Last updated {new Date(page.lastUpdated).toLocaleDateString()}</p>
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
              onClick={handleCreatePage}
              isLoading={isCreatingPage}
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
            endContent={<ExternalLink className="w-4 h-4" />}
            onPress={() => selectedPage && handlePageSelect(selectedPage)}
            isDisabled={!selectedPage}
            isLoading={isLoading}
          >
            Extract to Notion
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NotionConnect;