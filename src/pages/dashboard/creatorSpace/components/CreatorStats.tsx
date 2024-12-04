import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import { TrendingUp, DollarSign } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { Line } from 'react-chartjs-2';

const CreatorStats = () => {
  const { theme } = useTheme();

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [1.2, 1.9, 1.6, 2.5, 2.2, 2.8].map(value => value + 'K'),
        borderColor: '#2eff94',
        backgroundColor: 'rgba(46, 255, 148, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const viewsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Views',
        data: [15, 25, 20, 35, 30, 40].map(value => value + 'K'),
        borderColor: '#ff3366',
        backgroundColor: 'rgba(255, 51, 102, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.raw;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          callback: function(value: any) {
            return value + 'K';
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className={`${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700/50'
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Revenue</h3>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-secondary' : 'text-secondary/90'
                }`}>$2.8K</span>
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>this month</span>
              </div>
            </div>
            <div className="p-2 bg-secondary/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-secondary" />
            </div>
          </div>
          <div style={{ height: '200px' }}>
            <Line data={revenueData} options={chartOptions} />
          </div>
        </CardBody>
      </Card>

      <Card className={`${
        theme === 'dark'
          ? 'bg-gray-800/50 border-gray-700/50'
          : 'bg-white border-gray-200'
      } border`}>
        <CardBody className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Views</h3>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-primary' : 'text-primary/90'
                }`}>40K</span>
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>this month</span>
              </div>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div style={{ height: '200px' }}>
            <Line data={viewsData} options={chartOptions} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreatorStats;