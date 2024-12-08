import React, { useState } from 'react';
import { Card, CardBody, Avatar, Badge } from "@nextui-org/react";
import { Calendar, Clock, Flag } from 'lucide-react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useSensor, useSensors, PointerSensor, DragOverEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useTheme } from '../../../../contexts/ThemeContext';
import KanbanColumn from './KanbanColumn';
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

interface TasksByColumn {
  [key: string]: Task[];
}

const KanbanBoard = () => {
  const { theme } = useTheme();
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-500' },
    { id: 'inProgress', title: 'In Progress', color: 'bg-blue-500' },
    { id: 'review', title: 'Review', color: 'bg-yellow-500' },
    { id: 'done', title: 'Done', color: 'bg-green-500' }
  ];

  const initialTasks: TasksByColumn = {
    todo: [
      {
        id: 1,
        title: 'Research Content Ideas',
        description: 'Brainstorm new podcast topics',
        dueDate: '2024-03-25',
        priority: 'high',
        assignee: {
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
        }
      }
    ],
    inProgress: [
      {
        id: 2,
        title: 'Record Episode',
        description: 'Record new tech podcast episode',
        dueDate: '2024-03-23',
        priority: 'medium',
        assignee: {
          name: 'Jane Smith',
          avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
        }
      }
    ],
    review: [
      {
        id: 3,
        title: 'Edit Content',
        description: 'Edit and polish podcast episode',
        dueDate: '2024-03-24',
        priority: 'low',
        assignee: {
          name: 'Mike Johnson',
          avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
        }
      }
    ],
    done: [
      {
        id: 4,
        title: 'Publish Episode',
        description: 'Upload and schedule podcast',
        dueDate: '2024-03-22',
        priority: 'high',
        assignee: {
          name: 'Sarah Wilson',
          avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d'
        }
      }
    ]
  };

  const [tasks, setTasks] = useState<TasksByColumn>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  const findColumnByTaskId = (taskId: number) => {
    return Object.entries(tasks).find(([_, columnTasks]) => 
      columnTasks.some(task => task.id === taskId)
    )?.[0] || null;
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = parseInt(active.id.toString());

    // Find the task in all columns
    for (const [columnId, columnTasks] of Object.entries(tasks)) {
      const task = columnTasks.find(t => t.id === taskId);
      if (task) {
        setActiveTask(task);
        setActiveColumn(columnId);
        break;
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = typeof activeId === 'number';
    const isOverATask = typeof overId === 'number';

    if (!isActiveATask) return;

    // Handle dropping a task over another task
    if (isOverATask) {
      const activeColumn = findColumnByTaskId(activeId as number);
      const overColumn = findColumnByTaskId(overId as number);
      
      if (!activeColumn || !overColumn || activeColumn !== overColumn) return;

      // Tasks are in the same column, handle reordering
      handleReorder(activeColumn, activeId as number, overId as number);
    }
  };

  const handleReorder = (columnId: string, activeId: number, overId: number) => {
    setTasks(prev => {
      const columnTasks = [...prev[columnId]];
      const activeIndex = columnTasks.findIndex(task => task.id === activeId);
      const overIndex = columnTasks.findIndex(task => task.id === overId);

      // Reorder tasks within the column
      const reorderedTasks = arrayMove(columnTasks, activeIndex, overIndex);

      return {
        ...prev,
        [columnId]: reorderedTasks
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || !activeColumn) return;

    const taskId = parseInt(active.id.toString());
    const targetColumnId = over.id.toString();

    if (activeColumn === targetColumnId) return;

    setTasks(prev => {
      const updatedTasks = { ...prev };
      const task = prev[activeColumn].find(t => t.id === taskId);
      
      if (task) {
        // Remove task from source column
        updatedTasks[activeColumn] = prev[activeColumn].filter(t => t.id !== taskId);
        
        // Initialize target column if it doesn't exist
        if (!updatedTasks[targetColumnId]) {
          updatedTasks[targetColumnId] = [];
        }
        
        // Add task to target column
        updatedTasks[targetColumnId] = [...updatedTasks[targetColumnId], task];
      }

      return updatedTasks;
    });

    setActiveTask(null);
    setActiveColumn(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
            tasks={tasks[column.id] || []}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && (
          <KanbanItem task={activeTask} />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;