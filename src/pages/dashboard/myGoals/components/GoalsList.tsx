import React, { useState } from 'react';
import { Card, CardBody, Progress, Button, Avatar, Badge } from "@nextui-org/react";
import { Link2, BarChart2, PlayCircle, ChevronRight, Plus, Clock } from 'lucide-react';
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import LinkPodcastModal from './LinkPodcastModal';

const goals = [
  {
    id: 1,
    title: 'Master Public Speaking',
    description: 'Improve presentation and communication skills',
    category: 'Personal Growth',
    progress: 75,
    dueDate: '2024-04-15',
    linkedContent: [
      {
        id: 1,
        title: 'The Art of Public Speaking',
        type: 'podcast',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400'
      },
      {
        id: 2,
        title: 'Mastering Stage Presence',
        type: 'video',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400'
      }
    ]
  },
  {
    id: 2,
    title: 'Financial Independence',
    description: 'Build multiple income streams and investments',
    category: 'Finance',
    progress: 45,
    dueDate: '2024-06-30',
    linkedContent: [
      {
        id: 3,
        title: 'Wealth Building Strategies',
        type: 'podcast',
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400'
      }
    ]
  },
  {
    id: 3,
    title: 'Launch Online Course',
    description: 'Create and launch digital product',
    category: 'Business',
    progress: 30,
    dueDate: '2024-05-20',
    linkedContent: [
      {
        id: 4,
        title: 'Digital Product Creation',
        type: 'podcast',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'
      }
    ]
  }
];

interface GoalsListProps {
  status: string;
}

const GoalsList = ({ status }: GoalsListProps) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const { theme } = useTheme();
  
  const carouselOptions = {
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  };

  const carouselRefs = goals.map(() => useEmblaCarousel(carouselOptions));

  const handleLinkPodcast = (goalId: number) => {
    setSelectedGoalId(goalId);
    setShowLinkModal(true);
  };

  return (
    <>
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <Card key={goal.id} className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-xl font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{goal.title}</h3>
                    <Badge color="primary" variant="flat">
                      {goal.category}
                    </Badge>
                  </div>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {goal.description}
                  </p>

                  <div className="space-y-4 mt-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                          Progress
                        </span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                          {goal.progress}%
                        </span>
                      </div>
                      <Progress 
                        value={goal.progress} 
                        color="success"
                        className="max-w-full"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <BarChart2 className="w-4 h-4 text-primary" />
                        <span>Due {goal.dueDate}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Link2 className="w-4 h-4 text-primary" />
                        <span>{goal.linkedContent.length} linked resources</span>
                      </div>
                      <div 
                        onClick={() => handleLinkPodcast(goal.id)}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/20 text-secondary hover:bg-secondary/30 border border-secondary rounded-lg cursor-pointer transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm">Link Podcast</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 hover:bg-gray-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => console.log('View goal details')}
                >
                  <ChevronRight className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                </div>
              </div>

              {goal.linkedContent.length > 0 && (
                <div className={`mt-6 pt-6 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                } overflow-hidden`}>
                  <h4 className={`text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Linked Content</h4>
                  <div className="overflow-hidden" ref={carouselRefs[index][0]}>
                    <div className="flex gap-4">
                      {goal.linkedContent.map((content) => (
                        <div
                          key={content.id}
                          className="flex-none w-[280px] group cursor-pointer"
                          onClick={() => console.log('Play content', content.id)}
                        >
                          <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                            <img
                              src={content.image}
                              alt={content.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <PlayCircle className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <p className={`text-sm truncate ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>{content.title}</p>
                          <p className={`text-xs capitalize ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>{content.type}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>15:30</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedGoalId && (
        <LinkPodcastModal
          isOpen={showLinkModal}
          onClose={() => setShowLinkModal(false)}
          goalId={selectedGoalId}
        />
      )}
    </>
  );
};

export default GoalsList;