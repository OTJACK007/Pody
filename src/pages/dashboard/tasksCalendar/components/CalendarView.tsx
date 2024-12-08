import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Card, CardBody, Badge } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';
import DayTasksModal from './DayTasksModal';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { theme } = useTheme();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const mockTasks = {
    5: [
      {
        id: '1',
        title: 'Review Podcast',
        description: 'Review and take notes on latest tech podcast episode',
        dueTime: '10:00 AM',
        priority: 'high',
        category: 'Content',
        status: 'pending'
      }
    ],
    12: [
      {
        id: '2',
        title: 'Team Meeting',
        description: 'Weekly team sync to discuss progress',
        dueTime: '2:00 PM',
        priority: 'medium',
        category: 'Meeting',
        status: 'pending'
      }
    ],
    15: [
      {
        id: '3',
        title: 'Content Planning',
        description: 'Plan next month\'s content calendar',
        dueTime: '11:00 AM',
        priority: 'high',
        category: 'Planning',
        status: 'completed'
      },
      {
        id: '4',
        title: 'Record Episode',
        description: 'Record new podcast episode',
        dueTime: '3:00 PM',
        priority: 'medium',
        category: 'Production',
        status: 'pending'
      }
    ],
    20: [
      {
        id: '5',
        title: 'Edit Video',
        description: 'Edit and prepare video content',
        dueTime: '4:00 PM',
        priority: 'high',
        category: 'Production',
        status: 'pending'
      }
    ]
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleDayClick = useCallback((day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(selectedDate);
  }, [currentDate]);

  const getTasksForDate = (day: number) => {
    return mockTasks[day] || [];
  };

  return (
    <>
    <Card className={`${
      theme === 'dark' 
        ? 'bg-gray-800/50 border-gray-700/50' 
        : 'bg-white border-gray-200'
    } border`}>
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              className={`${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              onClick={prevMonth}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              className={`${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              onClick={nextMonth}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {weekDays.map(day => (
            <div key={day} className={`text-center text-sm font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {day}
            </div>
          ))}
          
          {Array(firstDayOfMonth).fill(null).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {days.map(day => (
            <div
              key={day}
              className={`aspect-square p-2 rounded-lg border ${
                theme === 'dark'
                  ? 'border-gray-700/50 hover:bg-gray-700/30'
                  : 'border-gray-200 hover:bg-gray-100'
              } transition-colors cursor-pointer relative hover:border-primary ${
                mockTasks[day] 
                  ? theme === 'dark' ? 'bg-gray-700/20' : 'bg-gray-50' 
                  : ''
              }`} 
              onClick={() => handleDayClick(day)}
            >
              <span className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>{day}</span>
              {getTasksForDate(day).map((task, index) => (
                <Badge
                  key={index}
                  color={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'success'}
                  content=""
                  className="absolute bottom-2 left-2"
                  size="sm"
                />
              ))}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
    
    {selectedDate && (
      <DayTasksModal
        isOpen={!!selectedDate}
        onClose={() => setSelectedDate(null)}
        date={selectedDate}
        tasks={getTasksForDate(selectedDate.getDate())}
      />
    )}
    </>
  );
};

export default CalendarView;