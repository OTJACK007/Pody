import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Progress, Input, Textarea, Card, CardBody } from "@nextui-org/react";
import { Target, Calendar, Clock, BarChart2, Link2, PlayCircle, Rocket } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useGoals } from '../../../../contexts/GoalsContext';
import { updateGoal, updateGoalProgress } from '../../../../services/goals';

interface GoalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUpcoming?: boolean;
  goal: {
    id: string;
    title: string;
    description: string;
    category: string;
    progress: number;
    dueDate: string;
    linkedContent: Array<{
      id: string;
      title: string;
      contentType: string;
      thumbnailUrl: string;
    }>;
  };
}

const GoalDetailsModal = ({ isOpen, onClose, goal, isUpcoming = false }: GoalDetailsModalProps) => {
  const { theme } = useTheme();
  const { refreshGoals } = useGoals();
  const [progress, setProgress] = useState(goal.progress);
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setProgress(goal.progress);
    setTitle(goal.title);
    setDescription(goal.description);
  }, [goal]);

  const handleUpdateProgress = async () => {
    setIsUpdating(true);
    try {
      await updateGoalProgress(goal.id, progress, notes);
      await refreshGoals();
      onClose();
    } catch (error) {
      console.error('Error updating progress:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMakeActive = async () => {
    setIsActivating(true);
    try {
      await updateGoal(goal.id, {
        status: 'active',
        startDate: new Date()
      });
      await refreshGoals();
      onClose();
    } catch (error) {
      console.error('Error activating goal:', error);
    } finally {
      setIsActivating(false);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updateGoal(goal.id, {
        title,
        description
      });
      await refreshGoals();
      onClose();
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const timeLeft = () => {
    const dueDate = new Date(goal.dueDate);
    const today = new Date();
    const diffTime = Math.abs(dueDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days left`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            <div>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{goal.title}</h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Goal Details & Progress Update
              </p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Goal Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <Textarea
              label="Goal Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Update Progress</h3>
                <div className="flex items-center gap-4 mb-4">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    startContent={<BarChart2 className="w-4 h-4 text-gray-400" />}
                    endContent="%"
                    classNames={{
                      input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                      inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                    }}
                  />
                  <Progress 
                    value={progress} 
                    color="success"
                    className="max-w-md"
                  />
                </div>
                <Textarea
                  label="Progress Notes"
                  placeholder="Add notes about your progress..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              </div>

              <Card className={`${
                theme === 'dark' 
                  ? 'bg-gray-700/50 border-gray-600' 
                  : 'bg-gray-50 border-gray-200'
              } border`}>
                <CardBody className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <div>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Due Date</p>
                        <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                          {new Date(goal.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>Time Left</p>
                        <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                          {timeLeft()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {goal.linkedContent && goal.linkedContent.length > 0 && (
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Linked Resources</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {goal.linkedContent.map((content) => (
                      <Card
                        key={content.id}
                        isPressable
                        className={`${
                          theme === 'dark'
                            ? 'bg-gray-700/50 border-gray-600'
                            : 'bg-white border-gray-200'
                        } border`}
                      >
                        <CardBody className="p-4">
                          <div className="flex gap-4">
                            <div className="relative flex-shrink-0">
                              <div className="w-24 aspect-video rounded-lg overflow-hidden">
                                <img
                                  src={content.thumbnailUrl}
                                  alt={content.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <PlayCircle className="w-6 h-6 text-white" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className={`font-medium ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{content.title}</p>
                              <p className={`text-sm capitalize ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>{content.contentType}</p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
          >
            Cancel
          </Button>
          
          <Button
            color="primary"
            onPress={handleSaveChanges}
            isLoading={isSaving}
          >
            Save Changes
          </Button>
          
          {isUpcoming && (
            <Button
              className="bg-secondary text-black font-medium hover:bg-secondary/90"
              startContent={<Rocket className="w-4 h-4" />}
              onPress={handleMakeActive}
              isLoading={isActivating}
            >
              Make Active
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GoalDetailsModal;