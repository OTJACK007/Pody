import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem, Progress, Card, CardBody } from "@nextui-org/react";
import { Upload, Image as ImageIcon, Link } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';

interface PublishPodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PublishPodcastModal = ({ isOpen, onClose }: PublishPodcastModalProps) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploadType, setUploadType] = useState<'file' | 'link' | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'education', label: 'Education' },
    { value: 'entertainment', label: 'Entertainment' }
  ];

  const platforms = [
    { 
      value: 'youtube', 
      label: 'YouTube',
      icon: 'https://static.wixstatic.com/media/c67dd6_aea51bc85e594033b8a29040d67b1d15~mv2.png'
    },
    { 
      value: 'spotify', 
      label: 'Spotify',
      icon: 'https://static.wixstatic.com/media/c67dd6_ec71f45884124292ab688e1089e48cb4~mv2.png'
    },
    { 
      value: 'tiktok', 
      label: 'TikTok',
      icon: 'https://static.wixstatic.com/media/c67dd6_f4ebb22077d749f8ab5abdb4ae142cae~mv2.png'
    },
    { 
      value: 'instagram', 
      label: 'Instagram',
      icon: 'https://static.wixstatic.com/media/c67dd6_b9fe6adb4004453a9db57fe97cd4d6aa~mv2.png'
    }
  ];

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
        <ModalHeader>Publish Podcast</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card
              isPressable
              className={`${
                theme === 'dark'
                  ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'
                  : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
              } border transition-colors`}
              onClick={() => setUploadType('file')}
            >
              <CardBody className="p-6 text-center">
                <Upload className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Upload File</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
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
              <CardBody className="p-6 text-center">
                <Link className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Import from URL</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Add from other platforms
                </p>
              </CardBody>
            </Card>
          </div>

          {uploadType === 'file' && (
            <div className={`aspect-video rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
            } flex items-center justify-center cursor-pointer group relative overflow-hidden mb-6`}>
              <div className="text-center">
                <Upload className={`w-8 h-8 mx-auto mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Drop your video here or click to upload
                </p>
              </div>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {uploadType === 'link' && (
            <div className="space-y-4 mb-6">
              <Select
                label="Platform"
                placeholder="Select platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                classNames={{
                  trigger: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`,
                  value: theme === 'dark' ? 'text-white' : 'text-gray-900'
                }}
              >
                {platforms.map((p) => (
                  <SelectItem 
                    key={p.value} 
                    value={p.value}
                    startContent={
                      <img 
                        src={p.icon} 
                        alt={p.label}
                        className="w-5 h-5 object-contain"
                      />
                    }
                  >
                    {p.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Video URL"
                placeholder="https://..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                classNames={{
                  input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                  inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
                }}
              />
            </div>
          )}

          <Input
            label="Title"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />

          <Textarea
            label="Description"
            placeholder="Describe your video"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            classNames={{
              input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
              inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              placeholder="Select category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              classNames={{
                trigger: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`,
                value: theme === 'dark' ? 'text-white' : 'text-gray-900'
              }}
            >
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </Select>

            <div className={`aspect-video rounded-lg ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
            } flex items-center justify-center cursor-pointer`}>
              <div className="text-center">
                <ImageIcon className={`w-6 h-6 mx-auto mb-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>Upload Thumbnail</p>
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  Processing...
                </span>
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                  {uploadProgress}%
                </span>
              </div>
              <Progress 
                value={uploadProgress} 
                color="success"
                className="max-w-full"
              />
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
            className="bg-secondary text-black hover:bg-secondary/90"
            onPress={handleUpload}
            isLoading={isUploading}
          >
            Publish
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PublishPodcastModal;