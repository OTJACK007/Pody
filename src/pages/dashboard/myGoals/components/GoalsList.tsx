import React, { useState } from 'react';
import { Card, CardBody, Progress, Button, Avatar, Badge } from "@nextui-org/react";
import { Link2, BarChart2, PlayCircle, ChevronRight, Plus } from 'lucide-react';
import LinkPodcastModal from './LinkPodcastModal';

interface GoalsListProps {
  status: string;
}

const GoalsList = ({ status }: GoalsListProps) => {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

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

  const handleLinkPodcast = (goalId: number) => {
    setSelectedGoalId(goalId);
    setShowLinkModal(true);
  };

  return (
    <>
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="bg-gray-800/50 border border-gray-700/50">
            <CardBody className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                    <Badge color="primary" variant="flat">
                      {goal.category}
                    </Badge>
                  </div>
                  <p className="text-gray-400 mb-4">{goal.description}</p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm text-white">{goal.progress}%</span>
                      </div>
                      <Progress 
                        value={goal.progress} 
                        color="success"
                        className="max-w-full"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-400">Due {goal.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-primary" />
                        <span className="text-sm text-gray-400">
                          {goal.linkedContent.length} linked resources
                        </span>
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
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-colors"
                  onClick={() => console.log('View goal details')}
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>

              {goal.linkedContent.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Linked Content</h4>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {goal.linkedContent.map((content) => (
                      <div
                        key={content.id}
                        className="flex-none w-48 group cursor-pointer"
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
                        <p className="text-sm text-white truncate">{content.title}</p>
                        <p className="text-xs text-gray-400 capitalize">{content.type}</p>
                      </div>
                    ))}
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