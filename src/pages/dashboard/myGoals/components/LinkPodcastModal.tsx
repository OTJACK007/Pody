import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Card, CardBody, Chip, Avatar } from "@nextui-org/react";
import { Search, PlayCircle, Plus, CheckCircle, Tag, Clock } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface LinkPodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: number;
}

const LinkPodcastModal = ({ isOpen, onClose, goalId }: LinkPodcastModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPodcasts, setSelectedPodcasts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'search' | 'recommended' | 'history'>('recommended');
  const { theme } = useTheme();

  const recommendedPodcasts = [
    {
      id: '1',
      title: 'Mastering Public Speaking',
      channel: 'Communication Pro',
      duration: '45 min',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400',
      tags: ['Public Speaking', 'Communication'],
      relevanceScore: 98
    },
    {
      id: '2',
      title: 'Building Stage Confidence',
      channel: 'Performance Masters',
      duration: '32 min',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
      tags: ['Confidence', 'Performance'],
      relevanceScore: 95
    },
    {
      id: '3',
      title: 'Voice Training Essentials',
      channel: 'Voice Academy',
      duration: '28 min',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400',
      tags: ['Voice Training', 'Speaking'],
      relevanceScore: 92
    }
  ];

  const handleToggleSelect = (podcastId: string) => {
    setSelectedPodcasts(prev => 
      prev.includes(podcastId)
        ? prev.filter(id => id !== podcastId)
        : [...prev, podcastId]
    );
  };

  const handleSave = async () => {
    // Handle saving selected podcasts
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Link Podcasts to Goal
          </h2>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Connect relevant podcast episodes to track insights
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="flex gap-4 mb-6">
            <Button
              className={`flex-1 ${activeTab === 'recommended' ? 'bg-primary' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('recommended')}
            >
              Recommended
            </Button>
            <Button
              className={`flex-1 ${activeTab === 'search' ? 'bg-primary' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('search')}
            >
              Search
            </Button>
            <Button
              className={`flex-1 ${activeTab === 'history' ? 'bg-primary' : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('history')}
            >
              Recently Watched
            </Button>
          </div>

          {activeTab === 'search' && (
            <Input
              placeholder="Search podcasts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              className="mb-6"
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />
          )}

          <div className="space-y-4">
            {recommendedPodcasts.map((podcast) => (
              <Card 
                key={podcast.id}
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600'
                    : 'bg-white border-gray-200'
                } border hover:bg-${theme === 'dark' ? 'gray-700' : 'gray-50'} transition-colors`}
                isPressable
                onPress={() => handleToggleSelect(podcast.id)}
              >
                <CardBody className="flex flex-row items-center gap-4 p-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={podcast.image}
                      alt={podcast.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`text-lg font-semibold mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>{podcast.title}</h3>
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                          {podcast.channel}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Chip color="success" size="sm">
                          {podcast.relevanceScore}% Match
                        </Chip>
                        <Button
                          isIconOnly
                          className={`${
                            selectedPodcasts.includes(podcast.id)
                              ? 'bg-primary text-white'
                              : theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {selectedPodcasts.includes(podcast.id) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span>{podcast.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                        <div className="flex gap-2">
                          {podcast.tags.map((tag) => (
                            <Chip key={tag} size="sm" variant="flat">
                              {tag}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
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
            onPress={handleSave}
            startContent={<Plus className="w-4 h-4" />}
          >
            Link Selected ({selectedPodcasts.length})
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LinkPodcastModal;