import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardBody, Avatar, Badge } from "@nextui-org/react";
import { Calendar, Clock } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  assignee: {
    name: string;
    avatar: string;
  };
}

interface KanbanItemProps {
  task: Task;
}

const KanbanItem = ({ task }: KanbanItemProps) => {
  const { theme } = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id.toString()
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={`${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } border transition-colors cursor-move rounded-lg`}>
        <div className="p-4">
          <h4 className={`font-medium mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>{task.title}</h4>
          <p className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{task.description}</p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {task.dueDate}
              </span>
            </div>
            <Badge
              color={getPriorityColor(task.priority)}
              variant="flat"
              size="sm"
            >
              {task.priority}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <Avatar
              src={task.assignee.avatar}
              size="sm"
              className="ring-2 ring-white/20"
            />
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>2 days left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanItem;