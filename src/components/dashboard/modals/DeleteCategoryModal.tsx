import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteCategoryModal = ({ isOpen, onClose, onConfirm, isLoading }: DeleteCategoryModalProps) => {
  const { theme } = useTheme();

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader className="flex gap-2 items-center">
          <AlertTriangle className="w-5 h-5 text-danger" />
          <span>Delete Category</span>
        </ModalHeader>
        <ModalBody>
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
            Are you sure you want to delete this category? This action cannot be undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="flat"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={onConfirm}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;