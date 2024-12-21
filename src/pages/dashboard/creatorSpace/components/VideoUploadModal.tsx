import React, { useState, useRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Progress, Card, CardBody } from "@nextui-org/react";
import { Upload, Link as LinkIcon, Image } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoUploadModal = ({ isOpen, onClose }: VideoUploadModalProps) => {
  const [contentType, setContentType] = useState<'video' | 'short' | null>(null);
  const [uploadType, setUploadType] = useState<'file' | 'link' | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const handleUpload = async () => {
    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress(i);
    }
    
    setIsUploading(false);
    onClose();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload
      console.log('Selected file:', file);
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="lg"
      classNames={{
        base: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'}`,
        closeButton: `${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`
      }}
    >
      <ModalContent>
        <ModalHeader>{contentType ? `Upload ${contentType === 'video' ? 'Video' : 'Short'}` : 'Choose Content Type'}</ModalHeader>
        <ModalBody>
          {!contentType ? (
            <div className="grid grid-cols-2 gap-4">
              <Card
                isPressable
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                    : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                } border transition-colors`}
                onClick={() => setContentType('video')}
              >
                <CardBody className="p-4 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Video</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Upload long-form content
                  </p>
                </CardBody>
              </Card>

              <Card
                isPressable
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                    : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                } border transition-colors`}
                onClick={() => setContentType('short')}
              >
                <CardBody className="p-4 text-center">
                  <div className="p-3 bg-secondary/10 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Short</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Upload short-form content
                  </p>
                </CardBody>
              </Card>
            </div>
          ) : !uploadType ? (
            <div className="grid grid-cols-2 gap-4">
              <Card
                isPressable
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                    : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                } border transition-colors`}
                onClick={() => setUploadType('file')}
              >
                <CardBody className="p-4 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Upload File</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Upload from your device
                  </p>
                </CardBody>
              </Card>

              <Card
                isPressable
                className={`${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                    : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                } border transition-colors`}
                onClick={() => setUploadType('link')}
              >
                <CardBody className="p-4 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <LinkIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>Import from URL</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Add from YouTube or other platforms
                  </p>
                </CardBody>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {uploadType === 'file' && (
                <div 
                  className={`aspect-video rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                  } flex items-center justify-center cursor-pointer group relative overflow-hidden`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileSelect}
                  />
                  <div className="text-center">
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Drop your video here or click to browse
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}

              {uploadType === 'link' && (
                <Input
                  label="Video URL"
                  placeholder="https://youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  startContent={<LinkIcon className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                    inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                  }}
                />
              )}

              <Input
                label="Video Title"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />

              <Input
                label="Description"
                placeholder="Enter video description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />

              <div>
                <p className={`text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>Thumbnail</p>
                <div 
                  className={`aspect-video rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
                  } flex items-center justify-center cursor-pointer group relative overflow-hidden`}
                  onClick={() => thumbnailInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={thumbnailInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleThumbnailSelect}
                  />
                  {thumbnail ? (
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Image className={`w-8 h-8 mx-auto mb-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Upload Thumbnail
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {isUploading && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      Uploading...
                    </span>
                    <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
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
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {(contentType || uploadType) && (
            <Button
              variant="flat"
              className={`mr-auto ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
              onPress={() => {
                if (uploadType) {
                  setUploadType(null);
                } else {
                  setContentType(null);
                }
              }}
            >
              Back
            </Button>
          )}
          <Button
            color="danger"
            variant="flat"
            onPress={onClose}
          >
            Cancel
          </Button>
          {uploadType && (
            <Button
              color="primary"
              onPress={handleUpload}
              isLoading={isUploading}
            >
              Upload
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VideoUploadModal;