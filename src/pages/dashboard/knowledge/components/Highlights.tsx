import React, { useState } from 'react';
import { Card, CardBody, Avatar, Badge, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@nextui-org/react";
import { Share2, Star, Bookmark, ExternalLink, Calendar, Quote } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const Highlights = () => {
  const { theme } = useTheme();
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [tweetText, setTweetText] = useState('');

  const highlights = [
    {
      id: 1,
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      context: "Discussion on resilience and perseverance in business...",
      source: {
        type: 'podcast',
        title: 'Success Mindset',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
        timestamp: '23:45'
      },
      tags: ['Motivation', 'Success', 'Mindset'],
      date: '2024-03-15',
      isFavorite: true
    },
    {
      id: 2,
      quote: "Innovation distinguishes between a leader and a follower.",
      context: "Analysis of leadership qualities in tech industry...",
      source: {
        type: 'podcast',
        title: 'Tech Leadership',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        timestamp: '15:20'
      },
      tags: ['Leadership', 'Innovation', 'Technology'],
      date: '2024-03-14',
      isFavorite: false
    }
  ];

  const handleShare = (highlight) => {
    setSelectedHighlight(highlight);
    const defaultTweet = `💡 "${highlight.quote}"\n\nFrom ${highlight.source.title}\n\n#Insights #Learning`;
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
      {highlights.map((highlight) => (
        <Card key={highlight.id} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-4">
            <div className="flex items-start gap-4">
              <Avatar
                src={highlight.source.image}
                className="flex-shrink-0 w-16 h-16 rounded-lg ring-2 ring-white/20"
              />
              <div className="flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={`p-4 mb-4 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}>
                      <Quote className={`w-6 h-6 mb-2 ${
                        theme === 'dark' ? 'text-primary' : 'text-primary/80'
                      }`} />
                      <p className={`text-lg italic ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{highlight.quote}</p>
                    </div>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{highlight.context}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>{highlight.date}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Quote className="w-4 h-4" />
                    <span>at {highlight.source.timestamp}</span>
                  </div>
                  <div className="flex gap-2">
                    {highlight.tags.map((tag) => (
                      <Badge key={tag} size="sm" variant="flat" className="text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
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
                      onClick={() => handleShare(highlight)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      className={highlight.isFavorite ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                    >
                      <Star className="w-4 h-4" fill={highlight.isFavorite ? 'currentColor' : 'none'} />
                    </Button>
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

export default Highlights;