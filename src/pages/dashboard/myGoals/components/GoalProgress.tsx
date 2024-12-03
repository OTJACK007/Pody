import React from 'react';
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { Target, TrendingUp } from 'lucide-react';

const GoalProgress = () => {
  const categories = [
    { name: 'Personal Growth', progress: 75, color: 'success' },
    { name: 'Finance', progress: 45, color: 'warning' },
    { name: 'Business', progress: 30, color: 'primary' },
    { name: 'Health', progress: 60, color: 'secondary' }
  ];

  return (
    <Card className="bg-gray-800/50 border border-gray-700/50">
      <CardHeader className="flex gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Progress by Category</h3>
          <p className="text-sm text-gray-400">Track your goals by category</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">{category.name}</span>
                <span className="text-sm text-gray-400">{category.progress}%</span>
              </div>
              <Progress 
                value={category.progress} 
                color={category.color as any}
                className="max-w-full"
              />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default GoalProgress;