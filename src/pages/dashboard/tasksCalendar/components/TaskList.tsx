import React from 'react';
import { Card, CardBody, Checkbox, Badge, Button } from "@nextui-org/react";
import { Clock, Calendar, Flag, MoreVertical } from 'lucide-react';

const TaskList = () => {
  const tasks = [
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
      status: 'completed'
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
  ];

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
          className="bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition-colors"
        >
          <CardBody className="p-4">
            <div className="flex items-start gap-4">
              <Checkbox 
                defaultSelected={task.status === 'completed'}
                classNames={{
                  wrapper: "before:border-gray-600"
                }}
              />
              <div className="flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={`font-medium ${
                      task.status === 'completed' ? 'text-gray-400 line-through' : 'text-white'
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                  </div>
                  <Button
                    isIconOnly
                    variant="light"
                    className="text-gray-400 hover:text-white"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
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