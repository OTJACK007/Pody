import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Input, Progress } from "@nextui-org/react";
import { Upload, File, CheckCircle } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportModal = ({ isOpen, onClose }: ImportModalProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { theme } = useTheme();

  const handleUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }
    
    setIsUploading(false);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Import Notes
          </h2>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Import your notes from various sources
          </p>
        </ModalHeader>
        <ModalBody>
          <Card className={`${
            theme === 'dark' 
              ? 'bg-gray-700/50 border-gray-600' 
              : 'bg-gray-100 border-gray-200'
          } border border-dashed`}>
            <CardBody className="py-8">
              <div className="text-center">
                <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className={`text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Drag and drop files here</h3>
                <p className={`mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>or click to browse</p>
                <Input
                  type="file"
                  className="hidden"
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
                <Button
                  color="primary"
                  variant="flat"
                >
                  Choose Files
                </Button>
              </div>
            </CardBody>
          </Card>

          {isUploading && (
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-2">
                <File className="w-4 h-4 text-primary" />
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  Uploading files...
                </span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {uploadProgress}%
                </span>
              </div>
              <Progress 
                value={uploadProgress}
                color="primary"
                className="max-w-full"
              />
            </div>
          )}

          {uploadProgress === 100 && (
            <div className="flex items-center gap-2 text-green-500 mt-4">
              <CheckCircle className="w-4 h-4" />
              <span>Upload complete!</span>
            </div>
          )}
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
            onPress={handleUpload}
            isLoading={isUploading}
          >
            Import Notes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImportModal;