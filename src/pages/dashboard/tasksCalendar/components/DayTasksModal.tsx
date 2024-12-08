import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Card, CardBody, Badge, Button } from "@nextui-org/react";
import { Clock, Calendar, Flag, Tag } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface Task {
  id: string;
  title: string;
  description: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  status: 'pending' | 'completed';
}

interface DayTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  tasks: Task[];
}

const DayTasksModal = ({ isOpen, onClose, date, tasks }: DayTasksModalProps) => {
  const { theme } = useTheme();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <div>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Tasks for {date.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {tasks.length} tasks scheduled
              </p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="space-y-4 pb-6">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-700/50 border-gray-600'
                  : 'bg-gray-50 border-gray-200'
              } border`}
            >
              <CardBody className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-medium ${
                        task.status === 'completed'
                          ? 'line-through text-gray-400'
                          : theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{task.title}</h3>
                      <Badge color={getPriorityColor(task.priority)} variant="flat">
                        {task.priority}
                      </Badge>
                      <Badge variant="flat">
                        {task.category}
                      </Badge>
                    </div>
                    
                    <p className={`text-sm mb-3 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{task.description}</p>

                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span>{task.dueTime}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Flag className={`w-4 h-4 ${
                          task.priority === 'high' ? 'text-red-500' :
                          task.priority === 'medium' ? 'text-yellow-500' :
                          'text-green-500'
                        }`} />
                        <span>{task.priority} priority</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    color={task.status === 'completed' ? 'success' : 'primary'}
                    variant={task.status === 'completed' ? 'flat' : 'solid'}
                    size="sm"
                  >
                    {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-8">
              <Calendar className={`w-12 h-12 mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <p className={`text-lg font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>No tasks scheduled for this day</p>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DayTasksModal;