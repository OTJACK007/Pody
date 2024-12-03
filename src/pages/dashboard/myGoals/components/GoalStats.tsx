import React from 'react';
import { Card, CardBody, Progress } from "@nextui-org/react";
import { Target, CheckCircle2, Clock, Calendar } from 'lucide-react';

interface GoalStatsProps {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    upcoming: number;
  };
}

const GoalStats = ({ stats }: GoalStatsProps) => {
  const completionRate = Math.round((stats.completed / stats.total) * 100);

  const statCards = [
    {
      title: 'Total Goals',
      value: stats.total,
      icon: <Target className="w-5 h-5 text-primary" />,
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
      value: stats.inProgress,
      icon: <Clock className="w-5 h-5 text-yellow-500" />,
      color: 'bg-yellow-500/10'
    },
    {
      title: 'Upcoming',
      value: stats.upcoming,
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-400">{stat.title}</p>
            {index === 1 && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Completion Rate</span>
                  <span className="text-xs text-white">{completionRate}%</span>
                </div>
                <Progress 
                  value={completionRate} 
                  color="success"
                  size="sm"
                  className="max-w-full"
                />
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default GoalStats;