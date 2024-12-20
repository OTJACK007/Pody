import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RadioGroup, Radio } from "@nextui-org/react";
import { useTheme } from '../../../../contexts/ThemeContext';

interface VideoFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filters: any) => void;
}

const VideoFiltersModal = ({ isOpen, onClose, onFilterChange }: VideoFiltersModalProps) => {
  const { theme } = useTheme();
  const [dateFilter, setDateFilter] = useState('all');
  const [viewsFilter, setViewsFilter] = useState('all');

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  const viewsOptions = [
    { value: 'all', label: 'All Views' },
    { value: 'most', label: 'Most Viewed' },
    { value: 'least', label: 'Least Viewed' }
  ];

  const handleApplyFilters = () => {
    onFilterChange({
      date: dateFilter,
      views: viewsFilter
    });
    onClose();
  };

  const handleReset = () => {
    setDateFilter('all');
    setViewsFilter('all');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="lg"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`
      }}
    >
      <ModalContent>
        <ModalHeader>Filter Videos</ModalHeader>
        <ModalBody className="space-y-6">
          <div>
            <h4 className={`text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Date</h4>
            <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
              {dateOptions.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h4 className={`text-sm font-medium mb-3 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Views</h4>
            <RadioGroup value={viewsFilter} onValueChange={setViewsFilter}>
              {viewsOptions.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="flat"
            color="danger"
            onPress={handleReset}
          >
            Reset Filters
          </Button>
          <Button
            color="primary"
            onPress={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VideoFiltersModal;