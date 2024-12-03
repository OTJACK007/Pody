import React, { useState } from 'react';
import { Calendar as CalendarIcon, ListTodo, Clock, Filter, Plus, Kanban } from 'lucide-react';
import { Tabs, Tab, Button, Chip } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';
import CalendarView from './tasksCalendar/components/CalendarView';
import TaskList from './tasksCalendar/components/TaskList';
import TaskModal from './tasksCalendar/components/TaskModal';
import FilterPanel from './tasksCalendar/components/FilterPanel';
import KanbanBoard from './tasksCalendar/components/KanbanBoard';
import TaskTimeline from './tasksCalendar/components/TaskTimeline';
import TaskStats from './tasksCalendar/components/TaskStats';

const TasksCalendar = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedView, setSelectedView] = useState('calendar');
  const { theme } = useTheme();

  const taskStats = {
    total: 12,
    completed: 5,
    pending: 4,
    overdue: 3
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-primary" />
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Tasks & Calendar</h1>
            <div className="flex items-center gap-2 mt-1">
              <Chip size="sm" color="default">{taskStats.total} Total Tasks</Chip>
              <Chip size="sm" color="success">{taskStats.completed} Completed</Chip>
              <Chip size="sm" color="warning">{taskStats.pending} Pending</Chip>
              <Chip size="sm" color="danger">{taskStats.overdue} Overdue</Chip>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            startContent={<Filter className="w-4 h-4" />}
            className={`${
              theme === 'dark'
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          <Button
            startContent={<Plus className="w-4 h-4" />}
            className="bg-secondary text-black font-medium hover:bg-secondary/90"
            onClick={() => setShowTaskModal(true)}
          >
            Add Task
          </Button>
        </div>
      </div>

      <TaskStats stats={taskStats} />

      <div className="flex gap-6">
        <div className="flex-1">
          <Tabs 
            selectedKey={selectedView}
            onSelectionChange={(key) => setSelectedView(key.toString())}
            classNames={{
              tabList: `${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100'} p-1 rounded-lg`,
              cursor: `${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`,
              tab: `${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} data-[selected=true]:${theme === 'dark' ? 'text-white' : 'text-gray-900'}`,
              tabContent: "group-data-[selected=true]:text-inherit"
            }}
          >
            <Tab
              key="calendar"
              title={
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Calendar</span>
                </div>
              }
            />
            <Tab
              key="list"
              title={
                <div className="flex items-center gap-2">
                  <ListTodo className="w-4 h-4" />
                  <span>List View</span>
                </div>
              }
            />
            <Tab
              key="kanban"
              title={
                <div className="flex items-center gap-2">
                  <Kanban className="w-4 h-4" />
                  <span>Kanban</span>
                </div>
              }
            />
            <Tab
              key="timeline"
              title={
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Timeline</span>
                </div>
              }
            />
          </Tabs>

          <div className="mt-6">
            {selectedView === 'calendar' && <CalendarView />}
            {selectedView === 'list' && <TaskList />}
            {selectedView === 'kanban' && <KanbanBoard />}
            {selectedView === 'timeline' && <TaskTimeline />}
          </div>
        </div>

        {showFilters && (
          <div className="w-80">
            <FilterPanel onClose={() => setShowFilters(false)} />
          </div>
        )}
      </div>

      <TaskModal 
        isOpen={showTaskModal} 
        onClose={() => setShowTaskModal(false)} 
      />
    </div>
  );
};

export default TasksCalendar;