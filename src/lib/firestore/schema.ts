// Firestore Collections Structure

// features/{featureId}
interface Feature {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'review' | 'ready';
  stage?: string;
  quarter?: string;
  progress: number;
  expectedDate?: string;
  features: string[];
  votes: {
    up: number;
    down: number;
    users: Record<string, 'up' | 'down'>;
  };
  category: string;
  requestedBy: string;
  requestedDate: Date;
  destination: 'upcoming' | 'suggested' | 'maybe' | 'collecting';
  publishedDate?: Date;
  lastModified: Date;
  modifiedBy: string;
}

// featureVotes/{voteId}
interface FeatureVote {
  id: string;
  featureId: string;
  userId: string;
  voteType: 'up' | 'down';
  timestamp: Date;
}

// featureComments/{commentId}
interface FeatureComment {
  id: string;
  featureId: string;
  userId: string;
  content: string;
  timestamp: Date;
  edited?: boolean;
  editedAt?: Date;
}

// featureHistory/{historyId}
interface FeatureHistory {
  id: string;
  featureId: string;
  action: 'created' | 'updated' | 'moved' | 'published' | 'deleted';
  performedBy: string;
  timestamp: Date;
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  destination?: string;
}