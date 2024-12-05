import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { serverTimestamp } from 'firebase/firestore';

export interface UserSettings {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  jobTitle: string;
  location: string;
  website: string;
  profilePicture: string;
}

export const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'userSettings', userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserSettings;
    }
    return null;
  } catch (error) {
    console.error('Error getting user settings:', error);
    return null;
  }
};

export const createUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    await setDoc(doc(db, 'userSettings', userId), {
      ...settings,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating user settings:', error);
    throw error;
  }
};

export const updateUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    await updateDoc(doc(db, 'userSettings', userId), {
      ...settings,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};