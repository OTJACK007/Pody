import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, increment, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface Feature {
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

// Collection references
const featuresCollection = collection(db, 'features');
const votesCollection = collection(db, 'featureVotes');

// Get features by destination
export const getFeaturesByDestination = async (destination: string) => {
  const q = query(
    featuresCollection,
    where('destination', '==', destination),
    orderBy('lastModified', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Feature[];
};

// Get published features
export const getPublishedFeatures = async (sortBy: 'newest' | 'oldest' = 'newest') => {
  const q = query(
    featuresCollection,
    where('publishedDate', '!=', null),
    orderBy('publishedDate', sortBy === 'newest' ? 'desc' : 'asc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Feature[];
};

// Add new feature
export const addFeature = async (feature: Omit<Feature, 'id'>) => {
  return await addDoc(featuresCollection, {
    ...feature,
    lastModified: new Date(),
    votes: { up: 0, down: 0, users: {} }
  });
};

// Update feature
export const updateFeature = async (id: string, updates: Partial<Feature>) => {
  const docRef = doc(featuresCollection, id);
  await updateDoc(docRef, {
    ...updates,
    lastModified: new Date()
  });
};

// Delete feature
export const deleteFeature = async (id: string) => {
  await deleteDoc(doc(featuresCollection, id));
};

// Vote on feature
export const voteOnFeature = async (featureId: string, userId: string, voteType: 'up' | 'down') => {
  const docRef = doc(featuresCollection, featureId);
  const feature = await getDoc(docRef);
  const data = feature.data() as Feature;
  
  // Remove previous vote if exists
  const previousVote = data.votes.users[userId];
  if (previousVote) {
    await updateDoc(docRef, {
      [`votes.${previousVote}`]: increment(-1),
      [`votes.users.${userId}`]: deleteField()
    });
  }
  
  // Add new vote
  await updateDoc(docRef, {
    [`votes.${voteType}`]: increment(1),
    [`votes.users.${userId}`]: voteType,
    lastModified: new Date()
  });
};

// Move feature to different destination
export const moveFeature = async (featureId: string, destination: Feature['destination']) => {
  const docRef = doc(featuresCollection, featureId);
  await updateDoc(docRef, {
    destination,
    lastModified: new Date()
  });
};

// Publish feature
export const publishFeature = async (featureId: string) => {
  const docRef = doc(featuresCollection, featureId);
  await updateDoc(docRef, {
    publishedDate: new Date(),
    lastModified: new Date()
  });
};