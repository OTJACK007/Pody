import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTheme } from '../../../../contexts/ThemeContext';
import KanbanItem from './KanbanItem';

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

interface KanbanColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const KanbanColumn = ({ id, title, color, tasks }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id });
  const { theme } = useTheme();

  return (
    <div className="flex-shrink-0 w-80">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <h3 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
          {title}
        </h3>
        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
          ({tasks.length})
        </span>
      </div>

      <div 
        ref={setNodeRef}
        className={`space-y-4 min-h-[200px] p-2 rounded-lg ${
          theme === 'dark' 
            ? 'bg-gray-800/20' 
            : 'bg-gray-100'
        }`}
      >
        <SortableContext 
          items={tasks.map(task => task.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <KanbanItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanColumn;