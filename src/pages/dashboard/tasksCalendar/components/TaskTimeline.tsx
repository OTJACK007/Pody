import React from 'react';
import { Card, CardBody, Avatar, Badge } from "@nextui-org/react";
import { Calendar, Clock, Flag } from 'lucide-react';

const TaskTimeline = () => {
  const timelineTasks = [
    {
      id: 1,
      title: 'Research Content Ideas',
      description: 'Brainstorm new podcast topics',
      startTime: '09:00',
      endTime: '10:30',
      date: '2024-03-22',
      priority: 'high',
      assignee: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
      }
    },
    {
      id: 2,
      title: 'Record Episode',
      description: 'Record new tech podcast episode',
      startTime: '11:00',
      endTime: '12:30',
      date: '2024-03-22',
      priority: 'medium',
      assignee: {
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
      }
    },
    {
      id: 3,
      title: 'Edit Content',
      description: 'Edit and polish podcast episode',
      startTime: '14:00',
      endTime: '16:00',
      date: '2024-03-22',
      priority: 'low',
      assignee: {
        name: 'Mike Johnson',
        avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
      }
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
    <Card className="bg-gray-800/50 border border-gray-700/50">
      <CardBody className="p-6">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-700" />
          
          <div className="space-y-8">
            {timelineTasks.map((task) => (
              <div key={task.id} className="relative flex gap-6">
                <div className="flex-shrink-0 w-16 text-sm text-gray-400 pt-3">
                  {task.startTime}
                </div>

                <div className="absolute left-8 top-4 w-3 h-3 rounded-full bg-primary border-4 border-gray-800" />

                <div className="flex-grow">
                  <Card className="bg-gray-700/30 border border-gray-700">
                    <CardBody className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-white font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                        </div>
                        <Badge
                          color={getPriorityColor(task.priority)}
                          variant="flat"
                          size="sm"
                        >
                          {task.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={task.assignee.avatar}
                            size="sm"
                            className="ring-2 ring-white/20"
                          />
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{task.startTime} - {task.endTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{task.date}</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskTimeline;