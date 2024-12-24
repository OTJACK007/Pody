import React, { useState } from 'react';
import { Card, CardBody, Avatar, Badge, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@nextui-org/react";
import { Share2, Star, Bookmark, ExternalLink, Calendar, Quote, Trash2 } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import DeleteNoteModal from '../../../../components/dashboard/modals/DeleteNoteModal';

interface Highlight {
  id: string;
  quote: string;
  context: string;
  source_type: string;
  source_title: string;
  source_url?: string;
  timestamp: string;
  tags: string[];
  created_at: string;
}

interface HighlightsProps {
  highlights: Highlight[];
}

const Highlights = ({ highlights }: HighlightsProps) => {
  const { theme } = useTheme();
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tweetText, setTweetText] = useState('');

  const handleDelete = async () => {
    if (!selectedHighlight) return;
    
    setIsDeleting(true);
    try {
      // Add your delete logic here
      console.log('Deleting highlight:', selectedHighlight);
      
      // Close modal after successful deletion
      setShowDeleteModal(false);
      setSelectedHighlight(null);
    } catch (error) {
      console.error('Error deleting highlight:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleShare = (highlight) => {
    setSelectedHighlight(highlight);
    const defaultTweet = `💡 "${highlight.quote}"\n\nFrom ${highlight.source_title}\n\n#Insights #Learning`;
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
      {highlights.length === 0 ? (
        <div className="text-center py-12">
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            No highlights found in this category.
          </p>
        </div>
      ) : highlights.map((highlight) => (
        <Card key={highlight.id} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-4">
            <div className="flex items-start gap-4">
              <Avatar
                src={highlight.source_url}
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
                    <span>{new Date(highlight.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Quote className="w-4 h-4" />
                    <span>at {highlight.timestamp}</span>
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
                      size="sm"
                      variant="light"
                      className={theme === 'dark' ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-500'}
                      onClick={() => {
                        setSelectedHighlight(highlight);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                    >
                      <Star className="w-4 h-4" fill="none" />
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

    <DeleteNoteModal
      isOpen={showDeleteModal}
      onClose={() => {
        setShowDeleteModal(false);
        setSelectedHighlight(null);
      }}
      onConfirm={handleDelete}
      title="this highlight"
      isLoading={isDeleting}
    />
    </>
  );
};

export default Highlights;