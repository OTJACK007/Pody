import React, { useState } from 'react';
import { Calendar as CalendarIcon, ListTodo, Clock, Filter, Plus, Kanban } from 'lucide-react';
import { Tabs, Tab, Button, Chip } from "@nextui-org/react";
import CalendarView from './components/CalendarView';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import FilterPanel from './components/FilterPanel';
import KanbanBoard from './components/KanbanBoard';
import TaskTimeline from './components/TaskTimeline';
import TaskStats from './components/TaskStats';

const TasksCalendar = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedView, setSelectedView] = useState('calendar');

  const taskStats = {
    total: 12,
    completed: 5,
    pending: 4,
    overdue: 3
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-white">Tasks & Calendar</h1>
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
            className="bg-gray-700 text-white hover:bg-gray-600"
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
              tabList: "bg-gray-800/50 p-1 rounded-lg",
              cursor: "bg-gray-700",
              tab: "text-gray-400 data-[selected=true]:text-white",
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