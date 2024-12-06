import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  profileUrl: string;
  followers: string;
  isConnected: boolean;
  lastSync: Date;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiry?: Date;
}

export interface UserSocialAccounts {
  accounts: SocialAccount[];
  updatedAt: Date;
}

export const getUserSocialAccounts = async (userId: string): Promise<UserSocialAccounts | null> => {
  try {
    const docRef = doc(db, 'userSocialAccounts', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserSocialAccounts;
    }
    return null;
  } catch (error) {
    console.error('Error getting social accounts:', error);
    return null;
  }
};

export const updateUserSocialAccounts = async (userId: string, accounts: UserSocialAccounts) => {
  try {
    const docRef = doc(db, 'userSocialAccounts', userId);
    await setDoc(docRef, {
      ...accounts,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating social accounts:', error);
    throw error;
  }
};

export const createDefaultSocialAccounts = async (userId: string) => {
  try {
    const defaultAccounts: UserSocialAccounts = {
      accounts: [],
      updatedAt: new Date()
    };

    await updateUserSocialAccounts(userId, defaultAccounts);
  } catch (error) {
    console.error('Error creating default social accounts:', error);
    throw error;
  }
};

export const connectSocialAccount = async (userId: string, account: SocialAccount) => {
  try {
    const currentAccounts = await getUserSocialAccounts(userId);
    const accounts = currentAccounts?.accounts || [];
    
    const existingIndex = accounts.findIndex(a => a.platform === account.platform);
    if (existingIndex >= 0) {
      accounts[existingIndex] = account;
    } else {
      accounts.push(account);
    }

    await updateUserSocialAccounts(userId, {
      accounts,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error connecting social account:', error);
    throw error;
  }
};

export const disconnectSocialAccount = async (userId: string, platform: string) => {
  try {
    const currentAccounts = await getUserSocialAccounts(userId);
    if (!currentAccounts) return;

    const accounts = currentAccounts.accounts.map(account => 
      account.platform === platform 
        ? { ...account, isConnected: false, accessToken: undefined, refreshToken: undefined }
        : account
    );

    await updateUserSocialAccounts(userId, {
      accounts,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error disconnecting social account:', error);
    throw error;
  }
};