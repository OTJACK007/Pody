import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Paperclip, Image, AtSign, Wand2, Brain, Zap, MessageSquare, Star, TrendingUp, Headphones, Library, Target } from 'lucide-react';
import { Input, Button, Avatar, Card, CardBody, Progress } from "@nextui-org/react";
import { useTheme } from '../../contexts/ThemeContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CodyAI = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: 'Smart Understanding',
      description: 'Advanced natural language processing for better comprehension'
    },
    {
      icon: <Wand2 className="w-6 h-6 text-secondary" />,
      title: 'Content Generation',
      description: 'Create summaries, scripts, and content ideas'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: 'Quick Analysis',
      description: 'Instant insights from your podcast content'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
      title: 'Contextual Chat',
      description: 'Natural conversations with context awareness'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string = inputValue) => {
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
    <div className="flex h-[calc(100vh-120px)]">
      {/* Left Sidebar */}
      <div className={`w-80 flex-shrink-0 border-r ${
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      } p-4`}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar
                src="https://static.wixstatic.com/media/c67dd6_ac4955e964b5498f944b0d11d6415b7c~mv2.jpg"
                className="w-12 h-12"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
            <div>
              <h2 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Cody AI</h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Your AI podcast assistant
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Usage Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Monthly Credits
                  </span>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    75/100
                  </span>
                </div>
                <Progress value={75} color="primary" size="sm" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    Response Quality
                  </span>
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                    95%
                  </span>
                </div>
                <Progress value={95} color="success" size="sm" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <Card key={index} className={`${
                theme === 'dark'
                  ? 'bg-gray-800/50 border-gray-700/50'
                  : 'bg-white border-gray-200'
              } border`}>
                <CardBody className="p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    {feature.icon}
                    <h3 className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{feature.title}</h3>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>{feature.description}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow flex flex-col">
        {/* Chat Messages */}
        <div className={`flex-grow overflow-y-auto p-6 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className="max-w-4xl mx-auto space-y-6">
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
                <div className={`max-w-[70%] rounded-lg p-4 ${
                  message.type === 'user'
                    ? theme === 'dark' 
                      ? 'bg-primary text-white'
                      : 'bg-primary/10 text-gray-900'
                    : theme === 'dark'
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-gray-900'
                }`}>
                  <p>{message.content}</p>
                  <span className={`text-xs mt-2 block ${
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

        {/* Input Area */}
        <div className={`p-4 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto flex items-center gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default CodyAI;