import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Calendar, Target, Tag } from 'lucide-react';

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoalModal = ({ isOpen, onClose }: GoalModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'personal', label: 'Personal Growth' },
    { value: 'finance', label: 'Finance' },
    { value: 'business', label: 'Business' },
    { value: 'health', label: 'Health' }
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      classNames={{
        base: "bg-gray-800 text-white",
        closeButton: "text-white hover:bg-gray-700"
      }}
    >
      <ModalContent>
        <ModalHeader>Create New Goal</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Goal Title"
              placeholder="Enter your goal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              startContent={<Target className="w-4 h-4 text-gray-400" />}
              classNames={{
                input: "bg-gray-700/50 text-white",
                inputWrapper: "bg-gray-700/50 border-gray-600"
              }}
            />

            <Textarea
              label="Description"
              placeholder="Describe your goal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              classNames={{
                input: "bg-gray-700/50 text-white",
                inputWrapper: "bg-gray-700/50 border-gray-600"
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Category"
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                startContent={<Tag className="w-4 h-4 text-gray-400" />}
                classNames={{
                  trigger: "bg-gray-700/50 border-gray-600",
                  value: "text-white"
                }}
              >
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                type="date"
                label="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                startContent={<Calendar className="w-4 h-4 text-gray-400" />}
                classNames={{
                  input: "bg-gray-700/50 text-white",
                  inputWrapper: "bg-gray-700/50 border-gray-600"
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSubmit}
            isLoading={isLoading}
          >
            Create Goal
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GoalModal;