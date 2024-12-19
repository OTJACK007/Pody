import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { CheckCircle2, Clock, AlertTriangle, ListTodo } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useGoals } from '../../../../contexts/GoalsContext';

interface GoalStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    upcoming: number;
  };
}

const GoalStats = ({ stats }: GoalStatsProps) => {
  const { theme } = useTheme();
  const { goals } = useGoals();

  const statCards = [
    {
      title: 'Total Goals',
      value: stats.total,
      icon: <ListTodo className="w-5 h-5 text-primary" />,
      color: 'bg-primary/10'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
      color: 'bg-green-500/10'
    },
    {
      title: 'In Progress',
      value: stats.pending,
      icon: <Clock className="w-5 h-5 text-yellow-500" />,
      color: 'bg-yellow-500/10'
    },
    {
      title: 'Upcoming',
      value: stats.upcoming,
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      color: 'bg-red-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stat.value}</span>
            </div>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {stat.title}
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default GoalStats;