import React, { useState } from 'react';
import { Card, CardBody, Avatar, Badge, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@nextui-org/react";
import { Share2, Star, Bookmark, ExternalLink, Calendar } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const KnowledgeList = () => {
  const { theme } = useTheme();
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [tweetText, setTweetText] = useState('');

  const notes = [
    {
      id: 1,
      title: 'Building Mental Resilience',
      content: 'Key insights on developing mental toughness and resilience in challenging situations...',
      source: {
        type: 'podcast',
        title: 'Mindset Mastery',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400'
      },
      tags: ['Psychology', 'Mental Health', 'Personal Growth'],
      date: '2024-03-15',
      isFavorite: true
    },
    {
      id: 2,
      title: 'Future of AI Technology',
      content: 'Discussion on emerging AI trends and their impact on various industries...',
      source: {
        type: 'podcast',
        title: 'Tech Insights',
        image: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400'
      },
      tags: ['AI', 'Technology', 'Future'],
      date: '2024-03-14',
      isFavorite: false
    },
    {
      id: 3,
      title: 'Investment Strategies 2024',
      content: 'Expert analysis on current market trends and investment opportunities...',
      source: {
        type: 'podcast',
        title: 'Finance Weekly',
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400'
      },
      tags: ['Finance', 'Investment', 'Markets'],
      date: '2024-03-13',
      isFavorite: true
    }
  ];

  const handleShare = (note) => {
    setSelectedNote(note);
    const defaultTweet = `📝 Key insights from "${note.title}" via ${note.source.title}\n\n${note.content.slice(0, 100)}...\n\n#Learning #Knowledge`;
    setTweetText(defaultTweet);
    setShowShareModal(true);
  };

  const handleTweet = () => {
    const encodedText = encodeURIComponent(tweetText);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
    setShowShareModal(false);
  };

  return (
    <>
    <div className="space-y-4">
      {notes.map((note) => (
        <Card key={note.id} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-4">
            <div className="flex items-start gap-4">
              <Avatar
                src={note.source.image}
                className="flex-shrink-0 w-16 h-16 rounded-lg ring-2 ring-white/20"
              />
              <div className="flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{note.title}</h3>
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {note.content}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>{note.date}</span>
                  </div>
                  <div className="flex gap-2">
                    {note.tags.map((tag) => (
                      <Badge key={tag} size="sm" variant="flat" className="text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <Button
                      isIconOnly
                      variant="light"
                      className={note.isFavorite ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                    >
                      <Star className="w-4 h-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        startContent={<Bookmark className="w-4 h-4" />}
                        variant="light"
                        className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                      >
                        Save
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                        onClick={() => handleShare(note)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
    
    <Modal 
      isOpen={showShareModal} 
      onClose={() => setShowShareModal(false)}
      size="lg"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <img 
              src="https://static.wixstatic.com/media/c67dd6_a7b28b585b034f56ad6ab32232e745fc~mv2.webp"
              alt="X/Twitter"
              className="w-6 h-6"
            />
            <span>Share on X</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <Textarea
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            minRows={4}
            maxLength={280}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {280 - tweetText.length} characters remaining
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => setShowShareModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#1DA1F2] text-white"
            endContent={<ExternalLink className="w-4 h-4" />}
            onPress={handleTweet}
          >
            Share on X
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
};

export default KnowledgeList;