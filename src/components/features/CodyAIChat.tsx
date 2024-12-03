import React, { useState, useRef, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Avatar } from "@nextui-org/react";
import { Send, Paperclip, AtSign, Image, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface CodyAIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const CodyAIChat = ({ isOpen, onClose }: CodyAIChatProps) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm analyzing your request. Let me help you with that!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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
      <ModalContent className="h-[80vh]">
        <ModalHeader className="flex items-center gap-4">
          <div className="relative">
            <Avatar
              src="https://static.wixstatic.com/media/c67dd6_ac4955e964b5498f944b0d11d6415b7c~mv2.jpg"
              className="w-10 h-10"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
          </div>
          <div>
            <h3 className={`text-xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Cody AI</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Your AI podcast assistant
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="p-0">
          <div className={`flex-1 overflow-y-auto p-4 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
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
              onClick={handleSend}
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