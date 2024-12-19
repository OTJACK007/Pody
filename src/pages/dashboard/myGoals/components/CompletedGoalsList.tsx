import React, { useState } from 'react';
import { Card, CardBody, Progress, Button, Badge } from "@nextui-org/react";
import { Link2, BarChart2, PlayCircle, ChevronRight, Plus, Clock } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useGoals } from '../../../../contexts/GoalsContext';
import GoalDetailsModal from './GoalDetailsModal';
import { useNavigate } from 'react-router-dom';

interface GoalsListProps {
  status: string;
}

const CompletedGoalsList = ({ status }: GoalsListProps) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { theme } = useTheme();
  const { completedGoals } = useGoals();
  const navigate = useNavigate();

  const handleGoalDetails = (goal: any) => {
    setSelectedGoal(goal);
    setShowDetailsModal(true);
  };

  const handleContentClick = (contentId: string) => {
    navigate(`/dashboard/feedvideo/${contentId}`);
  };

  return (
    <>
      <div className="space-y-4">
        {completedGoals.map((goal) => (
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
                    <Badge color="success" variant="flat">Completed</Badge>
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
                        <span>Completed on {new Date(goal.completedDate).toLocaleDateString()}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Link2 className="w-4 h-4 text-primary" />
                        <span>{goal.linkedContent?.length || 0} linked resources</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {goal.linkedContent && goal.linkedContent.length > 0 && (
                <div className={`mt-6 pt-6 border-t ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <h4 className={`text-sm font-medium mb-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>Linked Content</h4>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {goal.linkedContent.map((content) => (
                      <div
                        key={content.id}
                        className="flex-none w-[280px] group cursor-pointer"
                        onClick={() => handleContentClick(content.id)}
                      >
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                          <img
                            src={content.thumbnailUrl}
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
                        }`}>{content.contentType}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>15:30</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>

      {selectedGoal && (
        <GoalDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          goal={selectedGoal}
        />
      )}
    </>
  );
};

export default CompletedGoalsList;