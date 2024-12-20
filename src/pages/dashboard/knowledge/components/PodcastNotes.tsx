import React, { useState } from 'react';
import { Card, CardBody, Avatar, Badge, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea } from "@nextui-org/react";
import { Share2, Star, Bookmark, ExternalLink, Calendar, Headphones, Trash2 } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import DeleteNoteModal from '../../../../components/dashboard/modals/DeleteNoteModal';

const PodcastNotes = () => {
  const { theme } = useTheme();
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [tweetText, setTweetText] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedNote) return;
    
    setIsDeleting(true);
    try {
      // Add your delete logic here
      console.log('Deleting note:', selectedNote);
      
      // Close modal after successful deletion
      setShowDeleteModal(false);
      setSelectedNote(null);
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const notes = [
    {
      id: 1,
      title: 'The Future of AI in Business',
      content: 'Key insights on AI implementation strategies and ethical considerations in business contexts...',
      source: {
        type: 'podcast',
        title: 'Tech Insights',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
        duration: '45:30'
      },
      tags: ['AI', 'Business', 'Technology'],
      date: '2024-03-15',
      isFavorite: true
    },
    {
      id: 2,
      title: 'Leadership in Digital Age',
      content: 'Modern leadership principles and adapting to remote work culture...',
      source: {
        type: 'podcast',
        title: 'Leadership Masters',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        duration: '38:15'
      },
      tags: ['Leadership', 'Management', 'Remote Work'],
      date: '2024-03-14',
      isFavorite: false
    }
  ];

  const handleShare = (note) => {
    setSelectedNote(note);
    const defaultTweet = `📝 Notes from "${note.title}" via ${note.source.title}\n\n${note.content.slice(0, 100)}...\n\n#PodcastNotes #Learning`;
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
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Headphones className="w-4 h-4" />
                    <span>{note.source.duration}</span>
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
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className={theme === 'dark' ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 hover:text-red-500'}
                      onClick={() => {
                        setSelectedNote(note);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      className={note.isFavorite ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                    >
                      <Star className="w-4 h-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
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
        setSelectedNote(null);
      }}
      onConfirm={handleDelete}
      title="this podcast note"
      isLoading={isDeleting}
    />
    </>
  );
};

export default PodcastNotes;