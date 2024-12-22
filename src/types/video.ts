export interface Video {
  id: string;
  publisher_id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  video_url?: string;
  views: number;
  duration: string;
  publish_date: string;
  status: 'private' | 'public' | 'unlisted';
  progress: number;
  type: 'video' | 'short';
  created_at: string;
  updated_at: string;
}

export interface Insight {
  id: string;
  video_id: string;
  content: string;
  timestamp: string;
}

export interface KeyMoment {
  id: string;
  video_id: string;
  timestamp: string;
  title: string;
  summary?: string;
}

export interface Transcript {
  id: string;
  video_id: string;
  time: string;
  speaker?: string;
  text: string;
}

export interface Topic {
  id: string;
  video_id: string;
  topic_name: string;
  relevance: number;
}

export interface FullContent {
  id: string;
  video_id: string;
  title: string;
  description?: string;
  sections: Array<{
    title: string;
    content: string;
    key_points?: string[];
    detailed_points?: Array<{
      title: string;
      content: string;
    }>;
  }>;
}

export interface RelatedContent {
  id: string;
  video_id: string;
  related_video_id: string;
  relationship_type: string;
  relevance_score: number;
}