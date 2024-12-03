import React, { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { Button, Tabs, Tab, Chip } from "@nextui-org/react";
import { useTheme } from '../../../contexts/ThemeContext';
import GoalsList from './components/GoalsList';
import GoalInsights from './components/GoalInsights';
import GoalProgress from './components/GoalProgress';
import GoalModal from './components/GoalModal';
import GoalStats from './components/GoalStats';

const MyGoals = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [selectedView, setSelectedView] = useState('active');
  const { theme } = useTheme();

  const goalStats = {
    total: 8,
    completed: 3,
    pending: 4,
    upcoming: 1
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-primary" />
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>My Goals</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Track your progress and achievements
            </p>
          </div>
        </div>
        <Button
          startContent={<Plus className="w-4 h-4" />}
          className="bg-secondary text-black font-medium hover:bg-secondary/90"
          onClick={() => setShowGoalModal(true)}
        >
          Add New Goal
        </Button>
      </div>

      <GoalStats stats={goalStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
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
            <Tab key="active" title="Active Goals" />
            <Tab key="completed" title="Completed" />
            <Tab key="upcoming" title="Upcoming" />
          </Tabs>

          <div className="mt-6">
            <GoalsList status={selectedView} />
          </div>
        </div>

        <div className="space-y-6">
          <GoalProgress />
          <GoalInsights />
        </div>
      </div>

      <GoalModal 
        isOpen={showGoalModal} 
        onClose={() => setShowGoalModal(false)} 
      />
    </div>
  );
};

export default MyGoals;