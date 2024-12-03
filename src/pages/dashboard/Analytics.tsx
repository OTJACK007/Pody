import React from 'react';
import { BarChart2, TrendingUp, Users, Clock, PlayCircle, Star, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { Card, CardBody, Progress, Button } from "@nextui-org/react";
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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
  // Mock data for charts
  const listeningData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hours Listened',
        data: [4.5, 3.8, 5.2, 4.0, 4.8, 6.2, 5.5],
        borderColor: '#ff3366',
        backgroundColor: 'rgba(255, 51, 102, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const genreDistribution = {
    labels: ['Technology', 'Business', 'Personal Growth', 'Entertainment', 'Education'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
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

  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Comments',
        data: [65, 75, 70, 85, 80, 95],
        backgroundColor: '#2eff94'
      },
      {
        label: 'Shares',
        data: [45, 55, 50, 65, 60, 75],
        backgroundColor: '#147dff'
      }
    ]
  };

  const stats = [
    {
      title: 'Total Listening Time',
      value: '156h',
      change: '+12.5%',
      isPositive: true,
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: 'Episodes Completed',
      value: '284',
      change: '+8.2%',
      isPositive: true,
      icon: <PlayCircle className="w-5 h-5" />
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '-0.2%',
      isPositive: false,
      icon: <Star className="w-5 h-5" />
    },
    {
      title: 'Active Channels',
      value: '42',
      change: '+15.3%',
      isPositive: true,
      icon: <Users className="w-5 h-5" />
    }
  ];

  const topChannels = [
    {
      name: 'TechInsights',
      avatar: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=400',
      engagement: 92,
      growth: '+12%'
    },
    {
      name: 'Business Pro',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      engagement: 87,
      growth: '+8%'
    },
    {
      name: 'MindsetGuru',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400',
      engagement: 85,
      growth: '+15%'
    }
  ];

  const handleDownload = () => {
    // Create a CSV string with analytics data
    const csvContent = `
Analytics Report - ${new Date().toLocaleDateString()}

Statistics
Total Listening Time,156h
Episodes Completed,284
Average Rating,4.8
Active Channels,42

Top Channels
Channel,Engagement,Growth
TechInsights,92%,+12%
Business Pro,87%,+8%
MindsetGuru,85%,+15%

Listening Data
Day,Hours
Mon,4.5
Tue,3.8
Wed,5.2
Thu,4.0
Fri,4.8
Sat,6.2
Sun,5.5

Genre Distribution
Genre,Percentage
Technology,35%
Business,25%
Personal Growth,20%
Entertainment,15%
Education,5%

Engagement Data
Month,Comments,Shares
Jan,65,45
Feb,75,55
Mar,70,50
Apr,85,65
May,80,60
Jun,95,75
    `.trim();

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `analytics-report-${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart2 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
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
          <Card key={stat.title} className="bg-gray-800/50 border border-gray-700/50">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change}
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listening Time Trend */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Listening Time Trend</h3>
            <Line
              data={listeningData}
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
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  },
                  x: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }
                }
              }}
            />
          </CardBody>
        </Card>

        {/* Genre Distribution */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Genre Distribution</h3>
            <div className="flex items-center justify-center">
              <div className="w-[300px]">
                <Doughnut
                  data={genreDistribution}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Engagement Metrics */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Engagement Metrics</h3>
            <Bar
              data={engagementData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  },
                  x: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }
                }
              }}
            />
          </CardBody>
        </Card>

        {/* Top Performing Channels */}
        <Card className="bg-gray-800/50 border border-gray-700/50">
          <CardBody className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Top Performing Channels</h3>
            <div className="space-y-6">
              {topChannels.map((channel) => (
                <div key={channel.name} className="flex items-center gap-4">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{channel.name}</h4>
                      <span className="text-green-500 text-sm">{channel.growth}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={channel.engagement}
                        color="success"
                        className="max-w-md"
                      />
                      <span className="text-sm text-gray-400">{channel.engagement}%</span>
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