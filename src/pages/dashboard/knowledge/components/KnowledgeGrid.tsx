import React from 'react';
import { Card, CardBody, CardFooter, Avatar, Button, Chip } from "@nextui-org/react";
import { MoreVertical, Star, MessageSquare, Share2 } from 'lucide-react';

const KnowledgeGrid = () => {
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
        <Card key={note.id} className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{note.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-3">{note.content}</p>
              </div>
              <Button
                isIconOnly
                variant="light"
                className="text-gray-400 hover:text-white"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map((tag) => (
                <Chip key={tag} size="sm" variant="flat">
                  {tag}
                </Chip>
              ))}
            </div>
          </CardBody>

          <CardFooter className="border-t border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <Avatar
                  src={note.source.image}
                  size="sm"
                  className="ring-2 ring-white/20"
                />
                <div>
                  <p className="text-white text-sm">{note.source.title}</p>
                  <p className="text-gray-400 text-xs">{note.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  variant="light"
                  className={note.isFavorite ? 'text-yellow-400' : 'text-gray-400'}
                >
                  <Star className="w-4 h-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  className="text-gray-400"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  className="text-gray-400"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default KnowledgeGrid;