import React, { useState, useEffect, useCallback } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Calendar, Clock, Tag, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../../../../../contexts/ThemeContext';
import { createFeature, updateExistingFeature } from '../../../../../services/features';
import { useAuth } from '../../../../../contexts/AuthContext';

interface FeatureDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: any;
}

const FeatureDetailsModal = ({ isOpen, onClose, feature }: FeatureDetailsModalProps) => {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [destination, setDestination] = useState('');
  const [stage, setStage] = useState('');
  const [quarter, setQuarter] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [features, setFeatures] = useState<string[]>([]);

  const stages = [
    { value: 'planning', label: 'Planning', description: 'Initial planning and research phase' },
    { value: 'design', label: 'Design', description: 'UI/UX design and architecture' },
    { value: 'development', label: 'In Development', description: 'Active development phase' },
    { value: 'testing', label: 'Testing', description: 'QA and user testing' },
    { value: 'review', label: 'Final Review', description: 'Final checks and approvals' },
    { value: 'ready', label: 'Ready for Release', description: 'Ready to be deployed' }
  ];

  const quarters = [
    { value: 'q2-2024', label: 'Q2 2024', description: 'April - June 2024' },
    { value: 'q3-2024', label: 'Q3 2024', description: 'July - September 2024' },
    { value: 'q4-2024', label: 'Q4 2024', description: 'October - December 2024' },
    { value: 'q1-2025', label: 'Q1 2025', description: 'January - March 2025' }
  ];

  const destinations = [
    { value: 'upcoming', label: 'Upcoming Features', description: 'Features in active development' },
    { value: 'suggested', label: 'Suggested Features', description: 'Features under consideration' },
    { value: 'maybe', label: 'Maybe List', description: 'Features for future consideration' },
    { value: 'collecting', label: 'Collecting Votes', description: 'Features listed for user voting' }
  ];

  useEffect(() => {
    if (feature) {
      setTitle(feature.title || '');
      setDescription(feature.description || '');
      setExpectedDate(feature.expectedDate || '');
      setProgress(feature.progress || 0);
      setStatus(feature.status || '');
      setDestination(feature.destination || '');
      setStage(feature.stage || '');
      setQuarter(feature.quarter || '');
      setFeatures(feature.features || []);
    } else {
      setTitle('');
      setDescription('');
      setExpectedDate('');
      setProgress(0);
      setStatus('');
      setDestination('');
      setStage('');
      setQuarter('');
      setFeatures([]);
    }
  }, [feature]);

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      const featureData = {
        title,
        description,
        expectedDate,
        progress: Number(progress),
        stage,
        quarter,
        features,
        destination,
        modifiedBy: currentUser.uid,
        lastModified: new Date()
      };

      if (feature) {
        await updateExistingFeature(feature.id, featureData);
      } else {
        await createFeature({
          ...featureData,
          requestedBy: currentUser.uid,
          requestedDate: new Date(),
          votes: { up: 0, down: 0, users: {} }
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving feature:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader>
          {feature ? 'Edit Feature' : 'Add New Feature'}
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <Input
              label="Feature Title"
              placeholder="Enter feature title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <Textarea
              label="Description"
              placeholder="Enter feature description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              minRows={4}
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />

            <div className="grid grid-cols-2 gap-6">
              <Input
                type="date"
                label="Expected Release Date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                startContent={<Calendar className="w-4 h-4 text-gray-400" />}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />

              <Input
                type="number"
                min="0"
                max="100"
                label="Development Progress (%)"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                endContent={<span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>%</span>}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Select
                label="Development Stage"
                placeholder="Select stage"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                defaultSelectedKeys={stage ? [stage] : undefined}
                classNames={{
                  trigger: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`,
                  value: theme === 'dark' ? 'text-white' : 'text-gray-900',
                  label: theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }}
              >
                {stages.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    <div className="flex flex-col">
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        {s.label}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {s.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Expected Quarter"
                placeholder="Select quarter"
                value={quarter}
                onChange={(e) => setQuarter(e.target.value)}
                defaultSelectedKeys={quarter ? [quarter] : undefined}
                classNames={{
                  trigger: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`,
                  value: theme === 'dark' ? 'text-white' : 'text-gray-900',
                  label: theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }}
              >
                {quarters.map((q) => (
                  <SelectItem key={q.value} value={q.value}>
                    <div className="flex flex-col">
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        {q.label}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {q.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            </div>

            {!feature && (
              <Select
                label="Add Feature To"
                placeholder="Select destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                defaultSelectedKeys={destination ? [destination] : undefined}
                classNames={{
                  trigger: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`,
                  value: theme === 'dark' ? 'text-white' : 'text-gray-900',
                  label: theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }}
              >
                {destinations.map((dest) => (
                  <SelectItem key={dest.value} value={dest.value}>
                    <div className="flex flex-col">
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                        {dest.label}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {dest.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Feature List</label>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Add feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  startContent={<Tag className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
                <Button
                  isIconOnly
                  onClick={handleAddFeature}
                  className="bg-primary text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className={`${
                        theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                      } font-medium`}>
                        {feature}
                      </span>
                    </div>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            className="font-medium"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className="font-medium"
            onPress={handleSave}
          >
            {feature ? 'Save Changes' : 'Add Feature'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeatureDetailsModal;