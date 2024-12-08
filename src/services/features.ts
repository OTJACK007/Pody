import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Types
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
  requestedDate: Timestamp;
  destination: 'upcoming' | 'suggested' | 'maybe' | 'collecting';
  publishedDate?: Timestamp;
  lastModified: Timestamp;
  modifiedBy: string;
}

// Collection references
const featuresCollection = collection(db, 'features');
const featureHistoryCollection = collection(db, 'featureHistory');

// Fetch features by destination
export const fetchFeatures = async (destination: string): Promise<Feature[]> => {
  try {
    if (!destination) {
      throw new Error('Destination is required');
    }

    const q = query(
      featuresCollection,
      where('destination', '==', destination),
      orderBy('lastModified', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const features = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      requestedDate: doc.data().requestedDate?.toDate() || new Date(),
      lastModified: doc.data().lastModified?.toDate() || new Date(),
      publishedDate: doc.data().publishedDate?.toDate() || null
    })) as Feature[];
    
    return features;
  } catch (error) {
    console.error('Error fetching features:', error);
    throw error;
  }
};

// Create new feature
export const createFeature = async (feature: Omit<Feature, 'id'>): Promise<string> => {
  try {
    const featureData = {
      ...feature,
      status: feature.destination === 'upcoming' ? 'planning' : 'pending',
      progress: 0,
      features: [],
      votes: { up: 0, down: 0, users: {} },
      destination: feature.destination || 'suggested',
      requestedDate: serverTimestamp(),
      lastModified: serverTimestamp()
    };
    
    const featureRef = await addDoc(featuresCollection, featureData);
    return featureRef.id;
  } catch (error) {
    console.error('Error creating feature:', error);
    throw error;
  }
};

// Update existing feature
export const updateExistingFeature = async (id: string, updates: Partial<Feature>): Promise<void> => {
  const batch = writeBatch(db);
  const featureRef = doc(featuresCollection, id);
  
  // Get original feature for change tracking
  const original = await getDoc(featureRef);
  const changes = Object.entries(updates).map(([field, newValue]) => ({
    field,
    oldValue: original.data()?.[field],
    newValue
  }));
  
  // Update feature
  batch.update(featureRef, {
    ...updates,
    lastModified: serverTimestamp()
  });
  
  // Add history entry
  const historyRef = doc(featureHistoryCollection);
  batch.set(historyRef, {
    featureId: id,
    action: 'updated',
    performedBy: updates.modifiedBy,
    timestamp: serverTimestamp(),
    changes
  });
  
  await batch.commit();
};

// Submit vote
export const submitVote = async (featureId: string, userId: string, voteType: 'up' | 'down'): Promise<void> => {
  const featureRef = doc(featuresCollection, featureId);
  const feature = await getDoc(featureRef);
  const data = feature.data() as Feature;
  
  const batch = writeBatch(db);
  
  // Remove previous vote if exists
  const previousVote = data.votes.users[userId];
  if (previousVote) {
    batch.update(featureRef, {
      [`votes.${previousVote}`]: increment(-1),
      [`votes.users.${userId}`]: null
    });
  }
  
  // Add new vote
  batch.update(featureRef, {
    [`votes.${voteType}`]: increment(1),
    [`votes.users.${userId}`]: voteType,
    lastModified: serverTimestamp()
  });
  
  await batch.commit();
};

// Move feature to different destination
export const moveFeatureToDestination = async (
  featureId: string, 
  destination: Feature['destination'],
  userId: string
): Promise<void> => {
  const batch = writeBatch(db);
  const featureRef = doc(featuresCollection, featureId);
  
  batch.update(featureRef, {
    destination,
    lastModified: serverTimestamp()
  });
  
  const historyRef = doc(featureHistoryCollection);
  batch.set(historyRef, {
    featureId,
    action: 'moved',
    performedBy: userId,
    timestamp: serverTimestamp(),
    destination
  });
  
  await batch.commit();
};

// Publish feature
export const publishFeatureToProduction = async (featureId: string, userId: string): Promise<void> => {
  const batch = writeBatch(db);
  const featureRef = doc(featuresCollection, featureId);
  
  batch.update(featureRef, {
    publishedDate: serverTimestamp(),
    lastModified: serverTimestamp()
  });
  
  const historyRef = doc(featureHistoryCollection);
  batch.set(historyRef, {
    featureId,
    action: 'published',
    performedBy: userId,
    timestamp: serverTimestamp()
  });
  
  await batch.commit();
};