import React from 'react';
import { Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { Target, TrendingUp } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useGoals } from '../../../../contexts/GoalsContext';

const GoalProgress = () => {
  const { theme } = useTheme();
  const { goals } = useGoals();
  
  const calculateCategoryProgress = (category: string) => {
    const categoryGoals = goals.filter(goal => goal.category === category);
    if (categoryGoals.length === 0) return 0;
    
    const totalProgress = categoryGoals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / categoryGoals.length);
  };

  const categories = [
    { name: 'Personal Growth', progress: calculateCategoryProgress('personal'), color: 'success' },
    { name: 'Finance', progress: calculateCategoryProgress('finance'), color: 'warning' },
    { name: 'Business', progress: calculateCategoryProgress('business'), color: 'primary' },
    { name: 'Health', progress: calculateCategoryProgress('health'), color: 'secondary' }
  ];

  return (
    <Card className={`${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white border-gray-200'
    } border`}>
      <CardHeader className="flex gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Progress by Category</h3>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Track your goals by category
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-2">
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  {category.name}
                </span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {category.progress}%
                </span>
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