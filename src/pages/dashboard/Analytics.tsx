import React from 'react';
import { BarChart2, Brain, Clock, Play, Target, TrendingUp, Star, Download } from 'lucide-react';
import { Card, CardBody, Progress, Button } from "@nextui-org/react";
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  // Learning Progress Data
  const learningData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hours Learning',
        data: [2.5, 3.8, 2.2, 4.0, 3.8, 5.2, 4.5],
        borderColor: '#ff3366',
        backgroundColor: 'rgba(255, 51, 102, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Knowledge Distribution
  const knowledgeDistribution = {
    labels: ['Technology', 'Business', 'Personal Growth', 'Science', 'Health'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          '#ff3366',
          '#2eff94',
          '#147dff',
          '#9333ea',
          '#f97316'
        ]
      }
    ]
  };

  // Insights Captured
  const insightsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Notes Taken',
        data: [45, 55, 60, 75, 85, 95],
        backgroundColor: '#2eff94'
      },
      {
        label: 'Insights Saved',
        data: [35, 45, 50, 65, 70, 85],
        backgroundColor: '#147dff'
      }
    ]
  };

  const stats = [
    {
      title: 'Videos Watched',
      value: '184',
      change: '+18.5%',
      isPositive: true,
      icon: <Play className="w-5 h-5" />
    },
    {
      title: 'Learning Hours',
      value: '156h',
      change: '+12.5%',
      isPositive: true,
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: 'Knowledge Items',
      value: '284',
      change: '+8.2%',
      isPositive: true,
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: 'Goals Progress',
      value: '78%',
      change: '+15.3%',
      isPositive: true,
      icon: <Target className="w-5 h-5" />
    }
  ];

  const topInsights = [
    {
      topic: 'AI Ethics',
      source: 'Future of AI',
      retention: 95,
      impact: 'High'
    },
    {
      topic: 'Leadership Principles',
      source: 'Business Mastery',
      retention: 88,
      impact: 'Medium'
    },
    {
      topic: 'Innovation Strategy',
      source: 'Tech Insights',
      retention: 92,
      impact: 'High'
    }
  ];

  const handleDownload = () => {
    // Create a CSV string with analytics data
    const csvContent = `
Learning Analytics Report - ${new Date().toLocaleDateString()}

Statistics
Learning Hours,156h
Knowledge Items,284
Goals Progress,78%
Comprehension,92%

Top Insights
Topic,Source,Retention,Impact
AI Ethics,Future of AI,95%,High
Leadership Principles,Business Mastery,88%,Medium
Innovation Strategy,Tech Insights,92%,High

Learning Hours by Day
Day,Hours
Mon,2.5
Tue,3.8
Wed,2.2
Thu,4.0
Fri,3.8
Sat,5.2
Sun,4.5

Knowledge Distribution
Category,Percentage
Technology,35%
Business,25%
Personal Growth,20%
Science,12%
Health,8%
    `.trim();

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `learning-analytics-${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart2 className="w-8 h-8 text-primary" />
          <div>
            <h1 className={`text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Learning Analytics</h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Track your knowledge acquisition and learning progress
            </p>
          </div>
        </div>
        <Button
          color="primary"
          endContent={<Download className="w-4 h-4" />}
          onClick={handleDownload}
        >
          Download Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className={`${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white border-gray-200'
          } border`}>
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                } rounded-lg`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <h3 className={`text-2xl font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{stat.value}</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                {stat.title}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Time Trend */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Learning Time Trend</h3>
            <Line
              data={learningData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: gridColor
                    },
                    ticks: {
                      color: textColor
                    }
                  },
                  x: {
                    grid: {
                      color: gridColor
                    },
                    ticks: {
                      color: textColor
                    }
                  }
                }
              }}
            />
          </CardBody>
        </Card>

        {/* Knowledge Distribution */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Knowledge Distribution</h3>
            <div className="flex items-center justify-center">
              <div className="w-[300px]">
                <Doughnut
                  data={knowledgeDistribution}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: textColor
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Insights Captured */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Insights & Notes</h3>
            <Bar
              data={insightsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: textColor
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: gridColor
                    },
                    ticks: {
                      color: textColor
                    }
                  },
                  x: {
                    grid: {
                      color: gridColor
                    },
                    ticks: {
                      color: textColor
                    }
                  }
                }
              }}
            />
          </CardBody>
        </Card>

        {/* Top Insights */}
        <Card className={`${
          theme === 'dark' 
            ? 'bg-gray-800/50 border-gray-700/50' 
            : 'bg-white border-gray-200'
        } border`}>
          <CardBody className="p-6">
            <h3 className={`text-lg font-semibold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Top Insights</h3>
            <div className="space-y-6">
              {topInsights.map((insight) => (
                <div key={insight.topic} className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        {insight.topic}
                      </h4>
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>from {insight.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={insight.retention}
                        color="success"
                        className="max-w-md"
                      />
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{insight.retention}% retention</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight.impact === 'High' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;