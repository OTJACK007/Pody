export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  notes_count: number;
  last_updated: string;
}

export interface KnowledgeNote {
  id: string;
  title: string;
  content: string;
  source_type: string;
  source_title: string;
  source_url: string;
  tags: string[];
  created_at: string;
}

export interface KnowledgeSummary {
  id: string;
  title: string;
  content: string;
  category_id: string;
  user_id: string;
  video_id?: string;
  metrics: {
    readingTime: string;
    comprehension: number;
    relevance: number;
    impact: number;
  };
  tags: string[];
  created_at: string;
}

export interface KnowledgeHighlight {
  id: string;
  category_id: string;
  user_id: string;
  video_id?: string;
  quote: string;
  context: string;
  timestamp: string;
  tags: string[];
  created_at: string;
}

export interface KnowledgeTopic {
  id: string;
  category_id: string;
  user_id: string;
  video_id?: string;
  topic_name: string;
  relevance: number;
  insights: string[];
  created_at: string;
}