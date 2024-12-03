import React from 'react';
import { Card, CardBody, Avatar, Badge, Button } from "@nextui-org/react";
import { MoreVertical, Star, MessageSquare, Share2 } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const KnowledgeGrid = () => {
  const { theme } = useTheme();

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <Card key={note.id} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{note.title}</h3>
                <p className={`mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>{note.content}</p>
              </div>
              <Button
                isIconOnly
                variant="light"
                className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map((tag) => (
                <Badge key={tag} size="sm" variant="flat" className="text-white">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardBody>

          <CardBody className={`border-t px-6 py-4 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Avatar
                  src={note.source.image}
                  size="sm"
                  className="ring-2 ring-white/20"
                />
                <div>
                  <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                    {note.source.title}
                  </p>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {note.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  variant="light"
                  className={note.isFavorite ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                >
                  <Star className="w-4 h-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default KnowledgeGrid;