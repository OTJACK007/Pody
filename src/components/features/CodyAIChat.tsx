import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Avatar, Card, CardBody } from "@nextui-org/react";
import { Send, Paperclip, AtSign, Image, Sparkles, ExternalLink, TrendingUp, Headphones, Library, Target } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { createThread, sendMessage } from '../../services/openai';
import type { Message } from '../../types/openai';

interface CodyAIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const CodyAIChat = ({ isOpen, onClose }: CodyAIChatProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      text: "What are the latest trends in technology and podcasting?",
      color: "text-primary"
    },
    {
      icon: <Headphones className="w-4 h-4" />,
      text: "Recommend a podcast based on my interests",
      color: "text-secondary"
    },
    {
      icon: <Library className="w-4 h-4" />,
      text: "Search my knowledge library",
      color: "text-blue-500"
    },
    {
      icon: <Target className="w-4 h-4" />,
      text: "Help me with my goals and projects",
      color: "text-purple-500"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initThread = async () => {
      const thread = await createThread();
      setThreadId(thread.id);
    };
    
    if (isOpen && !threadId) {
      initThread();
    }
  }, [isOpen]);

  const handleSend = useCallback(async (content: string = inputValue) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (!threadId) throw new Error('No active thread');

      const response = await sendMessage(threadId, content);
      
      const aiMessage: Message = {
        id: response.id,
        type: 'assistant',
        content: response.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [threadId, inputValue]);

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
      <ModalContent className="h-[80vh]">
        <ModalHeader className="flex items-center gap-4">
          <div className="relative">
            <Avatar
              src="https://static.wixstatic.com/media/c67dd6_ac4955e964b5498f944b0d11d6415b7c~mv2.jpg"
              className="w-10 h-10"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
          </div>
          <div className="flex-grow">
            <h3 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Cody AI</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Your AI podcast assistant
            </p>
          </div>
          <Button
            endContent={<ExternalLink className="w-4 h-4" />}
            className="bg-primary text-white"
            onClick={() => {
              onClose();
              navigate('/dashboard/cody-ai');
            }}
          >
            Open Full Version
          </Button>
        </ModalHeader>
        <ModalBody className="p-0 h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg scrollbar-thumb-primary scrollbar-track-transparent hover:scrollbar-thumb-primary/80">
          <div className={`flex-1 overflow-y-auto p-4 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            {messages.length === 0 && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {suggestions.map((suggestion, index) => (
                  <Card
                    key={index}
                    isPressable
                    className={`${
                      theme === 'dark'
                        ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    } border transition-colors cursor-pointer`}
                    onClick={() => handleSend(suggestion.text)}
                  >
                    <CardBody className="p-3">
                      <div className="flex items-center gap-2">
                        <span className={suggestion.color}>{suggestion.icon}</span>
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>{suggestion.text}</span>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            )}
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <Avatar
                    src={message.type === 'assistant' 
                      ? "https://static.wixstatic.com/media/c67dd6_ac4955e964b5498f944b0d11d6415b7c~mv2.jpg"
                      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
                    }
                    className="w-8 h-8"
                  />
                  <div className={`max-w-[70%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? theme === 'dark' 
                        ? 'bg-primary text-white'
                        : 'bg-primary/10 text-gray-900'
                      : theme === 'dark'
                        ? 'bg-gray-800 text-white'
                        : 'bg-white text-gray-900'
                  }`}>
                    <p>{message.content}</p>
                    <span className={`text-xs mt-1 block ${
                      message.type === 'user'
                        ? theme === 'dark'
                          ? 'text-white/70'
                          : 'text-gray-700'
                        : theme === 'dark'
                          ? 'text-gray-400'
                          : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <Avatar
                    src="https://static.wixstatic.com/media/c67dd6_ac4955e964b5498f944b0d11d6415b7c~mv2.jpg"
                    className="w-8 h-8"
                  />
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></span>
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="p-4">
          <div className="flex items-center gap-2 w-full">
            <div className="flex gap-2">
              <Button
                isIconOnly
                variant="light"
                className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
              >
                <Image className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
              >
                <AtSign className="w-5 h-5" />
              </Button>
            </div>
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
              classNames={{
                input: `${theme === 'dark' ? 'bg-gray-700/50 text-white' : 'bg-gray-100 text-gray-900'}`,
                inputWrapper: `${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-100 border-gray-300'}`
              }}
            />
            <Button
              isIconOnly
              color="success"
              className="bg-secondary text-black"
              onClick={() => handleSend()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CodyAIChat;