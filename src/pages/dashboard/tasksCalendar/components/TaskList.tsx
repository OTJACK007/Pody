import React, { useState } from 'react';
import { Card, CardBody, Checkbox, Badge, Button } from "@nextui-org/react";
import { Clock, Calendar, Flag, MoreVertical } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

const TaskList = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review Podcast Episode',
      description: 'Listen and take notes on the latest tech podcast episode',
      dueDate: '2024-03-20',
      priority: 'high',
      category: 'Content',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Team Meeting',
      description: 'Weekly sync with the content team',
      dueDate: '2024-03-21',
      priority: 'medium',
      category: 'Meeting',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Edit Video Content',
      description: 'Edit and prepare video highlights for social media',
      dueDate: '2024-03-22',
      priority: 'low',
      category: 'Production',
      status: 'pending'
    }
  ]);

  const handleTaskStatusChange = (taskId: number, isCompleted: boolean) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: isCompleted ? 'completed' : 'pending' };
        }
        return task;
      });
      
      // Sort tasks: pending first, completed last
      return updatedTasks.sort((a, b) => {
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        if (a.status !== 'completed' && b.status === 'completed') return -1;
        return 0;
      });
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card 
          key={task.id}
          className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          } border transition-colors`}
        >
          <CardBody className="p-4">
            <div className="flex items-start gap-4">
              <Checkbox 
                isSelected={task.status === 'completed'}
                onValueChange={(isSelected) => handleTaskStatusChange(task.id, isSelected)}
                classNames={{
                  wrapper: theme === 'dark' ? "before:border-gray-600" : "before:border-gray-300"
                }}
              />
              <div className="flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-medium ${
                      task.status === 'completed' 
                        ? theme === 'dark' ? 'text-gray-400 line-through' : 'text-gray-500 line-through'
                        : theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{task.description}</p>
                  </div>
                  <Button
                    isIconOnly
                    variant="light"
                    className={theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>2 days left</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className={`w-4 h-4 text-${getPriorityColor(task.priority)}`} />
                    <Badge
                      color={getPriorityColor(task.priority)}
                      variant="flat"
                      size="sm"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <Badge
                    variant="flat"
                    size="sm"
                  >
                    {task.category}
                  </Badge>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;