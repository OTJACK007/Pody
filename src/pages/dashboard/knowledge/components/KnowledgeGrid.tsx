import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Avatar, Badge } from "@nextui-org/react";
import { Calendar } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const KnowledgeGrid = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

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
    // ... other notes
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <Card 
          key={note.id}
          isPressable
          isHoverable
          onPress={() => navigate(`/dashboard/knowledge/note/${note.id}`)}
          className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border transform transition-all duration-300 hover:scale-[1.02]`}
        >
          <CardBody className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar
                src={note.source.image}
                className="w-10 h-10 rounded-lg ring-2 ring-white/20"
              />
              <div>
                <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  {note.source.title}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {note.date}
                </p>
              </div>
            </div>

            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>{note.title}</h3>
            
            <p className={`mb-4 line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {note.content}
            </p>

            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="flat" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className={`flex items-center gap-2 mt-4 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <Calendar className="w-4 h-4" />
              <span>{note.date}</span>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default KnowledgeGrid;