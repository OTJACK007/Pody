import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Calendar, Clock, Flag, Tag } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal = ({ isOpen, onClose }: TaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');

  const priorities = [
    { value: 'high', label: 'High Priority', color: 'danger' },
    { value: 'medium', label: 'Medium Priority', color: 'warning' },
    { value: 'low', label: 'Low Priority', color: 'success' }
  ];

  const categories = [
    { value: 'content', label: 'Content' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'production', label: 'Production' },
    { value: 'research', label: 'Research' }
  ];

  const handleSubmit = () => {
    // Handle task creation
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
        <ModalHeader>Create New Task</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Task Title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              classNames={{
                input: "bg-gray-700/50 text-white",
                inputWrapper: "bg-gray-700/50 border-gray-600"
              }}
            />

            <Textarea
              label="Description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              classNames={{
                input: "bg-gray-700/50 text-white",
                inputWrapper: "bg-gray-700/50 border-gray-600"
              }}
            />

            <div className="grid grid-cols-2 gap-4">
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

              <Select
                label="Priority"
                placeholder="Select priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                startContent={<Flag className="w-4 h-4 text-gray-400" />}
                classNames={{
                  trigger: "bg-gray-700/50 border-gray-600",
                  value: "text-white"
                }}
              >
                {priorities.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

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
              {categories.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </Select>
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
          >
            Create Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;