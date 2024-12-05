import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const uploadProfilePicture = async (
  userId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const storageRef = ref(storage, `profilePictures/${userId}/${file.name}`);
    
    // Create upload task
    const uploadTask = storage.ref(storageRef).put(file);
    
    // Monitor upload progress
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(progress);
        }
      }
    );
    
    // Wait for upload to complete
    const snapshot = await uploadTask;
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};