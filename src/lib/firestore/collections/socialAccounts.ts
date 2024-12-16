import { SocialAccount } from '../../types/socialAccounts';

export const getUserSocialAccounts = async (userId: string): Promise<SocialAccount[]> => {
  // Placeholder implementation
  return [];
};

export const createDefaultSocialAccounts = async (userId: string) => {
  // Placeholder implementation
};

export const connectSocialAccount = async (userId: string, account: SocialAccount) => {
  // Placeholder implementation
};

export const disconnectSocialAccount = async (userId: string, platform: string) => {
  // Placeholder implementation
};