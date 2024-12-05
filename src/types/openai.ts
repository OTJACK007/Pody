export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  id: string;
  content: string;
  role: 'assistant';
}

export interface Thread {
  id: string;
  messages: Message[];
}