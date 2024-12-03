import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Card, CardBody, Badge } from "@nextui-org/react";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
    5: [{ title: 'Review Podcast', color: 'primary' }],
    12: [{ title: 'Team Meeting', color: 'secondary' }],
    15: [
      { title: 'Content Planning', color: 'success' },
      { title: 'Record Episode', color: 'warning' }
    ],
    20: [{ title: 'Edit Video', color: 'danger' }]
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <Card className="bg-gray-800/50 border border-gray-700/50">
      <CardBody className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              className="bg-gray-700 text-white hover:bg-gray-600"
              onClick={prevMonth}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              className="bg-gray-700 text-white hover:bg-gray-600"
              onClick={nextMonth}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-400">
              {day}
            </div>
          ))}
          
          {Array(firstDayOfMonth).fill(null).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {days.map(day => (
            <div
              key={day}
              className={`aspect-square p-2 rounded-lg border border-gray-700/50 hover:bg-gray-700/30 transition-colors cursor-pointer relative ${
                mockTasks[day] ? 'bg-gray-700/20' : ''
              }`}
            >
              <span className="text-sm text-gray-300">{day}</span>
              {mockTasks[day]?.map((task, index) => (
                <Badge
                  key={index}
                  color={task.color}
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
  );
};

export default CalendarView;